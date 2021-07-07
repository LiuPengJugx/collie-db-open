<template>
  <div class="dashboard-container" >

    <!-- <el-row >
      <el-carousel height="350px" type="card">
        <el-carousel-item v-for="item in 6" :key="item">
        </el-carousel-item>
      </el-carousel>
    </el-row> -->
    <div id="cover" :style="{'background-image':'url('+VUE_APP_VP_BASE_URL+'/dist/main-cover.jpg)'}">
      <div class="wrap">
        <h3>The <strong>Intelligent</strong> <br/> Database <br/>Management System</h3>
      </div>
    </div>
    <el-row class="content-container feild-content">
      <!-- <h1>研究领域</h1> -->
      <el-col  :span="item.span" :offset="1" :style="'background-image:url('+(VUE_APP_VP_BASE_URL)+'/dist/back/rh02-panel'+(index+1)+'.jpg;height:500px'"  v-for="(item,index) in tooltip" :key="index" class="split-title" >
          <h3>{{item.mainTitle}}</h3>
          <h2>{{item.subTitle}}</h2>
          <h4>{{item.speciality}}</h4>
          <p v-for="text in item.introductions" :key="text">{{text}}</p>
          <el-button  class="button" size="medium">查看详情</el-button>
      </el-col>
    </el-row>
    <el-row class="content-container card-content" type="flex" justify="space-around">
      <el-col class="news-card" :span="5" :offset="0"  v-for="(item,index) in news" :key="'new'+index">
          <!-- <div style="padding:250px auto;"> -->
            <i v-bind:class="item.icon"></i>
            <h3>{{item.title}}</h3>
            <p>{{item.content}}</p>
            
          <!-- </div> -->
      </el-col>
    </el-row>
    <el-row class="bottom-page">
      <el-row type="flex" justify="center">
        <el-col :span="8" :offset="0">
          <h2>关于实验室</h2>
          <h3>教师</h3>
          <h3>学生</h3>
        </el-col>
        <el-col :span="8" :offset="0">
          <h2>关于产品</h2>
          <h3>数据压缩</h3>
          <h3>智能分区</h3>
        </el-col>
        <el-col :span="8" :offset="0">
          <h2>技术支持</h2>
          <h3>Tel:18612138702</h3>
          <h3>Email:licuiping@ruc.edu.cn</h3>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
          <span>@2021 DWBI</span>
          <span>Privacy/Do Not Sell My Info</span>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      tooltip:[
        {
        mainTitle:'数据库存储',
        subTitle:'压缩/布局',
        url:'http://sem.guanyiyun.com/wp-content/uploads/2019/10/wmsa1.jpg',
        speciality:'Highly Automated and Secure',
        // introductions:['让你的数据库存储结构向水一样流动变化','让数据库做在线分区','根据预测负载和配置信息将每一个元组精确分配到最合适的块'],
        introductions:[],
        span:12
        },
       
        {
        mainTitle:'数据库查询',
        subTitle:'查询优化',
        url:'http://sem.guanyiyun.com/wp-content/uploads/2019/10/wmsa3.jpg',
        speciality:'Highly Automated and Secure',
        // introductions:['索引推荐','学习型索引'],
        introductions:[],
        span:9
        },
        {
        mainTitle:'学习型索引',
        subTitle:'索引推荐',
        url:'http://sem.guanyiyun.com/wp-content/uploads/2019/10/wmsa6.jpg',
        speciality:'Highly Automated and Secure',
        introductions:[],
        span:9
        },
         {
        mainTitle:'数据库配置',
        subTitle:'参数调优',
        url:'http://sem.guanyiyun.com/wp-content/uploads/2019/10/wmsa2.jpg',
        speciality:'Highly Automated and Secure',
        // introductions:['OtterTune'],
        introductions:[],
        span:12
        },
      ],
      'news':[
        {
          title:'In-Memory',
          content:'Fast execution using an architecture designed for DRAM/NVM data storage.',
          icon:'el-icon-s-management'
        },
        {
          title:'Hybrid',
          content:'Execute OLAP workloads while simultaneously executing OLTP transactions that update the database.',
          icon:'el-icon-s-operation'
        },
        {
          title:'Autonomous',
          content:'Automatically optimize and tune the database without any human intervention.',
          icon:'el-icon-s-opportunity'
        },
        {
          title:'Open Source',
          content:'Apache Software Licensed. All code is available on Github.',
          icon:'el-icon-data-analysis'
        },
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    VUE_APP_VP_BASE_URL(){
        return process.env.VUE_APP_VP_BASE_URL
    }
  },
  mounted(){
    
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
// $baseurl: 'http://10.77.110.152:5000/static/dist/main-cover.jpg'!default;
// $baseurl: var(--image);
#cover{
  width: 100%;
  // background-image: url(#{var(--image)});
  height: 1152px;
  padding: 0;
  div.wrap{
    margin: 0;
    height: 100%;
    // background-color: #000000;
    // opacity: 0.6;
    background: rgba(0,0,0,0.5);
    padding-top: 10%;
    padding-left: 15%;
  }
  // display: table;
  text-align: left;
  h3{
    color: white;
    // margin: 150px auto;
    font-size: 1000%;
    font-weight:360;
    line-height: 96%;
    position: relative;
    font-family: "Source Sans Pro", sans-serif;
  }
}

.dashboard {
  &-container {
    // background-image: url(var(--color)+"/ruc_bg_2.jpg");
    // margin: 30px;
  }
  &-text {
    font-size: 25px;
    line-height: 46px;
  }
}
.el-carousel{
  margin:30px 10px 0px 10px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.split-title{
  font-size: 25px;
  p{
    font-size: 20px;
  }
  // font-weight: bold;
  color: #ffffff;
  padding: 150px 50px;
}
// .split-content{
//   // margin: 200px 0;
//   padding: 100px 100px;
//   button{
//     font-size: 20px;
//   }
//   h2{
//     color: #606266;
//   }
// }

// height:600px


.board-card .image{
    width: 100%;
    display: block;
}
.content-container{
  margin: 20px auto;
  
  h1{
    font-size: 35px;
    text-align: center;
    margin: 40px auto;
  }
}
.feild-content{
  // font-weight: bolder;
  h2{
    font-weight: bolder;
  }
  .el-button{
    font-weight: bolder;
    margin-top: 30px;
    font-size: 17px;
  }
}
.card-content{
  background-color: #d3dce6;
  text-align: center;
  h3{
    font-size: 50px;
    // line-height: 32px;
    font-family: Lato;
    font-weight: 700;
  }
  p{
    color: #676767;
    font-size: 30px;
  }
  i{
    color:#858080;
    font-size: 100px;
  }
}

.news-card{
  // padding:250px auto;
  padding: 80px 10px;
}
.bottom-page{
  width: 100%;
  height: 250px;
  background-color: #312d2a;
  text-align: center;
  
  h2{
    font-size: 26px;
    color: #9a9896;
    font-weight: bolder;
  }
  h3{
    font-size: 22px;
    margin-top: 10px;
    color:#ddd8d8
  }
  span{
    font-size: 18px;
    color: #e5e2e2;
    margin: 0 20px;
  }
  .el-row:nth-child(1){
    margin: 50px auto;
  }

}
</style>
