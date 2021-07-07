<template>
<div>
    <el-row type="flex" justify="center">
        <el-col :span="8" class="form-panel">
            <el-form :model="form" ref="form" label-width="150px"  :inline="false" size="normal">
                <el-form-item label="请输入属性A的上界:">
                    <el-input v-model="form.amin"></el-input>
                </el-form-item>
                <el-form-item label="请输入属性A的下界:">
                    <el-input v-model="form.amax"></el-input>
                </el-form-item>
                <el-form-item label="请输入属性B的上界:">
                    <el-input v-model="form.bmin"></el-input>
                </el-form-item>
                <el-form-item label="请输入属性B的上界:">
                    <el-input v-model="form.bmax"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="result-panel">
            <h2>Skip number : {{parResult.skipNum}}</h2>
    </el-row>
    <el-row type="flex" justify="center">
        <el-col :span="4">
            <el-table :data="parResult.tableData" border stripe>
                <el-table-column v-for="col in columns"
                    :prop="col.label"
                    :key="col.id"
                    :label="col.label"
                    >
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    
</div>
 
</template>

<script>
import {fetchSearchResult} from '@/api/storageHZ'
export default {
    data() {
        return {
            form:{
                amin:10,
                amax:30,
                bmin:40,
                bmax:60,
            },
            columns:[
                {
                    id:1,
                    label:'A'
                },
                {
                    id:2,
                    label:'B'
                },
            ],
            parResult:
                {
                    skipNum:0,
                    tableData:[
                        // {
                        //     A:1,
                        //     B:1
                        // }
                    ]
                }
            
            
        }
    },
    methods: {
        onSubmit(){
            fetchSearchResult(JSON.parse(JSON.stringify(this.form))).then(response=>{
                this.parResult.tableData=response.data.result.map(tuple=>{
                    let row={}
                    row['A']=tuple[0]
                    row['B']=tuple[1]
                    return row
                })
                this.parResult.skipNum=response.data.skip

            })
        }
    }
}
</script>

<style lang="scss" scoped>
.form-panel{
    // border:2px solid black;
    border-radius: 6px;
    padding: 20px 120px;
}
.el-row:nth-child(2){
    margin-top: 50px;
}
.el-row:nth-child(3){
     h2{
        color: rgb(148, 151, 151);
        margin-bottom: 20px;
        text-align: center;
    }
    margin-top: 50px;
}

</style>