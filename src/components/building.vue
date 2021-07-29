<template>
 <div id="re">
   <el-row :gutter="20">
    <div>
  <el-col :span="5">
  <el-input placeholder="请输入内容" v-model="building_name">
    <template slot="prepend">名称</template>
  </el-input>
  </el-col>
  <el-col :span="5">
  <el-input placeholder="请输入内容" v-model="sex">
    <template slot="prepend">住户性别</template>
  </el-input>
  </el-col>
  <el-col :span="5">
  <el-input placeholder="请输入内容" v-model="houseparent_name">
    <template slot="prepend">宿管员</template>
  </el-input>
  </el-col>
  <el-col :span="5">
  <el-button  icon="el-icon-search" @click="findbuilding">搜索</el-button>
  </el-col>
</div>
    </el-row>
   <el-button type="primary" icon="el-icon-plus" @click="insertb">添加楼栋</el-button>
  <el-table :data="tableData1" style="width: 100%">
    <el-table-column prop="building_id" label="ID" > </el-table-column>
    <el-table-column prop="name" label="楼栋"> </el-table-column>
    <el-table-column prop="houseparent_name" label="宿管员" > </el-table-column>
    <el-table-column prop="sex" label="住户性别"> </el-table-column>
    <el-table-column prop="floor" label="楼层数"> </el-table-column>
     <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
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
    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="updateForm" label-width="70px">
        <el-form-item label="ID" prop="building_id">
          <el-input v-model="updateForm.building_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="楼栋" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="宿管员" prop="houseparent_name">
          <el-input v-model="updateForm.houseparent_name"></el-input>
        </el-form-item>
        <el-form-item label="住户性别" prop="sex" >
          <el-input v-model="updateForm.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="楼层数" prop="floor">
          <el-input v-model="updateForm.floor" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatebuilding">确 定</el-button>
      </span>
    </el-dialog>
        
        <el-dialog title="添加楼栋" :visible.sync="dialogVisible1" width="50%">
      <el-form ref="addFormRef" :model="insertForm" label-width="70px">
        <el-form-item label="楼栋" prop="name">
          <el-input v-model="insertForm.name"></el-input>
        </el-form-item>
        <el-form-item label="宿管员" prop="houseparent_name">
          <el-input v-model="insertForm.houseparent_name"></el-input>
        </el-form-item>
        <el-form-item label="住户性别" prop="sex" >
          <el-input v-model="insertForm.sex" ></el-input>
        </el-form-item>
        <el-form-item label="楼层数" prop="floor_num">
          <el-input v-model="insertForm.floor_num"></el-input>
        </el-form-item>
        <el-form-item label="房间床位数" prop="bed_num">
          <el-input v-model="insertForm.bed_num"></el-input>
        </el-form-item>
        <el-form-item label="每层楼的房间数" prop="dorm_num_per_floor">
          <el-input v-model="insertForm.dorm_num_per_floor"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="insertbuilding">确 定</el-button>
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
        building_id: 0,
        name: "",
        houseparent_name: "",
        sex: "",
        floor: "",
      },
      insertForm: {
        name: "",
        houseparent_name: "",
        sex: "",
        floor_num: "",
        bed_num:"",
        dorm_num_per_floor:""
      },
      tableData1: [],
      dialogVisible: false,
      dialogVisible1: false,
      currentPage: 0,
      total: 0,
      page: 1,
      pageSize: 5,
      building_name: "",
      sex: "",
      houseparent_name: "",
    };
  },
  created() {
    this.getlivestockInfo(1);
  },
  methods: {
    insertb() {
      this.dialogVisible1 = true;
    },
    insertbuilding() {
      axios
        .post("http://localhost:9091/springboot/createbuildings", {
          name: this.insertForm.name,
          houseparent_name: this.insertForm.houseparent_name,
          sex: this.insertForm.sex,
          floor_num: this.insertForm.floor_num,
          bed_num:this.insertForm.bed_num,
          dorm_num_per_floor:this.insertForm.dorm_num_per_floor
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            alert("添加成功");
            axios
              .get("http://localhost:9091/springboot/admin/building", {
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
        .get("http://localhost:9091/springboot/building", {
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
          .delete("http://localhost:9091/springboot/delbuilding?id=" + row.id)
          .then((response) => {
            if (response.data.code == 200) {
              axios
                .get("http://localhost:9091/springboot/building", {
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
    },
    updatebuilding() {
      axios
        .put("http://localhost:9091/springboot/building/mod", {
          building_id: Number(this.updateForm.building_id),
          name: this.updateForm.name,
          houseparent_name: this.updateForm.houseparent_name,
          sex: this.updateForm.sex,
          floor: Number(this.updateForm.floor),
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
    findbuilding(){
        axios
        .post("http://localhost:9091/springboot/admin/querybuilding?page="+this.page+"&pageSize="+this.pageSize, {
          params: {
            building_name: this.building_name,
            sex: this.sex,
            houseparent_name: this.houseparent_name
          },
        })
        .then((response) => {
          // 请求成功
          console.log(this.building_name);
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
    }
  },
};
</script>
<style scoped>
#re {
  text-align: left;
}
</style>