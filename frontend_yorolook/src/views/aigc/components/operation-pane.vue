<template>
  <div class="operation">
    <div class="wrap">
      操作面板
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style scoped lang="scss">
.operation {
  box-sizing: border-box;
  padding: 24px 0 24px 24px;
  .wrap {
    border-radius: 20px;
    min-height: calc(100vh - 124px);
    background-color: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    .operation {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 1rem;

      &::-webkit-scrollbar {
        width: 6px;
        border-radius: 100px;
        display: block !important;
      }

      &::-webkit-scrollbar-thumb {
        width: 6px;
        background: #e5e6eb;
        border-radius: 100px;
      }

      .line {
        margin-top: 10px;

        .title {
          padding: 12px 0;
          display: flex;
          font-weight: 700;

          span {
            color: #f0f;
            padding: 0px 3px;
          }
        }

        .el-select,
        .el-button {
          width: 100%;
        }

        .history-list {
          display: flex;

          .item {
            margin: 0 4px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
