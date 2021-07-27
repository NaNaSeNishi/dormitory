<template>
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
</template>

<script>
import axios from "axios";

  export default {
    data() {
      return {
        formLabelAlign: {
          grade: '',
          college: '',
          stunumber: '',
          name:'',
          sex:'',
          phonenumber:''
        }
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
  }
</script>

<style>

</style>
