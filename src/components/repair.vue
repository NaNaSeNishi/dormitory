  <template>
  <div id="re">
    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="stu_name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="building_name" label="楼栋"> </el-table-column>
      <el-table-column prop="dormitory" label="宿舍号"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="apply_date" label="日期"> </el-table-column>
      <el-table-column prop="state" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="addForm" label-width="70px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="宿舍" prop="dor">
          <el-input v-model="addForm.dor"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="addForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
      v-model="addForm.date"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData1: [],
      dialogVisible: false,
      addForm: {
        username: "",
        dor: "",
        describe: "",
        date: "",
      },
    };
  },
  created() {
    var i = window.sessionStorage.getItem("userid");
    axios
      .get(
        "http://localhost:9091/springboot/repair" + "?student_id=" + Number(i)
      )
      .then((response) => {
        console.log(response.data)
        this.tableData1 = response.data.data;
        console.log(this.tableData1);
      });
  },
  methods: {
    addUser() {
      var that = this;
      axios
        .post("http://localhost:9091/springboot/repair/add", {
          username: this.addForm.username,
          dormitory: this.addForm.dormitory,
          describe: this.addForm.describe,
          date: "2021-07-13 11:26:55",
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            alert("添加成功");
            var i = window.sessionStorage.getItem("userid");
            axios
              .get(
                "http://localhost:9091/springboot/repair" +
                  "?student_id=" +
                  Number(i)
              )
              .then((response) => {
                that.tableData1 = response.data.data;
                console.log(that.tableData1);
              });
          }
        });
    },

    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("删除该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var that = this;
        axios
          .delete("http://localhost:9091/springboot/repair/del" + "?id="+row.id)
          .then((response) => {
            if (response.data.code == 200) {
              var i = window.sessionStorage.getItem("userid");
              axios
                .get("http://localhost:9091/springboot/repair" +
                  "?student_id=" +
                  Number(i))
                .then((response) => {
                  that.tableData1 = response.data.data;
                  console.log(that.tableData1);
                });
            }
          });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
};
</script>

<style scoped>
#re {
  text-align: left;
}
</style>