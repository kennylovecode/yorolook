<script lang="ts" setup>
import { RouteRecordRaw, useRoute } from "vue-router"
import { AppMain, Logo } from "./components"
import { manageRoutes } from "@/router/manageRoutes"

const route = useRoute()
const filterRoutes: RouteRecordRaw[] = []
manageRoutes.map((item) => {
  if (!item.redirect) {
    filterRoutes.push(item)
  } else {
    item.children.map((child) => {
      if (!(child as RouteRecordRaw).redirect && !child.meta?.hidden) {
        filterRoutes.push(child)
      }
    })
  }
})
</script>

<template>
  <div class="app-wrapper">
    <div>
      <div class="sidebar-container">
        <ul>
          <li class="header">
            <div class="icon-list">
              <SearchMenu class="icon-menu" />
              <Screenfull class="icon-menu" />
              <ThemeSwitch class="icon-menu" />
              <Notify class="icon-menu" />
            </div>
            <Logo :collapse="false" />
          </li>
          <li :class="{ active: route.meta.name === filterRoute.meta?.name }" v-for="filterRoute in filterRoutes">
            <router-link :to="filterRoute">{{ filterRoute.meta?.title }}</router-link>
          </li>
          <li class="footer">
            <div>system version 1.0.1</div>
          </li>
        </ul>
      </div>
      <div class="main-container">
        <AppMain class="app-main" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  > div {
    display: flex;
    max-width: var(--max-width);
    width: calc(100% - 32px);
    margin: 0 auto;
    justify-content: space-between;
    position: relative;
    .sidebar-container {
      ul {
        width: 220px;
        padding: 20px 10px;
        box-shadow: var(--el-box-shadow);
        position: fixed;
        list-style: none;
        text-align: center;
        min-height: 300px;
        border-radius: 5px;
        font-size: 14px;
        li {
          height: 28px;
          line-height: 28px;
          margin-bottom: 25px;
          &.active,
          &:hover {
            a {
              position: relative;
              &::after {
                content: " ";
                height: 2px;
                background: var(--el-color-primary);
                width: 0%;
                position: absolute;
                bottom: -16px;
                left: 30%;
                transition: all 0.5s ease-in-out;
              }

              &:hover {
                &::after {
                  width: 70%;
                  left: 15%;
                }
              }
            }
          }

          &.active {
            a {
              color: var(--el-color-primary);
              font-weight: bold;
              &::after {
                width: 70%;
                left: 15%;
              }
            }
          }

          &.header {
            height: auto;
            .icon-list {
              cursor: pointer;
              display: flex;
              justify-content: space-around;
            }
          }

          &.footer {
            color: var(--el-text-color-secondary);
            font-size: 10px;
          }
        }
      }
    }
    .main-container {
      width: calc(100% - 240px);
      margin-top: 15px;
      box-shadow: var(--el-box-shadow);
      padding: 10px 20px;
      min-height: calc(100vh - 30px);
    }
  }
}
</style>
