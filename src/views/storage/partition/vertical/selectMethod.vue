<template>
  <div>
      <el-row type="flex">
        <el-col class="selectedCard" :span="22" :offset="2">
          <span>分区算法：</span>
          <el-tag v-for="(item,index) in accessedMethods" :key="'method'+index">{{item.label}}<i class="el-icon-check"></i></el-tag>
          <br/>

          <div style="margin-top:30px">
            <span>成本模型：</span>
            <el-tag v-for="(item,index) in accessedCostModels" :key="'method'+index">{{item.label}}<i class="el-icon-check"></i></el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" style="margin-top:40px">
        <el-col :span="10" :offset="2">
          <el-row type="flex" class="select-panel" justify="center">
              <el-transfer v-model="selectedMethods" :data="methods" @change="onMethodsChanged"></el-transfer>
              <!-- <h3>选择对比算法：</h3> -->         
          </el-row>
          <el-row type="flex" class="select-panel" justify="center">
            <el-col :span="8" >
              <el-radio size="medium" :border="true" style="font-size:50px"  @change="onCostModelsChanged" v-model="selectedCostModels" v-for="model in costModels" :key="model.key" :label="model.key">{{model.label}}</el-radio>
              <!-- <h3>选择成本模型：</h3> -->
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="14" :offset="0">
          <h2>
            <span>算法介绍</span>
            <el-divider direction="vertical"></el-divider>
            <span>成本模型介绍</span>
          </h2>
          <el-row type="flex" class="introduce-panel">
            <el-col :span="16" >
              <Collapse simple :v-model="'0'">
                <Panel :name="index+''" :key="'a'+index" v-for="(item,index) in accessedMethods">
                    {{item.label}}
                    <p slot="content">{{item.content}}</p>
                </Panel>
              </Collapse>
            </el-col>
            <el-col :span="8" :offset="2">
              <Collapse simple :v-model="'0'">
                <Panel :name="index+''" :key="'c'+index" v-for="(item,index) in accessedCostModels">
                    {{item.label}}
                    <p slot="content">{{item.content}}</p>
                </Panel>
              </Collapse>
              <!-- <el-collapse  v-model="activeCostModelNames" >
                <el-collapse-item v-for="(item,index) in accessedCostModels" :title="item.label" :name="index" :key="index">
                  <div>{{item.content}}</div>
                </el-collapse-item>
              </el-collapse> -->
            </el-col>
          </el-row>
        </el-col>
      </el-row>
 
  </div>
</template>

<script>
export default {
  data() {
    const generateMethodsData = _ => {
      const data = [];
      for (let i = 0; i <= 8; i++) {
        data.push({
          key: i,
          label: `垂直分区算法 ${ i }`,
          content:`这是垂直分区算法 ${i}的介绍......这是成本模型 ${i}的介绍......这是成本模型 ${i}的介绍......这是成本模型 ${i}的介绍......`
        });
      }
      return data;
    };
    const generateCostModelsData = _ => {
      const data = [];
      for (let i = 0; i <= 3; i++) {
        data.push({
          key: i,
          label: `成本模型 ${ i }`,
          content:`这是成本模型 ${i}的介绍......这是成本模型 ${i}的介绍......这是成本模型 ${i}的介绍......这是成本模型 ${i}的介绍......`
        });
      }
      return data;
    };
    return {
      // 方法选择组件数据
      methods: [
        {key:0,label:'AUTOPART',content:'AutoPart生成一组主分区（称为原子片段）。垂直分区是原子的，如果所有访问它的查询都引用分区中的所有属性。换句话说，不存在访问原子片段子集的查询。此后，在每次迭代中，通过将片段与原子片段或上一次迭代的片段相结合来扩展片段。重复此过程，直到查询工作负载的估计成本没有改善为止。'},
        {key:1,label:'HILLCLIMB',content:'自底向上的算法，从列布局开始(每个属性位于不同的垂直分区)，此后，在每次迭代中，算法都会找到并合并两个分区，当合并后，这两个分区在预期的查询开销方面会有最好的改善。这意味着在每个迭代中，垂直分区的数量减少了一个。当预期的查询开销没有改善时，算法停止迭代。'},
        {key:2,label:'NAVATHE',content:'自顶向下的算法,给定一组属性和一组引用这些属性的查询，该算法构造一个属性亲和矩阵。属性亲和矩阵的单元格（i，j）表示属性i与属性j（也称为它们的亲和性）共出现的次数。然后，该算法对矩阵的单元进行聚类，使得具有较高亲和力的属性紧密地联系在一起。作者建议使用键能算法[14]进行矩阵聚类。然后，该算法将聚集的属性集递归地拆分为垂直分区。'},
        {key:3,label:'O2P',content:'自顶向下的算法，适合在线分区,从Navathe的算法开始，将其转化为一个在线的垂直分割算法,为了计算垂直分区，O2P采用贪婪的方法在每个步骤中创建一个（最好的）新的垂直分区。它还使用动态规划来记住上一步中非最佳垂直分区的成本,提高分析速度.'},
        {key:4,label:'TROJAN',content:'适用于数据复制，如HDFS中的数据复制。为了考虑HDFS中的默认数据复制，它首先对查询进行分组，并将每个查询组映射到不同的数据副本。它也使用相同的列分组算法进行查询分组。然后，对于每个查询组，它独立地计算列组。'},
        {key:5,label:'OPTIMAL',content:'BellNumber，遍历所有的组合情况。'},
        {key:6,label:'ROW',content:'原表不分区.'},
        {key:7,label:'COLUMN',content:'表中每个属性作为一个单独的分区'},
        {key:8,label:'Rodriguez',content:'一种CBPA算法，将频繁项集的支持度概念引入到亲和度矩阵，将矩阵中的所有亲和度值作为数据集，保留前30%频繁出现的亲和度作为大于亲和度支持度的支持边，依次遍历每个属性，如果该属性未分配，则将包含该属性的所有支持边作为一个分区。'},
        {key:9,label:'HYF',content:'使用Apriori算法，在项集组合候选分区的思路和Gorla一致，只是在生成频繁项集时，使用模式的余弦相似度代替频数作为频繁项的权重。'},
        {key:10,label:'SCVP',content:'我们自己的算法，一种以谱聚类为主的混合模型策略解决垂直分区问题。'}   
      ],
      selectedMethods: [],
      costModels:[
        {key:0,label:'Huang',content:'对执行负载，读取所需数据将要访问的磁盘块进行估计。'},
        {key:1,label:'Son',content:'分布式环境下，垂直分区的目标是提高各结点上查询负载的执行性能和系统的整体的吞吐量，与两个指标DF和IA有关，#DF指所有查询访问不同分区的总频数，与查询执行性能有联系，而#IA表示数据查询之间被干扰访问的总频率，与系统的吞吐量有关，评判一个垂直分区的目标是c⋅avg⁡(#DF)+avg⁡(#IA)的值最小。(c为权重比例系数)'}
      ],
      selectedCostModels:[],
      // 方法介绍组件数据
      accessedMethods:[],
      activeMethodNames: [0],
      accessedCostModels:[],
      activeCostModelNames: [0]
    };
  },
  methods: {
    onMethodsChanged(cur_value,direction,keys){
      // console.log("%o %s %o",cur_value,direction,keys)
      this.accessedMethods=[]
      // 展示cur_value的所有方法
      cur_value.sort()
      cur_value.map(k=>{
          this.accessedMethods.push(this.methods[k])
      })
      this.$store.commit('SET_METHODS',this.accessedMethods)
    },
    onCostModelsChanged(key){
      // console.log("%o %s %o",cur_value,direction,keys)
      this.accessedCostModels=[]
      this.accessedCostModels.push(this.costModels[key])
      // 展示cur_value的所有方法
      // cur_value.sort()
      // cur_value.map(k=>{
      //     this.accessedCostModels.push(this.costModels[k])
      // })
      let costModelIndexs=[]
      for(let costmodel of this.accessedCostModels){
        costModelIndexs.push(costmodel['label'])
      }
      this.$store.commit('SET_COSTMODELS',costModelIndexs)
    }
  },
}
</script>

<style lang="scss" scoped>
  .costmodel-panel{
    margin-top: 50px;
  }
  .selectedCard span{
    font-weight: bolder;
    font-size: 18px;
  }
  .selectedCard .el-tag{
    margin: auto 10px;
  }
  .introduce-panel{
    margin: 50px auto;
  }


  .select-panel{
    margin-top: 40px;
    // h3{
    //   margin-top: 20px;
    //   text-align: center;
    //   // position:absolute;
    //   // bottom: 0px;
    // }
  } 
  .el-col h2{
    text-align: center;
    font-weight: bolder;
  }
  .introduce-panel{
    font-size: 18px;
  }
</style>

