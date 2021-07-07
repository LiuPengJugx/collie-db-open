<template>
    <div>     
       <el-row type="flex" justify="center">
            <el-col :span="5" :offset="2" class="form-panel" >
                <el-form :model="form" ref="form"  :inline="false" size="medium">
                    <el-form-item label="选择表">
                        <el-select v-model="form.table" placeholder="请选择">
                            <el-option
                            v-for="item in tableList"
                            :key="item"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择负载">
                        <el-select v-model="form.workload" placeholder="请选择">
                            <el-option
                            v-for="item in workloadList"
                            :key="item"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择算法"> 
                        <el-radio v-model="selectedMethod" label="SOP">SOP</el-radio>
                         <el-radio v-model="selectedMethod" label="QDTree">QDTree</el-radio>
                    </el-form-item>
                   <!-- <el-form-item>
                        <el-button type="info" @click="onSubmit">读取</el-button>
                    </el-form-item>
                    <el-form-item label="元组数">
                        <el-input v-model="form.tableSize"></el-input>
                    </el-form-item>
                    <el-form-item label="第一维度范围">
                        <el-input v-model="form.dimensionA[0]"></el-input>
                        <el-input v-model="form.dimensionA[1]"></el-input>
                    </el-form-item>
                    <el-form-item label="第二维度范围">
                        <el-input v-model="form.dimensionB[0]"></el-input>
                        <el-input v-model="form.dimensionB[1]"></el-input>
                    </el-form-item>-->
                    <el-form-item>
                        <el-button type="info" @click="onSubmit">确认生成</el-button>
                    </el-form-item>  
                 </el-form>
            </el-col>
            <el-col :span="8" :offset="0">
                <h2>原表:<span>{{form.table}}</span>   元组数:<span>{{skipNum}}</span></h2>
                <el-table :data="tableData" border stripe>
                    <el-table-column v-for="col in tupleColumns"
                        :prop="col"
                        :key="'tuple'+col"
                        :label="col"
                        >
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="4" :offset="2">
                <h2>负载展示:</h2>
                <el-table :data="workloadData" border stripe>
                    <el-table-column v-for="col in workloadColumns"
                        :prop="col"
                        :key="'sql'+col"
                        :label="col"
                        >
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row> 
        <el-row type="flex" justify="center" class="result-panel">
            
        </el-row>
    </div>

</template>

<script>
import {fetchTableData,fetchTableAndWorkloadData} from '@/api/storageHZ'
export default {
    data() {
        return {
            // form:{
            //     tableSize:1,
            //     dimensionA:[0,100],
            //     dimensionB:[0,100]
            // },
            selectedMethod:'',
            form:{
                table:'',
                workload:''
            },
            skipNum:0,
            tableWidth:4,
            tableList:[
                'test1.tbl','test5.tbl','test4.tbl','test3.tbl','test2.tbl'
            ],
            workloadList:['workload1.sql','workload2.sql','workload3.sql','workload4.sql'],
            tupleColumns:[],
            workloadColumns:['NO','SQLINFO'],
            // [1,2]  {'A':1,'B':2}
            tableData:[
                // {
                //     A:1,
                //     B:1
                // }
            ],
            workloadData:[
                // {
                //     A:1,
                //     B:1
                // }
            ]
        }
    },
    methods: {
        onSubmit(){
    // http://10.77.110.134:5000/aidb/storgae/horizontal/original
            if(this.selectedMethod=='QDTree'){
                fetchTableData().then(response=>{
                    this.tupleColumns=['A','B']
                    this.tableData=response.data.tuple.map(tuple=>{
                        let row={}
                        for(var i=0;i<this.tupleColumns.length;i++){
                            row[this.tupleColumns[i]]=tuple[i]
                        }
                        // row['A']=tuple[0]
                        // row['B']=tuple[1]
                        return row
                    })
                    this.workloadData=response.data.workload.map(sql=>{
                        let row={}
                        for(var i=0;i<this.workloadColumns.length;i++){
                            row[this.workloadColumns[i]]=sql[i]
                        }
                        return row
                    })
                    this.skipNum=response.data.tupleNumber
                    
                })
            }else{
                fetchTableAndWorkloadData().then(response=>{
                    this.tupleColumns=['event','category','publicher','revenue','discount','A','B']
                    this.tableData=response.data.tuple.map(tuple=>{
                        let row={}
                        for(var i=0;i<this.tupleColumns.length;i++){
                            row[this.tupleColumns[i]]=tuple[i]
                        }
                        return row
                    })
                    this.workloadData=response.data.workload.map(sql=>{
                        let row={}
                        for(var i=0;i<this.workloadColumns.length;i++){
                            row[this.workloadColumns[i]]=sql[i]
                        }
                        return row
                    })
                    this.skipNum=response.data.tupleNumber
                    this.tableWidth=8
                })
            }
            
            
        }
    }
}
</script>

<style lang="scss" scoped>

.form-panel{
    // border:2px solid black;
    border-radius: 6px;
    font-size: 100px;
    // padding: 20px 200px;
    .el-form-item{
        margin-top: 40px;
    }
}

.el-input{
    display: inline-block;
    // width: 45%;
    margin-left: 8px ;
}
.el-row:nth-child(2){
    margin-top: 50px;
}
.el-table{
    height: 700px;
}
.result-panel{
    text-align: center;
    span{
        margin: auto 5px;
        color: rgb(39, 114, 212);
    }
}
</style>