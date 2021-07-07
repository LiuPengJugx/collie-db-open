<template>
  <div>
    <el-row type="flex" align="bottom" justify="center" class="algo-configuration">
      <el-col :span="12" :offset="2">
        <el-card class="box-card">
          <div class="text item">
              <span>表名：</span>
              <el-tag type="info" v-for="tab in tabledata" :key="'t'+tab">{{tab}}</el-tag>
              <!-- <span>记录数：</span>
              <el-tag type="info" >{{tabledata.num}}</el-tag> -->
          </div>
          <div class="text item">
              <span>负载规模：</span>
              <el-tag type="info" >{{workloads.length}}</el-tag>
              
          </div>
          <div class="text item">
            <span>分区算法：</span>
            <el-tag style="margin-left:4px;margin-right:4px" v-for="item in methods" :key="'method'+item.key" type="warning" >{{item.label}}</el-tag>
            <br/>
            <span>成本模型：</span>
            <el-tag style="margin-left:2px" v-for="item in costModels" :key="'cost'+item.key" type="warning">{{item}}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" :offset="2">
         <el-button @click="getAnalysisResult" type="primary" round>分析</el-button>
      </el-col>
    </el-row>
    <!-- 展示页 -->
    <el-row   v-if="listVisable" class="result-page" >
      <el-col :span="12" :offset="0">
        <h2>分区结果</h2>
        <el-row type="flex" align="middle" > 
          <el-col :span="20" :offset="1">
            <el-row type="flex" justify="center">
              <el-col :span="4" :offset="1">
                <el-select @change="showPartitions"  v-model="selectedWorkload" placeholder="请选择负载">
                  <el-option
                    v-for="(item,index) in this.resData.result"
                    :key="'workload'+index"
                    :label="item.workload"
                    :value="index">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-select @change="showPartitions"  v-model="selectedMethod" placeholder="请选择算法">
                  <el-option
                    v-for="(item,index) in this.resData.methods"
                    :key="'method'+index"
                    :label="item"
                    :value="index">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">  
              <div id="parHist"></div>
            </el-row>
          </el-col>
        
        </el-row>
      </el-col>
      <el-col :span="12" :offset="0">
        <h2>性能分析</h2>
        <el-row type="flex" justify="center">
            <div id="hist"></div>
        </el-row> 
      </el-col>
        

      
      
    </el-row>
    

    <!-- <p>{{tabledata}}</p>
    <p>{{workload}}</p>
    <p>{{methods}}</p>
    <p>{{costModels}}</p> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {executeAnalysis} from '@/api/storageVp'
import { Loading } from 'element-ui';
export default {
  data() {
    return {
      selectedWorkload:0,
      selectedMethod:0,
      curPartitions:[],
      options:{
        fillOpacity:0.6,
        padding:2,
        axisXLabel:"string"
      },
      resData:'',
      listVisable:false
    }
  },
  computed:{
    ...mapGetters([
      'tabledata',
      'workloads',
      'methods',
      'costModels'
    ])
  },
  methods: {
    changePartition(){
      
    },

    getAnalysisResult(){
      let loadingInstance = Loading.service({ fullscreen: true });
      
      let methodIndexs=[]
      for(let method of this.methods){
        methodIndexs.push(method['key'])
      }
      this.listVisable=true
      executeAnalysis({tablename:this.tabledata.name,workloads:this.workloads,methods:methodIndexs,costModels:this.costModels}).then(response=>{
        
        this.resData=response.data
        this.showPartitions()
        this.draw()
        // this.curPartitions=response.data.result[0].partitions
        loadingInstance.close()
        
      })
      
    },
    // showPartitions(key){
    //   this.curPartitions=[]
    //   let index=this.result.keys.indexOf(key)
    //   this.result.partitions[index].map(arr=>{
    //     let par=[]
    //     for(let col of arr){
    //       console.log(col)
    //       par.push(this.tabledata.columns[col])
    //     }
    //     console.log(par)
    //     this.curPartitions.push(par)
    //   })
    // },
    showPartitions(){
      this.curPartitions=[]
      console.log(this.resData.result[this.selectedWorkload].partitions[this.selectedMethod])
      this.resData.result[this.selectedWorkload].partitions[this.selectedMethod].map((arr,i)=>{
        let par={name:'partition'+i,value:arr.length,children:[]}
        for(let col of arr){
          par.children.push({name:col,value:1})
        }
        this.curPartitions.push(par)
      })
      console.log(this.curPartitions)
      var chartDom = document.getElementById('parHist');
      this.$echarts.dispose(chartDom)
      var myChart = this.$echarts.init(chartDom);
      let option = {
        series: [{
            type: 'treemap',
            data: this.curPartitions
        }]
      };
      myChart.setOption(option)
    },
    draw(){
      var chartDom = document.getElementById('hist');
      this.$echarts.dispose(chartDom)
      var myChart = this.$echarts.init(chartDom);
      let methodNames=this.resData.result.keys
      let option = option = {
          // title: {
          //     text: '堆叠区域图'
          // },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              data:this.resData.methods
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  boundaryGap: false,
                  data: this.resData.result.map((item,i)=>{
                    return item['workload']
                  })
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: this.resData.methods.map((method,i)=>{
            let serie={
              name: method,
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: this.resData.result.map((item)=>{return item.costs[i]})
            }
            return serie
          })
      };
      console.log(option)
      myChart.setOption(option)
    }
  },
}
</script>

<style lang="scss" scoped>
  .result-page{
    h2{
      color:black;
      text-align:center;
      margin: 50px auto;
    }
    
  }
  .algo-configuration{
    span{
      margin: auto 8px;
    }
    div.item{
      margin: 10px auto;
    }
    // margin-left: 10px;
  }
  *{
    font-size: 20px;
    font-weight: bolder;
  }
  #hist{
    width: 100%;
    height: 500px;
  }
  #parHist{
    width: 100%;
    height: 500px;
  }
</style>