<template>
  <div>
      <div class="inform" id="inform1">
  	 	   <img :src="VUE_APP_VP_BASE_URL+'/compress/workload.png'" style="width:32%"/>
		   <br>	    
		   <span class="word">
               Compression method
           </span>
           <div class="chose">
           <label>
		      <!-- <select name="myselect" class="myselect"  onchange="MM_jumpMenu('parent',this,0)"> 
		      <option selected="selected" value="">---压缩算法---</option>
		      <option value="1">CSA1</option>
			  <option value="2">CSA2</option>
			  <option value="3">FM-index1</option>
			  <option value="4">FM-index2</option>
		      </select> -->
                <el-select class="myselect" v-model="form.method" placeholder="---压缩算法---">
                    <el-option
                    v-for="(item,index) in methods"
                    :key="item"
                    :label="item"
                    :value="index+1">
                    </el-option>
                </el-select>
		   </label>
		  </div>
        </div>
        
	  	<div class="inform" id="inform2">
  	 	  <img :src="VUE_APP_VP_BASE_URL+'/compress/data1.png'" style="width:37%"/>
		  <br>	    
		  <span class="word" id="word2">
                Table
          </span>
          <div class="chose">
          <label>
		      <!-- <select name="myselect" class="myselect"  v-model="form.method"  onchange="MM_jumpMenu('parent',this,0)">  -->
		      <!-- <option selected="selected" value="">---数据表---</option>
		      <option value="1">partsupp</option>
			  <option value="2">supplier</option> -->
		      <!-- </select> -->
                <el-select name="myselect" class="myselect" v-model="form.table" placeholder="---数据表---">
                    <el-option
                    v-for="(item,index) in tables"
                    :key="item"
                    :label="item"
                    :value="index+1">
                    </el-option>
                </el-select>
		  </label>
		  </div>
        </div>
        
	    <div class="inform" id="inform3">
  	 	  <img :src="VUE_APP_VP_BASE_URL+'/compress/storage.png'" style="width:37%"/>
		  <br>	    
		  <span class="word" id="word3">
                Word
          </span>
          <div class="chose">
          <label>
		      <!-- <select name="myselect" class="myselect"  onchange="MM_jumpMenu('parent',this,0)"> 
		      <option selected="selected" value="">---查找单词---</option>
		      <option value="1">of</option>
			  <option value="2">the</option>
		      </select> -->
            
            <el-select name="myselect" class="myselect" v-model="form.searchWord" placeholder="---查找单词---">
                <el-option
                v-for="(item,index) in searchWords"
                :key="item"
                :label="item"
                :value="index+1">
                </el-option>
            </el-select>
             
		   </label>
		</div>
        </div>
        <input class="btn" type="submit" value="提交"  name="btn1" id="btn_2" @click="onSubmit" />
        <!-- <div  id="inform4">
          <div class="photo">
  	 	   <img :src="basedir+'/static/compress/p.jpg'" style="width:30%"/>
  	 	  </div>
		  <br>	
		  <div id="question">    
		  <span class="word" id="word5">
                数据压缩：使用后缀数组及相关算法可以实现不解压进行查询的数据压缩方式
          </span>
          </div>
        </div> -->
   </div>
      <!-- <el-row type="flex" justify="center" align="middle">
          <el-col :span="4" :offset="0">
              <el-form :model="form" ref="form" label-width="150px" :inline="false" size="normal">
                <el-form-item label="选择压缩算法">
                    <el-select v-model="form.method" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in methods"
                            :key="item"
                            :label="item"
                            :value="index+1">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="选择表">
                    <el-select v-model="form.table" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in tables"
                            :key="item"
                            :label="item"
                            :value="index+1">
                            </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="选择列">
                    <el-select v-model="form.column" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in columns"
                            :key="item"
                            :label="item"
                            :value="index+1">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="选择查询单词">
                    <el-select v-model="form.searchWord" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in searchWords"
                            :key="item"
                            :label="item"
                            :value="index+1">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
          </el-col>
      </el-row> -->

</template>

<script>
import {configAlogorithm} from '@/api/storageCompress'
export default {
    data() {
        return {
            form:{
                method:'',
                table:'',
                searchWord:''
            },
            methods:['CSA1','CSA2','FM-index1','FM-index2'],
            tables:['partsupp','supplier'],
            columns:['第1列','第2列','第3列','第4列','第5列'],
            searchWords:['of','the'],
        }
    },
    computed: {
        VUE_APP_VP_BASE_URL(){
            return process.env.VUE_APP_VP_BASE_URL
        }
    },
    methods: {
        onSubmit(){
            configAlogorithm(this.$qs.stringify(this.form)).then(response=>{
                this.$message.success("send success")
            })
        }
    },
}
</script>

<style lang="scss" scoped>
ul{ 
	list-style: none;
}



.myselect{
	border: 3px solid #7e7373;
	width: 216px;
	font-size: 15px;
	margin-top: 10%;
	margin-left: -24%;
}


.word{
	font-size:25px;
	margin-left: -35%;
}
#word2{
	margin-left: 3%;
}

#word3{
	margin-left: 5%;
}

.btn{
	margin-top: 10%;
	margin-left: 40%;
	height: 60px;  //only px
	width: 15%;
	font-size: 1em;
	line-height: 5%;
	background: #546262;
	color: #fff;
	text-align: center;
	cursor: pointer;
}

.inform{
    margin-left: 16%;
    justify-content: space-around;
    float:left;
    margin-top:5%
}
#question{
	float:right;
}
#inform4{
	margin-left:10%;
	margin-top:5%;
}
.photo{
    float:left;
}

</style>