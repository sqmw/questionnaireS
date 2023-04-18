# API
## 服务器地址
localhost:8888
## 约定

返回值格式

```js
{
    status:1,          // 1 | 0 表示失败或者成功
    data: undefined,   // 表示post或者get数据的时候获取的数据就在这里面
    message: "修改成功" // 和status是对应的
}
```

请求数据格式无限制

## 用户
### 1. 登陆/注册
#### 1.1 登陆(get)
##### 1.1.1 地址
/user/login
##### 1.1.2 参数

| 参数名称 | 类型   | 是否必选 | 描述  |
| -------- | ------ | -------- | ----- |
| account  | string | 是       | admin |
| password | string | 是       | admin |

##### 1.1.3 返回值

###### 1.1.3.1成功

```json
{
    status: 1, 
    message: null
} //成功，路由跳转到首页
```

###### 1.1.3.1失败

```json
{
    status: 0, 
    message: null
} //依然停留在首页
```



#### 1.2  注册(post)

##### 1.2.1 地址

/user/register

##### 1.2.2 参数
| 参数名称 | 类型     | 是否必选 | 描述          |
| -------- | -------- | -------- | ------------- |
| account  | string   | 是       | admin         |
| password | string   | 是       | admin         |
| nickname | string   | 是       | 小雨          |
| email    | string   | 是       | admin@123.com |
| status   | int/char | 否       | 刚注册默认为1 |

##### 1.2.3 返回值

###### 1.2.3.1成功

```json
{
    status: 1, 
    message: null
} // 跳转到首页
```

###### 1.2.3.1失败

```json
{
    status: 0, 
    message: null
} // 停留在首页
```

### 2. 删除(get)

#### 2.1 地址

/user/del

#### 2.2参数

| 参数名称 | 类型   | 是否必选 | 描述  |
| -------- | ------ | -------- | ----- |
| account  | string | 是       | admin |

#### 2.3 返回值

##### 2.3.1成功

```json
{
    status: 1, 
    message: null
}
// 需要将这个用户下面的问卷以及模板全部归于admin所有
```

##### 2.3.2失败

```json
{
    status: 0, 
    message: null
}
// 这个情况一般不会发生
```

### 3 修改(post)

#### 3.1地址

/user/modify

#### 3.2参数

| 参数名称 | 类型   | 是否必选 | 描述                                  |
| -------- | ------ | -------- | ------------------------------------- |
| account  | string | 是       | adminXXX \| userXXX                   |
| action   | string | 是       | 表示修改的数据 可以为 : status \| all |
| data     | string | 是       | json string                           |

```js
action ：
	status : 表示的是修改当前的user的状态(由admin执行)，此时的data仅仅是一个数字
	all    : 表示的是修改所有的信息，这个admin和user都可以操作，此时的data是一个user json 对象
```

#### 3.3 返回值

##### 3.3.1成功

```json
{
    status: 1, 
    message: "修改成功"
}
```

##### 3.3.2失败

```json
{
    status: 0, 
    message: "修改失败"
}
```

### 4. 查询(get)

#### 4.1 地址

/user/query

> 已经登陆之后的用户查看自己的信息

#### 4.2参数

| 参数名称 | 类型   | 是否必选 | 描述  |
| -------- | ------ | -------- | ----- |
| account  | string | 是       | admin |

#### 4.3 返回值

##### 4.3.1成功

```json
{
    status: 1, 
    data: {},    //  表示的是
    message: null
}
```

##### 4.3.2失败

```json
{
    status: 0, 
    message: null
}
// 这个情况一般不会发生
```

## 问卷

### 1. 添加(post)

#### 1.1 地址

/questionnaire/insert

#### 1.2 参数

| 参数名称 | 类型   | 是否必选 | 描述                                                         |
| -------- | ------ | -------- | ------------------------------------------------------------ |
| account  | string | 是       | adminXXX \| userXXX                                          |
| content  | string | 是       | json string 表示一个问卷的所有的信息，content对应的是sql字段 |

#### 1.3返回值

##### 1.3.1成功

```json
{
    status: 1, 
    message: "添加成功"
}
```

##### 1.3.2失败

```json
{
    status: 0, 
    message: "添加失败"
}
```

### 2. (get)

#### 2.1 地址

/questionnaire/get-content

#### 2.2 参数

| 参数名称    | 类型   | 是否必选 | 描述                                        |
|---------| ------ | -------- |-------------------------------------------|
| id      | string | 是       | 表示的是问卷的ID                                 |

#### 2.3返回值

##### 2.3.1成功

```js
res = {
  status: 1,
  data : "", // 表示的是问卷的内容 content 
  message: "添加成功"
}
```

##### 2.3.2失败

```js
res = {
    status: 0, 
    message: "添加失败"
}
```

### 3. 彻底删除

#### 3.1 地址

/questionnaire/del

#### 3.2 参数

| 参数名称 | 类型   | 是否必选 | 描述                |
| -------- | ------ | -------- | ------------------- |
| account  | string | 是       | adminXXX \| userXXX |

#### 3.3返回值

##### 3.3.1成功

```json
{
    status: 1, 
    message: null
}
```

##### 3.3.2失败

```json
{
    status: 0, 
    message: null
}
```

### 4. 修改

> 表示的是修改问卷的开启关闭时间以及当前的状态

#### 4.1 地址

/questionnaire/modify

#### 4.2 参数

| 参数名称 | 类型   | 是否必选                        | 描述                             |
| -------- | ------ | ------------------------------- | -------------------------------- |
| account  | string | 是                              | adminXXX \| userXXX              |
| data     | string | 是                              | 表示修改的值                     |
| action   | string | status \| starttime \| stoptime | 修改状态 \| 开始时间 \| 停止时间 |

#### 4.3返回值

##### 4.3.1成功

```json
{
    status: 1, 
    message: null
}
```

##### 4.3.2失败

```json
{
    status: 0, 
    message: null
}
```



## 模板

### 1. 添加

#### 1.1 地址

/template/insert

#### 1.2 参数

| 参数名称 | 类型   | 是否必选 | 描述                                 |
| -------- | ------ | -------- | ------------------------------------ |
| account  | string | 是       | adminXXX \| userXXX                  |
| content  | string | 是       | json string 表示一个问卷的所有的信息 |
| detail   | string | 是       | 表示的是模板的介绍                   |
| other    | string | 是       | {img:"",timeuse:0}                   |

#### 1.3返回值

##### 1.3.1成功

```json
{
    status: 1, 
    message: "修改成功"
}
```

##### 1.3.2失败

```json
{
    status: 0, 
    message: "失败"
}
```

### 2. 删除

#### 2.1 地址

/template/del

#### 2.2 参数

| 参数名称 | 类型   | 是否必选 | 描述 |
| -------- | ------ | -------- | ---- |
| account  | string | 是       |      |
| id       | string | 是       |      |

#### 2.3返回值

##### 2.3.1成功

```json
{
    status: 1, 
    message: null
}
```

##### 2.3.2失败

```json
{
    status: 0, 
    message: null
}
```


### 3. 修改

#### 3.1 地址

/template/modify

#### 3.2 参数

| 参数名称 | 类型                     | 是否必选 | 描述                             |
| -------- | ------------------------ | -------- | -------------------------------- |
| id       | string                   | 是       | 表示的是修改的模板的id           |
| action   | detail \| img \| content | 是       | 表示的是修改的template的哪一部分 |
| data     | string                   | 是       | 表示的是修改的json数据           |

#### 3.3返回值

##### 3.3.1成功

```json
{
    status: 1, 
    message: null
}
```

##### 3.3.2失败

```json
{
    status: 0, 
    message: null
}
```

## 回答

### 1. 访问链接(get)

#### 1.1 地址

/answer

> 1. 需要对问卷的开启时间，关闭时间进行判定，如果超出时间，就返回问卷已经关闭
> 2. 如果问卷当前是关闭状态，同样返回问卷已经关闭
> 3. 正常访问，返回问卷答题的页面

#### 1.2 参数

| 参数名称         | 类型   | 是否必选 | 描述                         |
| ---------------- | ------ | -------- | ---------------------------- |
| account          | string | 是       | 表示的是问卷的所有者（user） |
| questionnaire_id | string | 是       | 表示当前填写的问卷的id       |

#### 1.3返回值

##### 1.3.1成功

```json
{
    status: 1, 
    data: "",       //整个问卷的json等信息
    message: null
}
```

##### 1.3.2失败

```json
{
    status: 0, 
    message: null
}
```

### 2. 提交结果(post)

#### 2.1 地址

/submit

#### 2.2 参数

| 参数名称         | 类型      | 是否必选 | 描述                                                   |
| ---------------- | --------- | -------- | ------------------------------------------------------ |
| account          | string    | 是       | adminXXX \| userXXX                                    |
| questinonaire_id | string    | 是       | 表示的是问卷的id                                       |
| content          | string    | 是       | 表示回答的整个json数据，和表answer_result的content对应 |
| starttime        | timestrap | 是       | 表示回答的开始时间                                     |
| stoptime         | timestrap | 是       | 表示提交的时间                                         |
| answerer_info    | string    | 是       | {     ip: "",   other: "" }                            |

#### 2.3返回值

##### 2.3.1成功

```json
{
    status: 1, 
    message: null
}
```

##### 2.3.2失败

```json
{
    status: 0, 
    message: null
}
```


## 说明
该文档仅仅体现了功能的实现，但是并没有对登陆等的cookie验证进行实现
