<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createAppKit, useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/vue'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { eduChainTestnet } from '@reown/appkit/networks'
import { ethers } from 'ethers'
import { useGlobalStore } from '../hooks/globalStore';

import Step1 from '../components/pay/Step-1.vue';
import Step2 from '../components/pay/Step-2.vue';
import Step3 from '../components/pay/Step-3.vue';
import Step from '../components/pay/Step.vue';

const projectId = 'ca8ec99bc67e27356dc3307268308c8b'
const contractAddress = '0xa90d011d49b03b206df84c9ee4b041b4e7a60ef4'
const tokenAddress = '0x44ece09dBfE2382fB744C0BeBd568a1354bfBE7B'
const tokenAbi = '[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"_decimal","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'
const contractAbi = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "ContractPaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "ContractUnpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "orderId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "assetHash", "type": "string" }, { "indexed": false, "internalType": "address", "name": "creator", "type": "address" }], "name": "OrderCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "targetAddress", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "withdrawAmount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_uAddress", "type": "address" }], "name": "addUniversity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "authedUniversityAddressList", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_assetHash", "type": "string" }, { "internalType": "uint256", "name": "_usdcAmount", "type": "uint256" }, { "internalType": "address", "name": "universityAddress", "type": "address" }], "name": "createOrder", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getContractBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_orderId", "type": "uint256" }], "name": "getOrder", "outputs": [{ "components": [{ "internalType": "enum IntuiPay.OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "string", "name": "assetHash", "type": "string" }, { "internalType": "uint256", "name": "usdcAmount", "type": "uint256" }, { "internalType": "address", "name": "universityAddress", "type": "address" }, { "internalType": "address", "name": "creator", "type": "address" }], "internalType": "struct IntuiPay.Order", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "usdcAddress", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_uAddress", "type": "address" }], "name": "isUniversityAuthorized", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "orderBook", "outputs": [{ "internalType": "enum IntuiPay.OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "string", "name": "assetHash", "type": "string" }, { "internalType": "uint256", "name": "usdcAmount", "type": "uint256" }, { "internalType": "address", "name": "universityAddress", "type": "address" }, { "internalType": "address", "name": "creator", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "orderId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_orderId", "type": "uint256" }], "name": "payOrder", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_assetHash", "type": "string" }, { "internalType": "uint256", "name": "_usdcAmount", "type": "uint256" }, { "internalType": "address", "name": "universityAddress", "type": "address" }], "name": "uniPay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "updateOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_uAddress", "type": "address" }, { "internalType": "bool", "name": "_type", "type": "bool" }], "name": "updateUniversity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usdcToken", "outputs": [{ "internalType": "contract IERC20Upgradeable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_targetAddress", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const universityAddress = '0xfFe4b50BC2885e4708544477B6EeD4B32e4d82BF'

const localPayments = localStorage.getItem('payments');
const payments = JSON.parse(localPayments);

const metadata = {
  name: 'intuipay',
  description: 'intuipay',
  url: window.location.origin,
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

createAppKit({
  adapters: [new Ethers5Adapter()],
  networks: [eduChainTestnet],
  metadata,
  projectId,
  features: {
    email: false,
    socials: [],
    emailShowWallets: true,
  }
})

const modal = useAppKit()
const account = useAppKitAccount()
const walletProvider = useAppKitProvider("eip155");
const { store, setFromData } = useGlobalStore();
const route = useRoute();
const router = useRouter();

const step = ref(1);
const loading = ref(false);
const payment = ref({});
const showCancelModal = ref(false);
const approve = async (amount) => {
  console.log(amount, walletProvider)
  const provider = new ethers.providers.Web3Provider(walletProvider.walletProvider);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);
  const tx = await contract.approve(contractAddress, ethers.utils.parseUnits(amount.toString(), 18));
  await tx.wait();
}

const cancelPayment = async () => {
  const localPayments = localStorage.getItem('payments');
  const payments = JSON.parse(localPayments);
  payments.forEach((item, index) => {
    if (item.id === payment.value.id) {
      console.log(item)
      payments.splice(index, 1);
    }
  });
  localStorage.setItem('payments', JSON.stringify(payments));
  showCancelModal.value = false;
  router.push('/');
}

const pay = async () => {
  if (loading.value) return
  loading.value = true
  try {
    payment.value.paidOn = new Date().toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
    const fromData = store.state.fromData;
    await approve(fromData.usdcAmount);
    const provider = new ethers.providers.Web3Provider(walletProvider.walletProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const orderId = Number(await contract.orderId())
    payment.value.orderId = orderId
    const tx = await contract.uniPay(payment.value.id, ethers.utils.parseUnits(fromData.usdcAmount.toString(), 18), universityAddress);
    payment.value.status = 'In Progress'
    payment.value.remittanceDate = new Date().toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
    payment.value.tx = tx
    step.value = 2
    const txReceipt = await tx.wait();
    payment.value.status = 'Payment Successful'
    payment.value.tx = txReceipt
    payment.value.accountingDate = new Date().toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})
    step.value = 3
    payments.forEach((item, index) => {
      if (item.id === payment.value.id) {
        console.log(item)
        payments[index] = payment.value
      }
    });
    localStorage.setItem('payments', JSON.stringify(payments));
  } catch (error) {
    console.log(error)
  }
  loading.value = false;
}

const connect = () => {
  modal.open()
  console.log(account.value)
}

onMounted(() => {
  const id = route.params.id;
  if (!id) {
    router.push('/')
  }
  const localPayments = localStorage.getItem('payments');
  if (!localPayments) {
    router.push('/')
  }
  const payments = JSON.parse(localPayments);
  payments.forEach((item, index) => {
    if (item.id === id) {
      payment.value = item;
      setFromData(item);
    }
  });
  if (!payment.value) {
    router.push('/')
  }
  if (route.query.step) {
    step.value = Number(route.query.step)
  }
});
</script>

<template>
  <div class="pay">
    <div class="pay-content">
      <Step :step="step" :type="payment?.paymentMethod?.includes('USDC') ? 'usdc' : 'other'" />

      <div class="pay-main">
        <div class="pay-main-left">
          <Step1 v-if="step === 1" :loading="loading" @pay="pay" @connect="connect" />
          <Step2 v-else-if="step === 2" :payment="payment" />
          <Step3 v-else-if="step === 3" :payment="payment" />
        </div>
        <div class="pay-main-right">
          <div class="pay-main-right-status">
            <div class="pay-main-right-order-id">Order ID: {{ payment.orderId || '--' }}</div>
            <div class="pay-main-right-status-item">
              <p>Status:</p>
              <div class="status"
                :style="{ background: payment.status === 'Awaiting Payment' ? '#F87171' : payment.status === 'In Progress' ? '#FFE866' : '#4ADE80' }">
                {{ payment.status }}</div>
            </div>
          </div>
          <div class="pay-main-right-info">
            <div class="pay-main-right-info-title">
              Manage your payment
            </div>
            <div class="pay-main-right-info-item">
              <div class="pay-main-right-info-item-left">
                <img src="../assets/images/pay/frame.svg" alt="">
                <p>Edit payment details</p>
              </div>
              <div class="pay-main-right-info-item-right">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.07459 4.55806C6.80847 4.80214 6.80847 5.19786 7.07459 5.44194L11.5625 9.55806C11.8286 9.80214 11.8286 10.1979 11.5625 10.4419L7.07459 14.5581C6.80847 14.8021 6.80847 15.1979 7.07459 15.4419C7.34072 15.686 7.77219 15.686 8.03831 15.4419L12.5262 11.3258C13.3246 10.5936 13.3246 9.40641 12.5262 8.67418L8.03831 4.55806C7.77219 4.31398 7.34072 4.31398 7.07459 4.55806Z"
                    fill="#1C1C1C" fill-opacity="0.2" />
                </svg>
              </div>
            </div>
            <div class="pay-main-right-info-item">
              <div class="pay-main-right-info-item-left">
                <img src="../assets/images/pay/frame1.svg" alt="">
                <p>SMS notifications</p>
              </div>
              <div class="pay-main-right-info-item-right">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.07459 4.55806C6.80847 4.80214 6.80847 5.19786 7.07459 5.44194L11.5625 9.55806C11.8286 9.80214 11.8286 10.1979 11.5625 10.4419L7.07459 14.5581C6.80847 14.8021 6.80847 15.1979 7.07459 15.4419C7.34072 15.686 7.77219 15.686 8.03831 15.4419L12.5262 11.3258C13.3246 10.5936 13.3246 9.40641 12.5262 8.67418L8.03831 4.55806C7.77219 4.31398 7.34072 4.31398 7.07459 4.55806Z"
                    fill="#1C1C1C" fill-opacity="0.2" />
                </svg>
              </div>
            </div>
            <div class="pay-main-right-info-item">
              <div class="pay-main-right-info-item-left">
                <img src="../assets/images/pay/frame2.svg" alt="">
                <p>Change payment method</p>
              </div>
              <div class="pay-main-right-info-item-right">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.07459 4.55806C6.80847 4.80214 6.80847 5.19786 7.07459 5.44194L11.5625 9.55806C11.8286 9.80214 11.8286 10.1979 11.5625 10.4419L7.07459 14.5581C6.80847 14.8021 6.80847 15.1979 7.07459 15.4419C7.34072 15.686 7.77219 15.686 8.03831 15.4419L12.5262 11.3258C13.3246 10.5936 13.3246 9.40641 12.5262 8.67418L8.03831 4.55806C7.77219 4.31398 7.34072 4.31398 7.07459 4.55806Z"
                    fill="#1C1C1C" fill-opacity="0.2" />
                </svg>
              </div>
            </div>
            <div class="pay-main-right-info-item" :style="{ cursor: payment.status === 'Awaiting Payment' ? 'pointer' : 'not-allowed' }" @click="() => {
              if (payment.status === 'Awaiting Payment') {
                showCancelModal = true
              }
            }">
              <div class="pay-main-right-info-item-left">
                <img src="../assets/images/pay/frame3.svg" alt="">
                <p>Cancel payment</p>
              </div>
              <div class="pay-main-right-info-item-right">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.07459 4.55806C6.80847 4.80214 6.80847 5.19786 7.07459 5.44194L11.5625 9.55806C11.8286 9.80214 11.8286 10.1979 11.5625 10.4419L7.07459 14.5581C6.80847 14.8021 6.80847 15.1979 7.07459 15.4419C7.34072 15.686 7.77219 15.686 8.03831 15.4419L12.5262 11.3258C13.3246 10.5936 13.3246 9.40641 12.5262 8.67418L8.03831 4.55806C7.77219 4.31398 7.34072 4.31398 7.07459 4.55806Z"
                    fill="#1C1C1C" fill-opacity="0.2" />
                </svg>
              </div>
            </div>
            <div class="pay-main-right-info-item">
              <div class="pay-main-right-info-item-content">
                <div class="pay-main-right-info-item-left">
                  <img src="../assets/images/pay/frame4.svg" alt="">
                  <p>Download Receipt</p>
                </div>
                <div class="pay-main-right-info-item-right">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.07459 4.55806C6.80847 4.80214 6.80847 5.19786 7.07459 5.44194L11.5625 9.55806C11.8286 9.80214 11.8286 10.1979 11.5625 10.4419L7.07459 14.5581C6.80847 14.8021 6.80847 15.1979 7.07459 15.4419C7.34072 15.686 7.77219 15.686 8.03831 15.4419L12.5262 11.3258C13.3246 10.5936 13.3246 9.40641 12.5262 8.67418L8.03831 4.55806C7.77219 4.31398 7.34072 4.31398 7.07459 4.55806Z"
                      fill="#1C1C1C" fill-opacity="0.2" />
                  </svg>
                </div>
              </div>
              <div class="pay-main-right-info-item-content-text">
                Your payment receipt will be available for download after the payment is complete.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cancel-modal" v-if="showCancelModal">
      <div class="cancel-modal-content">
        <div class="cancel-modal-content-title">
          <img src="../assets/images/pay/warn.svg" alt="">
          <div>
            <p>Cancel Payment</p>
            <p class="cancel-modal-content-title-text">Are you sure you want to cancel payment? This action cannot be
              undone.</p>
          </div>
        </div>
        <div class="cancel-modal-content-button">
          <button class="cancel-modal-content-button-previous" @click="cancelPayment">Previous</button>
          <button class="cancel-modal-content-button-cancel" @click="showCancelModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay {
  background: #F7F9FB;
  min-height: 100vh;
  width: 100%;
  padding: 48px 0;
  box-sizing: border-box;

  .pay-content {
    width: 1216px;
    margin: auto;

    .pay-main {
      margin-top: 48px;
      display: flex;
      gap: 32px;

      .pay-main-left {
        flex: 1;
        background: #fff;
        border-radius: 8px;
        padding: 32px;
      }

      .pay-main-right {
        width: 336px;
        flex: 0 0 336px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .pay-main-right-status {
          background: #fff;
          padding: 16px;
          border-radius: 8px;
          font-family: Inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #525252;

          .pay-main-right-status-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 16px;

            .status {
              padding: 7px 16px;
              border-radius: 30px;
              background: #F87171;
              font-family: Inter;
              font-weight: 500;
              font-size: 16px;
              line-height: 18px;
              color: #171717;
            }
          }
        }

        .pay-main-right-info {
          background: #fff;
          padding: 16px;
          border-radius: 8px;

          .pay-main-right-info-title {
            font-family: Inter;
            font-weight: 400;
            font-size: 18px;
            line-height: 18px;
            color: #525252;
            margin-bottom: 24px;
          }

          .pay-main-right-info-item {
            border: 1px solid #E5E5E5;
            padding: 16px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            box-sizing: border-box;
            flex-wrap: wrap;
            gap: 16px;

            .pay-main-right-info-item-content {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
            }

            .pay-main-right-info-item-content-text {
              font-family: Inter;
              font-weight: 400;
              font-size: 12px;
              line-height: 18px;
              color: #A3A3A3;
            }

            &+.pay-main-right-info-item {
              margin-top: 16px;
            }

            .pay-main-right-info-item-left {
              display: flex;
              align-items: center;
              gap: 8px;
              font-family: Inter;
              font-weight: 500;
              font-size: 16px;
              line-height: 18px;
              color: #171717;

              img {
                width: 32px;
                height: 32px;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }
}

.cancel-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .cancel-modal-content {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 10px 10px -5px #0000000A;
    background: #FFFFFF;
    width: 512px;
    padding: 24px;
    box-sizing: border-box;

    .cancel-modal-content-title {
      display: flex;
      gap: 16px;

      img {
        width: 40px;
        height: 40px;
      }

      p {
        font-family: Inter;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #111827;

        &.cancel-modal-content-title-text {
          font-family: Inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0%;
          color: #6B7280;
          margin-top: 8px;
        }
      }
    }

    .cancel-modal-content-button {
      display: flex;
      gap: 12px;
      margin-top: 24px;
      justify-content: flex-end;

      button {
        padding: 9px 17px;
        border-radius: 8px;
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;

        &.cancel-modal-content-button-previous {
          background: #FFFFFF;
          border: 1px solid #D1D5DB;
          box-shadow: 0px 1px 2px 0px #0000000D;
          color: #374151;
        }

        &.cancel-modal-content-button-cancel {
          background: #DC2626;
          color: #FFFFFF;
          box-shadow: 0px 1px 2px 0px #0000000D;
          border: none;
        }
      }
    }
  }
}
</style>
