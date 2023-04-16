<template>
<!--  用来选择模板的来源（自己/市场）-->
  <div class="select sq-right-top is-rounded is-primary">
    <select>
      <option>我的模板</option>
      <option>市场模板</option>
    </select>
  </div>

  <div style="position: absolute;top: 10%;width: 100%;height: 85%;overflow-y: scroll">
    <div v-for="i in 10" :key="i" class="columns"
         style="background-color: lightgray;
       position:relative; width: 90%; left: 5%;
       margin-top: 20px;
">
      <div class="column is-two-fifths">
        <img src="data:image/jpeg;base64,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"/>
      </div>
      <div class="column is-two-fifths">
        房产交易房屋租赁门户网站模板
        企业网站
        Veshm是一个完美房地产网站HTML模板。可以创建在线出售、租赁等门户网站。它有7+个主页、高级搜索选项、创意UI元素设计和独特的功能。基于最新的Boostrap5.3构建的，它是100%标准的代码...
      </div>
      <div class="column is-one-fifths" style="display: flex;flex-direction: column;justify-content: space-around;">
        <div>使用次数: {{3}}</div>
        <div style="display: flex;justify-content: space-around;">
          <button class="button is-info is-outlined is-rounded">使用</button>
          <button class="button is-success is-outlined is-rounded">预览</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "TemplateMarket"
}
</script>

<style scoped>
.sq-right-top{
  position: fixed;
  right: 2%;
  top: 15%;
}
</style>
