<template>
  <div>
    <div class="header">
        XXX
    </div>
    <div class="left" :style="{width: leftWidth + '%'}" :class="{'scale-out-left': !isLeftOpen}">
      <NavigatorAll v-show="isLeftOpen"></NavigatorAll>
    </div>
    <div class="main" :style="{width: (100 - leftWidth) + '%', left: leftWidth + '%'}">
      <el-icon class="left-top" v-show="isLeftOpen" @click="foldOrExpand"><Fold /></el-icon>
      <el-icon class="left-top" v-show="!isLeftOpen" @click="foldOrExpand"><Expand /></el-icon>
      <div style="font-size: 16px">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import NavigatorAll from "@/components/navigator/NavigatorAll";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {NavigatorAll},
  setup(){
    let isLeftOpen = ref(true)
    let leftWidth = ref(15)
    return {
      isLeftOpen,
      leftWidth
    }
  },
  methods:{
    foldOrExpand(){
      // 将状态修改为当前需要的状态
      this.isLeftOpen = !this.isLeftOpen
      if (this.isLeftOpen){
        const t = setInterval(()=>{
          this.leftWidth ++
          if(this.leftWidth >= 15){
            clearInterval(t)
          }
        },10)
      }else{
        const t = setInterval(()=>{
          this.leftWidth --
          if(this.leftWidth <= 0){
            clearInterval(t)
          }
        },10)
      }
    }
  },
  created() {

  }

}
</script>

<style scoped>
.header{
  background-color: lightgray;
  position: absolute;
  top: 0;
  height: 10%;
  width: 100%;
  left: 0;
  right: 0;
}

.left{
  background-color: lightgray;
  position: absolute;
  top: 10%;
  height: 90%;
  width: 15%;
  left: 0;
  right: 0;
}

.main{
  position: absolute;
  top: 10%;
  height: 90%;
  width: 85%;
  right: 0;
}

.left-top{
  z-index: 2;
  position: absolute;
  left: 0px;
  top: 0;
  font-size: 2em;
}

.scale-out-left {
  -webkit-animation: scale-out-left 0.25s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  animation: scale-out-left 0.25s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
@-webkit-keyframes scale-out-left {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    opacity: 1;
  }
}
@keyframes scale-out-left {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0% 50%;
    transform-origin: 0% 50%;
    opacity: 1;
  }
}
</style>
