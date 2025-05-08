<script setup>
const props = defineProps({
  payment: {
    type: Object,
    required: true
  }
})

const formatHash = (hash) => {
  return hash.slice(0, 6) + '...' + hash.slice(-4)
}

const toExplorer = () => {
  window.open(`https://edu-chain-testnet.blockscout.com/tx/${props.payment.tx.transactionHash}`, '_blank')
}
</script>
<template>
  <div class="step-2">
    <div class="receipt-title">Receipt</div>

    <div class="receipt-header">
      <div class="receipt-header-left">
        <div class="pay-title">Pay in USDC On Pharos</div>
        <div class="amount">{{ payment.amount }} USDC</div>
      </div>
      <div class="receipt-header-left">
        <div class="pay-title">From Payer</div>
        <div class="amount">{{ payment.amount }} USDC</div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="transaction-details">
      <div class="detail-row">
        <div class="detail-label">Transaction ID</div>
        <div class="detail-value">{{ formatHash(payment.tx.transactionHash) }}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Paid on</div>
        <div class="detail-value">{{ payment.paidOn }}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Remittance date</div>
        <div class="detail-value">{{ payment.remittanceDate }}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Accounting date</div>
        <div class="detail-value">{{ payment.accountingDate }}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Payment for</div>
        <div class="detail-value">
          {{ payment.term }}
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Payer Name</div>
        <div class="detail-value">
          {{ payment.firstName }} {{ payment.middleName }} {{ payment.familyName }}
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Status:</div>
        <div class="detail-value">
          <span class="status-badge">Successful</span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-label">CURRENCY</div>
        <div class="detail-value">USDC</div>
      </div>
    </div>

    <div class="hash-section" @click="toExplorer">
      <div class="hash-label">Hash</div>
      <div class="hash-value">
        <div class="hash-container">
          <div class="hash-text">{{ payment.tx.transactionHash }}</div>
          <div class="arrow-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M7.07459 4.55806C6.80847 4.80214 6.80847 5.19786 7.07459 5.44194L11.5625 9.55806C11.8286 9.80214 11.8286 10.1979 11.5625 10.4419L7.07459 14.5581C6.80847 14.8021 6.80847 15.1979 7.07459 15.4419C7.34072 15.686 7.77219 15.686 8.03831 15.4419L12.5262 11.3258C13.3246 10.5936 13.3246 9.40641 12.5262 8.67418L8.03831 4.55806C7.77219 4.31398 7.34072 4.31398 7.07459 4.55806Z"
                fill="#1C1C1C" fill-opacity="0.2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-2 {
  .receipt-title {
    font-family: Inter;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    color: #A3A3A3;
  }

  .receipt-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    gap: 32px;

    .receipt-header-left {
      width: 300px;
      flex: 0 0 300px;
    }

    .pay-title {
      font-family: Inter;
      font-weight: 400;
      font-size: 18px;
      line-height: 18px;
      color: #525252;
    }

    .amount {
      margin-top: 16px;
      font-family: Inter;
      font-weight: 700;
      font-size: 32px;
      line-height: 100%;
      color: #000;
    }
  }

  .divider {
    height: 1px;
    background-color: #E5E5E5;
    margin-bottom: 24px;
    margin-top: 24px;
  }

  .transaction-details {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    width: 660px;

    .detail-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 0 0 300px;

      .detail-label {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
        color: #00000066;
      }

      .detail-value {
        font-family: Inter;
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;
        margin-top: 16px;
        color: #000;

        .status-badge {
          font-family: Inter;
          font-weight: 500;
          font-size: 16px;
          line-height: 18px;
          padding: 7px 16px;
          border-radius: 30px;
          background: #E5E5E5;
          color: #171717;
        }
      }
    }
  }

  .hash-section {
    margin-top: 38px;
    cursor: pointer;

    .hash-label {
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 18px;
      color: #00000066;
    }

    .hash-value {
      margin-top: 16px;

      .hash-container {
        display: flex;
        align-items: center;
        border: 1px solid #E5E5E5;
        border-radius: 8px;
        padding: 0 16px;
        height: 52px;

        .chain-logo {
          margin-right: 24px;

          img {
            width: 42px;
            height: auto;
          }
        }

        .hash-text {
          flex: 1;
          font-family: Inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          color: #A3A3A3;
        }

        .arrow-icon {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
