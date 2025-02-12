/// <reference types="vitest" />
// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

import AutoImport from "unplugin-auto-import/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: { configFile: "src/styles/variables.scss" },
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/wfp/api":{
        target: "https://www.runninghub.cn/",
        changeOrigin: true,
        secure: false, // 如果遇到证书问题，保持 false
        rewrite: (path) => path.replace(/^\/wfp\/api/, '/'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response:', proxyRes.statusCode, req.url);
          });
        }
      },
      "/coze/api": {
        target: "https://api.coze.cn",
        changeOrigin: true,
        secure: false, // 如果遇到证书问题，保持 false
        rewrite: (path) => path.replace(/^\/coze\/api/, '/'),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response:', proxyRes.statusCode, req.url);
          });
        }
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/disk/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/disk\/public/, '/'),
      },
      "/disk": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { charset: false },
      css: { charset: false },
    },
  },
});
