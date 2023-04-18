# questionnaire_web_Vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


## 设计
仅仅有用户和管理员
用户：  问卷的发起者，可以对问卷进行管理等操作
管理员：该系统的所有者，拥有所有的操作权限
答卷者：该问卷的回答者，不需要注册，仅仅需要答卷而已

### 功能实现

#### 区分管理员和用户
管理员区别于用户在UI显示为管理员拥有后台管理的权限，可以对后台进行管理，管理员仅仅一个。
管理员账号以admin开头，密码以admin开头

#### 用户功能
##### 设计发布问卷
用户可以设计自己的问卷，并且对问卷进行管理，通过发送问卷的链接给别人就可以让别人回答问卷
##### 设计模板
类似设计问卷一样。
但是设计问卷模板的时候需要用户自己编写问卷的详情
#### 查看自己的问卷
用户查看自己设计好的问卷，可以设置问卷的发布时间，以及手动关闭问卷。
查看问卷的当前回答情况，并且使用图表展示（实现统计功能）

#### 数据库设计

```js
user = {
    email:"",
    account:"",  // 用来代表id
    nickname:"",
    password:"",
    status: 0,   // 表示问卷的状态，{1:正常, 0: 异常(禁止任何操作，包括登陆)}
}
// 登陆的时候通过账号和密码就可以登陆

// 问卷开启后的链接直接由account + questionnaire_title 构成，因此不需要放在字段里面 
questionnaire={
    id:"",
    content:"",   // 表示问卷的内容，json化的，和下面的template表的content一样
    account:"",   // 表示问卷的拥有者
    status:"",    // 用来表示当前问卷的状态， 存在 1 （此时只要是在开始和结束的时间里面，问卷就可以进行回答）| 删除 0 | 彻底删除 在数据可直接删除 | -1 关闭
    starttime:"", // 通过时间可以判定是否在运行中国，同时可以手动关闭问卷
    stoptime:"",
}

template = {
    id:"",
    timeuse: 0, // 表示这个模板被使用的次数
    content:"",
    account:"", // 表示模板的拥有者 admin | user {admin:市场模板, user: 个人模板}
    detail:"",  // 介绍模板的内容
    img:""      // 展示模板
}

// 答卷的结果
answer_result = {
    id:"",
    account :"",        // 表示问卷的所有者
    questinnaire_id:"", // 表示对应的questionnaire的id
    starttime : "",
    stoptime : "",
    content: "",
    answerer_info:{
        ip: "",          // 答者的ip
        other: ""        // 答者的其他信息，如姓名，性别，联系方式等
    } //答者的信息
}
```

可以查看特定人的答卷答题情况

### 选取开发框架
#### fronted 
vue3(js) + elementPlus + bulma + echarts
#### backend
gin(go)
#### db
mysql

## 介绍
### 截图
### 视频

[//]: # (规定，以后的每一个链接行开头都是 sq-link，方便以后更换域名这个ip的时候进行修改)

sq-link: http:www.sqmw.top:9212/
### API DOCS 
https://github.com/sqmw/questionnaireVue/blob/main/api.md
