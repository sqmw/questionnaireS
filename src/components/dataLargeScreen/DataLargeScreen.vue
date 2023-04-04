<template>
  <div id="largeDataScreen" :class="fullScreen?'full-screen':'normal'">
    <div class="screen-box">
      <!--左边侧边栏-->
      <aside id="side-left">
        <!--答卷完成情况-->
        <div id="questionnaire-finish-performance">
          完成情况
        </div>
        <!--答者性别-->
        <div id="answer-sex-rate">
          答者性别
        </div>
      </aside>
      <!--中间的部分-->
      <div id="center">
        <!--中间部分的上方的map-->
        <div id="map">
          map of china
        </div>
        <!--中部的下方部分-->
        <div id="center-bottom">
          <!--答卷发布数量表-->
          <div id="questionnaire-publish-num">
            答卷发布数量表
          </div>
          <!--最近答者时间数量表-->
          <div id="resent-answer-time-count">
            最近答者时间数量表
          </div>
        </div>
      </div>
      <!--右边部分的侧边栏-->
      <aside id="side-right">
        <!--答者区域排名-->
        <div id="answer-counter-asc">
          答者区域排名
        </div>
        <!--答者年龄分布-->
        <div id="answer-age-distribution">
          答者年龄分布
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
//引入dark主题
import * as echarts from 'echarts';

export default {
  name: "DataLargeScreen",
  data(){
    return{
      fullScreen: true,
      //答者区域排名
      myData: [],
    }
  },
  methods:{
    showChart(chartDom,_option,_data,_title){
      let myChart = echarts.init(chartDom,'dark');
      let option = _option??{
        title:_title??{
          text: 'Referer of a Website',
          subtext: 'subtext',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: _data??[
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(252,243,243,0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
    run() {
      for (let i = 0; i < this.myData.length; ++i) {
        if (Math.random() > 0.9) {
          this.myData[i] += Math.round(Math.random() * 2000);
        } else {
          this.myData[i] += Math.round(Math.random() * 200);
        }
      }
      let myDynamicChart = echarts.init(document.querySelector('#answer-counter-asc'), 'dark');
      myDynamicChart.setOption({
        series: [
          {
            type: 'bar',
            data: this.myData
          }
        ]
      });
    }
  },
  beforeCreate() {

  },
  mounted() {
    //答者完成情况
    this.showChart(
        document.getElementById('questionnaire-finish-performance'),
        null,
        [
          { value: 0.1, name: '已完成' },
          { value: 0.5, name: '进行中' },
          { value: 0.4, name: '未开始' },
        ],
        {
          text: '答卷完成情况',
          subtext: '总量:1000',
          left: 'center'
        }
    );
    //答者性别
    this.showChart(
        document.getElementById('answer-sex-rate'),
        {
          title: {
            text: '答者性别',
            subtext: '2022-11-18',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: ['男', '女']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [0.44449,0.55551],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        },
        [
          { value: 0.1, name: '已完成' },
          { value: 0.5, name: '进行中' },
          { value: 0.4, name: '未开始' },
        ],
        {
          text: '答卷完成情况',
          subtext: '总量:1000',
          left: 'center'
        }
    );
    //问卷发布数量表
    this.showChart(
        document.getElementById('questionnaire-publish-num'),
        {
          title: {
            text: '答卷发布情况表',
            subtext: '2022-11-18',
            left: 'center'
          },
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
        },
        [
          { value: 0.1, name: '已完成' },
          { value: 0.5, name: '进行中' },
          { value: 0.4, name: '未开始' },
        ],
        {
          text: '答卷完成情况',
          subtext: '总量:1000',
          left: 'center'
        }
    );
    //最近答者答卷时间数量
    this.showChart(
        document.getElementById('resent-answer-time-count'),
        {
          title: {
            text: '最近答者答卷时间数量表',
            subtext: '2022-11-18',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          //图例的位置
          legend: {
            orient: 'horizontal',
            left: 'left',
            top: '50px'
          },
          grid: {
            top: '26%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5','6','7']
          },
          series: [
            {
              name: 'Direct',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series'
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: 'Mail Ad',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Affiliate Ad',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ad',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
              name: 'Search Engine',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
          ]
        },
        null,
        null
    );
    //年龄分布//雷达图
    this.showChart(
        document.getElementById('answer-age-distribution'),
        {
          title: {
            text: '答者年龄分布表'
          },
          legend: {
            top: '30px',
            data: ['Allocated Budget', 'Actual Spending']
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: 'Sales', max: 6500 },
              { name: 'Administration', max: 16000 },
              { name: 'Information Technology', max: 30000 },
              { name: 'Customer Support', max: 38000 },
              { name: 'Development', max: 52000 },
              { name: 'Marketing', max: 25000 }
            ],
            center: ['50%', '50%'],
            radius:'50%'
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: 'Allocated Budget'
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: 'Actual Spending'
                }
              ]
            }
          ]
        },
        [
          { value: 0.1, name: '已完成' },
          { value: 0.5, name: '进行中' },
          { value: 0.4, name: '未开始' },
        ],
        {
          text: '答卷完成情况',
          subtext: '总量:1000',
          left: 'center'
        }
    );
    //答者区域排名
    for (let i = 0; i < 5; ++i) {
      this.myData.push(Math.round(Math.random() * 200));
    }
    let option = {
      title: {
        text: '答者区域排名'
      },
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2 // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          name: '答者区域总数',
          type: 'bar',
          data: this.myData,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: true
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };
    this.showChart(
        document.getElementById('answer-counter-asc'),
        option,
        null,
        null
    );
    setTimeout( ()=>{
      this.run();
    }, 0);
    setInterval( ()=>{
      this.run();
    }, 3000);
    //中国地图
    /*引入中国的js*/
    /*这个是一个promise函数*/
    import('echarts/map/js/china').then(
        ()=>{
          this.showChart(
              document.getElementById('map'),
              {
                title: {
                  text: '答者地图'
                },
                tooltip: {
                  show: false
                },
                geo: {
                  map: "china",
                  roam: false,// 一定要关闭拖拽
                  zoom: 1.23,
                  center: [105, 36], // 调整地图位置
                  label: {
                    normal: {
                      show: true, //省份名展示
                      fontSize: "10",
                      color: "rgb(253,253,253)"
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      areaColor: "rgba(51,51,51,0.48)",
                      borderColor: "#0c0c0c",
                      borderWidth: 1, //设置外层边框
                      shadowBlur: 5,
                      shadowOffsetY: 8,
                      shadowOffsetX: 0,
                      // shadowColor: "#fcfcfc"
                    },
                    emphasis: {
                      areaColor: "rgba(51,51,51,0.48)",
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 5,
                      borderWidth: 0,
                      // shadowColor: "rgb(244,244,247)"
                    }
                  }
                },
                series: [
                  {
                    type: "map",
                    map: "china",
                    roam: false,
                    zoom: 1.23,
                    center: [105, 36],
                    // geoIndex: 1,
                    // aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                      normal: {
                        show: false
                      },
                      emphasis: {
                        show: false,
                        textStyle: {
                          color: "#fff"
                        }
                      }
                    },
                    itemStyle: {
                      normal: {
                        areaColor: "rgba(51,51,51,0.48)",
                        borderColor: "#389dff",
                        borderWidth: 0.5
                      },
                      emphasis: {
                        areaColor: "rgba(51,51,51,0.48)",
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 5,
                        borderWidth: 0,
                        shadowColor: "rgba(252,252,252,0.5)"
                      }
                    }
                  }
                ]
              },
              null,
              null,
          );
        }
    );

  }
}
</script>

<style scoped>
#largeDataScreen {
  position: fixed;
}
.normal{
  width: 90%;
  height: 98%;
  left: 5%;
  top: 1%;
}
.full-screen{
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
}
.el-icon-full-screen{
  font-size: 20px;
  color: red;
  position: absolute;
  right: 2px;
  top: 2px;
  z-index: 1;
}

.screen-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
/*数据大屏的样式*/
#side-left{
  position: absolute;
  left: 0;
  top: 0;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#questionnaire-finish-performance{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
}
#answer-sex-rate{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
}
#center{
  position: absolute;
  left: 25%;
  top: 0;
  width: 50%;
  height: 100%;
}
#map{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
}
#center-bottom{
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 50%;
}
#questionnaire-publish-num{
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
}
#resent-answer-time-count{
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
}
#side-right{
  position: absolute;
  right: 0;
  top: 0;
  width: 25%;
  height: 100%;
}
#answer-counter-asc{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50%;
}
#answer-age-distribution{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
}
</style>
