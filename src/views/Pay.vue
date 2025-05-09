<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Web3 from 'web3';
import { useGlobalStore } from '../hooks/globalStore';

import Step1 from '../components/pay/Step-1.vue';
import Step2 from '../components/pay/Step-2.vue';
import Step3 from '../components/pay/Step-3.vue';
import Step from '../components/pay/Step.vue';

const contractAddress = '0xa90d011d49b03b206df84c9ee4b041b4e7a60ef4';
const tokenAddress = '0xe2f3853d465e4df7bfee0a19d7396286df77272a';
const universityAddress = '0x8805b2C2cC898eF27B4bB4e960851eCf8529dBB3';

const tokenAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "initialSupply",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" },
      { "name": "spender", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      { "name": "spender", "type": "address", "internalType": "address" },
      { "name": "value", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "value", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      { "name": "from", "type": "address", "internalType": "address" },
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "value", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "ERC20InsufficientAllowance",
    "inputs": [
      { "name": "spender", "type": "address", "internalType": "address" },
      { "name": "allowance", "type": "uint256", "internalType": "uint256" },
      { "name": "needed", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InsufficientBalance",
    "inputs": [
      { "name": "sender", "type": "address", "internalType": "address" },
      { "name": "balance", "type": "uint256", "internalType": "uint256" },
      { "name": "needed", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidApprover",
    "inputs": [
      { "name": "approver", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidReceiver",
    "inputs": [
      { "name": "receiver", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidSender",
    "inputs": [
      { "name": "sender", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidSpender",
    "inputs": [
      { "name": "spender", "type": "address", "internalType": "address" }
    ]
  }
];
const contractAbi = [
  { "type": "receive", "stateMutability": "payable" },
  {
    "type": "function",
    "name": "addUniversity",
    "inputs": [
      { "name": "_uAddress", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "authedUniversityAddressList",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createOrder",
    "inputs": [
      { "name": "_assetHash", "type": "string", "internalType": "string" },
      { "name": "_usdcAmount", "type": "uint256", "internalType": "uint256" },
      {
        "name": "universityAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getContractBalance",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getOrder",
    "inputs": [
      { "name": "_orderId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IntuiPay.Order",
        "components": [
          {
            "name": "orderType",
            "type": "uint8",
            "internalType": "enum IntuiPay.OrderType"
          },
          { "name": "assetHash", "type": "string", "internalType": "string" },
          {
            "name": "usdcAmount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "universityAddress",
            "type": "address",
            "internalType": "address"
          },
          { "name": "creator", "type": "address", "internalType": "address" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      { "name": "usdcAddress", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isUniversityAuthorized",
    "inputs": [
      { "name": "_uAddress", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "orderBook",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
      {
        "name": "orderType",
        "type": "uint8",
        "internalType": "enum IntuiPay.OrderType"
      },
      { "name": "assetHash", "type": "string", "internalType": "string" },
      { "name": "usdcAmount", "type": "uint256", "internalType": "uint256" },
      {
        "name": "universityAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "creator", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "orderId",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pause",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "paused",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "payOrder",
    "inputs": [
      { "name": "_orderId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "uniPay",
    "inputs": [
      { "name": "_assetHash", "type": "string", "internalType": "string" },
      { "name": "_usdcAmount", "type": "uint256", "internalType": "uint256" },
      {
        "name": "universityAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "unpause",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateOwner",
    "inputs": [
      { "name": "newOwner", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateUniversity",
    "inputs": [
      { "name": "_uAddress", "type": "address", "internalType": "address" },
      { "name": "_authorized", "type": "bool", "internalType": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "usdcToken",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address", "internalType": "contract IERC20" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "_targetAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ContractPaused",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ContractUnpaused",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "name": "version",
        "type": "uint64",
        "indexed": false,
        "internalType": "uint64"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OrderCreated",
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "assetHash",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "creator",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OrderPaid",
    "inputs": [
      {
        "name": "orderId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "payer",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnerUpdated",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Paused",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UniversityUpdated",
    "inputs": [
      {
        "name": "university",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "isAuthorized",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Unpaused",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Withdraw",
    "inputs": [
      {
        "name": "targetAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "withdrawAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  { "type": "error", "name": "EnforcedPause", "inputs": [] },
  { "type": "error", "name": "ExpectedPause", "inputs": [] },
  { "type": "error", "name": "InvalidInitialization", "inputs": [] },
  { "type": "error", "name": "NotInitializing", "inputs": [] },
  { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] }
];

const web3 = new Web3(window.ethereum);
const account = ref('');

const { store, setFromData } = useGlobalStore();
const route = useRoute();
const router = useRouter();

const step = ref(1);
const loading = ref(false);
const payment = ref({});
const showCancelModal = ref(false);

const connect = async () => {
  try {
    if (!window.ethereum) {
      alert('MetaMask not detected!');
      return;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }
    account.value = accounts[0];
    store.state.fromData.account = accounts[0];
    setFromData({ ...store.state.fromData });
    console.log('Connected wallet:', accounts[0]);
  } catch (e) {
    console.error('Wallet connection failed', e);
  }
};

const approve = async (amount) => {
  const fromData = store.state.fromData;
  if (!account.value) throw new Error('No account connected');
  const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  await tokenContract.methods.approve(
    contractAddress,
    web3.utils.toWei(amount.toString(), 'mwei') // Use 'mwei' for USDC 6 decimals
  ).send({ from: account.value, gas: 200000 });
};

const pay = async () => {
  if (loading.value) return;
  loading.value = true;

  try {
    if (!account.value) {
      await connect();
      if (!account.value) throw new Error('No account connected');
    }

    payment.value.paidOn = new Date().toLocaleString();
    const fromData = store.state.fromData;

    await approve(fromData.usdcAmount);

    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const orderId = await contract.methods.orderId().call();
    payment.value.orderId = orderId;

    // Removed createOrder step — relying solely on uniPay()

    // Debugging: log USDC balance and arguments before transaction
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(account.value).call();
    const required = web3.utils.toWei(fromData.usdcAmount.toString(), 'mwei');
    console.log('USDC balance:', balance);
    console.log('Required amount:', required);
    console.log('Calling uniPay with:', {
      assetHash: payment.value.id,
      amount: web3.utils.toWei(fromData.usdcAmount.toString(), 'mwei'),
      university: universityAddress
    });

    // Try-catch around uniPay for precise error tracing
    let tx;
    try {
      tx = await contract.methods.uniPay(
        payment.value.id,
        web3.utils.toWei(fromData.usdcAmount.toString(), 'mwei'),
        universityAddress
      ).send({ from: account.value, gas: 1200000 });
    } catch (uniPayError) {
      console.error('uniPay reverted:', uniPayError);
      throw uniPayError;
    }

    payment.value.status = 'In Progress';
    payment.value.remittanceDate = new Date().toLocaleString();
    payment.value.tx = tx;
    step.value = 2;

    payment.value.status = 'Payment Successful';
    payment.value.accountingDate = new Date().toLocaleString();
    step.value = 3;

    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    payments.forEach((item, index) => {
      if (item.id === payment.value.id) {
        payments[index] = payment.value;
      }
    });
    localStorage.setItem('payments', JSON.stringify(payments));
  } catch (error) {
    console.error('Payment failed:', error);
  }

  loading.value = false;
};

const cancelPayment = () => {
  const localPayments = JSON.parse(localStorage.getItem('payments') || '[]');
  const index = localPayments.findIndex((item) => item.id === payment.value.id);
  if (index !== -1) {
    localPayments.splice(index, 1);
    localStorage.setItem('payments', JSON.stringify(localPayments));
  }
  showCancelModal.value = false;
  router.push('/');
};

onMounted(() => {
  const id = route.params.id;
  const localPayments = JSON.parse(localStorage.getItem('payments') || '[]');
  const found = localPayments.find((item) => item.id === id);
  if (!found) return router.push('/');
  payment.value = found;
  setFromData(found);
  account.value = found.account || store.state.fromData.account || '';

  if (route.query.step) {
    step.value = Number(route.query.step);
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
            <div class="pay-main-right-info-item"
              :style="{ cursor: payment.status === 'Awaiting Payment' ? 'pointer' : 'not-allowed' }" @click="() => {
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
