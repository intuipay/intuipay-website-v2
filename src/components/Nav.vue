<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '../hooks/globalStore';

const { store } = useGlobalStore();
const route = useRoute();
const router = useRouter();

watch(() => route.path, () => {
  if (route.path === '/information' && !store?.state?.fromData?.university?.name) {
    router.push('/');
  }
}, { immediate: true })

const toDashboard = () => {
  if (store?.state?.payments?.length > 0) {
    router.push('/dashboard');
  }
}

</script>

<template>
  <div class="nav">
    <div class="nav-container">
      <div class="nav-left" style="cursor: pointer;" @click="router.push('/')">
        <img v-if="route.path === '/' || route.path === '/dashboard'" src="../assets/images/logo.svg" alt="logo"
          class="logo" />
        <div v-else style="display: flex; align-items: center; gap: 8px;">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13.5L1 7.5L7 1.5" stroke="#AFAFAF" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <img :src="store?.state.university?.logo || store?.state.fromData?.university?.logo" alt="logo"
            class="university-logo" />
        </div>
      </div>
      <div v-if="route.path === '/' || route.path === '/dashboard'" class="menu">
        <div class="menu-item" @click="router.push('/')">
          <span>Pay</span>
        </div>
        <div class="menu-item" style="cursor: not-allowed;">
          <span class="disabled">Donate</span>
          <label>soon</label>
        </div>
        <!-- <div class="menu-item" style="cursor: not-allowed;">
          <span class="disabled">Team</span>
        </div>  -->
      </div>
      <div class="nav-right">
        <div class="nav-right-item">
          <div class="dashboard" @click="toDashboard"
            :style="{ background: store?.state?.payments?.length > 0 ? '#171717' : '#E5E5E5', cursor: store?.state?.payments?.length > 0 ? 'pointer' : 'not-allowed' }">
            Dashboard</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  border-bottom: 1px solid #E5E5E5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;

  .nav-container {
    padding: 0 64px;
    width: 100%;
    height: 90px;
    max-width: 1440px;
    min-width: 1300px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .logo {
    width: 140px;
    height: auto;
  }

  .university-logo {
    width: auto;
    height: 60px;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 16px;

    .menu-item {
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        padding: 4px 8px;
        box-sizing: border-box;
        color: #1C1C1C;
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;

        &.disabled {
          color: #A3A3A3;
        }
      }

      label {
        background: #B1D0F3;
        width: 56px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 28px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
      }
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 8px;

    .nav-right-item {
      .dashboard {
        border: 2px solid #E5E5E5;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 132px;
        height: 52px;
        border-radius: 52px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        background: #171717;
        box-shadow: 2px 6px 4px 0px #FFFFFF59 inset;
        cursor: pointer;
      }
    }
  }

}
</style>