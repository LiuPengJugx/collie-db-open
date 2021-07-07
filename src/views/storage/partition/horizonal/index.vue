<template>
  <div>
      <el-row type="flex" align="bottom" class="fixed-header" justify="center">
        <el-col :span="7" :offset="2">
          <h2>水平分区</h2>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-button @click="lastPage" v-bind:class="{btnNone:currentTab==0}" type="info" size="default" >上一步</el-button>   
          <span>{{currentTab+1}}/{{this.tabs.length}}</span>
          <el-button @click="nextPage" v-if="currentTab<2" type="info" size="default" >下一步</el-button>   
        </el-col>
        <el-col :span="7" :offset="0">
          <span v-for="(item,index) in tabs" :key="'tab'+index" v-bind:class="{active:currentTab==index}" >
            {{item.label}}
            <template v-if="index!=2">
              ——
            </template>
          </span>
        </el-col>
      </el-row>
      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <router-view></router-view>
  </div>
</template>

<script>
import FixedPanel from '../vertical/components/FixedPanel'
export default {
  components:{FixedPanel},
  data() {
    return {
      currentTab:0,
      tabs:[
        {
          url:'/getData',
          label:'获取原表数据'
        },
        {
          url:'/showPartitions',
          label:'分区展示'
        },
        {
          url:'/showResult',
          label:'分区算法对比'
        }
      ],
      basePath:"/storage/partition/horizonal"
    }
  },
  created() {
    console.log("horziontal created!");
    this.$router.push({path:this.basePath+this.tabs[0].url})
  },
  methods: {
    lastPage(){
      this.currentTab--
      this.$router.push({path:this.basePath+this.tabs[this.currentTab].url})
    },
    nextPage(){
      this.currentTab++
      this.$router.push({path:this.basePath+this.tabs[this.currentTab].url})
    }
  },
}
</script>

<style lang="scss" scoped>
.fixed-header{
  height: 100px;
  h2{
    font-size: 30px;
    // line-height: 80px;
  }
  .el-col span{
    font-size: 20px;
    font-weight: bold;
  }
  span.active{
    color:red;
  }
  .btnNone{
    visibility: hidden;
  } 
  .el-col:nth-child(2) span{
    margin: 0 25px;
  } 
}
</style>