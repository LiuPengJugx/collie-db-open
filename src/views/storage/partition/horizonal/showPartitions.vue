<template>
  <div>
       <el-row type="flex" justify="center" class="main-panel">
            <el-col :span="6" :offset="1">
                <img :src="VUE_APP_VP_BASE_URL+'/dist/horizontional/qdtree.png'" alt="QD-tree" width="400" >
                
            </el-col>
            <el-col :span="6" :offset="1">
                <img :src="VUE_APP_VP_BASE_URL+'/dist/horizontional/sop.png'" alt="SOP" width="400" >
                
            </el-col>
            <el-col :span="6" :offset="1">
                <img :src="VUE_APP_VP_BASE_URL+'/dist/horizontional/sopr.png'" alt="SOP-R" width="400" >
                
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="8" :offset="0">
                <input @click="onSubmit('QDtree')" class="btn" type="submit" value="执行QD-tree算法"  name="btn1" id="btn_1"  />
            </el-col>   
            <el-col :span="7" :offset="0">
                <input @click="onSubmit('SOP')" class="btn" type="submit" value="执行SOP算法"  name="btn1" id="btn_2"  />
            </el-col>  
            <el-col :span="8" :offset="0">
                <input @click="onSubmit('SOPR')" class="btn" type="submit" value="执行SOP-R算法"  name="btn1" id="btn_3"  />
            </el-col>  
        </el-row>  
        <el-row type="flex" justify="center" class="result-panel">
        <el-col :span="parWidth" :offset="1" v-for="(item,i) in parResult" :key="'table'+item.id">
            <h2 v-if="selectedMethod=='QD-tree'">Partition {{item.id}} <br/>[{{item.dimensionRange[0][0]}},{{item.dimensionRange[0][1]}}) [{{item.dimensionRange[1][0]}},{{item.dimensionRange[1][1]}})</h2>
            <h2 v-else>Partition {{item.id}} <br/>{{item.dimensionRange}}</h2>
            <el-table :data="item.tableData" border stripe>
                <el-table-column v-for="col in columns"
                    :prop="col"
                    :key="i+col"
                    :label="col"
                    >
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>  
  </div>
</template>

<script>
import {fetchQdPartitions,fetchSopPartitions} from '@/api/storageHZ'
export default {
    data(){
        return{
            columns:[],
            parWidth:2,
            parResult:[],
            selectedMethod:''
        }
    },
    computed:{
        VUE_APP_VP_BASE_URL(){
            return process.env.VUE_APP_VP_BASE_URL
        }
    },
    methods:{
        onSubmit(method){
            this.selectedMethod=method
            if(method=='QDtree'){
                fetchQdPartitions().then(response=>{
                    this.parResult=[]
                    this.columns=['A','B']
                    let partitionData=response.data.partitionData.map(partition=>{
                        let myPartition=partition.map(tuple=>{
                            let row={}
                            for(var i=0;i<this.columns.length;i++){
                                row[this.columns[i]]=tuple[i]
                            }
                            return row
                        })
                        return myPartition
                    })
                    let metadata=response.data.metadata
                    console.log(metadata)
                    for(var i=0;i<partitionData.length;i++){
                        this.parResult.push({
                            id:i,
                            dimensionRange:metadata[i],
                            tableData:partitionData[i]
                        })
                    }
                    this.parWidth=2
                })
            }else if(method=='SOP' || method=='SOPR'){
                fetchSopPartitions(method).then(response=>{
                    this.parResult=[]
                    this.columns=['event','category','publicher','revenue','discount','A','B']
                    let partitionData=response.data.partitionData.map(partition=>{
                        let myPartition=partition.map(tuple=>{
                            let row={}
                            for(var i=0;i<this.columns.length;i++){
                                row[this.columns[i]]=tuple[i]
                            }
                            return row
                        })
                        return myPartition
                    })
                    let metadata=response.data.metadata
                    console.log(metadata)
                    for(var i=0;i<partitionData.length;i++){
                        this.parResult.push({
                            id:i,
                            dimensionRange:metadata[i],
                            tableData:partitionData[i]
                        })
                    }
                    this.parWidth=4
                })
            }
            
        },
    }
}
</script>

<style scoped>
.btn {
	margin-top: 7%;
	margin-left: 40%;
	height: 40px;
	width: 200px;
	font-size: 18px;
	line-height: 5%;
	background: #546262;
	color: #fff;
	text-align: center;
	cursor: pointer;
	float:left;
}
.main-panel{
    text-align: center;
}
</style>