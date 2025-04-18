<script setup>
import { watch, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Nav from './components/Nav.vue'
import { useGlobalStore } from './hooks/globalStore'
const route = useRoute()
const { setPayments } = useGlobalStore();

watch(() => route, (newQuery) => {
  //如果路由发生变化，则回到顶部
  nextTick(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 10)
  })
}, {
  immediate: true,
  deep: true
})

onMounted(() => {
  const version = localStorage.getItem('version');
  if (!version || version !== '1.0.0') {
    localStorage.clear();
    localStorage.setItem('version', '1.0.0');
  }
  const localPayments = localStorage.getItem('payments');
  if (localPayments) {
    const payments = JSON.parse(localPayments);
    setPayments(payments);
  }
})

// https://data.fixer.io/api/latest?access_key=2bb09c6fd0b176f16b951f5a3d330e62
</script>

<template>
  <NMessageProvider>
    <div class="app-container" :style="{ background: (route.path === '/dashboard' || route.path === '/pay') ? '#F7F9FB' : 'transparent' }">
      <Nav />
      <div class="app">
        <router-view />
      </div>
    </div>
  </NMessageProvider>
</template>

<style scoped>
.app {
  padding-top: 90px;
  width: 100%;
  max-width: 1440px;
  min-width: 1300px;
  margin: auto;
  box-sizing: border-box;
}
</style>
