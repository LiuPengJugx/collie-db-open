<template>
  <div >
    <el-row type="flex" align="middle" justify="center" class="input-panel" >
        <el-col :span="4" :offset="2">
          <el-select v-model="selectedTable" @change="updateColumns" placeholder="请选择表">
            <el-option
              v-for="item in table_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-input style="width=100%" v-model="query" placeholder="请输入查询"></el-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-select
              v-model="indexList"
              multiple
              placeholder="请选择索引列">
              <el-option
                v-for="(item,index) in indexOptions"
                :key="'p'+index"
                :label="item"
                :value="item">
              </el-option>
          </el-select>
          <el-button type="info" @click="initIndex">索引构建</el-button>
        </el-col>
   
    </el-row>
     <el-row type="flex" align="middle" justify="center">
        <el-col :span="4" :offset="2">
          <el-button type="primary" @click="submit">获取</el-button>
        </el-col>
      </el-row>
     
    <div  class="result-panel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
          <el-table v-loading="listLoading" :data="tableData" height="600" border stripe>
            <el-table-column v-for="(col,index) in columns"
              :prop="col"
              :key="index"
              :label="col">
            </el-table-column>
          </el-table>
        </el-col>   
      </el-row>
    </div>
  </div>
</template>

<script>
import {fetchTableList,fetchTableColumns} from '@/api/learnedIndex'
import { Loading } from 'element-ui';
export default {
  data(){
    return{
      table_options:[
        {
          value:'customer',
          label:'customer'
        },
        {
          value:'lineitem',
          label:'lineitem'
        }
      ],
      selectedTable:'',
      tableData:[],
      columns:[],
      query:'SELECT * FROM "TPCD".customer',
      listLoading:false,
      indexOptions:[],
      indexList:[]
    }
  },
  methods:{

    submit(){
      let loadingInstance = Loading.service({ fullscreen: true });
      this.listLoading=true
      fetchTableList({tablename:this.selectedTable,query:this.query}).then(response=>{
        this.columns=response.data.columns
        this.tableData=response.data.tabledata
      })
      this.listLoading=false
      loadingInstance.close()
    },
    updateColumns(){
      fetchTableColumns(this.selectedTable).then(response=>{
        this.indexOptions=response.data.columns
      })
    }
    ,
    initIndex(){
      
      this.sleep(2000); // 延时函数，单位ms
      
      this.$message.success("索引构建完成")
    },
    sleep(time) {
      let startTime = new Date().getTime() + parseInt(time, 10);
      while(new Date().getTime() < startTime) {}
    }

    
    
  }
}
</script>

<style lang="scss" scoped>
.input-panel{
  height: 200px;
}
*{
  font-weight: bolder;
  font-size: 18px;
}
</style>>