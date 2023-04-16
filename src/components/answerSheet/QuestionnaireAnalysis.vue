<template>
  <div style="position: absolute;top: 0; left: 0;right: 0;height: 95%;overflow-y: scroll">
    <h2 style="text-align: center">{{questionnaire.title}}</h2>
    <div>
      <!--每一类题目在这里-->
      <el-tabs tab-position="left">
        <el-tab-pane :label="questionNameMap[questionType]" v-for="(questionGroup, questionType) in questionnaire.questions" :key="questionType">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{questionNameMap[questionType]}}</span>
              </div>
            </template>
            <!--遍历每一类题目中的每一个题目-->
            <div v-for="(question,index) in  questionGroup" :key="index">
              <table style="width: 100%;height: 100%;">
                <thead>
                <tr>
                  <th colspan="3">{{index + 1}}. {{question.title}}</th>
                </tr>
                <tr>
                  <th style="width: 45%">选项</th>
                  <th style="width: 10%">小计</th>
                  <th style="width: 45%">比例</th>
                </tr>
                </thead>
                <tbody>
                <!--遍历每一个题目的情况-->
                <tr v-for="(times, option) in question.options" :key="option">
                  <td v-text="option"></td>
                  <td>{{times}}</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <td>本次有效填写次数</td>
                  <td>100</td>
                  <td>1</td>
                </tr>
                </tbody>
              </table>
              <div :key="questionType  + ',' + index" style="float: right">
                <el-button type="success" plain @click="handlePie('chart-pie' + '-' + questionType + '-' + index)">饼状图</el-button>
                <el-button type="warning" plain @click="handleBar('chart-bar' + '-' + questionType + '-' + index)">条形图</el-button>
                <el-button type="danger" plain @click="handleBrokenLine('chart-broken-line' + '-' + questionType + '-' + index)">折线图</el-button>
              </div>
              <div :id="'chart-pie' + '-' + questionType + '-' + index" style="width: 600px; height:400px;display: none;float: left">
              </div>
              <div :id="'chart-bar' + '-' + questionType + '-' + index" style="width: 600px; height:400px;display: none;float: left">
              </div>
              <div :id="'chart-broken-line' + '-' + questionType + '-' + index" style="width: 600px; height:400px;display: none;float: left">
              </div>
            </div>

          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

import {reactive} from "vue";
import * as echarts from 'echarts';

export default {
  name: "QuestionnaireAnalysis",
  setup(){
    const questionNameMap = {
      single: "单选",
      multi: "多选",
      gapFillings: "填空",
    }
    const questionnaire = reactive({
      //问卷标题
      title:'高太太调查问卷',
      questions:{
        //单选题
        single:[
          {
            title:"single-title-one",
            options: {
              "single1": 2,
              "single2": 2,
              "single3": 2,
              "single4": 2,
            }
          },
          {
            title:"single-title-two",
            options: {
              "single1": 2,
              "single2": 2,
              "single3": 2,
              "single4": 2,
            }
          },
          {
            title:"single-title-three",
            options: {
              "single1": 2,
              "single2": 2,
              "single3": 2,
              "single4": 2,
            }
          },
          {
            title:"single-title-four",
            options: {
              "single1": 2,
              "single2": 2,
              "single3": 2,
              "single4": 2,
            }
          },
        ],
        multi:[
          {
            title:"multi-title-one",
            options:{
              "multi1": 2,
              "multi2": 2,
              "multi3": 2,
              "multi4": 2,
            }
          },
        ],
        gapFillings:[
          {
            title:"gapFillings-title-one",
            result:[
              "result1",
              "result2",
              "result3",
            ]
          }
        ]
      }
    })
    return {
      questionnaire,
      questionNameMap
    }
  },
  methods:{

    handlePie(id){
      const chartDom = document.getElementById(id);
      if(chartDom.style.display === '' || chartDom.style.display === 'block'){
        chartDom.style.display = 'none'
        return
      }else{
        chartDom.style.display = ''
      }
      const myChart = echarts.init(chartDom);
      let option;

      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      };

      option && myChart.setOption(option);
    },
    handleBar(id){
      let chartDom = document.getElementById(id);
      if(chartDom.style.display === '' || chartDom.style.display === 'block'){
        chartDom.style.display = 'none'
        return
      }else{
        chartDom.style.display = ''
      }
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
    handleBrokenLine(id){
      let chartDom = document.getElementById(id);
      if(chartDom.style.display === '' || chartDom.style.display === 'block'){
        chartDom.style.display = 'none'
        return
      }else{
        chartDom.style.display = ''
      }
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };

      option && myChart.setOption(option);
    }
  },
  mounted() {

  }
};
</script>
<style scoped>
table, th, td{
  border: 1px solid mediumpurple;
}
</style>
