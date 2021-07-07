<template>
<div>
  <!-- <h1>数据分区</h1> -->
  <router-view />

</div>
</template>

<script>
export default {
  computed:{
  },
  created(){
    // 默认填写算法配置
    this.$store.commit('SET_TABLE',["customer","supplier","region","nation"])
    // this.$store.commit("SET_WORKLOAD",["customer1621958590609.csv","supplier1621958597615.csv","lineitem1621958603752.csv","lineitem1621958610580.csv"])
    this.$store.commit("SET_WORKLOAD",["customer1621836580261.csv","supplier1621958597615.csv","region1621958280154.csv","nation1621958273183.csv","partsupp1621960620750.csv"])
    this.$store.commit('SET_METHODS',[{"key":0,"label":"AUTOPART","content":"AutoPart生成一组主分区（称为原子片段）。垂直分区是原子的，如果所有访问它的查询都引用分区中的所有属性。换句话说，不存在访问原子片段子集的查询。此后，在每次迭代中，通过将片段与原子片段或上一次迭代的片段相结合来扩展片段。重复此过程，直到查询工作负载的估计成本没有改善为止。"},{"key":1,"label":"HILLCLIMB","content":"自底向上的算法，从列布局开始(每个属性位于不同的垂直分区)，此后，在每次迭代中，算法都会找到并合并两个分区，当合并后，这两个分区在预期的查询开销方面会有最好的改善。这意味着在每个迭代中，垂直分区的数量减少了一个。当预期的查询开销没有改善时，算法停止迭代。"},{"key":10,"label":"SCVP","content":"我们自己的算法，一种以谱聚类为主的混合模型策略解决垂直分区问题。"},{"key":3,"label":"O2P","content":"自顶向下的算法，适合在线分区,从Navathe的算法开始，将其转化为一个在线的垂直分割算法,为了计算垂直分区，O2P采用贪婪的方法在每个步骤中创建一个（最好的）新的垂直分区。它还使用动态规划来记住上一步中非最佳垂直分区的成本,提高分析速度."},{"key":5,"label":"OPTIMAL","content":"BellNumber，遍历所有的组合情况。"},{"key":6,"label":"ROW","content":"原表不分区."},{"key":9,"label":"HYF","content":"使用Apriori算法，在项集组合候选分区的思路和Gorla一致，只是在生成频繁项集时，使用模式的余弦相似度代替频数作为频繁项的权重。"}])
    this.$store.commit('SET_COSTMODELS',["Huang"])
  }
}
</script>

<style>

</style>