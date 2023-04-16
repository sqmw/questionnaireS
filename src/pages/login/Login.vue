<template>
  <div style="background-color: #5356ad;position:absolute; width: 100%;height: 100%;top:0;bottom: 0">
    <div class="sq-container" id="loginAndRegister">
      <!-- 这个是用来装饰的 -->
      <div class="sq-box"></div>
      <div class="sq-container-forms">
        <!-- 注册登陆切换页面 -->
        <div class="sq-container-info">
          <div class="info-item">
            <div class="sq-table">
              <div class="sq-table-cell">
                <p>已经有账号了？ </p>
                <div class="sq-btn" id="changeToLogin">登录 </div>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="sq-table">
              <div class="sq-table-cell">
                <p>还没有账号？ </p>
                <div class="sq-btn" id="changeToRegister">注册 </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 登陆/注册页面 -->
        <div class="sq-container-form">
          <div class="sq-form-item log-in">
            <div class="sq-table">
              <div class="sq-table-cell">
                <input name="Username" placeholder="账号" type="text">
                <input name="Password" placeholder="密码" type="Password">
                <div class="sq-btn" @click="login">登录 </div>
              </div>
            </div>
          </div>
          <div class="sq-form-item sign-up">
            <div class="sq-table">
              <div class="sq-table-cell">
                <input name="email" placeholder="邮箱" type="text">
                <input name="fullName" placeholder="账号" type="text">
                <input name="Username" placeholder="昵称" type="text">
                <input name="Password" placeholder="密码" type="Password">
                <div class="sq-btn">注册 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @vue/component
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',

  components: {},

  mixins: [],

  props: {},

  data () {
    return {}
  },

  computed: {},

  watch: {},

  created () {

  },

  mounted() {
    // 变换登陆注册
    const changeToLogin = document.getElementById("changeToLogin")
    const changeToRegister = document.getElementById("changeToRegister")
    const loginAndRegister = document.getElementById("loginAndRegister")

    // 表示的是从注册改变到登陆状态
    changeToLogin.addEventListener("click", ()=>{
      loginAndRegister.className = "sq-container"
    })

    // 表示的是从登陆状态转化到注册状态
    changeToRegister.addEventListener("click", ()=>{
      loginAndRegister.className = "sq-container log-in"
    })
  },
  methods: {
    login(){
      this.$router.replace({
        path: "/Home"
      })
    }
  }
}
</script>
<style scoped>

body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
  background-color: #5356ad;
  overflow: hidden
}

.sq-table {
  display: table;
  width: 100%;
  height: 100%
}

.sq-table-cell {
  display: table-cell;
  vertical-align: middle;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.sq-container {
  position: relative;
  width: 600px;
  height: 320px;
  background-color: #999ede;
  top: 50%;
  margin: -160px auto 0;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.sq-container .sq-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden
}

.sq-container .sq-box:before,
.sq-container .sq-box:after {
  content: " ";
  position: absolute;
  left: 152px;
  top: 50px;
  background-color: #9297e0;
  transform: rotateX(52deg) rotateY(15deg) rotateZ(-38deg);
  width: 300px;
  height: 285px;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.sq-container .sq-box:after {
  background-color: #a5aae4;
  top: -10px;
  left: 80px;
  width: 320px;
  height: 180px
}

.sq-container .sq-container-forms {
  position: relative
}

.sq-container .sq-btn {
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  width: 60px;
  color: #fff;
  background-color: #ff73b3;
  opacity: 1;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.sq-container .sq-btn:hover {
  opacity: .7
}

.sq-container .sq-btn,
.sq-container input {
  padding: 10px 15px
}

.sq-container input {
  margin: 0 auto 15px;
  display: block;
  width: 220px;
  -moz-transition: all .3s;
  -o-transition: all .3s;
  -webkit-transition: all .3s;
  transition: all .3s
}

.sq-container .sq-container-forms .sq-container-info {
  text-align: left;
  font-size: 0
}

.sq-container .sq-container-forms .sq-container-info .info-item {
  text-align: center;
  font-size: 16px;
  width: 300px;
  height: 320px;
  display: inline-block;
  vertical-align: top;
  color: #fff;
  opacity: 1;
  -moz-transition: all .3s;
  -o-transition: all .3s;
  -webkit-transition: all .3s;
  transition: all .3s
}

.sq-container .sq-container-forms .sq-container-info .info-item p {
  font-size: 20px;
  margin: 20px
}

.sq-container .sq-container-forms .sq-container-info .info-item .sq-btn {
  background-color: transparent;
  border: 1px solid #fff
}

.sq-container .sq-container-forms .sq-container-info .info-item .sq-table-cell {
  padding-right: 35px
}

.sq-container .sq-container-forms .sq-container-info .info-item:nth-child(2) .sq-table-cell {
  padding-left: 35px;
  padding-right: 0
}

.sq-container .sq-container-form {
  overflow: hidden;
  position: absolute;
  left: 30px;
  top: -30px;
  width: 305px;
  height: 380px;
  background-color: #fff;
  sq-box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.sq-container .sq-container-form:before {
  content: "✔";
  position: absolute;
  left: 160px;
  top: -50px;
  color: #5356ad;
  font-size: 130px;
  opacity: 0;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.sq-container .sq-container-form .sq-btn {
  position: relative;
  sq-box-shadow: 0 0 10px 1px #ff73b3;
  margin-top: 30px
}

.sq-container .sq-form-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.sq-container .sq-form-item.sign-up {
  position: absolute;
  left: -100%;
  opacity: 0
}

.sq-container.log-in .sq-box:before {
  position: absolute;
  left: 180px;
  top: 62px;
  height: 265px
}

.sq-container.log-in .sq-box:after {
  top: 22px;
  left: 192px;
  width: 324px;
  height: 220px
}

.sq-container.log-in .sq-container-form {
  left: 265px
}

.sq-container.log-in .sq-container-form .sq-form-item.sign-up {
  left: 0;
  opacity: 1
}

.sq-container.log-in .sq-container-form .sq-form-item.log-in {
  left: -100%;
  opacity: 0
}

.sq-container.active {
  width: 260px;
  height: 140px;
  margin-top: -70px
}

.sq-container.active .sq-container-form {
  left: 30px;
  width: 200px;
  height: 200px
}

.sq-container.active .sq-container-form:before {
  content: "✔";
  position: absolute;
  left: 51px;
  top: 5px;
  color: #5356ad;
  font-size: 130px;
  opacity: 1
}

.sq-container.active input,
.sq-container.active .sq-btn,
.sq-container.active .info-item {
  display: none;
  opacity: 0;
  padding: 0;
  margin: 0 auto;
  height: 0
}

.sq-container.active .sq-form-item {
  height: 100%
}

.sq-container.active .sq-container-forms .sq-container-info .info-item {
  height: 0;
  opacity: 0
}

</style>
