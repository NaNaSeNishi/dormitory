  <template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="building_name" label="楼栋"> </el-table-column>
    <el-table-column prop="dormitory_num" label="宿舍号"> </el-table-column>
    <el-table-column prop="start_time" label="开始时间"> </el-table-column>
    <el-table-column prop="end_time" label="结束时间"> </el-table-column>
    <el-table-column prop="remark" label="备注"> </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
    };
  },
        created() {
        var i = window.sessionStorage.getItem("userid");
      axios.get('http://localhost:9091/springboot/absence'+'?student_id='+Number(i)).then(response => 
        {
          this.tableData = response.data.data
          console.log(this.tableData)
        });
  },
};
</script>