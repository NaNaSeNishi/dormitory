  <template>
  <div id="re">
    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="dormitory" label="宿舍"> </el-table-column>
      <el-table-column prop="describe" label="描述"> </el-table-column>
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
    <div class="block" style="margin-top: 15px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="添加报修" :visible.sync="dialogVisible" width="50%">
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
          <el-input v-model="addForm.date"></el-input>
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
        date: Date(),
      },
      currentPage: 0,
      total: 0,
      pageSize: 5,
    };
  },
  created() {
    this.getlivestockInfo(1);
  },
  methods: {
    addUser() {
      axios
        .post("http://localhost:9091/springboot/repair/add", {
          username: this.addForm.username,
          dormitory: this.addForm.dormitory,
          describe: this.addForm.describe,
          date: "2021-07-13 11:26:51",
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            alert("添加成功");
            axios
              .get("http://localhost:9091/springboot/houseparent/queryrepair", {
                params: {
                  page: 1,
                  pageSize: this.pageSize,
                },
              })
              .then((response) => {
                // 请求成功
                console.log("请求成功");
                console.log(response.data);
                this.tableData1 = response.data.data.list;
                this.pageSize = this.pageSize;
                this.total = response.data.data.total;
              });
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      console.log(this.pageSize);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getlivestockInfo(val);
    },
    getlivestockInfo(num1) {
      axios
        .get("http://localhost:9091/springboot/houseparent/queryrepair", {
          params: {
            page: num1,
            pageSize: this.pageSize,
          },
        })
        .then((response) => {
          // 请求成功
          console.log("请求成功");
          console.log(response.data);
          this.tableData1 = response.data.data.list;
          this.currentPage = num1;
          this.pageSize = this.pageSize;
          this.total = response.data.data.total;
        })
        .catch((error) => {
          // 请求失败
          console.log("请求失败");
          console.log(error);
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("删除该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios
          .delete("http://localhost:9091/springboot/repair/del?id=" + row.id)
          .then((response) => {
            if (response.data.code == 200) {
              axios
                .get(
                  "http://localhost:9091/springboot/houseparent/queryrepair",
                  {
                    params: {
                      page: 1,
                      pageSize: this.pageSize,
                    },
                  }
                )
                .then((response) => {
                  // 请求成功
                  console.log("请求成功");
                  console.log(response.data);
                  this.tableData1 = response.data.data.list;
                  this.pageSize = this.pageSize;
                  this.total = response.data.data.total;
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