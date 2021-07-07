<template>
  <div>
      <el-row type="flex" justify="center">
        <el-col :span="6" :offset="0">
          <el-tabs  tab-position="left" :stretch="true">
            <el-tab-pane label="手动添加" >
              <el-form  :model="form" ref="form" label-width="120px" :inline="false" size="normal">
                <el-form-item label="表名">
                  <!-- <el-tag type="info">{{form.tablename}}</el-tag> -->
                  <el-select
                      v-model="form.tablename"
                      placeholder="请选择表"
                      @change="setColumnOption"
                      >
                      <el-option
                        v-for="item in tabledata"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="列名">
                  <el-select
                      v-model="form.value"
                      multiple
                      placeholder="请选择列名">
                      <el-option
                        v-for="item in columnsOption"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="频数">
                  <el-input-number v-model="form.freq" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="扫描键">
                    <el-select
                      v-model="form.scan_key"
                      multiple
                      placeholder="请选择扫描键">
                      <el-option
                        v-for="item in columnsOption"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="Selectivity">
                  <el-input v-model="form.selectivity"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="info" @click="onAddRow">添加数据</el-button>
                </el-form-item>
              </el-form>

            </el-tab-pane>
            <el-tab-pane label="文件导入">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="10" :offset="0">
                  <el-tag type="info">负载：{{form.tablename}}</el-tag>
                  <!-- <el-select size="medium"  v-model="selectedWorkloadName"  placeholder="文件" clearable filterable >
                    <el-option v-for="item in tabledata"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select> -->
                </el-col>
                <el-col :span="2" :offset="2">
                  <el-button type="info" size="default" @click="readData">读取</el-button>  
                </el-col>
              </el-row>  
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="14" :offset="1">
          <el-table
            :data="tableData"
            height="500">
              <el-table-column 
                 width="500"
                label="列名"
                >
                <template slot-scope="scope">
                  {{ scope.row.value }}
                </template>
              </el-table-column>
              <el-table-column
                label="频数"
                prop="freq"
                width="80"
                >
              </el-table-column>
              <el-table-column
                label="扫描键"
                width="300"
                >
                <template slot-scope="scope">
                  <el-tag size="medium">{{ scope.row.scan_key }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="Selectivity"
                prop="selectivity"
                >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, tableData)">删除</el-button>
                </template>
              </el-table-column>
            </el-table> 
            <el-row type="flex" justify="center" style="margin-top:20px">
              <el-col :span="4" >
                <el-button type="info" size="default" @click="submitData">保存负载</el-button>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <div class="block" >
              <div class="radio">
                排序：
                <el-radio-group v-model="reverse">
                  <el-radio :label="true">倒序</el-radio>
                  <el-radio :label="false">正序</el-radio>
                </el-radio-group>
              </div>
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  size="large"
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp">
                  {{activity.filename}}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-row>
        </el-col>  
      </el-row>
       
      <el-row type="flex" justify="center">
        <el-col :span="4" :offset="4">
          <el-button type="primary" size="default" @click="commitWorkload">提交</el-button>
        </el-col>
      </el-row>
      
      
  </div>
</template>

<script>
import {addWorkload,fetchTableColumns,fetchWorkload} from '@/api/storageVp'
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
        tableData: [],
        form:{
          tablename:'',
          value: '',
          freq: 1,
          scan_key: '',
          selectivity: 0.01,
        },
        columnsOption:[],
        // workloadFiles:['customer','lineitem','nation','orders','part','partsupp','region','supplier'],
        selectedWorkloadName:'',
        reverse: true,
        activities: []
      }
    },
    created(){
      console.log("workload 没有被复用")
      this.form.tablename=this.tabledata[0]
      this.setColumnOption()
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
      setColumnOption(){
        fetchTableColumns(this.form.tablename).then(response=>{
          this.columnsOption=response.data.columns.map((v,i)=>{
            // let column={}
            // column['label']=v
            return v
          })
        })
        this.form.scan_key=[]
        this.form.value=[]
      },
      // handleEdit(index, row) {
      //   console.log(index, row);
      // },
      handleDelete(index, rows) {
        // 删除表数据
        rows.splice(index,1)
      },
      onAddRow() {
        const formData = JSON.parse(JSON.stringify(this.form))
        this.tableData.push(formData)
      },
      readData(){
        // 将编号转化为列名
        fetchWorkload(this.form.tablename).then(response=>{
          this.tableData=response.data.map((row)=>{
            for(let k in row){
              if(k=='value'||k=='scan_key'){
                let newRow=row[k].map(vv=>{
                  if(vv>=0)return this.columnsOption[vv]
                })
                row[k]=newRow
              }
            }
            return row
          })
        })
      },
      submitData(){
        const tableDataCopy=JSON.parse(JSON.stringify(this.tableData))
        // 将列名转换成编号
        let updateTableData=tableDataCopy.map((row)=>{
          for(let k in row){
            if(k=='value'||k=='scan_key'){
              let newRow=[]
              // for(let i=0;i<row[k].length;i++){
              //   newRow.push(this.columnsOption.findIndex((n)=>n==row[k][i]))
              // }
              // row[k].foreach(function(v,i){
              //   newRow.push(this.columnsOption.findIndex(v))
              // })
              row[k].map(vv=>{
                return newRow.push(this.columnsOption.findIndex((n)=>n==vv))
              })
              row[k]=newRow
            }
          }
          return row
        })
// ,data:updateTableData
        let myDate=new Date()
        addWorkload({fname:this.form.tablename+myDate.getTime(),data:updateTableData}).then(response=>{
          this.activities.push({
            filename: response.data.filename,
            timestamp: myDate.toLocaleTimeString()
          })
          this.$message({
            message: response.data.msg,
            type: 'success'
          });
        })
      },
      commitWorkload(){
          let fileList=[]
          for(let activity of this.activities){
            fileList.push(activity['filename'])
          }
          this.$store.commit("SET_WORKLOAD",fileList)
          this.$message({
            message:'提交成功',
            type: 'success'
          });
          this.activities=[]
      }
    }

}
</script>

<style lang="scss" scoped>
*{
  font-size: 18px;
}
.block{
  margin-top: 20px;
}
.el-form{
  margin-left: 20px;
}
.el-tabs{
  height:500px;
  // width:50%;
  margin-bottom: 40px;
}


</style>

<style lang="scss">
.el-tabs__nav-scroll .el-tabs__item{
  font-weight: bolder !important;
  font-size: 18px;
}
</style>