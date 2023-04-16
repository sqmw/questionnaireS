<template>
  <table class="table sq-center is-bordered">
    <thead>
    <tr>
      <th>序号</th>
      <th>时间戳</th>
      <th>访问IP</th>
      <th>状态码</th>
      <th>方法</th>
      <th>account</th>
      <th>DesUserAccount</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="i in 5" :key="i">
      <th>{{i}}</th>
      <td>2020-07-13T18:59:56.293656Z</td>
      <td>2020-07-13T18:59:56.293656Z</td>
      <td>200</td>
      <td>GET</td>
      <td>{{'interviewee-' + i}}</td>
      <td>{{'user-' + i}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "AccessMonitor"
}
</script>

<style scoped>
.sq-center{
  margin: 4%;
  width: 90%;
}
</style>
