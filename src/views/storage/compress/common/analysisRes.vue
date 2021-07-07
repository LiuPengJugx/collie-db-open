<template>
  <div>  
    <ul class="nav">
        <li class="selected" @click="changePanel(1)">压缩结果查看</li>
        <li @click="changePanel(2)">压缩结果可视化</li>
    </ul>
    <div class="content">
        <div v-if="loading==1" class="list">
            <div class="photo">
            <img :src="basedir+'/static/compress/buffer.png'" style="width:50%">
            </div>
            <div id="question">
            <span class="word">
                    内存占用可视化是指压缩过程中每一步算法过程对内存占用时间和大小的可视化展示
            </span>
            </div>
            <div class="t">
            <table class="content">
                <tr>
                <th>压缩后大小（M)</th>
                <th>压缩率</th>
                <th>查找次数</th>
                <th>查找时间（ms)</th>
                <th>QPS（fetches/sec）</th>         
            </tr>
                <tr>
                    <td>{{tableData[0]['size']}}</td>
                    <td>{{tableData[0]['rate']}}</td>
                    <td>{{tableData[0]['count']}}</td>
                    <td>{{tableData[0]['searchTime']}}</td>
                    <td>{{tableData[0]['QPS']}}</td>
                </tr>
            </table>
            </div>
            <input class="btn" type="submit" value="查看"  @click="showResult" name="btn1" id="btn_2" />
        </div>
        <div v-else class="list">
            <div class="photo">
            <img :src="basedir+'/static/compress/buffer.png'" style="width:50%">
            </div>
            <div id="question">
            <span class="word" id="word3">
                    压缩后对象结构可视化是指对压缩得到的对象的结构进行层次化的展示
            </span>
            </div>
            <div class="b">
            <a href="http://10.77.110.152:5001/aidb/storage/compress/in_memory" target="_blank"><input class="btn" type="submit" value="内存占用可视化"  name="btn1"  /></a>
            <a href="http://10.77.110.152:5001/aidb/storage/compress/structer" target="_blank"><input class="btn" type="submit" value="压缩结果结构可视化"  name="btn1"  /></a>
            </div> 
            </div>
        </div>
      <!-- <el-row type="flex" justify="center">
          <el-col :span="12" :offset="0">
              <el-table :data="tableData" border stripe>
                  <el-table-column v-for="col in columns"
                      :prop="col.id"
                      :key="col.id"
                      :label="col.label"
                      >
                  </el-table-column>
              </el-table>
              
          </el-col>
          
      </el-row>
       <el-row type="flex" justify="center" align="middle" class="button-panel">
          <el-col :span="2" :offset="0">
            <el-button @click="showResult" type="primary">查看</el-button>
          </el-col>
      </el-row> 
      <el-row type="flex" justify="center" align="middle" class="button-panel2">
          <el-col :span="2" :offset="0">
            <el-link type="primary" href="http://10.77.110.152:5001/aidb/storage/compress/in_memory" target="_blank">内存占用可视化</el-link>
          </el-col>
          <el-col :span="2" :offset="4">
            <el-link type="primary" href="http://10.77.110.152:5001/aidb/storage/compress/structer" target="_blank">压缩结构可视化</el-link>
          </el-col>
      </el-row>        -->

  </div>
</template>

<script>
import {getResult} from '@/api/storageCompress'
export default {
    data() {
        return {
            columns:[
                {id:'size',label:'压缩后大小(M)'},
                {id:'rate',label:'压缩率'},
                {id:'count',label:'查询次数'},
                {id:'searchTime',label:'查找时间(ms)'},
                {id:'QPS',label:'QPS(fetches/sec)'},
            ],
            tableData:[{
                    size:0,
                    rate:0,
                    count:0,
                    searchTime:0,
                    QPS:0
                }],
            basedir:'http://10.77.110.152:5000',
            loading:1
        }
    },
    methods:{
        showResult(){
            getResult().then(response=>{
                this.tableData=[{
                    size:response.data.size,
                    rate:response.data.rate,
                    count:response.data.count,
                    searchTime:response.data.searchTime,
                    QPS:response.data.QPS
                }]
            })
        },
        changePanel(key){
            this.loading=key
        }
    }
}
</script>

<style lang="scss" scoped>
// .button-panel{
//     margin-top: 20px;
// }
// .button-panel2{
//     margin-top: 160px;
// }
// .el-link{
//     font-size: 20px;
// }


 .btn{
 margin-top: -18%;
 margin-left: 40%;
    height: 100px;
    width: 20%;
 font-size: 20px;
 line-height: 5%;
 background: #323c3c;
 color: #fff;
 text-align: center;
 cursor: pointer;
 margin-bottom:10%;
}
#btn_2{
    margin-top:80px;
    height: 60px;
}
 .nav {
                overflow: hidden;
                position: fixed;
                top: 35%;
                right: 8%;
                height: 62%;
                text-align: center;
                width: 5%;
                border-left: 3px dashed #7E95AA;
                /*background-color:#cae2f8; */
                /*border: 1px solid;*/
                list-style: none;
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-direction: column;
 }
               .nav li {
                float: left;
                padding: 10%;
                width: 10%;
                color: #666;
                list-style: none;
                border-left: 1px solid #f4f4f4;
                cursor: pointer;
                text-decoration: none;
                color: #DD5D5D;
                font-size: 25px;
                font-family: "黑体";
              }
              .nav li:hover,.selected {
                margin-bottom: 70%;
                margin-top: 50%;

              }
              .content{
                height: 100%;
                padding: 10px;
                overflow: hidden;
 }
table.content {
    font-family: verdana,arial,sans-serif;
    font-size:20px;
    color:#333333;
    border-color: #666666;
    border-collapse: collapse;
 margin-left: 20%;
 margin-top: 10%;
 height: 10%;
 width: 55%;

}
table.content th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
}

table.content tr:hover {   
  background-color: #c4e4ff;   
}   
table.content td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
}

table.content2 {
    font-family: verdana,arial,sans-serif;
    font-size:13px;
    color:#333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    margin-left:29px;
    margin-top:19px;
}
table.content2 th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
}

table.content2 tr:hover {   
  background-color: #c4e4ff;   
}   
table.content2 td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
}
#question{
 float:right;
 margin-bottom: 5%;
}
.photo{
    float:left;
    margin-left: 10%;
}
.word{
 font-size:25px;
 margin-left: -70%;
}
#word2{
 margin-left: -50%;
}
#word3{
    margin-left:-90%;
}
.b{
 float: left;
margin-top: 50px;
width: 84%;
}
</style>