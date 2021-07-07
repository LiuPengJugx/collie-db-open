<template>
<div class="container-fluid main">
    <div class="row">
        <div class="col-md-9">
            <div class="row" style="margin-top: 30px">
                <div class="col-md-1"></div>
                <div class="col-md-1">
                    <ul class="nav nav-pills nav-stacked">
                        <li @click="drawSURF" role="presentation" v-bind:class="{active:panel=='SURF'}"><a href="#">算法示例</a></li>
                        <li @click="drawRangeQuery" role="presentation" v-bind:class="{active:panel=='range'}"><a href="#">范围查询</a></li>
                        <li @click="drawPointQuery" role="presentation" v-bind:class="{active:panel=='point'}"><a href="#">点查询对比</a></li>
                    </ul>
                </div>
                <div class="col-md-10">
                    <div v-if="panel=='SURF'"><iframe  frameborder="no" :src="SuRFurl"></iframe></div>
                    <div v-else id="hist"></div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <h3><span class="glyphicon glyphicon-list" aria-hidden="true"></span> 数据选择</h3>
            <div class="row" style="margin-top: 30px">
                <div class="col-md-6">
                    <div class="input-group" style="margin-bottom: 5px">
                        <span class="input-group-addon" id="basic-addon10">测试数据表</span>
                        <div class="btn-group">
                            <el-select v-model="selectedTable" placeholder="请选择" @change="changeTable">
                                <el-option
                                v-for="(v,k,index) in tableList"
                                :key="'t'+index"
                                :label="k"
                                :value="k">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group" style="margin-bottom: 5px">
                        <span class="input-group-addon" id="basic-addon11">测试数据列</span>
                        <div class="btn-group">
                            <div class="btn-group">
                            <el-select v-model="selectedColumn" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in tableList[selectedTable]"
                                :key="'t'+index"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

                <div v-if="selectedTable=='supplier'"  id="supplier">
                    <div class="table-responsive table-hover">
                        <table class="table">
                            <caption>共10,000条记录</caption>
                            <thead>
                            <tr>
                                <th>1</th><th>2</th><th>3</th>
                                <th>4</th><th>5</th><th>6</th><th>7</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td><td>Supplier#000000001</td>
                                <td> N kD4on9OM Ipw3,gf0JBoQDd7tgrzrddZ</td>
                                <td>17</td><td style=" white-space:nowrap">27-918-335-1736</td><td>5755.94</td>
                                <td style=" white-space:nowrap">each slyly above the careful</td>
                            </tr>
                            <tr>
                                <td>2</td><td>Supplier#000000002</td>
                                <td>89eJ5ksX3ImxJQBvxObC,</td>
                                <td>5</td><td>15-679-861-2259</td><td>4032.68</td><td> slyly bold instructions. idle dependen</td>
                            </tr>
                            <tr>
                                <td>3</td><td>Supplier#000000003</td>
                                <td>q1,G3Pj6OjIuUYfUoH18BFTKP5aU9bEV3</td>
                                <td>1</td><td>11-383-516-1199</td><td>4192.40</td>
                                <td style=" white-space:nowrap">blithely silent requests after the express dependencies are sl</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div v-else-if="selectedTable=='partsupp'" class="tab-pane" id="partsupp">
                    <div class="table-responsive table-hover">
                        <table class="table">
                            <caption>共800,000条记录</caption>
                            <thead>
                            <tr>
                                <th>1</th><th>2</th><th>3</th>
                                <th>4</th><th>5</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td><td>2</td><td>3325</td><td>771.64</td>
                                <td style=" white-space:nowrap">even theodolites. regular, final theodolites eat after the carefully pending foxes. furiously regular deposits sleep slyly. carefully bold realms above the ironic dependencies haggle careful</td>
                            </tr>
                            <tr>
                                <td>1</td><td>2502</td><td>8076</td><td>993.49</td>
                                <td>ven ideas. quickly even packages print. pending multipliers must have to are fluff</td>
                            </tr>
                            <tr>
                                <td>1</td><td>5002</td><td>3956</td><td>337.09</td>
                                <td>after the fluffily ironic deposits? blithely special dependencies integrate furiously even excuses. blithely silent theodolites could have to haggle pending, express requests; fu</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            <div class = "col-md-offset-4 col-lg-offset-4col-xl-offset-4">
                <button @click="onSubmit" type="button" class="btn-primary m-auto" style="padding: 5px;margin:10px">
                    <span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span>点查询对比
                </button>
            </div>
            

        </div>

      <!-- <el-row type="flex" justify="center" align="middle">
          <el-col :span="4" :offset="0">
              <el-form :model="form" ref="form" :rules="rules" label-width="150px" :inline="false" size="normal">
                <el-form-item label="选择表">
                    <el-select v-model="form.table" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in tables"
                            :key="item"
                            :label="item"
                            :value="index+1">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="选择列">
                    <el-select v-model="form.column" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in columns"
                            :key="item"
                            :label="item"
                            :value="index+1">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
          </el-col>
      </el-row> -->
        </div>
</div>
</template>

<script>
import {pointQueryTest,rangeQueryTest} from '@/api/storageCompress'
export default {
  data() {
        return {
            form:{
                table:'',
                column:'',
            },
            tableList:{supplier:[0,1,2,3,4],partsupp:[0,1,2,3,4,5,6]},
            selectedTable:'supplier',
            selectedColumn:4,
            pointResult:{
                Memory:[],
                fpr:[],
                QPS:[],
                r_fpr:[],
                r_QPS:[]
            },
            SuRFurl:'https://www.rangefilter.io/',
            panel:'SURF'
            // columns:['第1列','第2列','第3列','第4列','第5列'],
        }
    },
    methods: {
        onSubmit(){
            this.panel='point'
            pointQueryTest({table:this.selectedTable=='supplier'?1:2,column:this.selectedColumn}).then(res=>{
                this.pointResult.Memory=res.data.Memory
                this.pointResult.fpr=res.data.fpr
                this.pointResult.QPS=res.data.QPS
                this.pointResult.r_fpr=res.data.r_fpr
                this.pointResult.r_QPS=res.data.r_QPS
                this.drawPointQuery()
            })
            
        },
        changeTable(tab){
            this.selectedColumn=this.tableList[tab][0]
        },
        drawSURF(){
            this.panel='SURF'
        },
        sleep(time) {
            let startTime = new Date().getTime() + parseInt(time, 10);
            while(new Date().getTime() < startTime) {}
        },
        drawRangeQuery(){
            this.panel='range'
            rangeQueryTest().then(res=>{
                this.pointResult.Memory=res.data.Memory
                this.pointResult.fpr=res.data.fpr
                this.pointResult.QPS=res.data.QPS
                this.pointResult.r_fpr=res.data.r_fpr
                this.pointResult.r_QPS=res.data.r_QPS

                var chartDom = document.getElementById('hist');
                this.$echarts.dispose(chartDom)
                var myChart = this.$echarts.init(chartDom);
                var colors = ['#5470C6', '#2E8B57', '#DAA520'];
                var option = {
                    title: {
                        text: '范围查询效果对比',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['存储占用', '查询处理速度']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Bloom', 'SuRFHash', 'SuRFReal']
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '存储占用',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisLabel: {
                                formatter: '{value} MB'
                            }
                        },
                        {
                            type: 'value',
                            name: '速度',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            
                            axisLabel: {
                                formatter: '{value}Mops/sec'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '存储占用',
                            type: 'line',
                            data: this.pointResult.Memory,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '查询处理速度',
                            type: 'line',
                            yAxisIndex: 1,
                            data: this.pointResult.r_QPS,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    
                                ]
                            }
                        }
                    ]
                };
                myChart.setOption(option)
            })

            
        },
        drawPointQuery(){
            
            var chartDom = document.getElementById('hist');
            this.$echarts.dispose(chartDom)
            var myChart = this.$echarts.init(chartDom);
            var colors = ['#5470C6', '#2E8B57', '#DAA520'];
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['存储占用', '假阳性率', '速度Mops/sec']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['布隆过滤器', 'SuRFHash', 'SuRFReal'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '存储占用',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} MB'
                        }
                    },
                    {
                        type: 'value',
                        name: 'FPR e-3',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '速度',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        offset: 40,
                        axisLabel: {
                            formatter: '{value}Mops/sec'
                        }
                    }
                ],
                series: [
                    {
                        name: '存储占用',
                        type: 'bar',
                        data: this.pointResult.Memory,
                        offset: 50,
                    },
                    {
                        name: '假阳性率',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: this.pointResult.fpr
                    },
                    {
                        name: '速度Mops/sec',
                        type: 'bar',
                        yAxisIndex: 2,
                        data: this.pointResult.QPS
                    }
                ]
            };
            myChart.setOption(option)
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css';
// .el-form{
//   margin-top: 20%;
// }
#hist{
    // width: 870px;
    width: 95%;
    height: 800px;
}
iframe{
    width: 100%;
    height: 800px;
}

body {
    background-color: #efefef;
}

.main {
    background-color: white;
    margin: 30px;
}

.side {
    margin: 5px 0;
}

.top-header {
    padding-left: 20px;
}

.community-tag:hover {
    background-color: #339dff;
    color: #fff !important;
    text-decoration-line: none;
}

.community-tag {
    text-decoration-line: none;
    cursor: pointer;
    display: inline-block;
    height: 20px;
    line-height: 16px;
    padding: 2px 5px;
    background-color: #99cfff;
    font-size: 12px;
    color: #fff !important;
    border-radius: 4px;
    margin: 4px;
}

.btn-publish {
    float: right;
    margin-bottom: 15px;
}

.media-object {
    width: 38px;
    height: 38px;
}

.media-body {
    padding-top: 10px;
}

.text-desc {
    font-size: 12px;
    font-weight: normal;
    color: #999;
}

.profile .section {
    margin-top: 15px;
}

.question-title {
    margin-top: 25px;
}

.question-tag {
    margin-right: 5px;
}

.question-related {
    line-height: 20px;
    font-size: 12px;
    margin-left: 0;
    list-style: none;
    padding-left: 0;
}

.question-wechat {
    width: 95%;
}

.publish-tag-tab {
    display: none;
    margin-top: 10px;
    padding-top: 10px;
}

.publish-tag-tab .label-info {
    white-space: normal;
    margin: 5px 5px;
    display: inline-block;
}

.community-menu {
    color: #999;
    font-size: 13px;
    margin-bottom: 15px;
}

.jumbotron {
    margin: 50px;
}

.comment {
    margin: 10px 0;
}

.btn-comment {
    float: right;
    margin: 10px;
}

.comments {
    padding-bottom: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.sub-comments {
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid #eee;
    padding-top: 15px;
    margin-bottom: 15px;
}

.sub-comments .btn {
    margin: 10px 0;
}

.comment-sp {
    margin-top: 0;
}

.menu {
    color: #999;
    margin-top: 5px;
}

.menu .icon {
    margin-right: 6px;
    font-size: 15px;
    cursor: pointer;
}

.menu .comment-icon {
    font-size: 15px;
    cursor: pointer;
}

.menu .comment-icon :hover {
    color: #499ef3;
}

.menu .active {
    color: #499ef3;
}

.menu .icon:hover {
    color: #499ef3;
}

.footer {
    text-align: center;
    font-size: 12px;
    color: #666;;
    padding: 0 0 15px 0;
}

.red {
    color: red !important;
}
</style>