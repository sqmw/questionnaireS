<template>
  <div class="main">
    <div class="s-left" :class="{'slit-out-vertical': !isLeftExit}" ref="sLeft">
      <el-icon class="right-top" @click="showOrHiddenQuestionList" v-show="isLeftExit"><Fold/></el-icon>
      <el-space direction="vertical">
        <el-card class="box-card" :style="{width: sLeftWidth + 'px'}">
          <template #header>
            <div class="card-header">
              <span>题目类型</span>
            </div>
          </template>
          <div class="questionGroup">
            <el-tag @mousedown="moveAddQuestionMouseDown($event)" @mouseup="moveAddQuestionMouseUp($event)"
                    size="large" v-for="(v, k) in questionNameMap" :key="v" class="hover-back-purple" :s-type="k">
              {{v}}
            </el-tag>
          </div>
        </el-card>
      </el-space>
    </div>
    <div class="s-main" :class="{'tilt-in-fwd-tr': !isLeftExit, 'slide-in-bck-left': isLeftExit}">
      <!--折叠图标-->
      <el-icon class="left-top" @click="showOrHiddenQuestionList" v-show="!isLeftExit"><Expand /></el-icon>
      <!--这里的这种实现双向绑定的方法，看了很多资料，都是错误的，可能是vue的版本问题，这个基本是vue的最新的版本，真无语-->
      <HoverEdit :value="questionnaire.title" width="100%" style="display: inline;text-align: center" @getNewV="questionnaire.title=$event.target.value"></HoverEdit>
      <el-button type="primary" plain round="true" style="margin: 20px;position: fixed;top: 0;right: 0" @click="finish">完成</el-button>
      <div class="questionListMainBox">
        <el-space direction="vertical">
          <!--
            这里针对的是每一类问题：分别是单选，多选，填空
            这个顺序不能改变，但是对于每一类问题里面的问题的顺序，是可以改变的
          -->
          <el-card v-for="(questionGroupArr,k) in questionnaire.questions" :key="k" class="box-card" :style="{width: (sMainWidth * 0.8)+ 'px'}">
            <template #header>
              <div class="card-header" style="display: flex; justify-content: space-between">
                <el-tag size="large" class="ml-2" type="danger">{{questionNameMap[k]}}</el-tag>
                <el-button class="button"  @click="questionShowMap[k] = !questionShowMap[k]" style="float: right">折叠/展开</el-button>
              </div>
            </template>
            <!--遍历问题，把问题的题目展示在这里-->
            <div
                v-for="(question,i) in questionGroupArr"
                :key="k + ',' + i"
                @mouseenter="showEditMouseEnter($event)"
                @mouseleave="hiddenEditMouseLeave($event)"
                @mousemove="showHoveredBeforeOrAfter($event)"
                name="question-each"
                :id="k + ',' + i"
                class="text item"
                :class="{'slide-out-top': questionShowMap[k], 'slide-in-top': !questionShowMap[k]}"
                style="text-align: left">
              {{i + 1}}.
              <HoverEdit :value="question.title" width="100%" style="display: inline;text-align: left" @getNewV="question.title = $event.target.value"></HoverEdit>
              <!--
                每个问题的题目后面的按钮
                id/key 构成：问题类型(en)，题目的序号
                key非常重要，否贼diff完成后渲染的结果可能不对
                -->
              <span style="float: right;visibility: hidden" name="title-edit" :id="k + ',' + i">
                <!--添加-->
                <el-icon class="title-option" @click="addQuestion($event)"><CirclePlus /></el-icon>
                <!--移除-->
                <el-icon class="title-option" @click="removeQuestion($event)"><Remove /></el-icon>
                <!--移动-->
                <el-icon class="title-option" @click="moveQuestion($event)"><Rank /></el-icon>
              </span>
              <!--这里的是每一个选择题的选项-->
              <p v-for="(quesOption,j) in question.options" :key="k + ',' + i + ',' + j">
                <!--ascii-->
                {{String.fromCharCode(97 - 32 + j)}}. <HoverEdit :value="quesOption" width="100%" @getNewV="question.options[j] = $event.target.value"></HoverEdit>
              </p>

              <!--这里对应每一个填空的答案-->
              <div v-for="(resultItem,j) in question.result" :key="k + ',' + i + ',' + j">
                <HoverEdit :value="resultItem" width="100%" @getNewV="question.result[j] = $event.target.value"></HoverEdit>
                <p style="background-color: mediumpurple;height: 2px"></p>
              </div>
              <el-divider />
            </div>
          </el-card>
        </el-space>
      </div>
    </div>
    <!--用来装拖动的效果组件-->
    <div id="movableQuestionBox" v-show="movableQuestionBoxInfo.display" :style="{width: movableQuestionBoxInfo.w + 'px',height: movableQuestionBoxInfo.h + 'px','background-color':'mediumpurple',position: 'fixed',top: movableQuestionBoxInfo.y + 'px',left: movableQuestionBoxInfo.x + 'px','z-index': 1,opacity: 0.5}">
      测试使用
    </div>
  </div>
</template>

<script>
import {reactive, ref, watch} from 'vue'
import HoverEdit from "@/components/common/HoverEdit"

export default {
  name: "QuestionnaireCreate",
  components: {HoverEdit},
  setup(){
    let sLeftWidth = ref(250)
    let sMainWidth = ref(800)
    let isLeftExit = ref(true)
    let isAddQuestionClick = true
    // 表示相聚多少个像素点的时候就会被吸进去
    const attractDistance = 100
    const questionNameMap = {
      single: "单选",
      multi: "多选",
      gapFillings: "填空",
    }
    let domMovableQuestionBoxHovered = undefined
    const movableQuestionBox = undefined
    // 拖动dom的相关信息
    const movableQuestionBoxInfo = reactive({
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      display: false
    })
    const questionDomMouseOverInfo = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    }
    const questionShowMap = reactive({
      single: true,
      multi: true,
      gapFillings: true,
    })
    class ChoiceQ{
      constructor() {
        this.title = 'title-one'
        this.options = new Array(
              'option—first',
              'option—second',
              'option—third',
              'option—forth',
        )
      }
    }
    class GapFilling{
      constructor() {
        this.title = 'gapFilling-one'
        this.result = [
          'result',
        ]
      }
    }
    // 这个相当于是一个工厂，每次我们可以通过键值对来获取一个新的对象
    const questionProto = {
      single: undefined,
      multi: undefined,
      gapFillings: undefined
    }

    Object.defineProperty(questionProto, 'single', {
      get() {
        return new ChoiceQ()
      }
    })
    Object.defineProperty(questionProto, 'multi', {
      get() {
        return new ChoiceQ()
      }
    })
    Object.defineProperty(questionProto, 'gapFillings', {
      get() {
        return new GapFilling()
      }
    })
    // 用来存放我们设计好的问卷
    // 这里引用的对象必须是独一无二的
    const questionnaire = reactive({
      //问卷标题
      title:'questionnaire_one',
      questions:{
        //单选题
        single:[
          new ChoiceQ()
        ],
        multi:[
          new ChoiceQ()
        ],
        gapFillings:[
          new GapFilling()
        ]
      }
    })
    const questionTypeList = [
      '单选',
      '多选',
      '填空',
    ]
    const drawer = ref(false)
    // eslint-disable-next-line no-unused-vars
    watch(isLeftExit,(n,o)=>{
      if(n){
        sMainWidth.value = window.document.body.clientWidth * 0.7
      }else{
        sMainWidth.value = window.document.body.clientWidth
      }
    },{})
    return {
      drawer,
      isLeftExit,
      questionTypeList,
      questionnaire,
      questionNameMap,
      sLeftWidth,
      sMainWidth,
      questionProto,
      questionShowMap,
      isAddQuestionClick,
      movableQuestionBox,
      movableQuestionBoxInfo,
      questionDomMouseOverInfo,
      attractDistance,
      domMovableQuestionBoxHovered,
    }
  },
  methods:{
    showOrHiddenQuestionList(){
      this.isLeftExit = !this.isLeftExit
    },
    // 不同类型的问题的添加是不同的
    addQuestion(e){
      // 这点的a可能为undefined，这样皆可以解决因为undefined带来的问题
      if (!e.target.parentNode.parentNode.id){
        return
      }
      const a = e.target.parentNode.parentNode?.id?.split(',')
      this.questionnaire.questions[a[0]].splice(a[1] + 1,0 ,this.questionProto[a[0]])
    },
    removeQuestion(e){
      if (!e.target.parentNode.parentNode.id){
        return
      }
      const a = e.target.parentNode.parentNode?.id?.split(',')
      this.questionnaire.questions[a[0]].splice(a[1],1)
    },
    moveQuestion(){
      console.log("还未实现")
    },
    // 表示鼠标悬浮在对应的题目上面了，需要把编辑dom显示出来
    showEditMouseEnter(e){
      // 将问题标题编辑显示出来
      e.target.querySelector("span[name='title-edit']").style.visibility = 'visible'
      this.questionDomMouseOverInfo.x = this.getEleAbsLeft(e.target)
      this.questionDomMouseOverInfo.y = this.getEleAbsTop(e.target)
      this.questionDomMouseOverInfo.w = e.target.clientWidth
      this.questionDomMouseOverInfo.h = e.target.clientHeight

      this.domMovableQuestionBoxHovered = e.target
    },
    hiddenEditMouseLeave(e){
      e.target.querySelector("span[name='title-edit']").style.visibility = 'hidden'
      if (e.shiftKey){
        e.target.classList.remove("hovered-before")
        e.target.classList.remove("hovered-after")
      }
    },
    // 左侧拖动进行问题添加
    // 在这里我们规定，没有按下ctrl的时候的点击仅仅是普通的点击，但是当我们按下了之后点击拖动他就会有效果
    moveAddQuestionMouseDown(e){
      //在这里判定是拖动添加还是点击添加
      if (e.shiftKey){
        this.isAddQuestionClick = false
        this.movableQuestionBoxInfo.display = true
      }else{
        this.isAddQuestionClick = true
      }
    },
    // 添加
    moveAddQuestionMouseUp(e){
      // 点击添加
      if (this.isAddQuestionClick){
        if (!e.target?.getAttribute('s-type')){
          return
        }
        this.questionnaire.questions[e.target.getAttribute('s-type')].push(this.questionProto[e.target.getAttribute('s-type')])
        // 拖动添加
      }
      this.isAddQuestionClick = true
    },
    // 获取绝对的位置
    getEleAbsLeft(element){
      let actualLeft = element.offsetLeft
      let current = element.offsetParent

      while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
     return actualLeft;
    },
    getEleAbsTop(element){
      let actualTop = element.offsetTop;
      let current = element.offsetParent;

      while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    },
    showHoveredBeforeOrAfter(e){
      //console.log(e)
      if (e.target.nodeType === 1 && e.target.nodeName === "DIV" && e.target.getAttribute('name') === 'question-each' &&
      !this.isAddQuestionClick && e.shiftKey){
        // 表示需要在前面添加
        if (e.layerY < e.target.clientHeight/2){
          if(!e.target.classList.contains("hovered-before")){
            e.target.classList.add("hovered-before")
          }
          if(e.target.classList.contains("hovered-after")){
            e.target.classList.remove("hovered-after")
          }
          //表示需要在后面添加
        }else{
          if(e.target.classList.contains("hovered-before")){
            e.target.classList.remove("hovered-before")
          }
          if(!e.target.classList.contains("hovered-after")){
            e.target.classList.add("hovered-after")
          }
        }
      }
    },
    finish(){
      console.log(this.questionnaire)
      alert("保存问卷成功")
    }
  },
  created() {
    window.onresize = ()=>{
      this.sLeftWidth = this.$refs.sLeft.clientWidth
      this.sMainWidth = (window.document.body.clientWidth - this.$refs.sLeft.clientWidth) * 0.9
    }
    // 实现移动的效果
    // 这点应该修改成在父元素上面添加鼠标移动事件，这样可以减少获取绝对位置的时间
    {
      window.document.addEventListener('mouseup',(e)=>{
        // 总共有两个，实际上必须的仅仅这就可以了
        this.isAddQuestionClick = true
        this.movableQuestionBoxInfo.display = false
        this.domMovableQuestionBoxHovered?.classList.remove("hovered-before")
        this.domMovableQuestionBoxHovered?.classList.remove("hovered-after")
      })

      // 通过在这点判断实现插入
      // 需要确定当前的位置
      window.document.addEventListener('mousemove',(e)=>{
        //console.log(e.screenX,e.screenY)
        if(!this.isAddQuestionClick && e.shiftKey){
          // 更新拖动效果的位置
          this.movableQuestionBoxInfo.x = e.clientX
          this.movableQuestionBoxInfo.y = e.clientY
        }
      })
    }
  },
  mounted() {
    this.sLeftWidth = this.$refs.sLeft.clientWidth
    this.sMainWidth = (window.document.body.clientWidth - this.$refs.sLeft.clientWidth) * 0.9
    const questionDom = document.querySelector("div[name='question-each']")

    this.movableQuestionBoxInfo.w = questionDom.offsetWidth
    this.movableQuestionBoxInfo.h = questionDom.offsetHeight

    if(this.$route.query.title){
      this.questionnaire.title = this.$route.query.title
    }
  }

}
</script>

<style scoped>
body *{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.main{
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.s-left,
.s-main{
  position: absolute;
  top: 0;
  height: 100%;
  bottom: 0;
}

.s-left{
  left: 1%;
  width: 22%;
}

.s-main{
  overflow-x: hidden;
  overflow-y: scroll;
  right: 0;
  width: 73%;
  height: 100%;
  margin-bottom: 20px;
}

.slit-out-vertical {
  -webkit-animation: slit-out-vertical 0.5s ease-in both;
  animation: slit-out-vertical 0.5s ease-in both;
}

@-webkit-keyframes slit-out-vertical {
  0% {
    -webkit-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
    opacity: 1;
  }
  54% {
    -webkit-transform: translateZ(-160px) rotateY(87deg);
    transform: translateZ(-160px) rotateY(87deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(-800px) rotateY(90deg);
    transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
}
@keyframes slit-out-vertical {
  0% {
    -webkit-transform: translateZ(0) rotateY(0);
    transform: translateZ(0) rotateY(0);
    opacity: 1;
  }
  54% {
    -webkit-transform: translateZ(-160px) rotateY(87deg);
    transform: translateZ(-160px) rotateY(87deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(-800px) rotateY(90deg);
    transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
}

/*100%放大*/
.tilt-in-fwd-tr {
  -webkit-animation: tilt-in-fwd-tr 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: tilt-in-fwd-tr 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes tilt-in-fwd-tr {
  0% {
    -webkit-transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg);
    transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    width: 100%;
    opacity: 1;
  }
}
@keyframes tilt-in-fwd-tr {
  0% {
    -webkit-transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg);
    transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    width: 100%;
    opacity: 1;
  }
}

.questionListBox{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.questionListBox>li{
  left: 10%;
  width: 80%;
  list-style: none;
  text-align: center;
  border: 2px solid;
  margin: 20px;
  font-size: 26px;
}

.questionGroup{
  display: flex;
  flex-direction: column;
}

.questionGroup>*{
  margin: 20px;
}
.left-top,
.right-top{
  position: absolute;
  top: 0;
  font-size: 20px;
}

.left-top{
  left: 0;
}
.right-top{
  right: 0;
}

.questionListMainBox{
  width: 100%;
  margin-top: 5%;
  height: 100%;
  overflow-y: scroll;
}

.title-option{
  margin: 10px;
  font-size: 20px;
}

.title-option:hover{
  color: mediumpurple;
  font-size: 25px;
}

/*实现折叠*/
.slide-out-top {
  -webkit-animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
    height: 0;
  }
}
@keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
    height: 0;
  }
}
/*slide in*/
.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-bck-left {
  -webkit-animation: slide-in-bck-left 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-bck-left 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-bck-left {
  0% {
    -webkit-transform: translateZ(700px) translateX(-400px);
    transform: translateZ(700px) translateX(-400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateX(0);
    transform: translateZ(0) translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-bck-left {
  0% {
    -webkit-transform: translateZ(700px) translateX(-400px);
    transform: translateZ(700px) translateX(-400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateX(0);
    transform: translateZ(0) translateX(0);
    opacity: 1;
  }
}

.hover-back-purple:hover{
  background-color: mediumpurple;
}

.hovered-before:before,
.hovered-after:after{
  content: '测试';
  text-align: center;
  display: block;
  height: 100px;
  background-color: lightgray;
}
</style>
