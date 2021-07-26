  <template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="title" label="标题" width="180"> </el-table-column>
    <el-table-column prop="content" label="内容"> </el-table-column>
    <el-table-column prop="time" label="发布时间"> </el-table-column>
    <el-table-column prop="publisher" label="发布人"> </el-table-column>
    <el-table-column prop="building_id" label="楼栋"> </el-table-column>
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
      axios.get('http://localhost:9091/springboot/student/notice?student_id=1').then(response => 
        {
          this.tableData = response.data.data
          console.log(this.tableData)
        });
  },
};
</script>