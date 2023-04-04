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
      <HoverEdit :val="questionnaire.title" width="100%" style="display: inline;text-align: center"></HoverEdit>
      <div class="questionListMainBox">
        <el-space direction="vertical">
          <!--
            这里针对的是每一类问题：分别是单选，多选，填空
            这个顺序不能改变，但是对于每一类问题里面的问题的顺序，是可以改变的
          -->
          <el-card v-for="(questionGroupArr,k) in questionnaire.questions" :key="k" class="box-card" :style="{width: sMainWidth + 'px'}">
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
                name="question-each"
                :id="k + ',' + i"
                class="text item"
                :class="{'slide-out-top': questionShowMap[k], 'slide-in-top': !questionShowMap[k]}"
                style="text-align: left">
              {{i + 1}}.
              <HoverEdit :val="question.title" width="100%" style="display: inline;text-align: left"></HoverEdit>
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
              <!--这里的是每一个问题的选项-->
              <p v-for="(quesOption,j) in question.options" :key="k + ',' + i + ',' + j">
                <!--ascii-->
                {{String.fromCharCode(97 - 32 + j)}}. <HoverEdit :val="quesOption" width="100%"></HoverEdit>
              </p>
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
  name: "AnswerSheet",
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
    const domHoverSetInfo = {
      // 表示的是是否已经放进去的位置
      'viewHasSet': undefined,
      // 这个表示的是悬浮在哪个的上面，为undefined的时候表示的是，鼠标没有悬浮在上面
      'targetNow': undefined,
      // 表示的是需要放置的位置，-1表示前一个，1表示下一个
      'pos':-1
    }
    // class
    // 表示的是选择题(单选或者多选)
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
      domHoverSetInfo,
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
    // 表示鼠标悬浮在对应的题目上面了，需要把编辑dom显示出来
    showEditMouseEnter(e){
      // 将问题标题编辑显示出来
      e.target.querySelector("span[name='title-edit']").style.visibility = 'visible'
      if (e.shiftKey){
        this.domHoverSetInfo.targetNow = e.target
      }
      this.questionDomMouseOverInfo.x = this.getEleAbsLeft(e.target)
      this.questionDomMouseOverInfo.y = this.getEleAbsTop(e.target)
      this.questionDomMouseOverInfo.w = e.target.clientWidth
      this.questionDomMouseOverInfo.h = e.target.clientHeight
    },
    hiddenEditMouseLeave(e){
      e.target.querySelector("span[name='title-edit']").style.visibility = 'hidden'
      if (e.shiftKey){
        this.domHoverSetInfo.targetNow = undefined
        this.domHoverSetInfo.viewHasSet?.remove()
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
      }else{
        console.log("拖动结束")
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
    /**
     * 通过传入鼠标当前的位置和此时悬浮的问题所在dom节点的信息，进行判定
     * -2 表示的是没反应，-1表示的是上一个节点  1 表示下一个节点 , 没有当前的 0
     *
     * 目前得到的结果有点偏差
     */
    domAttractMe(mouseX, mouseY, domX, domY, domW, domH){
      // console.log(mouseY,domY,domH,mouseY < domY + domH / 2)
      // 判定很坐标
      if(mouseX<domX-this.attractDistance || mouseX > domX + domW + this.attractDistance){
        return -2
      }
      // 判定纵坐标
      if (mouseY < domY - this.attractDistance || mouseY > domY + domH + this.attractDistance){
        return -2
      }
      // 此时表示可以产生吸引的关系
      // 上一个
      if (mouseY < domY + domH / 2){
        return -1
      }
      // 下一个
      if (mouseY >= domY + domH / 2){
        return 1
      }
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
        if(e.shiftKey){
          this.domHoverSetInfo.viewHasSet?.remove()
          // console.log("添加成功")
          // console.log(this.domHoverSetInfo.targetNow.id)
          //此时进行放置操作
          this.movableQuestionBoxInfo.display = false
          // 将需要放置的放进来
          if(this.domHoverSetInfo.targetNow){
            const a = this.domHoverSetInfo.targetNow.id.split(',')
            if (this.domHoverSetInfo.pos === -1){
              this.questionnaire.questions[a[0]].splice(a[1],0 ,this.questionProto[a[0]])
            }else{
              this.questionnaire.questions[a[0]].splice(a[1] + 1,0 ,this.questionProto[a[0]])
            }
          }
        }
      })

      // 通过在这点判断实现插入
      // 需要确定当前的位置
      window.document.addEventListener('mousemove',(e)=>{
        if(!this.isAddQuestionClick && e.shiftKey){
          // 更新拖动效果的位置
          this.movableQuestionBoxInfo.x = e.clientX
          this.movableQuestionBoxInfo.y = e.clientY
          let a = document.createElement("div")
          a.id = 'hoverViewSet'
          a.style.width = this.questionDomMouseOverInfo.w + "px"
          a.style.height = this.questionDomMouseOverInfo.h + "px"
          a.style.backgroundColor = "lightgray"

          // 表示现在是存在悬浮
          // 将悬浮的拖动放进来
          // 这里都仅仅是一个加的悬浮效果，最后需要在松开鼠标和键盘之后才是真正意义上面的加入
          /**
           * 感觉有点违背数据驱动的原则
           */
          if (this.domHoverSetInfo.targetNow){
            const pos = this.domAttractMe(
                e.clientX,e.clientY,
                this.questionDomMouseOverInfo.x,this.questionDomMouseOverInfo.y,
                this.questionDomMouseOverInfo.w,this.questionDomMouseOverInfo.h
            )
            this.domHoverSetInfo.pos = pos
            switch (pos){
              case -1:{
                const previousEleSibling = this.domHoverSetInfo.targetNow.previousElementSibling
                // 表示还没有，需要现在加进去，同时需要移除上一个，因为加进去的时候仅仅需要一个而已
                if (!previousEleSibling || previousEleSibling.id !== 'hoverViewSet'){
                  this.domHoverSetInfo.viewHasSet?.remove()
                  this.domHoverSetInfo.viewHasSet = a.cloneNode(true)
                  this.domHoverSetInfo.targetNow.parentNode.insertBefore(this.domHoverSetInfo.viewHasSet,this.domHoverSetInfo.targetNow)
                }
                break
              }
              case 1:{
                const nextElementSibling = this.domHoverSetInfo.targetNow.nextElementSibling
                if (!nextElementSibling || nextElementSibling.id !== 'hoverViewSet'){
                  this.domHoverSetInfo.viewHasSet?.remove()
                  this.domHoverSetInfo.viewHasSet = a.cloneNode(true)
                  this.domHoverSetInfo.targetNow.parentNode.insertBefore(this.domHoverSetInfo.viewHasSet,this.domHoverSetInfo.targetNow.nextElementSibling)
                }
              }
            }
          }
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
}
.s-left,
.s-main{
  position: absolute;
  top: 0;
  height: 100%;
  bottom: 0;
}

.s-left{
  left: 0;
  width: 25%;
}

.s-main{
  overflow-x: hidden;
  overflow-y: scroll;
  right: 0;
  width: 75%;
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
  margin-top: 5%;
  height: 100%;
  overflow: scroll;
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
</style>
