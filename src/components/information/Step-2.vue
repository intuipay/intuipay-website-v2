<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '../../hooks/globalStore';
import { paymentMethods, paymentMethodsOther } from '../../libs/methods';

const emit = defineEmits(['next']);
const { store, setFromData } = useGlobalStore();

const amount = ref({});
const maxAmount = ref(0);
const loading = ref(false);
const paymentMethodList = ref(paymentMethods);
const paymentMethodOtherList = ref(paymentMethodsOther);
// fetch
const fetchAmount = async (source, target, amt) => {
  let currencies = ''
  if (source === target) {
    if (source === 'USD') {
      currencies = ''
    } else {
      currencies = 'USD'
    }
  } else {
    currencies = `USD,${target}`
  }
  console.log(currencies)
  if (currencies === '') {
    amount.value = {
      value: amt,
      usd: amt,
      rate: 1,
      usdRate: 1,
      usdTargetRate: 1,
    }
    return;
  } else {
    const response = await fetch(`https://apilayer.net/api/live?access_key=c00b1d196651f1245a3e4410df9863db&currencies=USD,${target}&source=${source}`);
    const data = await response.json();
    if (data.success) {
      if (target === source) {
        amount.value = {
          value: amt,
          usd: (data.quotes[`${source}USD`] * amt),
          rate: 1,
          usdRate: data.quotes[`${source}USD`],
          usdTargetRate: data.quotes[`${source}USD`],
        }
      }
      else {
        amount.value = {
          value: (data.quotes[`${source}${target}`] * amt), // 目标货币金额
          usd: source === 'USD' ? amt : (data.quotes[`${source}USD`] * amt), // 美元金额
          rate: data.quotes[`${source}${target}`], // 目标货币对汇款货币汇率
          usdRate: source === 'USD' ? 1 : data.quotes[`${source}USD`], // 目标货币对美元汇率
          usdTargetRate: source === 'USD' ? data.quotes[`${source}${target}`] : (data.quotes[`${source}${target}`] / data.quotes[`${source}USD`]) // 汇款货币对美元汇率
        }
      }
    }
  }
}

const showNote = (index, type) => {
  const isShow = type == 1 ? paymentMethodList.value[index]?.showNote : paymentMethodOtherList.value[index]?.showNote;
  paymentMethodList.value.forEach((item, index) => {
    item.showNote = false;
  });
  paymentMethodOtherList.value.forEach((item, index) => {
    item.showNote = false;
  });
  if (type == 1) {
    console.log(paymentMethodList.value[index])
    paymentMethodList.value[index].showNote = !isShow;
  } else {
    paymentMethodOtherList.value[index].showNote = !isShow;
  }
}

onMounted(async () => {
  loading.value = true;
  const fromData = store.state.fromData;
  await fetchAmount(fromData.needPayCountry, fromData.countryCode, fromData.amount);
  console.log(amount.value)
  paymentMethodList.value.forEach(item => {
    if (item.fee == '0') {
      item.amount = amount.value.value * (1 + (+item.fee))
      item.symbol = fromData.anotherSymbol;
    } else {
      item.amount = (amount.value.value * (1 + (+item.fee)));
      item.symbol = fromData.anotherSymbol;
    }
  });
  paymentMethodOtherList.value.forEach(item => {
    item.amount = (amount.value.value * (1 + (+item.fee))) + ((+item.extra_fee || 0) * amount.value.usdTargetRate);
    item.symbol = fromData.anotherSymbol;
  });
  // 获取paymentMethodsOther的amount最大的那个
  maxAmount.value = paymentMethodsOther.reduce((max, item) => {
    return Math.max(max, item.amount);
  }, 0);
  loading.value = false;
});

const nextStep = (paymentMethod) => {
  if (loading.value) return;
  setFromData({
    ...store.state.fromData,
    usdcAmount: amount.value.usd,
    payAmount: (amount.value.value * (1 + (+paymentMethod.fee))) + ((+paymentMethod.extra_fee || 0) * amount.value.usdTargetRate),
    processingFee: paymentMethod.processingFee,
    fxMarkupRate: paymentMethod.fxMarkupRate,
    additionalFee: paymentMethod.additionalFee,
    usdTargetRate: amount.value.usdTargetRate,
    rate: amount.value.rate,
    usdRate: amount.value.usdRate,
    paymentMethod: paymentMethod.action || paymentMethod.name,
    maxAmount: maxAmount.value,
  });
  emit('next');
}
</script>
<template>
  <div class="step-2">
    <div class="step-tags">
      <div class="step-tag" style="display: flex; align-items: center; gap: 4px;">
        <span>Best Price Guaranteed</span> Subject to terms and conditions
        <n-tooltip trigger="hover" arrow-point-to-center style="padding: 12px 16px;border-radius: 8px; width: 755px;"
          placement="bottom">
          <template #trigger>
            <div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="#A3A3A3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M6.84619 6.84573C6.84619 6.41974 6.97263 6.00332 7.20951 5.64912C7.44639 5.29493 7.78309 5.01887 8.17701 4.85584C8.57093 4.69282 9.00439 4.65018 9.42257 4.73328C9.84076 4.81638 10.2249 5.02151 10.5264 5.32274C10.8279 5.62396 11.0332 6.00774 11.1164 6.42554C11.1996 6.84335 11.1569 7.27641 10.9937 7.66997C10.8305 8.06353 10.5542 8.39991 10.1997 8.63658C9.84518 8.87324 9.42837 8.99957 9.00199 8.99957V10.4355"
                  stroke="#A3A3A3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M9.00008 13.2566C8.83014 13.2566 8.69238 13.1189 8.69238 12.9489C8.69238 12.779 8.83014 12.6412 9.00008 12.6412"
                  stroke="#A3A3A3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M9 13.2566C9.16993 13.2566 9.30769 13.1189 9.30769 12.9489C9.30769 12.779 9.16993 12.6412 9 12.6412"
                  stroke="#A3A3A3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </template>
          <div>
            <p class="tooltip-text">
              <span>Best Price Guarantee Terms and Conditions</span><br />Intuipay aims to provide the best price for
              international tuition payments. If you find a better rate using your preferred payment method (not only
              just local
              currency bank transfer, but also other payment methods, including alipay, online debit / credit cards,
              e-wallets,
              online banking, etc.) within two hours of booking with Intuipay, we will match it.
            </p>
            <p class="tooltip-text" style="margin-top: 16px;">
              <span>Best Price Guarantee Eligibility and Criteria</span>
            </p>
            <p class="tooltip-text" style="margin-top: 8px;">
              1. <span>Exclusion of Payments With Discount Codes. </span>If you are redeeming a discount code in
              connection with
              your payment, you are <span>NOT</span> eligible for Best Price Guarantee.
            </p>
            <p class="tooltip-text" style="margin-top: 8px;">
              2. <span>Request Amount:</span>Valid only for the amount requested (in the intended recipient's billing
              currency) in
              your original submission.
            </p>
            <p class="tooltip-text" style="margin-top: 8px;">
              3. <span>Exchange Rates and Rate Sources:</span>Rates quoted for forex currency exchange without a bank
              transfer are
              NOT eligible. Indicative rates, mid-market rates, or quotes from sources like Yahoo rates, Google rates,
              or similar
              foreign exchange rate providers are NOT acceptable forms of proof.
            </p>
            <p class="tooltip-text" style="margin-top: 8px;">
              4. <span>Fee Inclusion:</span>The total amount quoted by your preferred payment method should include all
              fees
              associated with sending the same amount to the same country via Intuipay. If the associated fees
              potentially charged
              are not included, we may apply a flat fee based on market-standard bank charges for wire transfers.
            </p>
            <p class="tooltip-text" style="margin-top: 8px;">
              5. <span>Time Frame:</span> Foreign exchange rate and associated fees comparison should be within a
              two-hour time
              frame of the booking on Intuipay.
            </p>
            <p class="tooltip-text" style="margin-top: 8px;">
              6. <span>Limit on Requests:</span> Limit of one approved request per payer within a 72-hour period.
            </p>
            <p class="tooltip-text" style="margin-top: 8px;">
              7. <span>Communication:</span> Acceptance or denial of the program will only be communicated by email.
            </p>
          </div>

        </n-tooltip>
      </div>
      <div class="step-tag">Emory University receives <span>{{
        store.state.fromData.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }}
          {{ store.state.fromData.needPayAnotherSymbol }}</span></div>
    </div>
    <div class="list">
      <div class="list-item" v-for="(paymentMethod, index) in paymentMethodList" :key="paymentMethod.name">
        <div class="list-item-wrapper" :style="{ background: paymentMethod.background }">
          <div class="list-item-title">{{ paymentMethod.title }}</div>
          <div class="list-item-content">
            <div class="list-item-content-bd">
              <div class="list-item-content-bd-top">
                <div class="list-item-content-bd-top-left">
                  <div class="logo-icon">
                    <img v-if="paymentMethod.name.includes('USDC')" :src="paymentMethod.icon" alt="logo" />
                    <div v-else>
                      <img :src="paymentMethod.icon" alt="logo" />
                    </div>
                  </div>
                  <div class="list-item-content-bd-top-left-title">
                    <div class="list-item-content-bd-top-left-title-text">{{ paymentMethod.name }}</div>
                    <div class="list-item-content-bd-top-left-title-amount">
                      <p v-if="paymentMethod.name.includes('USDC')">{{ (+amount.usd || 0).toLocaleString(undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} USDC</p>
                      <p v-else>{{ paymentMethod?.amount?.toLocaleString(undefined, {
                        minimumFractionDigits:
                          2, maximumFractionDigits: 2
                      }) || 0 }} {{ paymentMethod?.symbol }}</p>
                      <span v-if="paymentMethod.name.includes('USDC')"> <del>{{ (maxAmount / (amount.usdTargetRate || 1))?.toLocaleString(undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0 }} USDC</del>
                        (saved
                        <span>{{ ((maxAmount / (amount.usdTargetRate || 1)) - (paymentMethod?.amount / (amount.usdTargetRate || 1)))?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0 }} USDC</span>)</span>
                      <span v-else> <del>{{ maxAmount?.toLocaleString(undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0 }} {{ paymentMethod?.symbol
                          }}</del>
                        (saved
                        <span>{{ ((maxAmount || 0) - (paymentMethod?.amount || 0))?.toLocaleString(undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0
                          }} {{ paymentMethod?.symbol }}</span>)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="button-primary"
                :style="{ background: paymentMethod.background }"
                @click="nextStep(paymentMethod)"
                v-html="paymentMethod.description"
              />
            </div>
            <div v-if="paymentMethod.note" class="list-item-content-bd-bottom">
              <div class="list-item-content-bd-bottom-hd" @click="showNote(index, 1)">
                <div class="flex-center">
                  <img src="../../assets/images/information/info.svg" alt="info" /><span>Important info</span>
                </div>
                <div>
                  <img src="../../assets/images/information/arrow.svg" alt="arrow"
                    :style="{ transform: paymentMethod.showNote ? 'rotate(0deg)' : 'rotate(180deg)' }" />
                </div>
              </div>
              <div @click.stop v-show="paymentMethod.showNote" class="list-item-content-bd-bottom-bd"
                v-html="paymentMethod.note">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line">Pay by another way</div>
      <div class="list-item" v-for="(paymentMethod, index) in paymentMethodOtherList" :key="paymentMethod.name">
        <div class="list-item-content">
          <div class="list-item-content-bd">
            <div class="list-item-content-bd-top">
              <div class="list-item-content-bd-top-left">
                <div class="logo-icon">
                  <img :src="paymentMethod.icon" alt="logo" />
                </div>
                <div class="list-item-content-bd-top-left-title">
                  <div class="list-item-content-bd-top-left-title-text">{{ paymentMethod.name }}</div>
                  <div class="list-item-content-bd-top-left-title-amount">
                    <p>{{ paymentMethod.amount?.toLocaleString(undefined,
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0 }} {{ paymentMethod.symbol }}</p>
                    <span v-if="maxAmount !== paymentMethod.amount"> <del>{{ maxAmount?.toLocaleString(undefined,
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0 }} {{ paymentMethod.symbol }}</del>
                      (saved
                      <span>{{ ((maxAmount || 0) - (paymentMethod.amount ||
                        0))?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0
                        }} {{ paymentMethod.symbol }}</span>)</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="button-primary" style="cursor: not-allowed;" v-html="paymentMethod.description"></div>
          </div>
          <div v-if="paymentMethod.note" class="list-item-content-bd-bottom">
            <div class="list-item-content-bd-bottom-hd" @click="showNote(index)">
              <div class="flex-center">
                <img src="../../assets/images/information/info.svg" alt="info" /><span>Important info</span>
              </div>
              <div>
                <img src="../../assets/images/information/arrow.svg" alt="arrow"
                  :style="{ transform: paymentMethod.showNote ? 'rotate(0deg)' : 'rotate(180deg)' }" />
              </div>
            </div>
            <div @click.stop v-show="paymentMethod.showNote" class="list-item-content-bd-bottom-bd"
              v-html="paymentMethod.note"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-2 {
  .step-tags {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: Inter;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #A3A3A3;

    .step-tag {
      background: #FCFCFC;
      border: 1px solid #E5E5E5;
      border-radius: 34px;
      padding: 8px 16px;
      box-sizing: border-box;
      font-family: Inter;

      span {
        color: #217BE0;
      }

      svg {
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }

  .list {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;

    .line {
      width: 1056px;
      text-align: center;
      font-family: Inter;
      font-weight: 400;
      font-size: 18px;
      line-height: 18px;
      color: #A3A3A3;
      position: relative;

      &::before {
        content: '';
        width: 40%;
        height: 1px;
        background: #E5E5E5;
        position: absolute;
        top: 50%;
        left: 0;
      }

      &::after {
        content: '';
        width: 40%;
        height: 1px;
        background: #E5E5E5;
        position: absolute;
        top: 50%;
        right: 0;
      }
    }

    .list-item {
      .list-item-wrapper {
        background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
        border-radius: 16px;
        padding: 8px;

        .list-item-title {
          font-family: Inter;
          font-weight: 500;
          font-size: 16px;
          line-height: 18px;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #FFFFFF;
          margin-bottom: 8px;
          padding-left: 16px;
        }
      }

      .list-item-content {
        width: 1040px;
        border-radius: 12px;
        padding: 8px;
        background: #F5F5F5;
        border: 1px solid #E5E5E5;

        .list-item-content-bd {
          width: 100%;
          height: 100%;
          background: #FFFFFF;
          border-radius: 8px;
          padding: 32px;
          border: 1px solid #E5E5E5;

          .list-item-content-bd-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .list-item-content-bd-top-left {
              display: flex;
              gap: 32px;

              .logo-icon {
                img {
                  width: 80px;
                  height: 80px;
                  object-fit: cover;
                }
              }

              .list-item-content-bd-top-left-title {
                .list-item-content-bd-top-left-title-text {
                  font-family: Inter;
                  font-weight: 500;
                  font-size: 18px;
                  line-height: 18px;
                  letter-spacing: 0%;
                  color: #525252;
                }

                .list-item-content-bd-top-left-title-amount {
                  margin-top: 16px;
                  display: flex;
                  align-items: flex-end;
                  gap: 12px;

                  p {
                    font-family: Iquost;
                    font-weight: 400;
                    font-size: 32px;
                    color: #000000;
                  }

                  span {
                    font-family: Inter;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 18px;
                    letter-spacing: 0%;
                    vertical-align: middle;
                    color: #A3A3A3;
                    padding-bottom: 4px;

                    span {
                      color: #0037C2;
                    }

                  }
                }

                .list-item-content-bd-top-left-title-amount-fee {
                  font-family: Inter;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 121%;
                }
              }
            }

            .list-item-content-bd-top-right {
              img {
                width: 232px;
                height: auto;
                object-fit: cover;
              }
            }
          }
        }
      }

      .button-primary {
        margin-top: 24px;

        span {
          font-weight: 700;
          font-size: 18px;
          margin-left: .5em;
        }
      }
    }
  }
}

.list-item-content-bd-bottom {
  margin-top: 10px;
  padding: 0px 16px;
  box-sizing: border-box;
  font-family: Inter;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #061037;

  .list-item-content-bd-bottom-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px;
    line-height: 1;
    cursor: pointer;

    .flex-center {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    img {
      width: 14px;
      height: 14px;
    }
  }

  .list-item-content-bd-bottom-bd {
    margin-top: 10px;
  }
}

.tooltip-text {
  font-family: Inter;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0%;
  color: #fff;

  span {
    font-family: Inter;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>

<style lang="scss">
.step-2 {
  .button-primary {
    margin-top: 24px;

    span {
      font-weight: 700;
      font-size: 18px;
      margin-left: .5em;
    }
  }

  .list-item-content-bd-bottom-bd {
    // display: none;
    margin-top: 10px;

    p {
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 155%;
      color: #061037;
      display: flex;

      &:before {
        content: '';
        width: 6px;
        height: 6px;
        background: #061037;
        border-radius: 50%;
        margin-top: 9px;
        margin-right: 8px;
        flex-shrink: 0;
      }

      a {
        text-decoration: underline;
        color: #217BE0;
      }
    }
  }
}
</style>
