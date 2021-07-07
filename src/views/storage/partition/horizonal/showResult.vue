<template>
  <div>
    <el-row type="flex" justify="center">
        <el-col :span="10">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="qdtree"
                    label="QD-tree-skipNumber"
                    >
                </el-table-column>
                <el-table-column
                    prop="sop"
                    label="SOP-skipNumber"
                    >
                </el-table-column>
                <el-table-column
                    prop="sopr"
                    
                    label="SOP-R-skipNumer">
                </el-table-column>
                </el-table>

        </el-col>
         
    </el-row>
    <el-row type="flex" justify="center">
        <div id="main" style="width: 1000px;height:800px;margin-top:20px"></div>
    </el-row>
  </div>
</template>

<script>
import {fetchQdPartitions,fetchSopPartitions} from '@/api/storageHZ'
export default {
    data(){
        return{
            tableData:[{
                qdtree:0,
                sop:0,
                sopr:0
            }]
        }
    },
    mounted(){
        this.getSkipNum()
        this.draw()
    },
    
    methods:{
        getSkipNum(){
            fetchQdPartitions().then(response=>{
                this.tableData[0].qdtree=response.data.skipNumber
                fetchSopPartitions("SOP").then(response=>{
                    this.tableData[0].sop=response.data.skipNumber
                })
                fetchSopPartitions("SOPR").then(response=>{
                    this.tableData[0].sopr=response.data.skipNumber
                })
            })
        },
        draw(){
            // 指定图表的配置项和数据
            var app = {};
            var chartDom = document.getElementById('main');
            this.$echarts.dispose(chartDom)
            var myChart = this.$echarts.init(chartDom);
            var option;

            var posList = [
                'left', 'right', 'top', 'bottom',
                'inside',
                'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
            ];

            app.configParameters = {
                rotate: {
                    min: -90,
                    max: 90
                },
                align: {
                    options: {
                        left: 'left',
                        center: 'center',
                        right: 'right'
                    }
                },
                verticalAlign: {
                    options: {
                        top: 'top',
                        middle: 'middle',
                        bottom: 'bottom'
                    }
                },
                position: {
                    options: posList.reduce(function (map, pos) {
                        map[pos] = pos;
                        return map;
                    }, {})
                },
                distance: {
                    min: 0,
                    max: 100
                }
            };

            app.config = {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                onChange: function () {
                    var labelOption = {
                        normal: {
                            rotate: app.config.rotate,
                            align: app.config.align,
                            verticalAlign: app.config.verticalAlign,
                            position: app.config.position,
                            distance: app.config.distance
                        }
                    };
                    myChart.setOption({
                        series: [{
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }]
                    });
                }
            };


            var labelOption = {
                show: true,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                    }
                }
            };

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['partition-1', 'partition-2', 'partition-3', 'partition-4','partition-5','partition-6','partition-7','partition-8','partition-9']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['QD-tree', 'SOP', 'SOP-R']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'partition-1',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1063,1347,1073]
                    },
                    {
                        name: 'partition-2',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1301,1039,1237]
                    },
                    {
                        name: 'partition-3',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1073,1284,1346]
                    },
                    {
                        name: 'partition-4',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1182,1296,1075]
                    },
                    {
                        name: 'partition-5',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1012,1002,1534]
                    },

                    {
                        name: 'partition-6',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1214,1050,1246]
                    },
                    {
                        name: 'partition-7',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [1155,1029,1275]
                    },
                    {
                        name: 'partition-8',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [2000,1079,1365]
                    },
                    {
                        name: 'partition-9',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [0,874,0]
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    }
}
</script>

<style lang="scss" scoped>
.el-table{
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
}
</style>