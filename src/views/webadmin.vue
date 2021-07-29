<template>
<div id="app">
  <el-container >
    <el-aside width="200px" >
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
        @select="handleSelect"
      >
      <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">系统首页</span>
        </el-menu-item>
      <el-submenu >
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户资料</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">宿管员</el-menu-item>
          <el-menu-item index="1-2">学生</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
          <template slot="title">
          <i class="el-icon-menu"></i>
          <span>宿舍管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">楼宇管理</el-menu-item>
          <el-menu-item index="2-2">宿舍管理</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">缺勤管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-document"></i>
          <span slot="title">报修管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-s-custom"></i>
          <span slot="title">来访管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">公告管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <div id="tt">学生宿舍管理系统</div>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
              <el-button @click="out" type="danger">登出</el-button>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{name}}</span>
      </el-header>
      <el-main>
        <div id="main"><Hello v-show="c == 1"/><allhp v-show="c == '1-1'"/><allstu v-show="c == '1-2'"/><building v-show="c == '2-1'"/><dormitory v-show="c == '2-2'"/>
        <dormitory v-show="c==2"/><absencead v-show="c==3"/><repairad v-show="c==4"/><visitor v-show="c==5"/><noticewebad v-show="c==6"/></div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</div>
</template>

<script>
import doradinfo from '../components/doradinfo.vue'
import absencead from '../components/absencead.vue'
import repairad from '../components/repairad.vue'
import visitor from '../components/visitor.vue'
import noticewebad from '../components/noticewebad.vue'
import dormitory from '../components/dormitory.vue'
import allstu from '../components/allstu.vue'
import allhp from '../components/allhp.vue'
import building from '../components/building.vue'
import Hello from '../components/HelloWorld.vue'


export default {
components : {doradinfo,absencead,repairad,visitor,noticewebad, dormitory,allstu,allhp,building,Hello},

  data() {
    return {
      c:'1',
      name: window.sessionStorage.getItem("adname")
    };
  },
    methods: {
      handleSelect(key) {
        console.log(key);
        this.c=key
      },
      out() {
        this.$router.push("/login")
      }
    },

};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-aside{
    background-color: #545c64;
    height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
#tt {
  background-color: #b3c0d1;
}

#main {
  height: 500px;
}

.el-footer {
  height: 150px;
  background-color: #b3c0d1;
}
</style>