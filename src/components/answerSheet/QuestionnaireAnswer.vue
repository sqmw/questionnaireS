<template>
    <div style="position: absolute;width: 100%;height: 100%; left: 0; top:0; right: 0">
      <h1>{{questionnaire.title}}</h1>
      <!--这里的这种实现双向绑定的方法，看了很多资料，都是错误的，可能是vue的版本问题，这个基本是vue的最新的版本，真无语-->
      <div style="text-align: left">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <!--每一类题目-->
          <el-tab-pane v-for="(quesGroup, k) in questionnaire.questions" :label="questionNameMap[k]" :name="k" :key="k">
            <!--每一个选择题的问题-->
            <div v-for="(question,i) in quesGroup" :key="k + ',' + question.title + ',' + i">
              <h4 v-text="(i + 1) + '. ' + question.title"></h4>
              <!--每一个选择题的选项-->
              <p v-for="(option,index) in question.options" :key="index">
                <input type="radio" :name="question.title" :value="String.fromCharCode(97 - 32 + index)" v-if="k === 'single'" v-model="questionnaireResult.questions[k][i].options"/>
                <input :name="question.title" :value="String.fromCharCode(97 - 32 + index)" type="checkbox" v-else-if="k === 'multi'" v-model="questionnaireResult.questions[k][i].options"/>
                {{String.fromCharCode(97 - 32 + index)}}. {{option}}
              </p>
              <!--填空题-->
              <p v-for="(result,index) in question.result" :key="index">
                <HoverEdit :value="result" @getNewV="question.result[index] = $event.target.value; questionnaireResult.questions.gapFillings[index].result = $event.target.value"></HoverEdit>
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-button style="position: fixed; bottom: 10px" type="danger" @click="commit">提交</el-button>
      </div>
  </div>
</template>

<script>
import {reactive} from "vue"
import { ref } from 'vue'
import HoverEdit from "@/components/common/HoverEdit";
/**
 * 问卷的展示应该是单选、多选、填空、矩阵、量表顺序不可改变
 */
export default {
  name: "QuestionnaireAnswer",
  components: {HoverEdit},
  setup(){
    // 这里引用的对象必须是独一无二的
    const questionNameMap = {
      single: "单选",
      multi: "多选",
      gapFillings: "填空",
    }
    const activeName = ref('single')

    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    const questionShowMap = reactive({
      single: true,
      multi: true,
      gapFillings: true,
    })
    const questionnaire = reactive({
      //问卷标题
      title:'高铁舒适度调查',
      questions:{
        //单选题
        single:[
          {
            title:"single-title-one",
            options:[
              "single1",
              "single2",
              "single3",
              "single4"
            ]
          },
        ],
        multi:[
          {
            title:"multi-title-one",
            options:[
              "multi1",
              "multi2",
              "multi3",
              "multi4",
            ]
          },
        ],
        gapFillings:[
          {
            title:"gapFillings-title-one",
            result:[
              "",
            ]
          }
        ]
      }
    })
    //根据上面的问卷来进行创建的
    const questionnaireResult = reactive({
      //问卷标题
      title:'高铁舒适度调查',
      questions:{
        //单选题
        single:[
          {
            title:"single-title-one",
            options:[
            ]
          },
        ],
        multi:[
          {
            title:"multi-title-one",
            options:[
            ]
          },
        ],
        gapFillings:[
          {
            title:"gapFillings-title-one",
            result:[
            ]
          }
        ]
      }
    })
    return {
      questionnaire,
      questionNameMap,
      questionShowMap,
      activeName,
      handleClick,
      questionnaireResult
    }
  },
  methods:{
    commit(){
      console.log(this.questionnaireResult)
    }
  }
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
