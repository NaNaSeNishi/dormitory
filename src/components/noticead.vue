  <template>
  <div id="re">
    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column prop="publish_time" label="发布时间"> </el-table-column>
      <el-table-column prop="publisher" label="发布人"> </el-table-column>
      <el-table-column prop="building_id" label="楼栋"> </el-table-column>
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
    <el-dialog title="添加公告" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="addForm" label-width="70px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="addForm.content"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="publish_time">
          <el-input v-model="addForm.publish_time"></el-input>
        </el-form-item>
        <el-form-item label="发布人" prop="publisher">
          <el-input v-model="addForm.publisher"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addnotice">确 定</el-button>
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
        title: "",
        content: "",
        publish_time: Date(),
        publisher: "",
      },
      currentPage: 0,
      total: 0,
      pageSize: 0,
    };
  },
  created() {
    this.getlivestockInfo(1)
  },
  methods: {
    addnotice() {
      axios
        .post("http://localhost:8088/notice/add", {
          title: this.addForm.title,
          content: this.addForm.content,
          publish_time: this.addForm.publish_time,
          publisher: this.addForm.publisher,
          houseparent_id: window.sessionStorage.getItem("adminid"),
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            alert("添加成功");
            var i = window.sessionStorage.getItem("adminid");
              axios
              .get("http://localhost:9091/springboot/houseparent/notice", {
                params: {
                  houseparent_id: i,
                  page: num1,
                  pageSize: this.pageSize,
                },
              })
              .then((response) => {
                // 请求成功
                console.log("请求成功");
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
      this.getlivestockInfo(val)
    },
    getlivestockInfo(num1) {
      var i = window.sessionStorage.getItem("adminid");
      axios
        .get("http://localhost:9091/springboot/houseparent/notice", {
          params: {
            houseparent_id: i,
            page: num1,
            pageSize: this.pageSize,
          },
        })
        .then((response) => {
          // 请求成功
          console.log("请求成功");
          this.tableData1 = response.data.data.list;
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
        axios.delete("http://localhost:9091/springboot/notice/del?id="+row.id).then((response) => {
          if (response.data.code == 200) {
            axios
              .get("http://localhost:9091/springboot/houseparent/notice", {
                params: {
                  houseparent_id: window.sessionStorage.getItem("adminid"),
                  page: 1,
                  pageSize: 5,
                },
              })
              .then((response) => {
                // 请求成功
                console.log("请求成功");
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