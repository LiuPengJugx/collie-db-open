<template>
  <div>
    <el-row  type="flex" justify="center" class="input-panel" align="middle">
      <el-col :span="6">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="最大索引数">
            <el-input v-model="form.maxIndexCount"></el-input>
          </el-form-item>
          <el-form-item label="查询分布">
            <el-input type="textarea" :rows="2" v-model="form.queryDistribution"></el-input>
          </el-form-item>  
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="loading" type="flex" justify="center"  align="middle" class="result-panel">
        <el-col :span="6" :offset="0">
            <div class="title">
                <span>索引推荐</span><br/>
            </div>
            
            <div class="content">
                <el-tag v-for="(item,index) in recommandedIndex" :key="'tag'+index" :type="colorOption[index%4]">{{item}}</el-tag>
            </div>
            
        </el-col>
    </el-row>
  </div>
  
</template>

<script>
import {fetchIndexRecommand} from '@/api/learnedIndex'
import { Loading } from 'element-ui';
export default {
  data(){
    return {
      form:{
        maxIndexCount:8,
        queryDistribution:'247, 32, 868, 107, 632, 149, 48, 265, 509, 774, 674, 925, 152, 552'
      },
      recommandedIndex:[],
      loading:false,
      colorOption:['success','info','warning','danger']
    }
  },
  methods:{
    onSubmit(){
      let loadingInstance =Loading.service({ fullscreen: true })
      fetchIndexRecommand(this.form).then(response=>{
        this.recommandedIndex=response.data
        this.sleep(3000)
        loadingInstance.close()
        this.loading=true
        this.$message.success("分析完成")
      })
    },
    sleep(time) {
      let startTime = new Date().getTime() + parseInt(time, 10);
      while(new Date().getTime() < startTime) {}
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  font-weight: bolder;
  font-size: 18px;
}
  .input-panel{
    height: 200px;
    margin-top: 40px;
    .el-form-item__label{
      font-size: 28px;
    }
  }
  .result-panel{
    .title{
      text-align: center;
      margin: 10px auto;
      span{
        color: black;
        font-size: 20px;
        font-weight: bolder;
      }
    } 
    .content{
      text-align: center;
    }
    .el-tag{
      display: block;
      width: 100%;
      // font-size: 10px;
      padding: 4px 3px;
    }
  }
</style>
