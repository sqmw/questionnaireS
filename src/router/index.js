import {createRouter,createWebHashHistory}from 'vue-router'

import Login from "@/pages/login/Login"
import Home from "@/pages/home/Home";
import QuestionnaireCreate from "@/components/answerSheet/QuestionnaireCreate";
import QuestionnaireCenter from "@/components/answerSheet/QuestionnaireCenter";
import QuestionnaireBin from "@/components/answerSheet/QuestionnaireBin";
import QuestionnaireAnalysis from "@/components/answerSheet/QuestionnaireAnalysis";
import DataLargeScreen from "@/components/dataLargeScreen/DataLargeScreen";
import PersonalInfo from "@/components/personal/PersonalInfo";
import TemplateMarket from "@/components/template/TemplateMarket";
import UserManage from "@/components/admin/UserManage";
import AccessMonitor from "@/components/admin/AccessMonitor";

const routes = [
    { path: '/', component: Login },
    {
        path: '/home',
        component: Home,
        children:[
            {
                path: "questionnaireCreate",
                component: QuestionnaireCreate
            },
            {
                path: "questionnaireCenter",
                component: QuestionnaireCenter
            },
            {
                path: "questionnaireBin",
                component: QuestionnaireBin
            },
            {
                path:"questionnaireAnalysis",
                component: QuestionnaireAnalysis
            },
            {
                path: "dataLargeScreen",
                component: DataLargeScreen
            },
            {
                path: "personalInfo",
                component: PersonalInfo
            },
            {
                //模板和问卷创建的部分是一样的
                path: "templateCreate",
                component: QuestionnaireCreate
            },
            {
                path: "templateMarket",
                component: TemplateMarket
            },
            {
                path: "userManage",
                component: UserManage
            },
            {
                path: "accessMonitor",
                component: AccessMonitor
            }
        ]
    },
]

export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
