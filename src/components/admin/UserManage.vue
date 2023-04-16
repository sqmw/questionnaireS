<template>
  <table class="table sq-center is-bordered">
    <thead>
    <tr>
      <th>序号</th>
      <th>账号</th>
      <th>状态</th>
      <th colspan="4">操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="i in 5" :key="i">
      <th>{{i}}</th>
      <td>admin</td>
      <td>正常</td>
      <td><button class="button is-primary">启用</button></td>
      <!--跳转到个人信息的那点-->
      <td><button class="button is-warning">禁用</button></td>
      <td><button class="button is-primary">详情</button></td>
      <td><button class="button is-danger">删除</button></td>
      <!--查看该用户的问卷情况-->
      <td v-if="false">查看</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "UserManage"
}
</script>

<style scoped>
.sq-center{
  margin: 4%;
  width: 90%;
}
</style>
