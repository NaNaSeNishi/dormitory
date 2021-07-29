<template>
<div>
  <el-form label-width="80px" :model="formLabelAlign">
  <el-form-item label="ID">
    <el-input v-model="formLabelAlign.id" readonly></el-input>
  </el-form-item>
    <el-form-item label="用户名">
    <el-input v-model="formLabelAlign.username" readonly></el-input>
  </el-form-item>
    <el-form-item label="性别">
    <el-input v-model="formLabelAlign.sex" readonly></el-input>
  </el-form-item>
  <el-form-item label="姓名">
    <el-input v-model="formLabelAlign.name" readonly></el-input>
  </el-form-item>
    <el-form-item label="手机号码">
    <el-input v-model="formLabelAlign.phone" readonly></el-input>
  </el-form-item>
</el-form>

<el-button type="warning" icon="el-icon-edit-outline" @click="dialogVisible=true">修改个人信息</el-button>

<el-dialog title="修改信息" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="updateForm" label-width="70px">
        <el-form-item label="ID" prop="id">
          <el-input  v-model="formLabelAlign.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="formLabelAlign.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="updateForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="updateForm.phone" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
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
        id:"",
        name:"",
        phone:"",
        sex:"",
        username:""
      },
        formLabelAlign: {
          id: '',
          username:'',
          sex:'',
          name:'',
          phone:''
        },
        dialogVisible:false
      };
    },
      created() {
      var i = window.sessionStorage.getItem("userid");
      axios.get('http://localhost:9091/springboot/houseparent'+'?id='+Number(i)).then(response => 
        {
          this.formLabelAlign = response.data.data
          console.log(this.formLabelAlign)
        });
  },

  methods:{
    update() {
      axios
        .put("http://localhost:9091/springboot/houseparent/mod", {
          building_id: Number(this.updateForm.building_id),
          name: this.updateForm.name,
          phone:this.updateForm.phone,
          id:this.formLabelAlign.id,
          username:this.formLabelAlign.username,
          sex:this.formLabelAlign.sex
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
  }
  
  }
</script>

<style>

</style>
