<template>
  <div>
    <el-row class="inner-header" type="flex" justify="center">
        <el-col :span="8" :offset="2">
            <el-row type="flex" justify="center">
                <el-col :span="4" :offset="0">
                    <el-progress :stroke-width="10" :width="120" type="circle" :percentage="percentage"></el-progress>  
                </el-col>
                <el-col :span="4" :offset="4">
                    <el-button style="position: absolute;bottom: 4px;" type="primary">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-col>
            </el-row>  
        </el-col>
        <el-col :span="16" >
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" 
            background-color="#ffffff"
            text-color="#000000"
            active-text-color="#37D7DF" 
            @select="handleSelect">
            <!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
            <!-- <el-menu-item index="1">添加表数据</el-menu-item>
            <el-menu-item index="2">添加查询负载</el-menu-item> -->
            <el-menu-item v-for="(page,idx) in activePage" :index="idx.toString()" :key="page.path">{{page.name}}</el-menu-item>
            </el-menu>
            <div class="line"></div>
        </el-col>
    </el-row>
    <el-row type="flex">
        <el-divider><i class="el-icon-edit"></i></el-divider>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex:'0',
            basePath:"/storage/partition/vertical",
            activePage:[
                {name:'添加表数据',path:'/importData'},
                {name:'添加查询负载',path:'/importWorkload'},
                {name:'选择分区算法',path:'/selectMethod'},
                {name:'执行分析',path:'/executeAnalysis'}
                ],
            percentage:0
        }
    },
    created() {
        this.percentage=100/(this.activePage.length)
    },
    methods: {
        goTo(){
            
        },
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
div{
    width: 100%;
}
.inner-header{
    margin-top: 20px;
    margin-bottom: 50px;
}
.inner-header .el-menu-demo{
    // padding-top: 50px;
    position: absolute;
    bottom: 0px;
    // right:0px
}
.el-divider{
    margin-bottom:50px;
    width: 100%;
}
</style>
