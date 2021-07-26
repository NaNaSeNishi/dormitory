<template>
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
          id: '',
          username:'',
          sex:'',
          phone:''
        }
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
  
  }
</script>

<style>

</style>
