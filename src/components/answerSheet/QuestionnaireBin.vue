<template>
  <div>
    <table class="sq-table">
      <thead>
      <tr>
        <th>问卷名字</th>
        <th>发布时间</th>
        <th>答卷数</th>
        <th>恢复</th>
        <th>彻底删除</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in 4" :key="i">
        <td>今天你吃饭了吗</td>
        <td>2022.01.12</td>
        <td>1000</td>
        <td>
          <el-icon class="hover-mediumpurple">
            <TopLeft />
          </el-icon>
        </td>
        <td>
          <el-icon class="hover-mediumpurple">
            <Delete />
          </el-icon>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * 这个表示的是已经结束了问卷
 */
export default {
  name: "QuestionnaireBin"
}
</script>

<style scoped>
.sq-table{
  margin-top: 2%;
  width: 80%;
  margin-left: 10%;
}

.sq-table>thead {
  background-color: #e0e0e0;
  color: #000;
  vertical-align: bottom;
}

.sq-table,
.sq-table th,
.sq-table td{
  border: 1px ridge gray;
  border-spacing: 0;
}

.hover-mediumpurple:hover{
  color: mediumpurple;
  font-size: 22px;
}

</style>
