<template>
<div>
    <el-row type="flex" justify="center">
        <el-col :span="8" class="form-panel" >
            <!-- <el-form :model="form" ref="form"  label-width="80px" :inline="false" size="normal">
                <el-form-item label="查询数">
                    <el-input v-model="form.workloadSize"></el-input>
                </el-form-item>
                <el-form-item label="块大小">
                    <el-input v-model="form.blockSize"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="onSubmit">确认生成</el-button>
                </el-form-item>
            </el-form> -->
            <el-form :model="form" ref="form"  label-width="120px" :inline="false" size="normal">
                <el-form-item label="选择分区算法">
                    <el-select v-model="form.selectedMethod" placeholder="请选择">
                        <el-option
                        v-for="item in methods"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="onSubmit">执行分区</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row type="flex" justify="center">
        <el-col :span="12" :offset="0">

        </el-col>
        
    </el-row>
    
    <el-row type="flex" justify="center" class="result-panel">
        <el-col :span="parWidth" :offset="1" v-for="(item,i) in parResult" :key="'table'+item.id">
            <h2 v-if="form.selectedMethod=='QD-tree'">Partition {{item.id}} <br/>[{{item.dimensionRange[0][0]}},{{item.dimensionRange[0][1]}}] [{{item.dimensionRange[1][0]}},{{item.dimensionRange[1][1]}}]</h2>
            <h2 v-else>Partition {{item.id}} <br/>{{item.dimensionRange}}</h2>
            <el-table :data="item.tableData" border stripe>
                <el-table-column v-for="col in columns"
                    :prop="col"
                    :key="i+col"
                    :label="col"
                    >
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
 
</template>

<script>
import {fetchQdPartitions,fetchSopPartitions} from '@/api/storageHZ'
import {fetchJson} from '@/api/storageCompress'
export default {
    data() {
        return {
            // form:{
            //     workloadSize:1000,
            //     blockSize:100,
            // },
            form:{
                selectedMethod:''
            },
            methods:['SOP','WTY','QDtree'],
            columns:[],
            parWidth:2,
            parResult:[
                // {
                //     id:1,
                //     dimensionRange:"[0,30] [5,70]",
                //     tableData:[
                //         {
                //             A:1,
                //             B:1
                //         }
                //     ]
                // },
                
                // {
                //     id:2,
                //     dimensionRange:"[0,10] [10,70]",
                //     tableData:[
                //         {
                //             A:1,
                //             B:1
                //         }
                //     ]
                // },
                // {
                //     id:3,
                //     dimensionRange:"[0,10] [10,70]",
                //     tableData:[
                //         {
                //             A:1,
                //             B:1
                //         }
                //     ]
                // }
            ]
            
        }
    },
    created(){
        // this.draw()
    },
    methods: {
        onSubmit(){
            if(this.form.selectedMethod=='QDtree'){
                fetchQdPartitions().then(response=>{
                    this.parResult=[]
                    this.columns=['A','B']
                    let partitionData=response.data.partitionData.map(partition=>{
                        let myPartition=partition.map(tuple=>{
                            let row={}
                            for(var i=0;i<this.columns.length;i++){
                                row[this.columns[i]]=tuple[i]
                            }
                            return row
                        })
                        return myPartition
                    })
                    let metadata=response.data.metadata
                    console.log(metadata)
                    for(var i=0;i<partitionData.length;i++){
                        this.parResult.push({
                            id:i,
                            dimensionRange:metadata[i],
                            tableData:partitionData[i]
                        })
                    }
                    this.parWidth=2
                })
            }else if(this.form.selectedMethod=='SOP' || this.form.selectedMethod=='WTY'){
                fetchSopPartitions(this.form.selectedMethod).then(response=>{
                    this.parResult=[]
                    this.columns=['event','category','publicher','revenue','discount','A','B']
                    let partitionData=response.data.partitionData.map(partition=>{
                        let myPartition=partition.map(tuple=>{
                            let row={}
                            for(var i=0;i<this.columns.length;i++){
                                row[this.columns[i]]=tuple[i]
                            }
                            return row
                        })
                        return myPartition
                    })
                    let metadata=response.data.metadata
                    console.log(metadata)
                    for(var i=0;i<partitionData.length;i++){
                        this.parResult.push({
                            id:i,
                            dimensionRange:metadata[i],
                            tableData:partitionData[i]
                        })
                    }
                    this.parWidth=4
                })
            }
            
        },
        draw(){
            
            fetchJson("/flare-2.json").then(response=>{
                let data=response.data
                let height=1200,width=975
                let format = this.$d3.format(",d")
                let color = this.$d3.scaleOrdinal(this.$d3.quantize(this.$d3.interpolateRainbow, data.children.length + 1))
                let partition = data => {
                    const root = this.$d3.hierarchy(data)
                        .sum(d => d.value)
                        .sort((a, b) => b.height - a.height || b.value - a.value);  
                    return this.$d3.partition()
                        .size([height, (root.height + 1) * width / 3])
                        (root);
                }
                // let chart = {
                    const root = partition(data);
                    let focus = root;
                    const svg = this.$d3.create("svg")
                        .attr("viewBox", [0, 0, width, height])
                        .style("font", "10px sans-serif");

                    const cell = svg
                        .selectAll("g")
                        .data(root.descendants())
                        .join("g")
                        .attr("transform", d => `translate(${d.y0},${d.x0})`);

                    const rect = cell.append("rect")
                        .attr("width", d => d.y1 - d.y0 - 1)
                        .attr("height", d => rectHeight(d))
                        .attr("fill-opacity", 0.6)
                        .attr("fill", d => {
                            if (!d.depth) return "#ccc";
                            while (d.depth > 1) d = d.parent;
                            return color(d.data.name);
                        })
                        .style("cursor", "pointer")
                        .on("click", clicked);

                    const text = cell.append("text")
                        .style("user-select", "none")
                        .attr("pointer-events", "none")
                        .attr("x", 4)
                        .attr("y", 13)
                        .attr("fill-opacity", d => +labelVisible(d));

                    text.append("tspan")
                        .text(d => d.data.name);

                    const tspan = text.append("tspan")
                        .attr("fill-opacity", d => labelVisible(d) * 0.7)
                        .text(d => ` ${format(d.value)}`);

                    cell.append("title")
                        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

                    function clicked(event, p) {
                        focus = focus === p ? p = p.parent : p;

                        root.each(d => d.target = {
                        x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
                        x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
                        y0: d.y0 - p.y0,
                        y1: d.y1 - p.y0
                        });

                        const t = cell.transition().duration(750)
                            .attr("transform", d => `translate(${d.target.y0},${d.target.x0})`);

                        rect.transition(t).attr("height", d => rectHeight(d.target));
                        text.transition(t).attr("fill-opacity", d => +labelVisible(d.target));
                        tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
                    }
                    
                    function rectHeight(d) {
                        return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
                    }

                    function labelVisible(d) {
                        return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
                    }
                    
                    // return svg.node();
                // }
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
.form-panel{
    // border:2px solid black;
    // border-radius: 6px;
    padding: 20px 150px;
    
}
.el-form{
    margin: 0 auto;
    height: 50%;
}
.el-row:nth-child(2){
     h2{
        color: rgb(59, 63, 63);
        margin-bottom: 20px;
        text-align: center;
    }
    margin-top: 50px;
}



</style>