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
          <span slot="title">个人详情</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">缺勤记录</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-document"></i>
          <span slot="title">保修申请</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">公告查看</span>
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
        <div id="main"><stuinfo v-show="c == 2"/><absence v-show="c == 3"/><repair v-show="c == 4"/><notice v-show="c == 5"/><Hello v-show="c == 1"/></div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import stuinfo from '../components/stuinfo.vue'
import absence from '../components/absence.vue'
import repair from '../components/repair.vue'
import notice from '../components/notice.vue'
import visitor from '../components/visitor.vue'
import Hello from '../components/HelloWorld.vue'


export default {
    components : {stuinfo,absence,repair,notice,visitor,Hello},
  data() {
    return {
      c:'1',
      name: window.sessionStorage.getItem("stuname")
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

  bottom: 0;
  background-color: #b3c0d1;
}
</style>