<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">缺勤管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">报修管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">来访管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
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
        <span>cc</span>
      </el-header>
      <el-main>
        <div id="main"><doradinfo v-show="c == 1"/><absencead v-show="c==2"/><repairad v-show="c==3"/><visitor v-show="c==4"/><noticead v-show="c==5"/></div>
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


export default {
components : {doradinfo,absencead,repairad,visitor,noticead},

  data() {
    return {
      c:'1'
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