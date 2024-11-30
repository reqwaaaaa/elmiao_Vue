<template>
  <div class="responsive-layout">
    <div class="content">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 使用ref创建响应式数据
const message = ref('Hello, World!');

// 监听窗口大小变化，调整布局
const adjustLayout = () => {
  if (window.innerWidth < 768) {
    message.value = '小屏幕布局';
  } else if (window.innerWidth < 1024) {
    message.value = '中等屏幕布局';
  } else {
    message.value = '大屏幕布局';
  }
};

onMounted(() => {
  // 组件挂载时添加窗口大小变化监听器
  window.addEventListener('resize', adjustLayout);
  // 初始化布局
  adjustLayout();
});

onUnmounted(() => {
  // 组件卸载时移除窗口大小变化监听器
  window.removeEventListener('resize', adjustLayout);
});
</script>

<style scoped>
.responsive-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  font-size: 24px;
}
</style>




