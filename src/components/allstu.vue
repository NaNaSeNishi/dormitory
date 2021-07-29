 <template>
  <div id="re">
    <el-row :gutter="10">
      <div>
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="college">
            <template slot="prepend">学院</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="grade">
            <template slot="prepend">年级</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="stu_number">
            <template slot="prepend">学号</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="name">
            <template slot="prepend">姓名</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="sex">
            <template slot="prepend">性别</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-search" @click="findstu">搜索</el-button>
        </el-col>
      </div>
    </el-row>
    <el-button type="primary" icon="el-icon-plus" @click="insert"
      >添加学生</el-button
    >
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="stu_number" label="学号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="grade" label="年级"> </el-table-column>
      <el-table-column prop="college" label="学院"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleUpdate(scope.$index, scope.row)"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            circle
          ></el-button>
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
    <el-dialog title="增加用户" :visible.sync="dialogVisible1" width="50%">
      <el-form ref="addFormRef" :model="insertForm" label-width="70px">
        <el-form-item label="学号" prop="stu_number">
          <el-input v-model="insertForm.stu_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stu_name">
          <el-input v-model="insertForm.stu_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="insertForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="insertForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="insertForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="insertForm.college"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="insertstu">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="updateForm" label-width="70px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="updateForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="stu_number">
          <el-input v-model="updateForm.stu_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stu_name">
          <el-input v-model="updateForm.stu_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="updateForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="updateForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="updateForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="updateForm.college"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatestu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      updateForm: {
        id: 0,
        stu_number: "",
        stu_name: "",
        sex: "",
        phone: "",
        grade: "",
        college: "",
      },
      insertForm: {
        stu_number: "",
        stu_name: "",
        sex: "",
        phone: "",
        grade: "",
        college: "",
      },
      tableData1: [],
      dialogVisible: false,
      dialogVisible1: false,
      currentPage: 0,
      total: 0,
      page:1,
      pageSize: 5,
      college: "",
      grade: "",
      stu_number: "",
      name: "",
      sex: "",
    };
  },
  created() {
    this.getlivestockInfo(1);
  },
  methods: {
    insert() {
      this.dialogVisible1 = true;
    },
    insertstu() {
      axios
        .post("http://localhost:9091/springboot/student/add", {
          stu_number: this.insertForm.stu_number,
          stu_name: this.insertForm.stu_name,
          sex: this.insertForm.sex,
          phone: this.insertForm.phone,
          grade: this.insertForm.grade,
          college: this.insertForm.college,
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            alert("添加成功");
            axios
              .get("http://localhost:9091/springboot/admin/allstudent", {
                params: {
                  page: 1,
                  pageSize: 5,
                },
              })
              .then((response) => {
                // 请求成功
                console.log("请求成功");
                console.log(response.data);
                this.tableData1 = response.data.data.list;
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
      this.dialogVisible1 = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      console.log(this.pageSize);
      this.getlivestockInfo(this.currentPage);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getlivestockInfo(val);
    },
    getlivestockInfo(num1) {
      axios
        .get("http://localhost:9091/springboot/admin/allstudent", {
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
          .delete(
            "http://localhost:9091/springboot/admin/delstudent?id=" + row.id
          )
          .then((response) => {
            if (response.data.code == 200) {
              axios
                .get("http://localhost:9091/springboot/admin/allstudent", {
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
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    handleUpdate(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.updateForm = row;
      this.updateForm.stu_name = row.name;
    },
    updatestu() {
      axios
        .put("http://localhost:9091/springboot/student/mod", {
          id: Number(this.updateForm.id),
          stu_number: this.updateForm.stu_number,
          stu_name: this.updateForm.stu_name,
          sex: this.updateForm.sex,
          phone: this.updateForm.phone,
          grade: Number(this.updateForm.grade),
          college: this.updateForm.college,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.code == 200) {
            alert("修改成功");
            this.dialogVisible = false;
            this.getlivestockInfo(this.currentPage);
          }
          if (response.data.code != 200) {
            this.dialogVisible = false;
            alert("修改失败");
          }
        });
    },
    findstu() {
      axios
        .get("http://localhost:9091/springboot/admin/querystudent?page="+this.page+"&pageSize="+this.pageSize, {
          params: {
            stu_number: this.stu_number,
            stu_name: this.name,
            sex: this.sex,
            grade: this.grade,
            college: this.college,
          },
        })
        .then((response) => {
          // 请求成功
          console.log(this.name);
          console.log("请求成功");
          console.log(response.data);
          this.tableData1 = response.data.data.list;
          this.currentPage = 1;
          this.pageSize = this.pageSize;
          this.total = response.data.data.total;
        })
        .catch((error) => {
          // 请求失败
          console.log("请求失败");
          console.log(error);
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