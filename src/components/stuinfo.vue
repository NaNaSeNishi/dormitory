<template>
<div>

  <el-form label-width="80px" :model="formLabelAlign">
  <el-form-item label="年级">
    <el-input v-model="formLabelAlign.grade" readonly></el-input>
  </el-form-item>
  <el-form-item label="学院">
    <el-input v-model="formLabelAlign.college" readonly></el-input>
  </el-form-item>
  <el-form-item label="学号">
    <el-input v-model="formLabelAlign.stu_number" readonly></el-input>
  </el-form-item>
    <el-form-item label="姓名">
    <el-input v-model="formLabelAlign.name" readonly></el-input>
  </el-form-item>
    <el-form-item label="性别">
    <el-input v-model="formLabelAlign.sex" readonly></el-input>
  </el-form-item>
    <el-form-item label="手机号码">
    <el-input v-model="formLabelAlign.phone" readonly></el-input>
  </el-form-item>
</el-form>

<el-button type="warning" icon="el-icon-edit-outline" @click="dialogVisible=true">修改个人信息</el-button>

<el-dialog title="修改信息" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addFormRef" :model="updateForm" label-width="70px">
        <el-form-item label="学号" prop="stu_number">
          <el-input  v-model="formLabelAlign.stu_number" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stu_name">
          <el-input v-model="updateForm.stu_name" :placeholder="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="formLabelAlign.sex" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" >
          <el-input v-model="updateForm.phone" :placeholder="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="updateForm.grade" :placeholder="formLabelAlign.grade"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="updateForm.college" :placeholder="formLabelAlign.college"></el-input>
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
        formLabelAlign: {
          id:"",
          grade: '',
          college: '',
          stu_number: '',
          name:'',
          sex:'',
          phonenumber:''
        },
        dialogVisible:false,
        updateForm: {
        id:"",
        stu_name:"",
        phone:"",
        sex:"",
        stu_number:"",
        college:"",
        grade:""
      },

      };
    },
      created() {
      var i = window.sessionStorage.getItem("userid");
      axios.get('http://localhost:9091/springboot/student'+'?id='+Number(i)).then(response => 
        {
          this.formLabelAlign = response.data.data
          console.log(this.formLabelAlign)
        });
  },
  methods:{
    update() {
      axios
        .put("http://localhost:9091/springboot/student/mod", {
          id:this.formLabelAlign.id,
          stu_name: this.updateForm.stu_name,
          phone:this.updateForm.phone,
          stu_number:this.formLabelAlign.stu_number,
          sex:this.formLabelAlign.sex,
          grade:this.updateForm.grade,
          college:this.updateForm.college,
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
