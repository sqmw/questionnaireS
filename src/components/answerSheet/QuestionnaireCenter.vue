<template>
  <div class="box">
    <h3 v-show="questionList.length === 0" style="text-align: center;">无</h3>
    <table class="publish-table">
      <thead>
      <tr>
        <th>标题</th>
        <th>开始时间</th>
        <th>结束时间</th>
        <th>状态</th>
        <th>链接</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in questionList" class="tr-info" :key="index">
        <td v-text="item.title"></td>
        <td><input type="date"/></td>
        <td><input type="date"/></td>
        <td v-text="status[item.status]"></td>
        <td><a :href="item.link" @click.prevent="redirect(index)">{{item.link}}</a></td>
        <td class="action-box">
          <el-button type="success" @click="del(index)">删除</el-button>
          <el-button type="success" @click="shutdown(index)">关闭</el-button>
          <el-button type="success" @click="result(index)">结果</el-button>
          <el-button type="success" @click="dataLargeScreen(index)">数据大屏</el-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "QuestionnaireCenter",
  setup(){
    const status =  ['未开始', '进行中', '已结束']
    const questionList = [
      {
        title: "你的问卷能给多少分",
        //0还未开始
        //1正在进行
        //2表示的是已经结束
        status: 0,
        startTime: '',
        stopTime: '',
        link: 'http://localhost:8080/answerQuestionnaire?id=nshodjsijei2839203',
      },
    ]
    return {
      status,
      questionList
    }
  },
  methods:{
    result(index) {
      console.log("result" + index)
      this.$router.push({
        path:"/home/questionnaireAnalysis"
      })
    },
    del(index) {
      this.questionList.splice(index, 1);
    },
    shutdown(index) {
      this.questionList[index].status = 2;
    },
    redirect(index){
      if(this.questionList[index].status !== 1) {
        this.$alert("该问卷并非处于发布状态！");
      }else{
        this.$router.replace({
          name: 'answerQuestionnaire',
        })
      }
    },
    dataLargeScreen(){
      this.$router.push({
        path:"/home/dataLargeScreen"
      })
    }
  }
};
</script>

<style scoped>
.action-box{
  display: flex;
  justify-content: space-around;
}

.tr-info{
  text-align: center;
}

.box{
  position: absolute;
  width: 90%;
  left: 5%;
}
.publish-table{
  width: 100%;
}
</style>
