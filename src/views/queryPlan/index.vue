<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="16" :offset="0">
        <h3 >Plan(Optional)</h3>
        <el-input :rows="10" type="textarea" v-model="form.plan" placeholder="Paste execution plan"></el-input>
        <h3 >Query(Optional)</h3>
        <el-input :rows="10" type="textarea"  v-model="form.query" placeholder="Paste Sql"  ></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" >
      <el-col :span="4" :offset="0">
        <el-button type="primary" size="default" @click="submit">提交</el-button>
        
      </el-col>
      <el-col :span="4" :offset="7">
        <el-select v-model="no" placeholder="Sample Plans" @change="selectPlan">
          <el-option
            v-for="(item,index) in options"
            :key="'select'+index"
            :label="item"
            :value="index+1">
          </el-option>
        </el-select>
      </el-col>
      
    </el-row>
    <el-row type="flex" justify="center">
      <div id="app" class="d-flex">
      <pev2 :plan-source="plan" :plan-query="query" :key="timer"></pev2>
      </div>
    </el-row>
    
  </div>
</template>

<script>
import {fetchQueryPlan} from '@/api/pev'
import pev2 from "pev2"
let plan = `
                                                           QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------------
 Nested Loop  (cost=4.33..118.25 rows=10 width=488) (actual time=0.370..1.126 rows=10 loops=1)
   ->  Bitmap Heap Scan on tenk1 t1  (cost=4.33..39.44 rows=10 width=244) (actual time=0.254..0.380 rows=10 loops=1)
         Recheck Cond: (unique1 < 10)
         ->  Bitmap Index Scan on tenk1_unique1  (cost=0.00..4.33 rows=10 width=0) (actual time=0.164..0.164 rows=10 loops=1)
               Index Cond: (unique1 < 10)
   ->  Index Scan using tenk2_unique2 on tenk2 t2  (cost=0.00..7.87 rows=1 width=244) (actual time=0.041..0.048 rows=1 loops=10)
         Index Cond: (unique2 = t1.unique2)
 Total runtime: 2.414 ms`;

let query = `
SELECT *
FROM tenk1 t1, tenk2 t2
WHERE t1.unique1 < 10 AND t1.unique2 = t2.unique2;`;

export default {
  data() {
    return {
      form:{
        plan:plan,
        query:query
      },
      options:[
        'Example 1 (JSON)', 
        'Example 1 (plain text)',
        'Example 2',
        'Example 3', 
        'Example 4',
        'Example 5', 
        'With subplan',
        'With CTE', 
        'Very large plan',
        'With trigger',
        'With trigger (plain text)', 
        'Parallel (verbose)', 
        'Parallel (4 workers)',
      ],
      no:1,
      timer:'',
      plan:plan,
      query:query
    }
  },
  methods: {
   submit(){
     this.plan=this.form.plan
     this.query=this.form.query
    //  fetchQueryPlan({no:this.no}).then(response=>{
    //   this.plan=response.data.plan
    //   // this.query=response.data.query
    // })
   },
   selectPlan(){
     fetchQueryPlan({no:this.no}).then(response=>{
      this.form.plan=response.data.plan
      this.timer = new Date().getTime()
      // this.query=response.data.query
    })
   }
  },
  components: {
    pev2
  }
}
</script>
<style lang="scss" scoped>
// @import 'https://unpkg.com/bootstrap@4.5.0/dist/css/bootstrap.min.css'; 
@import 'https://unpkg.com/@fortawesome/fontawesome-free@5.13.0/css/all.css';
// #app{
//   width:
// }
</style>