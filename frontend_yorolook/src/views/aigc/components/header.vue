<template>
  <div class="fixed-header layout-header">
    <div class="content">
      <Logo :collapse="false" class="logo" />
      <NavigationBar class="navigation-bar" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NavigationBar, Logo } from "@/layouts/components"
</script>

<style lang="scss" scoped>
.layout-header {
  background-color: var(--v3-header-bg-color);
  .content{
    display: flex;
  }
  &.closed {
    height: 0 !important;
    overflow: hidden;
    padding: 0;
    transition: all .3s;
  }
}
.fixed-header.closed + .main-container{
  .app-main{
    padding-top: 0;
  }
}
</style>
