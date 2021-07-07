<template>
<div class="aa">

<div class="layui-container"> 

<!-- 会话 -->
<fieldset class="layui-elem-field" style="margin-top: 20px; border:1px solid #393D49;">
  <legend>Session</legend>
  <div class="layui-field-box">
    可以新建、查看调优会话；包括所选DBMS、优化目标和使用算法等等
  </div>
</fieldset>
<!-- 会话表格 -->
<table class="layui-hide" id="test" lay-filter="test" ></table>

<!-- 调优-metric -->
<fieldset class="layui-elem-field" style="margin-top: 40px; border:1px solid #393D49;">
  <legend>Metric</legend>

  <div class="layui-field-box">
    可以查看Mertic的降维和聚类和优化目标的趋势图

  </div>
</fieldset> 
<div class="layui-row layui-col-space10">
    <div class="layui-col-xs3" >  
      <div class="layui-form">
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
          <legend>Session Info</legend>
        </fieldset>
      </div>   
        <table class="layui-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>内容</th>
            </tr> 
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>10000</td>
            </tr>
           <tr>
              <td>会话名称</td>
              <td>test</td>
            </tr>
           <tr>
              <td>DBMS</td>
              <td>Postgresql 9.6</td>
            </tr>
            <tr>
              <td>优化目标</td>
              <td>throughput</td>
            </tr>
           <tr>
              <td>使用算法</td>
              <td>Gaussian Process Bandits</td>
            </tr>
            <tr>
              <td>描述</td>
              <td>throughput测试</td>
            </tr>

          </tbody>
        </table>
        <button type="button" class="layui-btn layui-bg-black layui-btn-fluid" id="loadAllMetric">点击查看全部metric</button>
      </div>

    <div class="layui-col-xs9">
        <div class="layui-card-body">
         <div id="pruneMetric" style="width: 100%;min-height:400px"> </div>   
                 <div class="layui-card-body">
         <div id="targetObjective" style="width: 100%;min-height:400px"> </div>              
      </div>           
      </div>
    </div>
 </div>
 <table class="layui-hide" id="metricdata" lay-filter="metricdata" ></table>

<script type="text/html" id="toolbarDemo">
  <div class="layui-btn-container">
    <button class="layui-btn layui-btn-sm layui-btn-normal layui-bg-black" lay-event="addSession" > <i class="layui-icon layui-icon-add-circle-fine"></i> 新建会话</button>
    <!-- <button class="layui-btn layui-btn-sm layui-bg-black" lay-event="getCheckData"> <i class="layui-icon layui-icon-form"/>获取选中行数据</button> -->
  </div>
</script>

<script type="text/html" id="barDemo">
  <a class="layui-btn layui-btn-xs layui-bg-black" lay-event="edit"><i class="layui-icon layui-icon-logout"/>启用</a>
  <a class="layui-btn layui-btn-xs layui-bg-black" lay-event="del"><i class="layui-icon layui-icon-close"/>删除</a>
</script>

<script type="text/html" id="toolbarKnob">
  <div class="layui-btn-container">
    <button class="layui-btn layui-btn-radius layui-btn-primary " lay-event="" > 特征选择出的knob </button>
  
  </div>
</script>

  
<!-- 第三行 -->
<div class="layui-row layui-col-space10" >
  <fieldset class="layui-elem-field" style="margin-top: 40px; border:1px solid #393D49;">
    <legend>Knob</legend>
      <div class="layui-field-box">
        可以查看Konb值以及调节过程
      </div>
    </fieldset>  
  <div class="layui-col-xs3" style="padding-right: 40px;" >

      <table class="layui-hide" lay-filter="selectKnobs" id="selectKnobs"></table>
      <button type="button" class="layui-btn layui-bg-black layui-btn-fluid" id="loadAllKnob">点击查看全部Knob</button>
  </div>

  <div class="layui-col-xs9">
    <div class="layui-card-body" id ="knobChangeDIV">
      <div id="knobChange" style="width: 100%;min-height:400px"> </div>              
    </div>
  </div>
</div>

<table class="layui-hide" id="knobdata" lay-filter="knobdata" ></table>

</div>

</div> 
</template>

<script>
export default {
  name:'aa',
  mounted(){
var data = [{"id":10000,
              "sessionName":"test",
              "DBMS":"Postgresql 9.6",
              "targetObjective":"throughput",
              "algorithm":"Gaussian Process Bandits",
              "description":'throughput测试'
            },
            {"id":10001,
              "sessionName":"test",
              "DBMS":"Postgresql 9.6",
              "targetObjective":"throughput",
              "algorithm":"Gaussian Process Bandits",
              "description":'throughput测试'
            },
            {"id":10002,
              "sessionName":"test",
              "DBMS":"Postgresql 9.6",
              "targetObjective":"throughput",
              "algorithm":"Gaussian Process Bandits",
              "description":'throughput测试'
            },
            {"id":10003,
              "sessionName":"test",
              "DBMS":"Postgresql 9.6",
              "targetObjective":"latency",
              "algorithm":"Gaussian Process Bandits",
              "description":'latency测试'
            },
            {"id":10004,
              "sessionName":"test",
              "DBMS":"Postgresql 9.6",
              "targetObjective":"latency",
              "algorithm":"Gaussian Process Bandits",
              "description":'latency测试'
            },
            {"id":10005,
              "sessionName":"test",
              "DBMS":"Postgresql 9.6",
              "targetObjective":"latency",
              "algorithm":"Gaussian Process Bandits",
              "description":'latency测试'
            }
            ];

var knobData = [
  {"knob_ID":1,"Name":"global.DateStyle","Value":"ISO MDY"},
  {"knob_ID":2,"Name":"global.IntervalStyle","Value":"postgres"},
  {"knob_ID":3,"Name":"global.TimeZone","Value":"America/Los_Angeles"},
  {"knob_ID":4,"Name":"global.allow_system_table_mods","Value":"off"},
  {"knob_ID":5,"Name":"global.application_name","Value":""},
  {"knob_ID":6,"Name":"global.archive_command","Value":"(disabled)"},
  {"knob_ID":7,"Name":"global.archive_mode","Value":"off"},
  {"knob_ID":8,"Name":"global.archive_timeout","Value":0},
  {"knob_ID":9,"Name":"global.array_nulls","Value":"on"},
  {"knob_ID":10,"Name":"global.authentication_timeout","Value":"1min"},
  {"knob_ID":11,"Name":"global.autovacuum","Value":"off"},
  {"knob_ID":12,"Name":"global.autovacuum_analyze_scale_factor","Value":0.1},
  {"knob_ID":13,"Name":"global.autovacuum_analyze_threshold","Value":50},
  {"knob_ID":14,"Name":"global.autovacuum_freeze_max_age","Value":200000000},
  {"knob_ID":15,"Name":"global.autovacuum_max_workers","Value":3},
  {"knob_ID":16,"Name":"global.autovacuum_multixact_freeze_max_age","Value":400000000},
  {"knob_ID":17,"Name":"global.autovacuum_naptime","Value":"1min"},
  {"knob_ID":18,"Name":"global.autovacuum_vacuum_cost_delay","Value":"20ms"},
  {"knob_ID":19,"Name":"global.autovacuum_vacuum_cost_limit","Value":"-1"},
  {"knob_ID":20,"Name":"global.autovacuum_vacuum_scale_factor","Value":0.2},
  {"knob_ID":21,"Name":"global.autovacuum_vacuum_threshold","Value":50},
  {"knob_ID":22,"Name":"global.autovacuum_work_mem","Value":"-1"},
  {"knob_ID":23,"Name":"global.backend_flush_after","Value":0},
  {"knob_ID":24,"Name":"global.backslash_quote","Value":"safe_encoding"},
  {"knob_ID":25,"Name":"global.bgwriter_delay","Value":"200ms"},
  {"knob_ID":26,"Name":"global.bgwriter_flush_after","Value":"512kB"},
  {"knob_ID":27,"Name":"global.bgwriter_lru_maxpages","Value":100},
  {"knob_ID":28,"Name":"global.bgwriter_lru_multiplier","Value":2},
  {"knob_ID":29,"Name":"global.block_size","Value":8192},
  {"knob_ID":30,"Name":"global.bonjour","Value":"off"},
  {"knob_ID":31,"Name":"global.bonjour_name","Value":""},
  {"knob_ID":32,"Name":"global.bytea_output","Value":"hex"},
  {"knob_ID":33,"Name":"global.check_function_bodies","Value":"on"},
  {"knob_ID":34,"Name":"global.checkpoint_completion_target","Value":0.5},
  {"knob_ID":35,"Name":"global.checkpoint_flush_after","Value":"256kB"},
  {"knob_ID":36,"Name":"global.checkpoint_timeout","Value":"5min"},
  {"knob_ID":37,"Name":"global.checkpoint_warning","Value":"30s"},
  {"knob_ID":38,"Name":"global.client_encoding","Value":"UTF8"},
  {"knob_ID":39,"Name":"global.client_min_messages","Value":"notice"},
  {"knob_ID":40,"Name":"global.cluster_name","Value":"9.6/main"},
  {"knob_ID":41,"Name":"global.commit_delay","Value":0},
  {"knob_ID":42,"Name":"global.commit_siblings","Value":5},
  {"knob_ID":43,"Name":"global.config_file","Value":"/etc/postgresql/9.6/main/postgresql.conf"},
  {"knob_ID":44,"Name":"global.constraint_exclusion","Value":"partition"},
  {"knob_ID":45,"Name":"global.cpu_index_tuple_cost","Value":0.01},
  {"knob_ID":46,"Name":"global.cpu_operator_cost","Value":0},
  {"knob_ID":47,"Name":"global.cpu_tuple_cost","Value":0.01},
  {"knob_ID":48,"Name":"global.cursor_tuple_fraction","Value":0.1},
  {"knob_ID":49,"Name":"global.data_checksums","Value":"off"},
  {"knob_ID":50,"Name":"global.data_directory","Value":"/var/lib/postgresql/9.6/main"},
  {"knob_ID":51,"Name":"global.db_user_namespace","Value":"off"},
  {"knob_ID":52,"Name":"global.deadlock_timeout","Value":"1s"},
  {"knob_ID":53,"Name":"global.debug_assertions","Value":"off"},
  {"knob_ID":54,"Name":"global.debug_pretty_print","Value":"on"},
  {"knob_ID":55,"Name":"global.debug_print_parse","Value":"off"},
  {"knob_ID":56,"Name":"global.debug_print_plan","Value":"off"},
  {"knob_ID":57,"Name":"global.debug_print_rewritten","Value":"off"},
  {"knob_ID":58,"Name":"global.default_statistics_target","Value":100},
  {"knob_ID":59,"Name":"global.default_tablespace","Value":""},
  {"knob_ID":60,"Name":"global.default_text_search_config","Value":"pg_catalog.english"},
  {"knob_ID":61,"Name":"global.default_transaction_deferrable","Value":"off"},
  {"knob_ID":62,"Name":"global.default_transaction_isolation","Value":"read committed"},
  {"knob_ID":63,"Name":"global.default_transaction_read_only","Value":"off"},
  {"knob_ID":64,"Name":"global.default_with_oids","Value":"off"},
  {"knob_ID":65,"Name":"global.dynamic_library_path","Value":"$libdir"},
  {"knob_ID":66,"Name":"global.dynamic_shared_memory_type","Value":"posix"},
  {"knob_ID":67,"Name":"global.effective_cache_size","Value":"4GB"},
  {"knob_ID":68,"Name":"global.effective_io_concurrency","Value":1},
  {"knob_ID":69,"Name":"global.enable_bitmapscan","Value":"on"},
  {"knob_ID":70,"Name":"global.enable_hashagg","Value":"on"},
  {"knob_ID":71,"Name":"global.enable_hashjoin","Value":"on"},
  {"knob_ID":72,"Name":"global.enable_indexonlyscan","Value":"on"},
  {"knob_ID":73,"Name":"global.enable_indexscan","Value":"on"},
  {"knob_ID":74,"Name":"global.enable_material","Value":"on"},
  {"knob_ID":75,"Name":"global.enable_mergejoin","Value":"on"},
  {"knob_ID":76,"Name":"global.enable_nestloop","Value":"on"},
  {"knob_ID":77,"Name":"global.enable_seqscan","Value":"on"},
  {"knob_ID":78,"Name":"global.enable_sort","Value":"on"},
  {"knob_ID":79,"Name":"global.enable_tidscan","Value":"on"},
  {"knob_ID":80,"Name":"global.escape_string_warning","Value":"on"},
  {"knob_ID":81,"Name":"global.event_source","Value":"PostgreSQL"},
  {"knob_ID":82,"Name":"global.exit_on_error","Value":"off"},
  {"knob_ID":83,"Name":"global.external_pid_file","Value":"/var/run/postgresql/9.6-main.pid"},
  {"knob_ID":84,"Name":"global.extra_float_digits","Value":3},
  {"knob_ID":85,"Name":"global.force_parallel_mode","Value":"off"},
  {"knob_ID":86,"Name":"global.from_collapse_limit","Value":8},
  {"knob_ID":87,"Name":"global.fsync","Value":"on"},
  {"knob_ID":88,"Name":"global.full_page_writes","Value":"on"},
  {"knob_ID":89,"Name":"global.geqo","Value":"on"},
  {"knob_ID":90,"Name":"global.geqo_effort","Value":5},
  {"knob_ID":91,"Name":"global.geqo_generations","Value":0},
  {"knob_ID":92,"Name":"global.geqo_pool_size","Value":0},
  {"knob_ID":93,"Name":"global.geqo_seed","Value":0},
  {"knob_ID":94,"Name":"global.geqo_selection_bias","Value":2},
  {"knob_ID":95,"Name":"global.geqo_threshold","Value":12},
  {"knob_ID":96,"Name":"global.gin_fuzzy_search_limit","Value":0},
  {"knob_ID":97,"Name":"global.gin_pending_list_limit","Value":"4MB"},
  {"knob_ID":98,"Name":"global.hba_file","Value":"/etc/postgresql/9.6/main/pg_hba.conf"},
  {"knob_ID":99,"Name":"global.hot_standby","Value":"off"},
  {"knob_ID":100,"Name":"global.hot_standby_feedback","Value":"off"},
  {"knob_ID":101,"Name":"global.huge_pages","Value":"try"},
  {"knob_ID":102,"Name":"global.ident_file","Value":"/etc/postgresql/9.6/main/pg_ident.conf"},
  {"knob_ID":103,"Name":"global.idle_in_transaction_session_timeout","Value":0},
  {"knob_ID":104,"Name":"global.ignore_checksum_failure","Value":"off"},
  {"knob_ID":105,"Name":"global.ignore_system_indexes","Value":"off"},
  {"knob_ID":106,"Name":"global.integer_datetimes","Value":"on"},
  {"knob_ID":107,"Name":"global.join_collapse_limit","Value":8},
  {"knob_ID":108,"Name":"global.krb_caseins_users","Value":"off"},
  {"knob_ID":109,"Name":"global.krb_server_keyfile","Value":"FILE:/etc/postgresql-common/krb5.keytab"},
  {"knob_ID":110,"Name":"global.lc_collate","Value":"en_US.UTF-8"},
  {"knob_ID":111,"Name":"global.lc_ctype","Value":"en_US.UTF-8"},
  {"knob_ID":112,"Name":"global.lc_messages","Value":"en_US.UTF-8"},
  {"knob_ID":113,"Name":"global.lc_monetary","Value":"en_US.UTF-8"},
  {"knob_ID":114,"Name":"global.lc_numeric","Value":"en_US.UTF-8"},
  {"knob_ID":115,"Name":"global.lc_time","Value":"en_US.UTF-8"},
  {"knob_ID":116,"Name":"global.listen_addresses","Value":"localhost"},
  {"knob_ID":117,"Name":"global.lo_compat_privileges","Value":"off"},
  {"knob_ID":118,"Name":"global.local_preload_libraries","Value":""},
  {"knob_ID":119,"Name":"global.lock_timeout","Value":0},
  {"knob_ID":120,"Name":"global.log_autovacuum_min_duration","Value":"-1"},
  {"knob_ID":121,"Name":"global.log_checkpoints","Value":"off"},
  {"knob_ID":122,"Name":"global.log_connections","Value":"off"},
  {"knob_ID":123,"Name":"global.log_destination","Value":"stderr"},
  {"knob_ID":124,"Name":"global.log_directory","Value":"pg_log"},
  {"knob_ID":125,"Name":"global.log_disconnections","Value":"off"},
  {"knob_ID":126,"Name":"global.log_duration","Value":"off"},
  {"knob_ID":127,"Name":"global.log_error_verbosity","Value":"default"},
  {"knob_ID":128,"Name":"global.log_executor_stats","Value":"off"},
  {"knob_ID":129,"Name":"global.log_file_mode","Value":600},
  {"knob_ID":130,"Name":"global.log_filename","Value":"postgresql-%Y-%m-%d_%H%M%S.log"},
  {"knob_ID":131,"Name":"global.log_hostname","Value":"off"},
  {"knob_ID":132,"Name":"global.log_line_prefix","Value":"%m [%p] %q%u@%d"},
  {"knob_ID":133,"Name":"global.log_lock_waits","Value":"off"},
  {"knob_ID":134,"Name":"global.log_min_duration_statement","Value":"-1"},
  {"knob_ID":135,"Name":"global.log_min_error_statement","Value":"error"},
  {"knob_ID":136,"Name":"global.log_min_messages","Value":"warning"},
  {"knob_ID":137,"Name":"global.log_parser_stats","Value":"off"},
  {"knob_ID":138,"Name":"global.log_planner_stats","Value":"off"},
  {"knob_ID":139,"Name":"global.log_replication_commands","Value":"off"},
  {"knob_ID":140,"Name":"global.log_rotation_age","Value":"1d"},
  {"knob_ID":141,"Name":"global.log_rotation_size","Value":"10MB"},
  {"knob_ID":142,"Name":"global.log_statement","Value":"none"},
  {"knob_ID":143,"Name":"global.log_statement_stats","Value":"off"},
  {"knob_ID":144,"Name":"global.log_temp_files","Value":"-1"},
  {"knob_ID":145,"Name":"global.log_timezone","Value":"PRC"},
  {"knob_ID":146,"Name":"global.log_truncate_on_rotation","Value":"off"},
  {"knob_ID":147,"Name":"global.logging_collector","Value":"off"},
  {"knob_ID":148,"Name":"global.maintenance_work_mem","Value":"64MB"},
  {"knob_ID":149,"Name":"global.max_connections","Value":100},
  {"knob_ID":150,"Name":"global.max_files_per_process","Value":1000},
  {"knob_ID":151,"Name":"global.max_function_args","Value":100},
  {"knob_ID":152,"Name":"global.max_identifier_length","Value":63},
  {"knob_ID":153,"Name":"global.max_index_keys","Value":32},
  {"knob_ID":154,"Name":"global.max_locks_per_transaction","Value":64},
  {"knob_ID":155,"Name":"global.max_parallel_workers_per_gather","Value":0},
  {"knob_ID":156,"Name":"global.max_pred_locks_per_transaction","Value":64},
  {"knob_ID":157,"Name":"global.max_prepared_transactions","Value":0},
  {"knob_ID":158,"Name":"global.max_replication_slots","Value":0},
  {"knob_ID":159,"Name":"global.max_stack_depth","Value":"2MB"},
  {"knob_ID":160,"Name":"global.max_standby_archive_delay","Value":"30s"},
  {"knob_ID":161,"Name":"global.max_standby_streaming_delay","Value":"30s"},
  {"knob_ID":162,"Name":"global.max_wal_senders","Value":0},
  {"knob_ID":163,"Name":"global.max_wal_size","Value":"1GB"},
  {"knob_ID":164,"Name":"global.max_worker_processes","Value":8},
  {"knob_ID":165,"Name":"global.min_parallel_relation_size","Value":"8MB"},
  {"knob_ID":166,"Name":"global.min_wal_size","Value":"80MB"},
  {"knob_ID":167,"Name":"global.old_snapshot_threshold","Value":"-1"},
  {"knob_ID":168,"Name":"global.operator_precedence_warning","Value":"off"},
  {"knob_ID":169,"Name":"global.parallel_setup_cost","Value":1000},
  {"knob_ID":170,"Name":"global.parallel_tuple_cost","Value":0.1},
  {"knob_ID":171,"Name":"global.password_encryption","Value":"on"},
  {"knob_ID":172,"Name":"global.port","Value":5432},
  {"knob_ID":173,"Name":"global.post_auth_delay","Value":0},
  {"knob_ID":174,"Name":"global.pre_auth_delay","Value":0},
  {"knob_ID":175,"Name":"global.quote_all_identifiers","Value":"off"},
  {"knob_ID":176,"Name":"global.random_page_cost","Value":4},
  {"knob_ID":177,"Name":"global.replacement_sort_tuples","Value":150000},
  {"knob_ID":178,"Name":"global.restart_after_crash","Value":"on"},
  {"knob_ID":179,"Name":"global.row_security","Value":"on"},
  {"knob_ID":180,"Name":"global.search_path","Value":"public"},
  {"knob_ID":181,"Name":"global.segment_size","Value":"1GB"},
  {"knob_ID":182,"Name":"global.seq_page_cost","Value":1},
  {"knob_ID":183,"Name":"global.server_encoding","Value":"UTF8"},
  {"knob_ID":184,"Name":"global.server_version","Value":"9.6.18"},
  {"knob_ID":185,"Name":"global.server_version_num","Value":90618},
  {"knob_ID":186,"Name":"global.session_preload_libraries","Value":""},
  {"knob_ID":187,"Name":"global.session_replication_role","Value":"origin"},
  {"knob_ID":188,"Name":"global.shared_buffers","Value":"128MB"},
  {"knob_ID":189,"Name":"global.shared_preload_libraries","Value":""},
  {"knob_ID":190,"Name":"global.sql_inheritance","Value":"on"},
  {"knob_ID":191,"Name":"global.ssl","Value":"on"},
  {"knob_ID":192,"Name":"global.ssl_ca_file","Value":""},
  {"knob_ID":193,"Name":"global.ssl_cert_file","Value":"/etc/ssl/certs/ssl-cert-snakeoil.pem"},
  {"knob_ID":194,"Name":"global.ssl_ciphers","Value":"HIGH:MEDIUM:+3DES:!aNULL"},
  {"knob_ID":195,"Name":"global.ssl_crl_file","Value":""},
  {"knob_ID":196,"Name":"global.ssl_ecdh_curve","Value":"prime256v1"},
  {"knob_ID":197,"Name":"global.ssl_key_file","Value":"/etc/ssl/private/ssl-cert-snakeoil.key"},
  {"knob_ID":198,"Name":"global.ssl_prefer_server_ciphers","Value":"on"},
  {"knob_ID":199,"Name":"global.standard_conforming_strings","Value":"on"},
  {"knob_ID":200,"Name":"global.statement_timeout","Value":0},
  {"knob_ID":201,"Name":"global.stats_temp_directory","Value":"/var/run/postgresql/9.6-main.pg_stat_tmp"},
  {"knob_ID":202,"Name":"global.superuser_reserved_connections","Value":3},
  {"knob_ID":203,"Name":"global.synchronize_seqscans","Value":"on"},
  {"knob_ID":204,"Name":"global.synchronous_commit","Value":"on"},
  {"knob_ID":205,"Name":"global.synchronous_standby_names","Value":""},
  {"knob_ID":206,"Name":"global.syslog_facility","Value":"local0"},
  {"knob_ID":207,"Name":"global.syslog_ident","Value":"postgres"},
  {"knob_ID":208,"Name":"global.syslog_sequence_numbers","Value":"on"},
  {"knob_ID":209,"Name":"global.syslog_split_messages","Value":"on"},
  {"knob_ID":210,"Name":"global.tcp_keepalives_count","Value":9},
  {"knob_ID":211,"Name":"global.tcp_keepalives_idle","Value":7200},
  {"knob_ID":212,"Name":"global.tcp_keepalives_interval","Value":75},
  {"knob_ID":213,"Name":"global.temp_buffers","Value":"8MB"},
  {"knob_ID":214,"Name":"global.temp_file_limit","Value":"-1"},
  {"knob_ID":215,"Name":"global.temp_tablespaces","Value":""},
  {"knob_ID":216,"Name":"global.timezone_abbreviations","Value":"Default"},
  {"knob_ID":217,"Name":"global.trace_notify","Value":"off"},
  {"knob_ID":218,"Name":"global.trace_recovery_messages","Value":"log"},
  {"knob_ID":219,"Name":"global.trace_sort","Value":"off"},
  {"knob_ID":220,"Name":"global.track_activities","Value":"on"},
  {"knob_ID":221,"Name":"global.track_activity_query_size","Value":1024},
  {"knob_ID":222,"Name":"global.track_commit_timestamp","Value":"off"},
  {"knob_ID":223,"Name":"global.track_counts","Value":"on"},
  {"knob_ID":224,"Name":"global.track_functions","Value":"all"},
  {"knob_ID":225,"Name":"global.track_io_timing","Value":"on"},
  {"knob_ID":226,"Name":"global.transaction_deferrable","Value":"off"},
  {"knob_ID":227,"Name":"global.transaction_isolation","Value":"read committed"},
  {"knob_ID":228,"Name":"global.transaction_read_only","Value":"off"},
  {"knob_ID":229,"Name":"global.transform_null_equals","Value":"off"},
  {"knob_ID":230,"Name":"global.unix_socket_directories","Value":"/var/run/postgresql"},
  {"knob_ID":231,"Name":"global.unix_socket_group","Value":""},
  {"knob_ID":232,"Name":"global.unix_socket_permissions","Value":777},
  {"knob_ID":233,"Name":"global.update_process_title","Value":"on"},
  {"knob_ID":234,"Name":"global.vacuum_cost_delay","Value":0},
  {"knob_ID":235,"Name":"global.vacuum_cost_limit","Value":200},
  {"knob_ID":236,"Name":"global.vacuum_cost_page_dirty","Value":20},
  {"knob_ID":237,"Name":"global.vacuum_cost_page_hit","Value":1},
  {"knob_ID":238,"Name":"global.vacuum_cost_page_miss","Value":10},
  {"knob_ID":239,"Name":"global.vacuum_defer_cleanup_age","Value":0},
  {"knob_ID":240,"Name":"global.vacuum_freeze_min_age","Value":50000000},
  {"knob_ID":241,"Name":"global.vacuum_freeze_table_age","Value":150000000},
  {"knob_ID":242,"Name":"global.vacuum_multixact_freeze_min_age","Value":5000000},
  {"knob_ID":243,"Name":"global.vacuum_multixact_freeze_table_age","Value":150000000},
  {"knob_ID":244,"Name":"global.wal_block_size","Value":8192},
  {"knob_ID":245,"Name":"global.wal_buffers","Value":"4MB"},
  {"knob_ID":246,"Name":"global.wal_compression","Value":"off"},
  {"knob_ID":247,"Name":"global.wal_keep_segments","Value":0},
  {"knob_ID":248,"Name":"global.wal_level","Value":"minimal"},
  {"knob_ID":249,"Name":"global.wal_log_hints","Value":"off"},
  {"knob_ID":250,"Name":"global.wal_receiver_status_interval","Value":"10s"},
  {"knob_ID":251,"Name":"global.wal_receiver_timeout","Value":"1min"},
  {"knob_ID":252,"Name":"global.wal_retrieve_retry_interval","Value":"5s"},
  {"knob_ID":253,"Name":"global.wal_segment_size","Value":"16MB"},
  {"knob_ID":254,"Name":"global.wal_sender_timeout","Value":"1min"},
  {"knob_ID":255,"Name":"global.wal_sync_method","Value":"fdatasync"},
  {"knob_ID":256,"Name":"global.wal_writer_delay","Value":"200ms"},
  {"knob_ID":257,"Name":"global.wal_writer_flush_after","Value":"1MB"},
  {"knob_ID":258,"Name":"global.work_mem","Value":"4MB"},
  {"knob_ID":259,"Name":"global.xmlbinary","Value":"base64"},
  {"knob_ID":260,"Name":"global.xmloption","Value":"content"},
  {"knob_ID":261,"Name":"global.zero_damaged_pages","Value":"off"}
  ];

var metricData = [
  {"metric_id":1,"metricName":"pg_stat_archiver.failed_count","vartype":2,"summary":"Number of failed attempts for archiving WAL files","scope":"global"},
  {"metric_id":2,"metricName":"pg_stat_archiver.archived_count","vartype":2,"summary":"Number of WAL files that have been successfully archived","scope":"global"},
  {"metric_id":3,"metricName":"pg_stat_archiver.stats_reset","vartype":6,"summary":"Time at which these statistics were last reset","scope":"global"},
  {"metric_id":4,"metricName":"pg_stat_archiver.last_archived_time","vartype":6,"summary":"Time of the last successful archive operation","scope":"global"},
  {"metric_id":5,"metricName":"pg_stat_archiver.last_failed_time","vartype":6,"summary":"Time of the last failed archival operation","scope":"global"},
  {"metric_id":6,"metricName":"pg_stat_archiver.last_failed_wal","vartype":1,"summary":"Name of the WAL file of the last failed archival operation","scope":"global"},
  {"metric_id":7,"metricName":"pg_stat_archiver.last_archived_wal","vartype":1,"summary":"Name of the last WAL file successfully archived","scope":"global"},
  {"metric_id":8,"metricName":"pg_stat_bgwriter.buffers_backend","vartype":2,"summary":"Number of buffers written directly by a backend","scope":"global"},
  {"metric_id":9,"metricName":"pg_stat_bgwriter.checkpoints_timed","vartype":2,"summary":"Number of scheduled checkpoints that have been performed","scope":"global"},
  {"metric_id":10,"metricName":"pg_stat_bgwriter.buffers_alloc","vartype":2,"summary":"Number of buffers allocated","scope":"global"},
  {"metric_id":11,"metricName":"pg_stat_bgwriter.buffers_clean","vartype":2,"summary":"Number of buffers written by the background writer","scope":"global"},
  {"metric_id":12,"metricName":"pg_stat_bgwriter.buffers_backend_fsync","vartype":2,"summary":"Number of times a backend had to execute its own fsync call (normally the background writer handles those even when the backend does its own write)","scope":"global"},
  {"metric_id":13,"metricName":"pg_stat_bgwriter.checkpoint_sync_time","vartype":2,"summary":"Total amount of time that has been spent in the portion of checkpoint processing where files are synchronized to disk, in milliseconds","scope":"global"},
  {"metric_id":14,"metricName":"pg_stat_bgwriter.checkpoints_req","vartype":2,"summary":"Number of requested checkpoints that have been performed","scope":"global"},
  {"metric_id":15,"metricName":"pg_stat_bgwriter.checkpoint_write_time","vartype":2,"summary":"Total amount of time that has been spent in the portion of checkpoint processing where files are written to disk, in milliseconds","scope":"global"},
  {"metric_id":16,"metricName":"pg_stat_bgwriter.maxwritten_clean","vartype":2,"summary":"Number of times the background writer stopped a cleaning scan because it had written too many buffers","scope":"global"},
  {"metric_id":17,"metricName":"pg_stat_bgwriter.buffers_checkpoint","vartype":2,"summary":"Number of buffers written during checkpoints","scope":"global"},
  {"metric_id":18,"metricName":"pg_stat_bgwriter.stats_reset","vartype":6,"summary":"Time at which these statistics were last reset","scope":"global"},
  {"metric_id":19,"metricName":"pg_stat_database.numbackends","vartype":2,"summary":"Number of backends currently connected to this database. This is the only column in this view that returns a value reflecting current state; all other columns return the accumulated values since the last reset.","scope":"database"},
  {"metric_id":20,"metricName":"pg_stat_database.datname","vartype":1,"summary":"Name of this database","scope":"database"},
  {"metric_id":21,"metricName":"pg_stat_database.blks_read","vartype":2,"summary":"Number of disk blocks read in this database","scope":"database"},
  {"metric_id":22,"metricName":"pg_stat_database.deadlocks","vartype":2,"summary":"Number of deadlocks detected in this database","scope":"database"},
  {"metric_id":23,"metricName":"pg_stat_database.tup_fetched","vartype":2,"summary":"Number of rows fetched by queries in this database","scope":"database"},
  {"metric_id":24,"metricName":"pg_stat_database.tup_updated","vartype":2,"summary":"Number of rows updated by queries in this database","scope":"database"},
  {"metric_id":25,"metricName":"pg_stat_database.stats_reset","vartype":6,"summary":"Time at which these statistics were last reset","scope":"database"},
  {"metric_id":26,"metricName":"pg_stat_database.tup_inserted","vartype":2,"summary":"Number of rows inserted by queries in this database","scope":"database"},
  {"metric_id":27,"metricName":"pg_stat_database.datid","vartype":2,"summary":"OID of a database","scope":"database"},
  {"metric_id":28,"metricName":"pg_stat_database.xact_commit","vartype":2,"summary":"Number of transactions in this database that have been committed","scope":"database"},
  {"metric_id":29,"metricName":"pg_stat_database.tup_deleted","vartype":2,"summary":"Number of rows deleted by queries in this database","scope":"database"},
  {"metric_id":30,"metricName":"pg_stat_database.blk_read_time","vartype":3,"summary":"Time spent reading data file blocks by backends in this database, in milliseconds","scope":"database"},
  {"metric_id":31,"metricName":"pg_stat_database.xact_rollback","vartype":2,"summary":"Number of transactions in this database that have been rolled back","scope":"database"},
  {"metric_id":32,"metricName":"pg_stat_database.conflicts","vartype":2,"summary":"Number of queries canceled due to conflicts with recovery in this database. (Conflicts occur only on standby servers; see pg_stat_database_conflicts for details.)","scope":"database"},
  {"metric_id":33,"metricName":"pg_stat_database.blks_hit","vartype":2,"summary":"Number of times disk blocks were found already in the buffer cache, so that a read was not necessary (this only includes hits in the PostgreSQL buffer cache, not the operating system's file system cache)","scope":"database"},
  {"metric_id":34,"metricName":"pg_stat_database.tup_returned","vartype":2,"summary":"Number of rows returned by queries in this database","scope":"database"},
  {"metric_id":35,"metricName":"pg_stat_database.temp_files","vartype":2,"summary":"Number of temporary files created by queries in this database. All temporary files are counted, regardless of why the temporary file was created (e.g., sorting or hashing), and regardless of the log_temp_files setting.","scope":"database"},
  {"metric_id":36,"metricName":"pg_stat_database.blk_write_time","vartype":3,"summary":"Time spent writing data file blocks by backends in this database, in milliseconds","scope":"database"},
  {"metric_id":37,"metricName":"pg_stat_database.temp_bytes","vartype":2,"summary":"Total amount of data written to temporary files by queries in this database. All temporary files are counted, regardless of why the temporary file was created, and regardless of the log_temp_files setting.","scope":"database"},
  {"metric_id":38,"metricName":"pg_stat_database_conflicts.datname","vartype":1,"summary":"Name of this database","scope":"database"},
  {"metric_id":39,"metricName":"pg_stat_database_conflicts.confl_deadlock","vartype":2,"summary":"Number of queries in this database that have been canceled due to deadlocks","scope":"database"},
  {"metric_id":40,"metricName":"pg_stat_database_conflicts.confl_bufferpin","vartype":2,"summary":"Number of queries in this database that have been canceled due to pinned buffers","scope":"database"},
  {"metric_id":41,"metricName":"pg_stat_database_conflicts.datid","vartype":2,"summary":"OID of a database","scope":"database"},
  {"metric_id":42,"metricName":"pg_stat_database_conflicts.confl_tablespace","vartype":2,"summary":"Number of queries in this database that have been canceled due to dropped tablespaces","scope":"database"},
  {"metric_id":43,"metricName":"pg_stat_database_conflicts.confl_lock","vartype":2,"summary":"Number of queries in this database that have been canceled due to lock timeouts","scope":"database"},
  {"metric_id":44,"metricName":"pg_stat_database_conflicts.confl_snapshot","vartype":2,"summary":"Number of queries in this database that have been canceled due to old snapshots","scope":"database"},
  {"metric_id":45,"metricName":"pg_stat_user_indexes.indexrelid","vartype":2,"summary":"OID of this index","scope":"index"},
  {"metric_id":46,"metricName":"pg_stat_user_indexes.relid","vartype":2,"summary":"OID of the table for this index","scope":"index"},
  {"metric_id":47,"metricName":"pg_stat_user_indexes.indexrelname","vartype":1,"summary":"Name of this index","scope":"index"},
  {"metric_id":48,"metricName":"pg_stat_user_indexes.relname","vartype":1,"summary":"Name of the table for this index","scope":"index"},
  {"metric_id":49,"metricName":"pg_stat_user_indexes.idx_tup_fetch","vartype":2,"summary":"Number of live table rows fetched by simple index scans using this index","scope":"index"},
  {"metric_id":50,"metricName":"pg_stat_user_indexes.idx_tup_read","vartype":2,"summary":"Number of index entries returned by scans on this index","scope":"index"},
  {"metric_id":51,"metricName":"pg_stat_user_indexes.idx_scan","vartype":2,"summary":"Number of index scans initiated on this index","scope":"index"},
  {"metric_id":52,"metricName":"pg_stat_user_indexes.schemaname","vartype":1,"summary":"Name of the schema this index is in","scope":"index"},
  {"metric_id":53,"metricName":"pg_stat_user_tables.last_vacuum","vartype":6,"summary":"Last time at which this table was manually vacuumed (not counting VACUUM FULL)","scope":"table"},
  {"metric_id":54,"metricName":"pg_stat_user_tables.n_tup_ins","vartype":2,"summary":"Number of rows inserted","scope":"table"},
  {"metric_id":55,"metricName":"pg_stat_user_tables.n_dead_tup","vartype":2,"summary":"Estimated number of dead rows","scope":"table"},
  {"metric_id":56,"metricName":"pg_stat_user_tables.last_analyze","vartype":6,"summary":"Last time at which this table was manually analyzed","scope":"table"},
  {"metric_id":57,"metricName":"pg_stat_user_tables.idx_tup_fetch","vartype":2,"summary":"Number of live rows fetched by index scans","scope":"table"},
  {"metric_id":58,"metricName":"pg_stat_user_tables.n_tup_upd","vartype":2,"summary":"Number of rows updated","scope":"table"},
  {"metric_id":59,"metricName":"pg_stat_user_tables.schemaname","vartype":1,"summary":"Name of the schema that this table is in","scope":"table"},
  {"metric_id":60,"metricName":"pg_stat_user_tables.seq_tup_read","vartype":2,"summary":"Number of live rows fetched by sequential scans","scope":"table"},
  {"metric_id":61,"metricName":"pg_stat_user_tables.vacuum_count","vartype":2,"summary":"Number of times this table has been manually vacuumed (not counting VACUUM FULL)","scope":"table"},
  {"metric_id":62,"metricName":"pg_stat_user_tables.n_mod_since_analyze","vartype":2,"summary":"Estimated number of rows modified since this table was last analyzed","scope":"table"},
  {"metric_id":63,"metricName":"pg_stat_user_tables.n_tup_del","vartype":2,"summary":"Number of rows deleted","scope":"table"},
  {"metric_id":64,"metricName":"pg_stat_user_tables.last_autovacuum","vartype":6,"summary":"Last time at which this table was vacuumed by the autovacuum daemon","scope":"table"},
  {"metric_id":65,"metricName":"pg_stat_user_tables.seq_scan","vartype":2,"summary":"Number of sequential scans initiated on this table","scope":"table"},
  {"metric_id":66,"metricName":"pg_stat_user_tables.relid","vartype":2,"summary":"OID of a table","scope":"table"},
  {"metric_id":67,"metricName":"pg_stat_user_tables.n_tup_hot_upd","vartype":2,"summary":"Number of rows HOT updated (i.e., with no separate index update required)","scope":"table"},
  {"metric_id":68,"metricName":"pg_stat_user_tables.autoanalyze_count","vartype":2,"summary":"Number of times this table has been analyzed by the autovacuum daemon","scope":"table"},
  {"metric_id":69,"metricName":"pg_stat_user_tables.n_live_tup","vartype":2,"summary":"Estimated number of live rows","scope":"table"},
  {"metric_id":70,"metricName":"pg_stat_user_tables.relname","vartype":1,"summary":"Name of this table","scope":"table"},
  {"metric_id":71,"metricName":"pg_stat_user_tables.last_autoanalyze","vartype":6,"summary":"Last time at which this table was analyzed by the autovacuum daemon","scope":"table"},
  {"metric_id":72,"metricName":"pg_stat_user_tables.idx_scan","vartype":2,"summary":"Number of index scans initiated on this table","scope":"table"},
  {"metric_id":73,"metricName":"pg_stat_user_tables.autovacuum_count","vartype":2,"summary":"Number of times this table has been vacuumed by the autovacuum daemon","scope":"table"},
  {"metric_id":74,"metricName":"pg_stat_user_tables.analyze_count","vartype":2,"summary":"Number of times this table has been manually analyzed","scope":"table"},
  {"metric_id":75,"metricName":"pg_statio_user_indexes.indexrelid","vartype":2,"summary":"OID of this index","scope":"index"},
  {"metric_id":76,"metricName":"pg_statio_user_indexes.relid","vartype":2,"summary":"OID of the table for this index","scope":"index"},
  {"metric_id":77,"metricName":"pg_statio_user_indexes.indexrelname","vartype":1,"summary":"Name of this index","scope":"index"},
  {"metric_id":78,"metricName":"pg_statio_user_indexes.idx_blks_hit","vartype":2,"summary":"Number of buffer hits in this index","scope":"index"},
  {"metric_id":79,"metricName":"pg_statio_user_indexes.relname","vartype":1,"summary":"Name of the table for this index","scope":"index"},
  {"metric_id":80,"metricName":"pg_statio_user_indexes.idx_blks_read","vartype":2,"summary":"Number of disk blocks read from this index","scope":"index"},
  {"metric_id":81,"metricName":"pg_statio_user_indexes.schemaname","vartype":1,"summary":"Name of the schema this index is in","scope":"index"},
  {"metric_id":82,"metricName":"pg_statio_user_tables.relid","vartype":2,"summary":"OID of a table","scope":"table"},
  {"metric_id":83,"metricName":"pg_statio_user_tables.heap_blks_hit","vartype":2,"summary":"Number of buffer hits in this table","scope":"table"},
  {"metric_id":84,"metricName":"pg_statio_user_tables.tidx_blks_read","vartype":2,"summary":"Number of disk blocks read from this table's TOAST table index (if any)","scope":"table"},
  {"metric_id":85,"metricName":"pg_statio_user_tables.tidx_blks_hit","vartype":2,"summary":"Number of buffer hits in this table's TOAST table index (if any)","scope":"table"},
  {"metric_id":86,"metricName":"pg_statio_user_tables.toast_blks_hit","vartype":2,"summary":"Number of buffer hits in this table's TOAST table (if any)","scope":"table"},
  {"metric_id":87,"metricName":"pg_statio_user_tables.idx_blks_hit","vartype":2,"summary":"Number of buffer hits in all indexes on this table","scope":"table"},
  {"metric_id":88,"metricName":"pg_statio_user_tables.relname","vartype":1,"summary":"Name of this table","scope":"table"},
  {"metric_id":89,"metricName":"pg_statio_user_tables.toast_blks_read","vartype":2,"summary":"Number of disk blocks read from this table's TOAST table (if any)","scope":"table"},
  {"metric_id":90,"metricName":"pg_statio_user_tables.idx_blks_read","vartype":2,"summary":"Number of disk blocks read from all indexes on this table","scope":"table"},
  {"metric_id":91,"metricName":"pg_statio_user_tables.schemaname","vartype":1,"summary":"Name of the schema that this table is in","scope":"table"},
  {"metric_id":92,"metricName":"pg_statio_user_tables.heap_blks_read","vartype":2,"summary":"Number of disk blocks read from this table","scope":"table"},
  {"metric_id":93,"metricName":"pg_stat_user_tables.n_dead_tup","vartype":2,"summary":"Estimated number of dead rows","scope":"table"},
  {"metric_id":94,"metricName":"pg_stat_user_tables.n_mod_since_analyze","vartype":2,"summary":"Estimated number of rows modified since this table was last analyzed","scope":"table"},
  {"metric_id":95,"metricName":"pg_stat_user_tables.n_live_tup","vartype":2,"summary":"Estimated number of live rows","scope":"table"} 

  ];

layui.config({
                version: 1,
                base: 'layui/' //这个就是你放Echart.js的目录
}).use(['element', 'echarts', 'ecStat'], function() {});

var element = layui.element, $ = layui.jquery, echarts = layui.echarts, ecStat = layui.ecStat;

var targetObjective = echarts.init(document.getElementById('targetObjective'));   
var pruneMetric = echarts.init(document.getElementById('pruneMetric'));   
var knobChange  = echarts.init(document.getElementById('knobChange')); 

var optionchartZhe = {
    title: {
        // text: 'throughput(transactions/second)'
        text: 'targetObjective'
    },
    tooltip: {},
    legend: { //顶部显示 与series中的数据类型的name一致
        data: ['throughput']
    },
    xAxis: {
        // type: 'category',
        // boundaryGap: false, //从起点开始
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    yAxis: {
        // name:'吞吐量',
        type: 'value'
        ,scale:true
    },
    series: [{
        name: 'throughput',
        type: 'line', //线性
        data: [605, 650, 580, 610, 600, 680, 700, 690, 650, 715]
    }]
};

var optionchartZhe1 = {
    title: {
        text: 'shared_buffers (kb)'
    },
    tooltip: {},
    // legend: { 
    //     // data: ['throughput']
    // },
    xAxis: {
        // type: 'category',
        // boundaryGap: false, //从起点开始
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    yAxis: {
        // name:'吞吐量',
        type: 'value'
        ,scale:true
    },
    series: [{
        name: 'shared_buffers',
        type: 'line', //线性
        data: [131072, 531072, 831072, 731072, 1211072, 2001072, 2731072, 2601072, 3331072, 3932072]
    }]
};

targetObjective.setOption(optionchartZhe, true);
knobChange.setOption(optionchartZhe1, true);

  // import ecStat from 'echarts-stat';

var chartDom = document.getElementById('pruneMetric');
var myChart = echarts.init(chartDom);
var option;

// See https://github.com/ecomfe/echarts-stat
echarts.registerTransform(ecStat.transform.clustering);

var cluster_data = [
    [3.275154, 2.957587],
    [-3.344465, 2.603513],
    [0.355083, -3.376585],
    [1.852435, 3.547351],
    [-2.078973, 2.552013],
    [-0.993756, -0.884433],
    [2.682252, 4.007573],
    [-3.087776, 2.878713],
    [-1.565978, -1.256985],
    [2.441611, 0.444826],
    [-0.659487, 3.111284],
    [-0.459601, -2.618005],
    [2.17768, 2.387793],
    [-2.920969, 2.917485],
    [-0.028814, -4.168078],
    [3.625746, 2.119041],
    [-3.912363, 1.325108],
    [-0.551694, -2.814223],
    [2.855808, 3.483301],
    [-3.594448, 2.856651],
    [0.421993, -2.372646],
    [1.650821, 3.407572],
    [-2.082902, 3.384412],
    [-0.718809, -2.492514],
    [4.513623, 3.841029],
    [-4.822011, 4.607049],
    [-0.656297, -1.449872],
    [1.919901, 4.439368],
    [-3.287749, 3.918836],
    [-1.576936, -2.977622],
    [3.598143, 1.97597],
    [-3.977329, 4.900932],
    [-1.79108, -2.184517],
    [3.914654, 3.559303],
    [-1.910108, 4.166946],
    [-1.226597, -3.317889],
    [1.148946, 3.345138],
    [-2.113864, 3.548172],
    [0.845762, -3.589788],
    [2.629062, 3.535831],
    [-1.640717, 2.990517],
    [-1.881012, -2.485405],
    [4.606999, 3.510312],
    [-4.366462, 4.023316],
    [0.765015, -3.00127],
    [3.121904, 2.173988],
    [-4.025139, 4.65231],
    [-0.559558, -3.840539],
    [4.376754, 4.863579],
    [-1.874308, 4.032237],
    [-0.089337, -3.026809],
    [3.997787, 2.518662],
    [-3.082978, 2.884822],
    [0.845235, -3.454465],
    [1.327224, 3.358778],
    [-2.889949, 3.596178],
    [-0.966018, -2.839827],
    [2.960769, 3.079555],
    [-3.275518, 1.577068],
    [0.639276, -3.41284]
];

var CLUSTER_COUNT = 3;
var DIENSIION_CLUSTER_INDEX = 2;
var COLOR_ALL = [
    '#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48', '#8378EA', '#96BFFF'
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
    pieces.push({
        value: i,
        label: 'cluster ' + i,
        color: COLOR_ALL[i]
    });
}

option = {
    title: {
        text: 'prune metric'
        ,textAlign: 'auto'
    },
    dataset: [{
        source: cluster_data
    }, {
        transform: {
            type: 'ecStat:clustering',
            // print: true,
            config: {
                clusterCount: CLUSTER_COUNT,
                outputType: 'single',
                outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
            }
        }
    }],
    tooltip: {
        position: 'top'
    },

    visualMap: {
        type: 'piecewise',
        top: 'middle',
        min: 0,
        max: CLUSTER_COUNT,
        left: 10,
        splitNumber: CLUSTER_COUNT,
        dimension: DIENSIION_CLUSTER_INDEX,
        pieces: pieces
    },
    grid: {
        left: 120
    },
    xAxis: {
    },
    yAxis: {
    },
    series: {
        type: 'scatter',
        encode: { tooltip: [0, 1] },
        symbolSize: 15,
        itemStyle: {
            borderColor: '#555'
        },
        datasetIndex: 1
    }
};

option && myChart.setOption(option);


layui.use('table', function(){
  var table = layui.table;
  
  table.render({
    elem: '#test'
    ,even: true //开启隔行背景
    // ,url:'/demo/table/user/'
    ,data:data
    ,toolbar: '#toolbarDemo'
    ,cols: [[
      {type:'radio'}
      ,{field:'id', width:120, sort: true,title:'ID'}
      ,{field:'sessionName', width:120, templet: '#sessionnameTpl', title: '会话名称'}
      ,{field:'DBMS', width:150,  templet: '#dbmsTpl', title: 'DBMS', sort: true}
      ,{field:'targetObjective', width:150, title: '优化目标'}
      ,{field:'algorithm' , width:200, title: '使用算法', minWidth: 100}
      ,{field:'description', title: '描述'}
      ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
    ]]
    // ,page: true
    ,page:{
      elem: 'demo7'
      ,theme: '#393D49'
      ,count: 100
      ,limit: 5
      ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
      ,limits: [5, 10 ,15 ,20 ,30, 40, 50]
     ,jump: function(obj){
      console.log(obj)
      }}
  });

  table.render({
    elem: '#selectKnobs'
    ,even: true //开启隔行背景
    // ,url:'/demo/table/user/'
    ,defaultToolbar: []
    ,data:data
    // ,toolbar: '#toolbarKnob'
    ,cols: [[
      {type:'checkbox'}
      ,{field:'knob', sort: true,title:'knob'}
    ]]
    // ,page: true
    ,data:[{"knob": "global.shared_buffers"},
          {"knob": "global.autovacuum"},
          {"knob": "global.effective_cache_size"},
          {"knob": "global.maintenance_work_mem"},
          {"knob": "global.max_wal_size"},
          {"knob": "global.max_worker_processes"},
          {"knob": "global.archive_mode"},
          {"knob": "global.temp_buffers"},
          {"knob": "global.wal_buffers"},
          {"knob": "global.work_mem"}]
    ,page:{
      elem: 'demo7'
      ,theme: '#393D49'
      ,count: 100
      ,limit: 5
      ,limits: [5, 10 ,15 ,20 ,30, 40, 50]
      ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
      ,jump: function(obj){
        console.log(obj)
    }}
  });


  //监听行单击事件（双击事件为：rowDouble）
  table.on('checkbox(selectKnobs)', function(obj){
    var data = obj.data;


    console.log(data.knob)
    console.log(data.knob.toString())
    // var html = "<div id='knobChange"+data.knob.toString()+" "+"'style='width: 100%;min-height:400px'> </div>"
    var html = "<div id='knobChange"+data.knob.toString()+"' "+"style='width: 100%;min-height:400px'> </div>"
    console.log(html)
    $('#knobChangeDIV').append(html);

    echarts.init(document.getElementById('knobChange'+data.knob.toString())).setOption(optionchartZhe1, true);

  //   layer.alert(JSON.stringify(data), {
  //     title: '当前行数据：'
  // });

 });

  //头工具栏事件
  table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'addSession':
                addSession();
                break;
        }
  });

  // 加载全部knob 
  $(document).on('click',"#loadAllKnob",function(){
        layer.msg("加载中");
    layui.table.render({
      elem: '#knobdata'
      ,even: true //开启隔行背景
      // ,url:'/demo/table/user/'
      ,data:knobData
      // ,toolbar: '#toolbarDemo'
      ,cols: [[
        // {type:'radio'}
        {field:'knob_ID', width:150, title:'knob_id'}
        ,{field:'Name', templet: '#sessionnameTpl', title: 'knob'}
        ,{field:'Value', templet: '#dbmsTpl', title: 'value', sort: true}
      ]]
      // ,page: true
      ,page:{
        elem: 'demo7'
        ,theme: '#393D49'
        ,count: 100
        ,limit: 10
        ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
        ,limits: [10 ,15 ,20 ,30, 40, 50, 100]
       ,jump: function(obj){
        console.log(obj)
        }}
    })
 });

  // 加载全部metric 
  $(document).on('click',"#loadAllMetric",function(){
        layer.msg("加载中");
    layui.table.render({
      elem: '#metricdata'
      ,even: true //开启隔行背景
      // ,url:'/demo/table/user/'
      ,data:metricData
      // ,data :[{"metric_id":1,"metricName":"pg_stat_archiver.failed_count","vartype":2,"summary":"Number of failed attempts for archiving WAL files","scope":"global"}]
      // ,toolbar: '#toolbarDemo'
      ,cols: [[
        // {type:'radio'}
        {field:'metric_id', width:150, title:'metric_id'}
        ,{field:'metricName', title: 'metricName'}
        ,{field:'vartype',  width:150, title: 'vartype'}
        ,{field:'summary', title: 'summary'}
        ,{field:'scope',  width:150, title: 'scope', sort: true}
      ]]
      // ,page: true
      ,page:{
        elem: 'demo7'
        ,theme: '#393D49'
        ,count: 100
        ,limit: 10
        ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
        ,limits: [10 ,15 ,20 ,30, 40, 50, 100]
       ,jump: function(obj){
        console.log(obj)
        }}
    })
 });

  //添加
  function addSession() {
        var index = layui.layer.open({
            title: "添加Session",
            type: 2,
            offset: 'auto',
            area:['35%','50%'],
            // content: "addStu.html",
            content: "optimization/addSession.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                setTimeout(function () {
                    layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
  };


  //监听行工具事件
  table.on('tool(test)', function(obj){
    var data = obj.data;
    //console.log(obj)
    if(obj.event === 'del'){
      layer.confirm('真的删除么', function(index){
        obj.del();
        layer.close(index);
      });
    } else if(obj.event === 'edit'){
      // layer.prompt({
      //   formType: 2
      //   ,value: data.email
      // }, function(value, index){
      //   obj.update({
      //     email: value
      //   });
      //   layer.close(index);
      // });
       layer.confirm('确定启用吗？', function(index){
        layer.close(index);
      });    
     }
  });

});

  }
}
</script>

<style>

</style>