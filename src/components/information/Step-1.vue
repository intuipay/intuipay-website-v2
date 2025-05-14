<script setup>
import { ref, onMounted } from 'vue';
import { useMessage } from 'naive-ui'
import { useGlobalStore } from '../../hooks/globalStore';
import { currencyList } from '../../libs/index.js'

const emit = defineEmits(['next']);
const { store, setFromData } = useGlobalStore();
const message = useMessage();

const isSelectListVisible = ref(false);
const isNeedPayCountryListVisible = ref(false);
const selectCountry = ref(currencyList[0]);
const needPayCountry = ref({});

const amount = ref(null);
const nextStep = () => {
  if (!amount.value) {
    message.error('Please enter the amount');
    return;
  } if (amount.value < 0) {
    message.error('Please enter a positive amount');
    return;
  }
  setFromData({
    ...store.state.fromData,
    country: selectCountry.value.country,
    countryCode: selectCountry.value.code,
    amount: amount.value,
    currency: selectCountry.value.symbol,
    anotherSymbol: selectCountry.value.anotherSymbol,
    needPayCountry: needPayCountry.value.code,
    needPaySymbol: needPayCountry.value.symbol,
    needPayAnotherSymbol: needPayCountry.value.anotherSymbol,
    university: store.state.university
  });
  emit('next');
}

const getDollarName = (code) => {
  if (code === 'USD') {
    return 'United States Dollars';
  } else if (code === 'CNY') {
    return 'Chinese Yuan';
  } else if (code === 'HKD') {
    return 'Hong Kong Dollars';
  } else if (code === 'INR') {
    return 'Indian Rupees';
  } else if (code === 'NGN') {
    return 'Nigerian Naira';
  } else if (code === 'GBP') {
    return 'British Pounds';
  } else if (code === 'AUD') {
    return 'Australian Dollars';
  } else if (code === 'CAD') {
    return 'Canadian Dollars';
  } else if (code === 'SGD') {
    return 'Singapore Dollars';
  } else if (code === 'MYR') {
    return 'Malaysian Ringgit';
  } else if (code === 'EUR') {
    return 'Euro';
  }
}

onMounted(() => {
  if (store.state.fromData.country) {
    selectCountry.value = currencyList.find(item => item.country === store.state.fromData.country);
  }
  if (store.state.fromData.amount) {
    amount.value = store.state.fromData.amount;
  }

  const university = store.state.university;
  console.log(university);
  if (university.country) {
    needPayCountry.value = currencyList.find(item => item.country === university.country);
    console.log(needPayCountry.value);
  }
});
</script>
<template>
  <div class="step-1" @click="isSelectListVisible = false; isNeedPayCountryListVisible = false;">
    <div class="step-1-tags">
      <p>To</p>
      <div class="step-1-tag">{{ store.state.university.name }}</div>
    </div>
    <div class="from">
      <div class="from-item">
        <div class="from-item-label">The payment will come from</div>
        <div class="input-wrapper" @click.stop>
          <div class="input" style="cursor: pointer;" @click="isSelectListVisible = !isSelectListVisible">
            <div class="input-label">Country or region*</div>
            <div class="input-content">
              <div class="input-value">{{ selectCountry.country }}</div>
              <img src="../../assets/images/arrow.svg" alt="arrow" />
            </div>
            <div v-if="isSelectListVisible" class="select-list">
              <div class="select-list-item" v-for="item in currencyList" :key="item.country"
                @click="selectCountry = item">
                {{ item.country }}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="from-item">
        <div class="from-item-label">{{ store.state.university.name }} receives</div>
        <div class="input-wrapper">
          <div class="input-l" @click.stop="isNeedPayCountryListVisible = !isNeedPayCountryListVisible">
            {{ needPayCountry.symbol }}
            <div v-if="isNeedPayCountryListVisible" class="select-list">
              <div class="select-list-item" v-for="item in currencyList" :key="item.country"
                @click="needPayCountry = item">
                {{ item.code }} ({{ item.symbol }})
              </div>
            </div>
          </div>
          <div class="input">
            <div class="input-label">Amount*</div>
            <div class="input-content">
              <input
                type="number"
                class="input-amount"
                min="0"
                name="amount"
                v-model="amount"
                placeholder="Enter amount"
              >
            </div>
          </div>
        </div>
        <div class="from-item-label">
          Amount will be formatted in the destination currency, in this case {{ getDollarName(needPayCountry.code) }}. i.e. 10,000.00 for ten thousand {{ needPayCountry.code }}.
        </div>
      </div>
    </div>
    <div class="button-wrapper" @click="nextStep">
      <button class="button-primary">Next</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-1 {
  .step-1-tags {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: Inter;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #A3A3A3;

    .step-1-tag {
      background: #FCFCFC;
      border: 1px solid #E5E5E5;
      border-radius: 34px;
      padding: 8px 16px;
      box-sizing: border-box;
      font-family: Inter;
    }
  }

  .from {
    display: flex;
    justify-content: center;
    gap: 36px;
    margin-top: 48px;

    .from-item {
      .from-item-label {
        font-family: Inter;
        font-size: 16px;
        line-height: 20px;
        color: #A3A3A3;
        margin-bottom: 16px;
        width: 520px;
      }

      .input-wrapper {
        background: #FFFFFF;
        border: 1px solid #0000001A;
        width: 520px;
        height: 74px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .input-l {
          width: 74px;
          height: 100%;
          border-right: 1px solid #E5E5E5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Inter;
          font-size: 18px;
          color: #000000;
          position: relative;

          .select-list {
            position: absolute;
            top: 82px;
            left: 0;
            width: 200px;
          }
        }
      }

      .input {
        padding: 0 20px;
        box-sizing: border-box;
        flex: 1;
        position: relative;

        .input-label {
          color: #00000066;
          font-family: Inter;
          font-weight: 400;
          font-size: 12px;
          line-height: 18px;
        }

        .input-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 4px;

          .input-value {
            font-family: Inter;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #000000;
          }

          .input-amount {
            font-family: Inter;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #000000;
            border: none;
            outline: none;
            background: none;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }

          img {
            width: 9px;
            height: 6px;
          }
        }
      }
    }
  }

  .button-wrapper {
    width: 312px;
    margin: 48px auto 0;
  }
}

.select-list {
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;
  border: 1px solid #0000001A;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 8px 0px;
  box-sizing: border-box;
  z-index: 100;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  max-height: 300px;
  overflow-y: auto;

  .select-list-item {
    padding: 0 16px;
    font-family: Inter;
    font-size: 16px;
    height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: #F5F5F5;
    }
  }
}
</style>
