<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
      <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">系统首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
          <i class="el-icon-menu"></i>
          <span>宿舍管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">宿舍管理</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">缺勤管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-document"></i>
          <span slot="title">报修管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-s-custom"></i>
          <span slot="title">来访管理</span>
        </el-menu-item>
        <el-menu-item index="7">
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
        <div id="main"><Hello v-show="c==1"/><doradinfo v-show="c == 2"/><dormitory v-show="c == '3-1'"/><absencead v-show="c==4"/><repairad v-show="c==5"/><visitor v-show="c==6"/><noticead v-show="c==7"/></div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import doradinfo from '../components/doradinfo.vue'
import absencead from '../components/absencead.vue'
import repairad from '../components/repairad.vue'
import visitor from '../components/visitor.vue'
import noticead from '../components/noticead.vue'
import dormitory from '../components/dormitory.vue'
import Hello from '../components/HelloWorld.vue'

export default {
components : {doradinfo,absencead,repairad,visitor,noticead,dormitory,Hello},

  data() {
    return {
      c:'1',
      name: window.sessionStorage.getItem("name")
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

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  font-size: 20px;
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