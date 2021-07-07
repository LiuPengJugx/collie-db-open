<template>
<div>
         <el-row class="inner-header" type="flex" justify="space-around"  align="bottom">
            <el-col :span="4" :offset="0">
                <el-row type="flex" justify="center">
                    <el-col :span="4" :offset="0">
                        <el-progress :stroke-width="10" :width="120" type="circle" :percentage="percentage"></el-progress>  
                    </el-col>
                    <!-- <el-col :span="4" :offset="4">
                        <el-button style="position: absolute;bottom: 4px;" type="primary">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    </el-col> -->
                </el-row>  
            </el-col>
            <el-col :span="4" :offset="4">
                <span style="font-size:20px;margin:auto 20px;">步骤{{(Number(this.activeIndex)+1)}}/{{this.activePage.length}}</span>
            </el-col>
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
            <el-divider><i class="el-icon-edit"></i></el-divider>
        </el-row>
        <!-- <fixed-menu /> -->
    <el-row type="flex" justify="center">
        <!-- <app-main /> -->
        <fixed-panel />
    </el-row>
</div>
</template>

<script>
import FixedPanel from '@/views/storage/partition/vertical/components/FixedPanel'
export default {
    components:{FixedPanel},
    data() {
        return {
            activeIndex:'0',
            basePath:"/storage/compress/common",
            activePage:[
                {name:'上传数据',path:'/uploadData',icon:'el-icon-upload2'},
                {name:'分析结果',path:'/analysisRes',icon:'el-icon-share'}
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
            this.$router.push({path:this.basePath+this.activePage[Number(key)]['path']})
        }
    },
}
</script>

<style lang="scss" scoped>
.inner-header{
    margin-top: 20px;
    margin-bottom: 50px;
}
.inner-header .el-menu-demo{
    // padding-top: 50px;
    // position: absolute;
    // bottom: 0px;
    // right:0px
}
.el-divider{
    margin-bottom:50px;
    width: 100%;
}
.el-menu{
    font-weight: bold;
}

</style>