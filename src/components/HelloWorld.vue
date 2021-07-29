<template>
<div>
 <el-container>
  <el-aside width="300px">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>
      <i class="el-icon-s-comment"></i>
      系统公告</span>
  </div>
  <div >
    学生宿舍管理系统v1.0
  </div>
</el-card>
  </el-aside>
  <el-container>
    <el-header style="height:200px">
      <el-row gutter="20px">
        <el-col span="5" v-for="item in tableData" :key="item.name">
      <div  >
        <span>{{item.name}}</span>
      <el-progress type="circle" :percentage="item.percent*100"></el-progress>
      </div>
      </el-col>
      </el-row>
    </el-header>
  
    <el-main>
      <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="楼栋" width="180"> </el-table-column>
      <el-table-column prop="bed_num" label="床位数" width="180"> </el-table-column>
      <el-table-column prop="occupancy" label="入住人数"> </el-table-column>
      <el-table-column prop="leave_num" label="剩余床位数"> </el-table-column>
      <el-table-column prop="percent" label="入住率"> </el-table-column>
    </el-table>
    </el-main>
  
  </el-container>
</el-container>
</div>  
</template>

<script>
import axios from "axios";
export default {
    data() {
      return {
        buildingName:[],
        tableData:[]
      }
    },
    created(){
       this.getBuildings();
    },
    created(){
      this.getSta();
    },
    methods:{
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

      getSta(){
        axios
        .get("http://localhost:9091/springboot/building/statistics", {
          params: {
          },
        })
        .then((response) => {
          // 请求成功
          console.log("请求成功");
          console.log(response.data);
          this.tableData = response.data.data;
        })
        .catch((error) => {
          // 请求失败
          console.log("请求失败");
          console.log(error);
        });
      },
    }
  }
</script>

<style scoped>
  .is-selected {
    color: #1989FA;
  }
  .text {
    font-size: 14px;
    position: center;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
    height: 400px;
  }
</style>
