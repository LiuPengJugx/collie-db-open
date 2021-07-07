<template>
<div>
         <el-row class="inner-header" type="flex" justify="space-between"  align="bottom">
            <el-col :span="4" :offset="1">
                <Progress :text-inside="true" :percent="percentage" :stroke-width="30" :stroke-color="['#108ee9', '#87d068']" />
                <!-- <el-progress :text-inside="true" :width="120" :stroke-width="30" :percentage="percentage" status="success"></el-progress> -->
                <!-- <el-progress :stroke-width="10" :width="120" type="circle" :percentage="percentage"></el-progress>   -->
                <!-- <span style="font-size:20px;margin:auto 20px;">步骤{{(Number(this.activeIndex)+1)}}/{{this.activePage.length}}</span> -->
            </el-col>
            <!-- <el-col :span="4" :offset="4">
                <el-button type="primary" size="default">上一步</el-button>
                
                <el-button type="primary" size="default">下一步</el-button>
            </el-col> -->
            <el-col :span="8" :offset="0">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" 
                background-color="#ffffff"
                text-color="#000000"
                active-text-color="#37D7DF" 
                @select="handleSelect">
                <el-menu-item v-for="(page,idx) in activePage" :index="idx.toString()" :key="page.path"> <i :class="page.icon"></i><span>{{page.name}}</span></el-menu-item>
                </el-menu>
                <div class="line"></div>
            </el-col>
        </el-row>
        <el-row type="flex">
            <!-- <el-divider><i class="el-icon-edit"></i></el-divider> -->
        </el-row>
        <!-- <fixed-menu /> -->
    <el-row type="flex" justify="center">
        <!-- <app-main /> -->
        <fixed-panel />
    </el-row>
</div>
</template>

<script>
import FixedPanel from './components/FixedPanel'
export default {
    components:{FixedPanel},
    data() {
        return {
            activeIndex:'0',
            basePath:"/storage/partition/vertical",
            activePage:[
                {name:'添加表数据',path:'/importData',icon:'el-icon-edit'},
                {name:'添加查询负载',path:'/importWorkload',icon:'el-icon-upload'},
                {name:'选择分区算法',path:'/selectMethod',icon:'el-icon-connection'},
                {name:'执行分析',path:'/executeAnalysis',icon:'el-icon-s-data'}
                ],
            percentage:0
        }
    },
    created() {
        console.log("vetical was created!")
        this.percentage=100/(this.activePage.length)
        this.$router.push({path:this.basePath+this.activePage[0]['path']})



    },
    computed: {
    },
    methods: {
        handleSelect(key,keyPath){
            this.activeIndex=key
            this.percentage=(100/(this.activePage.length))*(Number(key)+1)
            console.log(key,keyPath)
            this.$router.push({path:this.basePath+this.activePage[Number(key)]['path']})
        }
    },
}
</script>

<style lang="scss" scoped>
.inner-header{
    margin-top: 50px;
    margin-bottom: 80px;
}
.ivu-progress{
    margin-bottom: 20px;
    font-size: 20px;
}

.inner-header .el-menu-demo{
    // padding-top: 150px;
    position: absolute;
    bottom: 0px;
    right:0px
}
.el-divider{
    margin: -3px 0 0 0;
    margin-bottom:50px;
    height: 2px;
    width: 100%;
}
.el-menu{
    font-weight: bolder;
    .el-menu-item{
        font-size: 20px;
    }
}
.el-menu--horizontal>.el-menu-item.is-active{
    border-bottom:6px solid #409EFF;
}


</style>
