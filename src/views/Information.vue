<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ethers } from 'ethers'
import { useGlobalStore } from '../hooks/globalStore'
import Step1 from '../components/information/Step-1.vue'
import Step2 from '../components/information/Step-2.vue'
import Step3 from '../components/information/Step-3.vue'
import Step4 from '../components/information/Step-4.vue'
import Step5 from '../components/information/Step-5.vue'

const steps = [{
  step: 1,
  text: 'Amount',
  title: `Your <span>Payment</span>`
}, {
  step: 2,
  text: 'Payment Method',
  title: `Select your preferred <span>payment method</span>`
}, {
  step: 3,
  text: 'Payer',
  title: `<span>Payer</span> information`
}, {
  step: 4,
  text: 'Emory University',
  title: `Information for <span>Emory University</span>`
}, {
  step: 5,
  text: 'Review',
  title: `Review and confirm payment information`
}]

const router = useRouter()
const route = useRoute()
const step = ref(1)
const { store, setFromData, setPayments } = useGlobalStore()

const nextStep = () => {
  step.value++
  // 在路由历史中添加一条记录，使浏览器的后退按钮能够返回上一步
  router.push({
    path: router.currentRoute.value.path,
    query: { step: step.value }
  })
}

const prevStep = () => {
  router.back()
}

const changeStep = (item) => {
  if (item >= step.value) return
  step.value = item
  router.push({
    path: router.currentRoute.value.path,
    query: { step: step.value }
  })
}

const pay = () => {
  const fromData = store.state.fromData;
  let localPayments = localStorage.getItem('payments');
  const id = ethers.utils.id(JSON.stringify(fromData))
  const payment = {
    ...fromData,
    status: 'Awaiting Payment',
    id
  };
  if (localPayments) {
    const payments = JSON.parse(localPayments);
    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));
    setPayments(payments);
  } else {
    localStorage.setItem('payments', JSON.stringify([payment]));
    setPayments([payment]);
  }
  setFromData(payment);
  router.push(`/pay/${id}`)
}

watch(() => route.query, (newQuery) => {
  if (route.query.step) {
    step.value = newQuery.step
  } else {
    step.value = 1
  }
}, { immediate: true })
</script>

<template>
  <div class="information">
    <div class="information-step">
      <div class="information-step-item" v-for="item in steps" :key="item.step" @click="changeStep(item.step)" :style="{ 'cursor': item.step <= step ? 'pointer' : 'not-allowed' }">
        <div class="information-step-line" :class="{ 'information-step-line-ed': item.step <= step }"></div>
        <div class="information-step-item-content">
          <div v-if="item.step == step" class="information-step-item-circle-ing">
            <img src="../assets/images/information/step.svg" alt="" />
          </div>
          <img v-else-if="item.step < step" src="../assets/images/information/step2.svg" alt=""
            class="information-step-item-circle-ed">
          <div v-else class="information-step-item-circle"></div>
          <p class="information-step-item-title"
            :class="{ 'information-step-item-title-ing': item.step === step, 'information-step-item-title-ed': item.step < step }">
            {{ item.text }}</p>
        </div>
        <div class="information-step-line" :class="{ 'information-step-line-ed': item.step <= step }"></div>
      </div>
    </div>
    <div class="information-title" v-html="steps[step - 1].title"></div>
    <Step1 v-if="step == 1" @next="nextStep" />
    <Step2 v-if="step == 2" @next="nextStep" />
    <Step3 v-if="step == 3" @next="nextStep" @prev="prevStep" />
    <Step4 v-if="step == 4" @next="nextStep" @prev="prevStep" />
    <Step5 v-if="step == 5" @pay="pay" @prev="prevStep" />
  </div>
</template>

<style lang="scss" scoped>
.information {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 32px;

  .information-step {
    display: flex;
    justify-content: center;


    .information-step-line {
      width: 82px;
      height: 2px;
      background-color: #E5E5E5;

      &.information-step-line-ed {
        background-color: #0037C2;
      }
    }

    .information-step-item {
      display: flex;
      align-items: center;
      position: relative;

      .information-step-item-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #E5E5E5;
      }

      .information-step-item-circle-ed {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }

      .information-step-item-circle-ed {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }

      .information-step-item-circle-ing {
        width: 36px;
        height: 36px;
        border-radius: 50%;

        img {
          width: 42px;
          height: auto;
          margin-left: -3px;
          margin-top: -3px;
          border-radius: 50%;
        }
      }

      .information-step-item-title {
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #E5E5E5;

        &.information-step-item-title-ing {
          color: #171717;
        }

        &.information-step-item-title-ed {
          color: #0037C2;
        }
      }
    }

  }

}
</style>

<style lang="scss">
.information-title {
  font-family: 'iquost';
  font-size: 48px;
  line-height: 64px;
  color: #1C1C1C;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 16px;

  span {
    background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>