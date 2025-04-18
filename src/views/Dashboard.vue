<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '../hooks/globalStore';

const { store, setFromData } = useGlobalStore();

import { useRouter } from 'vue-router';

const router = useRouter();

const payments = ref([]);

const viewPayment = (payment) => {
  setFromData(payment);
  if (payment.status == 'Awaiting Payment') {
    router.push(`/pay/${payment.id}`);
  } else {
    router.push(`/pay/${payment.id}?step=3`);
  }
}

const formatHash = (hash) => {
  if (!hash) return '--'
  return hash.slice(0, 6) + '...' + hash.slice(-4)
}

onMounted(() => {
  const localPayments = localStorage.getItem('payments');
  if (localPayments) {
    payments.value = JSON.parse(localPayments);
  }
});
</script>
<template>
  <div class="dashboard">
    <div class="payment-card" v-for="payment in payments" :key="payment.id">
      <div class="payment-card-content">
        <div class="payment-header">
          <div>
            <div class="recipient">To {{ payment?.university?.name }}</div>
            <div class="amount">{{ payment?.amount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ payment?.needPayAnotherSymbol }}</div>
          </div>
          <div class="button-primary" style="width: 188px;" @click="viewPayment(payment)">View payment</div>
        </div>

        <div class="payment-details">
          <div class="detail-row">
            <div>
              <div class="detail-label">Status</div>
              <div class="detail-value">
                <div class="status-indicator">
                  <div class="status-dot waiting" :style="{ backgroundColor: payment.status == 'Awaiting Payment' ? '#ff6b6b' : '#22C55E' }"></div>
                  <span>{{ payment.status }}</span>
                </div>
              </div>
            </div>
            <div v-if="payment.status == 'Awaiting Payment'">
              <div class="detail-label">Payment method</div>
              <div class="detail-value">{{ payment.paymentMethod || '--' }}</div>
            </div>
            <div v-else>
              <div class="detail-label">Hash</div>
              <div class="detail-value"><a :href="`https://edu-chain-testnet.blockscout.com/tx/${payment.tx?.transactionHash}`" target="_blank" rel="noopener noreferrer">{{ formatHash(payment.tx?.transactionHash) }}</a></div>
            </div>
            <div>
              <div class="detail-label">Order ID</div>
              <div class="detail-value">{{ payment.orderId || '--' }}</div>
            </div>
            <div>
              <div class="detail-label">Start on</div>
              <div class="detail-value">{{ payment.paidOn || '--' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="payment-divider"></div>

      <div class="payment-info">
        <div class="info-icon">
          <i class="info-circle"></i>
        </div>
        <div class="info-text">
          <p>Please initiate the transaction of <span class="amount-text">¥368,800.00</span> with your pay no later than
            <span class="date-text">April 7, 2025</span>.</p>
        </div>
      </div>

      <div class="action-buttons">
        <button class="view-payment-btn">View payment</button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 32px;
}

.payment-card {
  width: 100%;
  max-width: 1040px;
  border: 1px solid #E5E5E5;
  border-radius: 12px;
  padding: 8px;
  background: #F5F5F5;
  box-sizing: border-box;

  .payment-card-content {
    padding: 32px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
  }
}

.payment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.recipient {
  font-family: Inter;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #525252;
}

.amount {
  margin-top: 16px;
  font-family: 'iquost';
  font-weight: 400;
  font-size: 32px;
}

.payment-details {
  // margin-bottom: 30px;
}

.detail-row {
  display: flex;
  gap: 64px;
}

.detail-label {
  font-family: Inter;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #00000066;
}

.detail-value {
  margin-top: 16px;
  font-family: Inter;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #000000;

  a {
    color: #217BE0;
    text-decoration: underline;
  }
}

.status-indicator {
  display: flex;
  align-items: center;

  span {
    font-weight: 700;
  }
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.status-dot.waiting {
  background-color: #ff6b6b;
}

.status-dot.success {
  background-color: #22C55E;
}

.payment-divider {
  height: 1px;
  background-color: #eee;
  margin: 20px 0;
}

.payment-info {
  display: flex;
  background-color: #f8f9fd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.info-icon {
  margin-right: 10px;
  color: #3366ff;
}

.info-circle:before {
  content: "ⓘ";
  font-size: 18px;
}

.info-text {
  font-size: 14px;
  color: #444;
}

.amount-text {
  font-weight: 500;
}

.date-text {
  color: #3366ff;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}

.view-payment-btn {
  background-color: #0033cc;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-payment-btn:hover {
  background-color: #0024a6;
}
</style>