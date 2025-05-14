<script setup>
import { ref, onMounted } from 'vue';
import Web3 from 'web3';
import { useGlobalStore } from '../../hooks/globalStore';

const { store } = useGlobalStore();
const emit = defineEmits(['pay', 'connect']);
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

const account = ref('');
const isConnected = ref(false);
const web3 = ref(null);

const connectWallet = async () => {
  if (!window.ethereum) {
    alert('MetaMask not detected!');
    return;
  }

  const pharosChainId = '0xC352'; // 1527 in hex

  try {
    // Attempt to switch to Pharos
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: pharosChainId }],
    });
  } catch (switchError) {
    // If the chain has not been added to MetaMask, request to add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: pharosChainId,
          chainName: 'Pharos Devnet',
          nativeCurrency: {
            name: 'Pharos',
            symbol: 'PHRS',
            decimals: 18,
          },
          rpcUrls: ['https://testnet.dplabs-internal.com'], // Example RPC
          blockExplorerUrls: ['https://devnet.pharosscan.xyz'],
        }],
      });
    } else {
      throw switchError;
    }
  }

  // Now connect wallet
  const web3Instance = new Web3(window.ethereum);
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  web3.value = web3Instance;
  account.value = accounts[0];
  store.state.fromData.account = accounts[0];
  isConnected.value = true;
};

const disconnectWallet = () => {
  account.value = '';
  isConnected.value = false;
  store.state.fromData.account = '';
};

const formatAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4);
};

onMounted(async () => {
  if (window.ethereum && window.ethereum.selectedAddress) {
    web3.value = new Web3(window.ethereum);
    account.value = window.ethereum.selectedAddress;
    store.state.fromData.account = account.value;
    isConnected.value = true;
  }
});
</script>

<template>
  <div class="step-1">
    <div class="step-1-amount">
      <div class="usdc-icon">
        <img v-if="store.state.fromData?.paymentMethod?.includes('USDC')" src="../../assets/images/information/usdc.png"
          alt="">
        <img v-else src="../../assets/images/information/solana-logo.png" alt="">
      </div>
      <div class="amount-details">
        <p class="amount-title">{{ store.state.fromData?.paymentMethod }}</p>
        <div class="converted-amount">
          <p v-if="store.state.fromData?.paymentMethod?.includes('USDC')" class="usdc-amount">{{
            store?.state?.fromData?.usdcAmount.toLocaleString(undefined, {
              minimumFractionDigits:
                2,maximumFractionDigits: 2}) }} USDC</p>
          <p v-else class="usdc-amount">{{ store?.state?.fromData?.payAmount?.toLocaleString(undefined,
            { minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</p>
          <span v-if="store?.state?.fromData?.paymentMethod?.includes('USDC')">
            <del class="yen">{{ (store?.state?.fromData?.maxAmount /
              store?.state?.fromData?.usdTargetRate)?.toLocaleString(undefined, {
                minimumFractionDigits:
                  2,maximumFractionDigits: 2}) }} USDC</del>
            <span class="saved">(saved <span class="saved-amount">{{ ((store?.state?.fromData?.maxAmount /
              store?.state?.fromData?.usdTargetRate) - (store?.state?.fromData?.payAmount /
                store?.state?.fromData?.usdTargetRate)).toLocaleString(undefined, {
                  minimumFractionDigits:
                2,maximumFractionDigits: 2}) }} USDC</span>)</span>
          </span>
          <span v-else>
            <del class="yen">{{ store?.state?.fromData?.maxAmount?.toLocaleString(undefined, {
              minimumFractionDigits:
                2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</del>
            <span class="saved">(saved <span class="saved-amount">{{ ((store?.state?.fromData?.maxAmount || 0) -
              (store?.state?.fromData?.payAmount || 0)).toLocaleString(undefined, {
                minimumFractionDigits:
                  2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</span>)</span>
          </span>
        </div>
      </div>
    </div>

    <div v-if="store.state.fromData?.paymentMethod?.includes('USDC')" class="wallet-connect">
      <div v-if="!isConnected" class="wallet-connect-button">
        <div class="wallet-logo">
          <img src="../../assets/images/pay/wallet-logo.png" alt="" />
        </div>
        <button class="connect-btn" @click="emit('connect')">Connect</button>
      </div>
      <div v-else class="wallet-connect-button">
        <div class="wallet-connect-button-content">
          <div class="wallet-logo">
            <!-- <img :src="walletInfo.walletInfo.icon" alt="" /> -->
          </div>
          <div class="wallet-address">
            <p>{{ formatAddress(account) }}</p>
          </div>
          <div class="disconnect-btn" @click="disconnectWallet">
            <img src="../../assets/images/pay/disconnect.svg" alt="" />
          </div>
        </div>
        <button class="connect-btn" @click="emit('pay')" :disabled="!isConnected || loading">Pay Now</button>
      </div>
    </div>
    <div v-else class="wallet-list">
      <img src="../../assets/images/pay/wallet.png" alt="">
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
