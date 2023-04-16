<template>
  <el-row class="tac">
    <el-col>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="lightgray"
          @open="handleOpen"
          @close="handleClose"
      >
<!--        答卷中心-->
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>问卷中心</span>
          </template>
          <el-menu-item index="1-1" @click="newQuestionnaire">新建问卷</el-menu-item>
          <el-menu-item index="1-2" @click="myQuestionnaire">我的问卷</el-menu-item>
          <el-menu-item index="1-3" @click="binQuestionnaire">回收站</el-menu-item>
        </el-sub-menu>
<!--        个人中心-->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="2-1" @click="personalInfo">个人信息</el-menu-item>
        </el-sub-menu>
<!--        模板中心-->
        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span>模板中心</span>
          </template>
          <el-menu-item index="3-1" @click="templateCreate">创建模板</el-menu-item>
          <el-menu-item index="3-3" @click="templateMarket">模板市场</el-menu-item>
        </el-sub-menu>
<!--        后台管理-->
        <!-- 这个仅仅对管理员开放-->
        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
            <span>后台管理(admin)</span>
          </template>
          <el-menu-item index="4-1" @click="userManage">用户管理</el-menu-item>
          <el-menu-item index="4-3" @click="accessMonitor">访问监控</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import theme from "@/assets/js/globalConfig"
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: "Navigator-All",
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    const myTheme = theme

    return {
      handleClose ,
      handleOpen,
      myTheme
    }
  },
  methods:{
    newQuestionnaire(){
      ElMessageBox.prompt('请输入问卷名称', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputErrorMessage: '问卷不能为空',
      })
          .then(({ value }) => {
            if (value == null || value == ''){
              ElMessage({
                type: 'error',
                message: '问卷名不能为空',
              })
              // 问卷正确创建之后的响应
            }else{
              ElMessage({
                type: 'success',
                message: `问卷名称:${value}`,
              })
              this.$router.push({
                path:"/home/QuestionnaireCreate",
                query:{
                  title: value
                }
              })
            }
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Input canceled',
            })
          })
    },
    myQuestionnaire(){
      this.$router.push({
        path:"/home/questionnaireCenter"
      })
    },
    binQuestionnaire(){
      this.$router.push({
        path:"/home/questionnaireBin"
      })
    },
    personalInfo(){
      this.$router.push({
        path:"/home/personalInfo"
      })
    },
    templateCreate(){
      this.$router.push({
        path:"/home/templateCreate"
      })
    },
    templateMarket(){
      this.$router.push({
        path:"/home/templateMarket"
      })
    },
    userManage(){
      this.$router.push({
        path:"/home/userManage"
      })
    },
    accessMonitor(){
      this.$router.push({
        path:"/home/accessMonitor"
      })
    },
  }
}
</script>

<style scoped>

</style>
