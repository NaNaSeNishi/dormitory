<template>
<div id="app">
    <el-container>
  <el-header>
      <el-row>
  <el-button v-for="item in buildingName" :key="item.building_id" type="warning" round
   @click="getFloors(item.building_id)">{{item.name}}</el-button>
</el-row>
  </el-header>

  <el-container>
    <el-aside width="200px">
       <el-row v-for="item in floors" :key="item.building_id">
  <el-button  type="success" plain @click="getDormitorys(item.building_id,item.floor_id)" style="width:150px">{{item.number}}层</el-button>
</el-row>
    </el-aside>

    <el-main>
        <el-collapse >
  <el-collapse-item v-for="item in dormitory" :key="item.id" :title="item.number" @click.native="getBeds(item.building_id,item.floor_id,item.id)">
    <div>
        <el-row gutter="60">
  <el-col :span="5" v-for="item in bed" :key="item.id" >
    <el-card :body-style="{ padding: '0px' }" v-if="item.state==1">
      <img src="../assets/bed.jpg" class="image">
      <div style="padding: 8px;">
        <span>床位：{{item.number}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ item.studentRet.name }}</time>
        </div>
        <a :tabindex="item.dormitory_id" :title="item.number" class="el-icon-edit" @click="handleUpdate($event)"></a>
        <a  class="el-icon-delete" @click="delBed(item.studentRet.id)"></a>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '0px' }" v-else>
      <img src="../assets/bed2.jpg" class="image">
      <div style="padding: 8px;">
        <span>床位：{{item.number}}</span>
        <div class="bottom clearfix">
          <time class="time">空床位</time>
        </div>
        <a :tabindex="item.dormitory_id" :title="item.number" class="el-icon-edit" @click="handleUpdate($event)"></a>
        <a  class="el-icon-delete"></a>
      </div>
    </el-card>
  </el-col>
</el-row>
    </div>
    
  </el-collapse-item>
</el-collapse>
    </el-main>

  </el-container>
</el-container>

<el-dialog title="修改床位" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="updateForm" label-width="70px">
        <el-form-item label="学号" prop="stu_number">
          <el-input v-model="updateForm.stu_number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stu_name">
          <el-input v-model="updateForm.stu_name"></el-input>
        </el-form-item>
        <el-form-item label="宿舍ID" prop="dormitory_id">
          <el-input v-model="updateForm.dormitory_id"></el-input>
        </el-form-item>
        <el-form-item label="床位编号" prop="bed_num">
          <el-input v-model="updateForm.bed_num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeBed">确 定</el-button>
      </span>
    </el-dialog>

</div>
</template>
<script>
import axios from "axios";
  export default {
    data() {
      return {
        activeNames: ['1'],
        buildingName:[],
        floors:[],
        dormitory:[],
        bed:[],
        dialogVisible: false,
        updateForm: {
          stu_number: "",
          stu_name: "",
          dormitory_id:"",
          bed_num:""
      }
      };
    },
    created() {
    this.getBuildings();
    this.getFloors(1)
  },
    methods: {
        handleUpdate(e){
       this.dialogVisible = true;
       this.updateForm.dormitory_id=e.currentTarget.getAttribute('tabindex');
       this.updateForm.bed_num=e.currentTarget.getAttribute('title');
       console.log(this.updateForm.dormitory_id);
    },

    changeBed(){
        axios
        .put("http://localhost:9091/springboot/dormitory/change", {
          stu_number: this.updateForm.stu_number,
          stu_name: this.updateForm.stu_name,
          dormitory_id: Number(this.updateForm.dormitory_id),
          bed_num: Number(this.updateForm.bed_num),
        })
        .then(function (response) {
          console.log(response);
          if (response.data.code == 200) {
              location.reload();
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

      handleChange(val) {
        console.log(val);
      },

      getBuildings(){
          axios
        .get("http://localhost:9091/springboot/building", {
          params: {
            page: 1,
            pageSize: 10,
          },
        })
        .then((response) => {
          // 请求成功
          console.log("请求成功");
          console.log(response.data);
          this.buildingName = response.data.data.list;
        })
        .catch((error) => {
          // 请求失败
          console.log("请求失败");
          console.log(error);
        });
      },

       getFloors(val){
          axios
        .get("http://localhost:9091/springboot/building/floor?building_id="+val, {
          params: {
          },
        })
        .then((response) => {
          // 请求成功
          if(response.data.code==200){
           console.log("请求成功");
          console.log(response.data);
          this.floors = response.data.data;
          }
          else{
              this.floors = [];
          }
          
        })
        .catch((error) => {
          // 请求失败
          console.log("请求失败");
          console.log(error);
        });
      },

       getDormitorys(val1,val2){
          axios
        .get("http://localhost:9091/springboot/building/floor/dormitory?building_id="+val1, {
          params: {
            floor_id:val2,
          },
        })
        .then((response) => {
          // 请求成功
          if(response.data.code==200){
           console.log("请求成功");
          console.log(response.data);
          this.dormitory = response.data.data;
          }
          else{
              this.dormitory = [];
          }
          
        })
        .catch((error) => {
          // 请求失败
          console.log("请求失败");
          console.log(error);
        });
      },

      getBeds(val1,val2,val3){
          axios
        .get("http://localhost:9091/springboot/building/floor/dormitory/bed?building_id="+val1, {
          params: {
            floor_id:val2,
            dormitory_id:val3
          },
        })
        .then((response) => {
          // 请求成功
          if(response.data.code==200){
           console.log("请求成功");
          console.log(response.data);
          this.bed = response.data.data;
          }
          else{
              this.bed = [];
          }
          
        })
        .catch((error) => {
          // 请求失败
          console.log("请求失败");
          console.log(error);
        });
      },

      delBed(val){
          this.$confirm('此操作将退理该床位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.delete("http://localhost:9091/springboot/dormitory/retreat?student_id="+val).then(res => {
            if (res.code == 200) {
                location.reload();
              this.$notify({
                title: "成功",
                message: res.message,
                type: "success"
              });
          }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },


  }
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>