<template>
<div id="lo">
<div id="top"></div>
<div id="lala">
  <el-card class="box-card">
    <div id="title">L o g i n</div>
    <div id="username">
      <el-input placeholder="请输入账户名" v-model="username" id="input1">
        <template slot="prepend">账号：</template>
      </el-input>
    </div>
    <div style="margin: 20px 0"></div>
    <el-input placeholder="请输入密码" v-model="password">
      <template slot="prepend">密码：</template>
    </el-input>
    <div style="margin: 20px 0"></div>
    <div>
      请选择用户类型：
      <el-radio v-model="usertype" label="0">系统管理员</el-radio>
      <el-radio v-model="usertype" label="1">宿管员</el-radio>
      <el-radio v-model="usertype" label="2">学生</el-radio>
      <div style="margin: 20px 0"></div>
    </div>
    <el-button type="primary" @click="toHome">登录</el-button>
  </el-card>
</div>
<div id="foot"></div>

</div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      usertype: "",
    };
  },
  methods: {
    toHome() {
      var ut = Number(this.usertype);
      const that = this;
      axios
        .post("http://localhost:9091/springboot/login", {
          username: this.username,
          password: this.password,
          usertype: Number(this.usertype)
        })
        .then(function (response) {
          console.log(response.data);
          if(response.data.code == 500){
              alert("用户名或密码错误")
          }
          if(response.data.code == 200 && ut == 0){
              that.$router.push("/webadmin")
          }
          if(response.data.code == 200 && ut == 1){
              window.sessionStorage.setItem('adminid',response.data.data.id);
              that.$router.push("/doradmin")
          }
          if(response.data.code == 200 && ut == 2){
              window.sessionStorage.setItem('userid',response.data.data.id);
              that.$router.push("/student")
          }
        });
    },
  },
};
</script>

<style scoped>
#title {
  margin-top: 10px;
}
#username {
  margin-top: 20px;
}
#input1 {
  width: 600px;
}
#lala {
  margin-left: 450px;
  margin-right: 450px;
}

#lo {
  background-color: rgb(201, 225, 248);
}

#top {
  height: 150px;
  background-color: rgb(201, 225, 248);
}

#foot {
  height: 250px;
  background-color: rgb(201, 225, 248);
}
</style>