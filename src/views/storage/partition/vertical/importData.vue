<template>
<div class="main-panel">
<el-row type="flex" class="row-bg input-panel" justify="center" >
      <el-col :span="6" :offset="0">
        <span>表名：</span>
        <el-select v-model="listQuery.tabName" @change="initTableConfig" placeholder="请选择表">
          <el-option
            v-for="item in table_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="0">
        <span>数据量：</span>
        <el-input-number v-model="listQuery.rowNum" :min="1" :max="200" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="2" :offset="0">
        <el-button type="primary" @click="getTableData">获取</el-button>
      </el-col>
  
</el-row>
<div v-loading="listLoading" class="result-panel">
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="20">
      <el-table :row-class-name="tableRowClassName" :data="studentInfo" height="600" border stripe>
        <el-table-column v-for="col in columns"
          :prop="col.val"
          :key="col.id"
          :label="col.label">
        </el-table-column>
      </el-table>
    </el-col>   
  </el-row>
  <el-row type="flex" justify="center" >
    <!-- <el-col :span="24" :offset="0"> -->
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="listQuery.pageCount"
        :current-page.sync="listQuery.currentPage">
      </el-pagination>
    <!-- </el-col> -->
  </el-row>
  <el-row type="flex" justify="center" >
    <el-col :span="4" :offset="0">
      <el-button type="primary" size="default" @click="saveTableInfo">添加</el-button>
    </el-col>
    <el-col :span="4" :offset="2">
      <span style="margin-left:10px" type="info" v-for="tab in selectedTableList" :key="'t'+tab">{{tab}}</span>
    </el-col>
  </el-row>
</div>
</div>
</template>

<script>
import {fetchStudentList,fetchAllTables} from '@/api/storageVp'
export default {

  data() {
    return {
      table_options:[
        {
          value:'orders',
          label:'orders'
        },
        {
          value:'customer',
          label:'customer'
        },
        {
          value:'lineitem',
          label:'lineitem'
        }
      ],
      columns:[],
      studentInfo: [],
      listQuery:{
        tabName:'customer',
        rowNum:100,
        pageSize:8,
        pageCount:5,
        currentPage:1,
      },
      listLoading:false,
      selectedTableList:[]
      
    }
  },
  computed:{
    // pageCount(){
    //   return this.listQuery.rowNum/this.listQuery.pageSize
    // }
  },
  created() {
    console.log("importdata 没有被复用")
    this.table_options=[]
    fetchAllTables().then(res=>{
        
        for(var tab of res.data){
          let option={}
          option['value']=tab
          option['label']=tab
          this.table_options.push(option)
        }
        
    })
  },
  methods: {
      handleCurrentChange(val) {
        this.listQuery.currentPage=val
        this.getTableData()
      },
      saveTableInfo(){
        if(this.selectedTableList.indexOf(this.listQuery.tabName)==-1)
          this.selectedTableList.push(this.listQuery.tabName)
        this.$store.commit('SET_TABLE',this.selectedTableList)
      }
      ,
      async getTableData(){
        this.listLoading=true
        this.listQuery.pageCount=Math.ceil(this.listQuery.rowNum/this.listQuery.pageSize)
        // this.listQuery['pageCount']=this.listQuery['']
        // parameters={
        //   tabName:this.listQuery.tabName,
        //   limit:this.currentPage*this.listQuery.pageSize
        // }
        await fetchStudentList(this.listQuery).then(response=>{
          let data=response.data
          this.columns=data.columns.map((v,i)=>{
            return {
              id:i,
              val:v,
              label:v
            }
          })
          this.studentInfo=data.student_info.map(v=>{
            let tupleInfo={}
            for(let i=0;i<v.length;i++){
              tupleInfo[data.columns[i]]=v[i]
            }
            return tupleInfo
          })
          // 存到store中
          let columnNames=this.columns.map(item=>{
            return item.label
          })
          // this.$store.commit('SET_TABLE',{name:this.listQuery.tabName,num:this.listQuery.rowNum,columns:columnNames})
          this.listLoading=false
        })
        
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      initTableConfig(){
        this.listQuery.currentPage=1
      }
  }
}
</script>

<style lang="scss" scoped>
 .el-table .warning-row {
    background: rgb(125, 40, 133);
  }

  .el-table .success-row {
    background: #2184a1;
  }

*{
  font-size: 20px;
}
.input-panel{
  font-weight: bolder;
}
.result-panel{
  margin: 50px 0px;
}
.result-panel .row-bg{
  margin-bottom: 30px;
}
</style>