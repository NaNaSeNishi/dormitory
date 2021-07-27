  <template>
  <div id="ta">
    <div>
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      <el-input v-model="findvis" placeholder="请输入来访者姓名"></el-input>
      <el-button type="primary" @click="findbyvisname">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="start_time" label="开始时间"> </el-table-column>
      <el-table-column prop="end_time" label="结束时间"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
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
    <el-dialog title="添加来访者" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="addForm" label-width="70px">
        <el-form-item label="姓名" prop="visname">
          <el-input v-model="addForm.visname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="学生" prop="stu_id">
          <el-input v-model="addForm.stu_id"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker
      v-model="addForm.start_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
         <el-date-picker
      v-model="addForm.end_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addabsence">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      findvis: "",
      tableData: [],
      dialogVisible: false,
      addForm: {
        visname: "",
        sex: "",
        phone:"",
        stu_id: "",
        start_time: "",
        end_time: "",
        remark: "",
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
    findbyvisname() {
      axios
        .get("http://localhost:9091/springboot/houseparent/queryvisitor",{
                  params: {
                    name:this.findvis,
                    page: 1,
                    pageSize: 5,
                  },
                })
        .then((response) => {
          this.tableData = response.data.data.list;
          console.log(this.tableData);
        });
    },
    addabsence() {
      axios
        .post("http://localhost:9091/springboot/houseparent/addvisitor", {
          visname: this.addForm.visname,
          sex: this.addForm.sex,
          stu_id:this.addForm.stu_id,
          start_time: this.addForm.start_time,
          end_time: this.addForm.end_time,
          remark: this.addForm.remark,
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            alert("添加成功");
            axios
              .get(
                "http://localhost:9091/springboot/houseparent/queryvisitor",
                {
                  params: {
                    page: 1,
                    pageSize: 5,
                  },
                }
              )
              .then((response) => {
                // 请求成功
                console.log("请求成功");
                console.log(response.data);
                this.tableData = response.data.data.list;
                this.pageSize = this.pageSize;
                this.total = response.data.data.total;
              })
              .catch((error) => {
                // 请求失败
                console.log("请求失败");
                console.log(error);
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
        .get("http://localhost:9091/springboot/houseparent/queryvisitor", {
          params: {
            page: num1,
            pageSize: this.pageSize,
          },
        })
        .then((response) => {
          // 请求成功
          console.log("请求成功");
          console.log(response.data);
          this.tableData = response.data.data.list;
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
          .delete("http://localhost:9091/springboot/houseparent/delvisitor?id=" + row.id)
          .then((response) => {
            if (response.data.code == 200) {
              axios
                .get(
                  "http://localhost:9091/springboot/houseparent/queryvisitor",
                  {
                    params: {
                      page: num1,
                      pageSize: this.pageSize,
                    },
                  }
                )
                .then((response) => {
                  // 请求成功
                  console.log("请求成功");
                  console.log(response.data);
                  this.tableData = response.data.data.list;
                  this.currentPage = num1;
                  this.pageSize = this.pageSize;
                  this.total = response.data.data.total;
                })
                .catch((error) => {
                  // 请求失败
                  console.log("请求失败");
                  console.log(error);
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
#ta {
  text-align: left;
}
</style>