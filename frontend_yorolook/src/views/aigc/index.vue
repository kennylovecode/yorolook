<template>
  <div class="app-wrapper auto-generate">
    <el-container>
      <el-header>
        <yl-header />
      </el-header>
      <el-container>
        <el-aside width="400px">
          <OperationPane />
        </el-aside>
        <el-main>
          <div class="content" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue"
import OperationPane from "./components/operation-pane.vue"
import ylHeader from "./components/header.vue"
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.auto-generate {
  background-color: #f2f3f5;
  min-height: calc(100vh - 60px);
  .content {
    border-radius: 20px;
    background-color: #fff;
    padding: 24px;
    min-height: calc(100vh - 124px);
  }
}
</style>
