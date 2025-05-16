<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createAppKit, useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/vue';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/vue';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/vue';
import { solanaDevnet } from '@reown/appkit/networks';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { PublicKey, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { useGlobalStore } from '../hooks/globalStore';

import Step1 from '../components/pay/Step-1.vue';
import Step2 from '../components/pay/Step-2.vue';
import Step3 from '../components/pay/Step-3.vue';
import Step from '../components/pay/Step.vue';

// --- Project Settings
const projectId = 'ca8ec99bc67e27356dc3307268308c8b';
const programId = new PublicKey('dAqnNTcrxTQVsF6LWfZZ5vvchFSQdSnK5NoA9M7FFvb');
const usdcMint = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
const universityPublicKey = new PublicKey('9HTp2Hgcsuur2wtdLA3wH3tLhKyT9mZrYdNhi8EsAVhX');

// --- Reown AppKit Init
createAppKit({
  adapters: [new SolanaAdapter()],
  networks: [solanaDevnet],
  metadata: {
    name: 'Intuipay',
    description: 'Intuipay Payment',
    url: window.location.origin,
    icons: ['https://assets.reown.com/reown-profile-pic.png'],
  },
  projectId,
  features: {
    email: false,
    socials: [],
    emailShowWallets: true,
  },
});

// --- Hooks
const modal = useAppKit();
const { address, isConnected } = useAppKitAccount();
const { walletProvider } = useAppKitProvider('solana');
const { connection } = useAppKitConnection();
const { store, setFromData } = useGlobalStore();
const route = useRoute();
const router = useRouter();

const step = ref(1);
const loading = ref(false);
const payment = ref({});
const showCancelModal = ref(false);

const uniPayDiscriminator = Buffer.from('b4f23c24c08da84c', 'hex');
function createUniPayInstructionData(amount) {
  const amountBuffer = Buffer.alloc(8);
  amountBuffer.writeBigUInt64LE(BigInt(amount));
  return Buffer.concat([uniPayDiscriminator, amountBuffer]);
}

const pay = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const fromData = store.state.fromData;

    if (!fromData || !fromData.usdcAmount) {
      throw new Error('Missing payment details.');
    }

    const authority = new PublicKey(address);
    const usdcAmount = Number(fromData.usdcAmount);
    const amount = BigInt(Math.floor(usdcAmount * 1_000_000)); // USDC decimals

    const fromTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      authority
    );

    const toTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      universityPublicKey
    );

    const latestBlockhash = await connection.getLatestBlockhash();

    const transaction = new Transaction({
      feePayer: authority,
      recentBlockhash: latestBlockhash.blockhash,
    });

    transaction.add({
      programId,
      keys: [
        { pubkey: authority, isSigner: true, isWritable: true },
        { pubkey: fromTokenAccount, isSigner: false, isWritable: true },
        { pubkey: toTokenAccount, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      ],
      data: createUniPayInstructionData(amount),
    });

    const signature = await walletProvider.sendTransaction(transaction, connection);

    console.log('✅ Payment successful, Tx Signature:', signature);

    payment.value.paidOn = new Date().toLocaleString();
    payment.value.status = 'Payment Successful';
    payment.value.remittanceDate = new Date().toLocaleString();
    payment.value.accountingDate = new Date().toLocaleString();
    step.value = 3;

  } catch (error) {
    console.error('❌ Payment failed:', error);
    payment.value.status = 'Payment Failed';
  }
  loading.value = false;
};

const connect = () => {
  modal.open();
};

const cancelPayment = async () => {
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
  if (!id) {
    router.push('/');
    return;
  }
  const localPayments = JSON.parse(localStorage.getItem('payments') || '[]');
  const foundPayment = localPayments.find((item) => item.id === id);

  if (foundPayment) {
    payment.value = foundPayment;
    setFromData(foundPayment);
  } else {
    router.push('/');
  }

  if (route.query.step) {
    step.value = Number(route.query.step);
  }
});

const handlePay = async () => {
  if (!isConnected) {
    console.log('Wallet not connected, opening modal...');
    modal.open();
    return;
  }
  await pay();
};
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
