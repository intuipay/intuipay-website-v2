<script setup>
import { ref } from 'vue';
import StepIcon from './StepIcon.vue';
import { useGlobalStore } from '../../hooks/globalStore';
import step1 from '../../assets/images/pay/step1.svg';

const props = defineProps({
  step: {
    type: Number,
    default: 1
  },
  type: {
    type: String,
    default: 'usdc'
  }
})

const { store } = useGlobalStore()

</script>
<template>
  <div class="step">
    <div class="step-item" :class="{ active: step === 1, disabled: step < 1 }">
      <div class="step-content">
        <StepIcon v-if="step <= 1" step="1" :color="step === 1 ? '#fff' : '#A3A3A3'" />
        <img v-if="step > 1" src="../../assets/images/pay/success.svg" alt="success" class="success-icon">
        <div class="step-item-content-text">
          <p>Complete Payment</p>
          <!-- <span>{{ payment?.usdcAmount }} USDC</span> -->
          <span v-if="store.state.fromData?.paymentMethod?.includes('USDC')" class="usdc-amount">{{ store.state.fromData.usdcAmount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} USDC</span>
          <span v-else class="usdc-amount">{{ store?.state?.fromData?.payAmount?.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</span>
        </div>
      </div>
      <div class="arrow"></div>
    </div>
    <div v-if="type !== 'usdc'" class="step-item" :class="{ active: step === 4, disabled: step < 4 }">
      <div class="step-content">
        <StepIcon v-if="step <= 4" step="1" :color="step === 4 ? '#fff' : '#A3A3A3'" />
        <img v-if="step > 4" src="../../assets/images/pay/success.svg" alt="success" class="success-icon">
        <div class="step-item-content-text">
          <p>Convert To</p>
          <p>Digital Dollars</p>
        </div>
      </div>
      <div class="arrow"></div>
    </div>
    <div class="step-item" :class="{ active: step === 2, disabled: step < 2 }">
      <div class="step-content">
        <StepIcon v-if="step <= 2" step="2" :color="step === 2 ? '#fff' : '#A3A3A3'" />
        <img v-if="step > 2" src="../../assets/images/pay/success.svg" alt="success" class="success-icon">
        <div class="step-item-content-text">
          <p>Send Across</p>
          <p>Borders Instantly</p>
        </div>
      </div>
      <div class="arrow"></div>
    </div>
    <div class="step-item" :class="{ active: step === 3, disabled: step < 3 }">
      <div class="step-content">
        <StepIcon v-if="step <= 3" step="3" :color="step === 3 ? '#fff' : '#A3A3A3'" />
        <img v-if="step > 3" src="../../assets/images/pay/success.svg" alt="success" class="success-icon">
        <div class="step-item-content-text">
          <p>Received By University</p>
          <span class="usdc-amount">{{ store.state.fromData.amount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store.state.fromData.needPayAnotherSymbol }}</span>
        </div>
      </div>
      <div class="arrow"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step {
  display: flex;
  width: 1182px;
  height: 120px;
  position: relative;
  border-radius: 8px;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .step-item {
    flex: 1;
    height: 100%;
    position: relative;
    background: #FFFFFF;
    
    .step-content {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 60px;

      .success-icon {
        width: 32px;
        height: 32px;
        margin-left: 10px;
      }
    }
    
    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    
    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    
    .arrow {
      position: absolute;
      width: 60px; 
      height: 120px;
      right: -56px;
      top: 0;
      overflow: hidden;
      z-index: 2;
      pointer-events: none;
      
      &:before {
        content: '';
        position: absolute;
        width: 70px;
        height: 70px;
        background-color: white;
        top: 70px;
        left: -60px;
        border-radius: 8px;
        box-shadow: 4px -4px 8px -2px rgba(0, 0, 0, 0.1);
        transform: scaleY(1.5) translate(30%, -30px) rotate(45deg);
      }
    }

    .step-item-content-text {
      margin-left: 15px;
      
      p {
        margin: 0;
        margin-bottom: 3px;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #000000;
      }
      
      span {
        color: #000000;
        font-size: 18px;
        line-height: 24px;
        font-weight: 700;
      }
    }
    
    &.active {
      background: linear-gradient(270deg, #0037C2 0%, #4796F2 100%);
      color: white;
      
      .step-item-content-text {
        p, span {
          color: white;
        }
      }
      
      .arrow:before {
        background: #0037C2;
      }
    }

    &.disabled {
      .step-item-content-text {
        p, span {
          color: #A3A3A3;
        }
      }
    }
    
    &:nth-child(1) {
      z-index: 3;
    }
    
    &:nth-child(2) {
      z-index: 2;
    }
    
    &:nth-child(3) {
      z-index: 1;
    }
  }
}
</style> 