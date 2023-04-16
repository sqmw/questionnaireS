<template>

 <fieldset disabled style="margin-top: 3%;margin-right: 10%" ref="personalInfo">
   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">昵称</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input" type="text" value="sq" placeholder="Normal sized input">
         </div>
       </div>
     </div>
   </div>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">账号</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input" type="text" value="admin" placeholder="Normal sized input">
         </div>
       </div>
     </div>
   </div>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">邮箱</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input" type="text" value="admin@qq.com" placeholder="Normal sized input">
         </div>
       </div>
     </div>
   </div>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">密码</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input" type="text" value="admin" placeholder="Normal sized input">
         </div>
       </div>
     </div>
   </div>
 </fieldset>

  <button class="button is-light sq-bottom-right"
          @click="handleEdit($event)">编辑</button>
</template>

<script>
export default {
  name: "PersonalInfo",
  methods:{
    handleEdit(e){
      this.$refs.personalInfo.disabled = !this.$refs.personalInfo.disabled
      if(this.$refs.personalInfo.disabled){
        e.target.innerText = "编辑"
      }else{
        e.target.innerText = "保存"
      }
    }
  }
}
</script>

<style scoped>
.sq-bottom-right{
  position: absolute;
  right: 2%;
  bottom: 2%;
}
</style>
