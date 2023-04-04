<template>
  <div ref="value-box" @click="isEdit=true" :style="{width: width,display: 'inline'}">
    <span v-text="value" class="text-div" v-show="!isEdit" :style="{width: width}"></span>
    <input type="text" v-model="value" class="text-input" v-show="isEdit || !value"/>
  </div>
</template>

<script>
// 用来实现当鼠标悬停的时候就让相应的文本可以修改
import {ref} from "vue";

export default {
  name: "HoverEdit",
  setup(){
    let isEdit = ref(false)
    let value
    return {
      isEdit,
      value
    }
  },
  props:{
    width:{
      required:true,
    },
    val:{
      required: true
    }
  },
  created() {
    this.value = ref(this.val)
  },
  mounted() {
    this.$refs["value-box"].onmouseenter = ()=>{
      this.isEdit = true
    }
    this.$refs["value-box"].onmouseleave = ()=>{
      this.isEdit = false
    }
  }
}
</script>

<style scoped>
.text-div,
.text-input{
  font-size: 20px;
}

.text-input{
  text-decoration: none;
  border: none;
}

.text-input:hover{
  background-color: mediumpurple;
}
</style>
