<script setup>
import { useAppKitAccount, useWalletInfo, useDisconnect } from '@reown/appkit/vue'
import { useGlobalStore } from '../../hooks/globalStore';

const { store } = useGlobalStore();

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['pay', 'connect']);

const account = useAppKitAccount();
const walletInfo = useWalletInfo();
const { disconnect } = useDisconnect();

console.log(account.value, walletInfo)

const formatAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

const disconnectWallet = async () => {
  await disconnect();
}
</script>
<template>
  <div class="step-1">
    <div class="step-1-amount">
      <div class="usdc-icon">
        <img v-if="store.state.fromData?.paymentMethod?.includes('USDC')" src="../../assets/images/information/usdc.png" alt="">
        <img v-else src="../../assets/images/information/edu.png" alt="">
      </div>
      <div class="amount-details">
        <p class="amount-title">{{ store.state.fromData?.paymentMethod }}</p>
        <div class="converted-amount">
          <p v-if="store.state.fromData?.paymentMethod?.includes('USDC')" class="usdc-amount">{{ store?.state?.fromData?.usdcAmount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} USDC</p>
          <p v-else class="usdc-amount">{{ store?.state?.fromData?.payAmount?.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</p>
          <span v-if="store?.state?.fromData?.paymentMethod?.includes('USDC')">
            <del class="yen">{{ (store?.state?.fromData?.maxAmount / store?.state?.fromData?.usdTargetRate)?.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} USDC</del>
            <span class="saved">(saved <span class="saved-amount">{{ ((store?.state?.fromData?.maxAmount / store?.state?.fromData?.usdTargetRate) - (store?.state?.fromData?.payAmount / store?.state?.fromData?.usdTargetRate)).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} USDC</span>)</span>
          </span>
          <span v-else>
            <del class="yen">{{ store?.state?.fromData?.maxAmount?.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</del>
            <span class="saved">(saved <span class="saved-amount">{{ ((store?.state?.fromData?.maxAmount || 0) - (store?.state?.fromData?.payAmount || 0)).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</span>)</span>
          </span>
        </div>
      </div>
    </div>

    <div v-if="store.state.fromData?.paymentMethod?.includes('USDC')" class="wallet-connect">
      <div v-if="!account.isConnected" class="wallet-connect-button">
        <div class="wallet-logo">
          <img src="../../assets/images/pay/wallet-logo.png" alt="" />
        </div>
        <button class="connect-btn" @click="emit('connect')">Connect</button>
      </div>
      <div v-else class="wallet-connect-button">
        <div class="wallet-connect-button-content">
          <div class="wallet-logo">
            <img :src="walletInfo.walletInfo.icon" alt="" />
          </div>
          <div class="wallet-address">
            <p>{{ formatAddress(account.address) }}</p>
          </div>
          <div class="disconnect-btn" @click="disconnectWallet">
            <img src="../../assets/images/pay/disconnect.svg" alt="" />
          </div>
        </div>
        <button class="connect-btn" @click="emit('pay')" :disabled="!account.isConnected || loading">Pay Now</button>
      </div>
    </div>
    <div v-else class="wallet-list">
      <img src="../../assets/images/pay/wallet.png" alt="">
    </div>
    <div class="sponsored-info">
      <div class="sponsor-bell">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 3C7.10053 3 4.75003 5.35051 4.75003 8.25V11.3876L4.13131 12.0063C3.88106 12.2565 3.8062 12.6329 3.94163 12.9598C4.07706 13.2868 4.39612 13.5 4.75003 13.5H15.25C15.6039 13.5 15.923 13.2868 16.0584 12.9598C16.1939 12.6329 16.119 12.2565 15.8687 12.0063L15.25 11.3876V8.25C15.25 5.35051 12.8995 3 10 3Z"
            fill="#F59E0B" />
          <path d="M10 17C8.55025 17 7.375 15.8247 7.375 14.375H12.625C12.625 15.8247 11.4497 17 10 17Z"
            fill="#F59E0B" />
        </svg>
      </div>
      <div class="sponsor-text">
        <p class="sponsor-title">Sponsored by EDU Chain.</p>
        <p class="sponsor-description">
          Typical conversion costs from fiat currencies like USD and CNY to stablecoins like USDC and USDT, also known
          as on-ramp costs, range from 0-5%. This cost is sponsored by EDU Chain.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;

  .step-1-amount {
    display: flex;
    align-items: flex-start;
    gap: 32px;

    .usdc-icon {
      width: 80px;
      height: 80px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .amount-details {
      .amount-title {
        font-family: 'Inter';
        font-weight: 500;
        font-size: 18px;
        line-height: 18px;
        color: #525252;
      }

      .converted-amount {
        margin-top: 16px;
        display: flex;
        align-items: center;
        font-family: Inter;
        font-weight: 500;
        font-size: 16px;
        line-height: 18px;
        color: #A3A3A3;

        .usdc-amount {
          font-family: 'iquost';
          font-weight: 400;
          font-size: 32px;
          line-height: 38px;
          color: #000000;
          margin-right: 10px;
        }

        .yen {
          margin-right: 8px;
        }

        .saved {
          .saved-amount {
            color: #0070F3;
          }
        }
      }

      .fee {
        font-family: Inter;
        font-weight: 400;
        font-size: 12px;
        line-height: 121%;
        color: #525252;
      }
    }
  }

  .wallet-connect {
    flex: 1;

    .wallet-connect-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border: 1px solid #E5E5E5;
      border-radius: 8px;
      background: white;

      .wallet-connect-button-content {
        display: flex;
        align-items: center;
        gap: 16px;

        .wallet-logo {
          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .wallet-address {
          font-family: Inter;
          font-weight: 500;
          font-size: 16px;
          line-height: 18px;
          color: #000000;
        }

        .disconnect-btn {
          cursor: pointer;

          img {
            width: 14px;
            height: 14px;
          }
        }
      }

      .wallet-logo {
        img {
          width: 238px;
          height: auto;
        }
      }

      .connect-btn {
        width: 113px;
        height: 52px;
        border-radius: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #171717;
        border: 2px solid #E5E5E5;
        box-shadow: 2px 6px 4px 0px #FFFFFF59 inset;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #FFFFFF;
        cursor: pointer;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }

  .wallet-list {
    flex: 1;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .sponsored-info {
    display: flex;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 6px;
    background: #FFFBEB;
    border: 1px solid #FDE68A;

    .sponsor-text {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .sponsor-title {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #92400E;
      }

      .sponsor-description {
        font-size: 14px;
        line-height: 20px;
        color: #B45309;
        font-weight: 400;
        margin: 0;
      }
    }
  }
}
</style>