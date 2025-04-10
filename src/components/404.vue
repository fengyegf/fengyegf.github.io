<template>
  <div
    class="min-h-screen flex items-center justify-center flex-col py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <h2 class="text-2xl font-medium text-gray-600 mb-8">找不到页面</h2>
      <p class="text-gray-500 mb-8">您访问的页面不存在或已被移动到其他位置</p>
      <div>
        <router-link to="/" class="btn btn-primary"> 返回首页 </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  mounted() {
    console.log("404 组件被加载 - 页面未找到");
  },
};
</script>
