<template>
  <div ref="value-box" @click="isEdit=true" :style="{width: width,display: 'inline'}">
    <span v-text="value" class="text-div" v-show="!isEdit" :style="{width: width}"></span>
    <input type="text" :value="value" class="text-input" v-show="isEdit || !value" @change="returnValChanged($event)"/>
  </div>
</template>

<script>
// 用来实现当鼠标悬停的时候就让相应的文本可以修改
import {ref} from "vue";

export default {
  name: "HoverEdit",
  setup(){
    let isEdit = ref(false)
    return {
      isEdit,
    }
  },
  model:{
    prop: "value",
    event: ""
  },
  props:{
    width:{
      required:false,
    },
    value:{
      required: true
    },
    callback:{
      required: false,
    }
  },
  created() {
    this.val = ref(this.value)
  },
  mounted() {
    this.$refs["value-box"].onmouseenter = ()=>{
      this.isEdit = true
    }
    this.$refs["value-box"].onmouseleave = ()=>{
      this.isEdit = false
    }
  },
  methods:{
    returnValChanged(e){
      this.$emit("getNewV",e)
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
