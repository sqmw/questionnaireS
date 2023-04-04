<template>
  <div class="container" id="loginAndRegister">
    <!-- 这个是用来装饰的 -->
    <div class="box"></div>
    <div class="container-forms">
      <!-- 注册登陆切换页面 -->
      <div class="container-info">
        <div class="info-item">
          <div class="table">
            <div class="table-cell">
              <p>已经有账号了？ </p>
              <div class="btn" id="changeToLogin">登录 </div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="table">
            <div class="table-cell">
              <p>还没有账号？ </p>
              <div class="btn" id="changeToRegister">注册 </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 登陆/注册页面 -->
      <div class="container-form">
        <div class="form-item log-in">
          <div class="table">
            <div class="table-cell">
              <input name="Username" placeholder="用户名" type="text">
              <input name="Password" placeholder="密码" type="Password">
              <div class="btn">登录 </div>
            </div>
          </div>
        </div>
        <div class="form-item sign-up">
          <div class="table">
            <div class="table-cell">
              <input name="email" placeholder="邮箱" type="text">
              <input name="fullName" placeholder="名字" type="text">
              <input name="Username" placeholder="用户名" type="text">
              <input name="Password" placeholder="密码" type="Password">
              <div class="btn">注册 </div>
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
      loginAndRegister.className = "container"
    })

    // 表示的是从登陆状态转化到注册状态
    changeToRegister.addEventListener("click", ()=>{
      loginAndRegister.className = "container log-in"
    })
  },
  methods: {}
}
</script>
<style scoped>

body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #5356ad;
  overflow: hidden
}

.table {
  display: table;
  width: 100%;
  height: 100%
}

.table-cell {
  display: table-cell;
  vertical-align: middle;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #999ede;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.container .box {
  position: absolute;
  left: 30%;
  top: 25%;
  width: 40%;
  height: 50%;
  overflow: hidden
}

.container .box:before,
.container .box:after {
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

.container .box:after {
  background-color: #a5aae4;
  top: -10px;
  left: 10px;
  width: 30%;
  height: 30%
}

.container-forms {
  position: absolute;
  width: 40%;
  left: 30%;
  right: 30%;
  height: 60%;
  top: 20%;
  opacity: 0.8;
}

.container .btn {
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

.container .btn:hover {
  opacity: .7
}

.container .btn,
.container input {
  padding: 10px 15px
}

.container input {
  margin: 0 auto 15px;
  display: block;
  width: 220px;
  -moz-transition: all .3s;
  -o-transition: all .3s;
  -webkit-transition: all .3s;
  transition: all .3s
}

.container .container-forms .container-info {
  text-align: left;
  align-content: center;
  font-size: 0
}

.container .container-forms .container-info .info-item {
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

.container .container-forms .container-info .info-item p {
  font-size: 20px;
  margin: 20px
}

.container .container-forms .container-info .info-item .btn {
  background-color: transparent;
  border: 1px solid #fff
}

.container .container-forms .container-info .info-item .table-cell {
  padding-right: 35px
}

.container .container-forms .container-info .info-item:nth-child(2) .table-cell {
  padding-left: 35px;
  padding-right: 0
}

.container .container-form {
  overflow: hidden;
  position: absolute;
  left: 30px;
  top: -30px;
  width: 305px;
  height: 380px;
  background-color: #fff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  transition: all .5s
}

.container .container-form:before {
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

.container .container-form .btn {
  position: relative;
  box-shadow: 0 0 10px 1px #ff73b3;
  margin-top: 30px
}

.container .form-item {
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

.container .form-item.sign-up {
  position: absolute;
  left: -100%;
  opacity: 0
}

.container.log-in .box:before {
  position: absolute;
  left: 180px;
  top: 62px;
  height: 265px
}

.container.log-in .box:after {
  top: 22px;
  left: 192px;
  width: 324px;
  height: 220px
}

.container.log-in .container-form {
  left: 265px
}

.container.log-in .container-form .form-item.sign-up {
  left: 0;
  opacity: 1
}

.container.log-in .container-form .form-item.log-in {
  left: -100%;
  opacity: 0
}

.container.active {
  width: 260px;
  height: 140px;
  margin-top: -70px
}

.container.active .container-form {
  left: 30px;
  width: 200px;
  height: 200px
}

.container.active .container-form:before {
  content: "✔";
  position: absolute;
  left: 51px;
  top: 5px;
  color: #5356ad;
  font-size: 130px;
  opacity: 1
}

.container.active input,
.container.active .btn,
.container.active .info-item {
  display: none;
  opacity: 0;
  padding: 0;
  margin: 0 auto;
  height: 0
}

.container.active .form-item {
  height: 100%
}

.container.active .container-forms .container-info .info-item {
  height: 0;
  opacity: 0
}

.rabbit {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 3;
  fill: #fff
}

</style>
