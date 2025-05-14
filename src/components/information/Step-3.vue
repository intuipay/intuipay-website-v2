<script setup>
import { ref, onMounted } from 'vue';
import { useMessage } from 'naive-ui'
import { useGlobalStore } from '../../hooks/globalStore';
import { countryPhoneCodes } from '../../libs/index.js'

const emit = defineEmits(['next', 'prev']);
const { store, setFromData } = useGlobalStore();
const message = useMessage();

const radiosType = ref({
  notifications: true,
  promotions: true,
  terms: true,
})

const fromData = ref({
  email: {
    value: '',
    error: '',
  },
  firstName: {
    value: '',
    error: '',
  },
  middleName: {
    value: '',
    error: '',
  },
  familyName: {
    value: '',
    error: '',
  },
  address1: {
    value: '',
    error: '',
  },
  address2: {
    value: '',
    error: '',
  },
  city: {
    value: '',
    error: '',
  },
  state: {
    value: '',
    error: '',
  },
  zip: {
    value: '',
    error: '',
  },
  phone: {
    value: '',
    error: '',
  },
  code: {
    value: '',
    error: '',
  },
  payerRelationship: {
    value: '',
    error: '',
  },
  identityNumber: {
    value: '',
    error: '',
  },
  languageName: {
    value: '',
    error: '',
  },

});
const showPhoneCodeList = ref(false);
const showPayerRelationshipList = ref(false);
const payerRelationshipList = ref([
  'Self',
  'Mother',
  'Father',
  'Spouse',
  'Sibling',
  'Grantparent',
]);

// 关闭所有下拉菜单的方法
const closeAllDropdowns = () => {
  showPhoneCodeList.value = false;
  showPayerRelationshipList.value = false;
};

const nextStep = () => {
  if (!fromData.value.email.value) {
    fromData.value.email.error = 'Email is required';
    message.error('Email is required');
    return;
  } else {
    fromData.value.email.error = '';
    // 邮箱验证正则
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromData.value.email.value)) {
      fromData.value.email.error = 'Invalid email address';
      message.error('Invalid email address');
      return;
    }
  }
  if (!fromData.value.firstName.value) {
    fromData.value.firstName.error = 'First name is required';
    message.error('First name is required');
    return;
  } else {
    fromData.value.firstName.error = '';
  }
  if (!fromData.value.familyName.value) {
    fromData.value.familyName.error = 'Family name is required';
    message.error('Family name is required');
    return;
  } else {
    fromData.value.familyName.error = '';
  }
  if (!fromData.value.phone.value) {
    fromData.value.phone.error = 'Phone number is required';
    message.error('Phone number is required');
    return;
  } else {
    // 电话正则
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(fromData.value.phone.value)) {
      fromData.value.phone.error = 'Invalid phone number';
      message.error('Invalid phone number');
      return;
    }
    fromData.value.phone.error = '';
  }
  if (!radiosType.value.terms) {
    message.error('Please read and agree to the terms and conditions');
    return;
  }
  if (!fromData.value.payerRelationship.value) {
    fromData.value.payerRelationship.error = 'Payer Relationship is required';
    message.error('Payer Relationship is required');
    return;
  }
  if (!fromData.value.identityNumber.value) {
    fromData.value.identityNumber.error = 'Student Identity Number from Home Country is required';
    message.error('Student Identity Number from Home Country is required');
    return;
  }
  if (!fromData.value.languageName.value) {
    fromData.value.languageName.error = 'Student Name in Native Language is required';
    message.error('Student Name in Native Language is required');
    return;
  }
  setFromData({
    ...store.state.fromData,
    address1: fromData.value.address1.value,
    address2: fromData.value.address2.value,
    city: fromData.value.city.value,
    state: fromData.value.state.value,
    zip: fromData.value.zip.value,
    phone: fromData.value.phone.value,
    code: fromData.value.code.value,
    email: fromData.value.email.value,
    firstName: fromData.value.firstName.value,
    middleName: fromData.value.middleName.value,
    familyName: fromData.value.familyName.value,
    payerRelationship: fromData.value.payerRelationship.value,
    identityNumber: fromData.value.identityNumber.value,
    languageName: fromData.value.languageName.value,
    ...radiosType.value,
  });
  emit('next');
}

const prevStep = () => {
  emit('prev');
}

onMounted(() => {
  console.log(store.state.fromData)
  if (store.state.fromData.country) {
    const country = countryPhoneCodes.find(item => item.country === store.state.fromData.country);
    if (country) {
      fromData.value.code.value = country.code;
    } else {
      fromData.value.code.value = '+86';
    }
  }
  fromData.value.email.value = store.state.fromData.email;
  fromData.value.firstName.value = store.state.fromData.firstName;
  fromData.value.middleName.value = store.state.fromData.middleName;
  fromData.value.familyName.value = store.state.fromData.familyName;
  fromData.value.address1.value = store.state.fromData.address1;
  fromData.value.address2.value = store.state.fromData.address2;
  fromData.value.city.value = store.state.fromData.city;
  fromData.value.state.value = store.state.fromData.state;
  fromData.value.zip.value = store.state.fromData.zip;
  fromData.value.phone.value = store.state.fromData.phone;
  // fromData.value.code.value = store.state.fromData.code;
  fromData.value.payerRelationship.value = store.state.fromData.payerRelationship;
  fromData.value.identityNumber.value = store.state.fromData.identityNumber;
  fromData.value.languageName.value = store.state.fromData.languageName;
  // 判断是否为布尔值
  radiosType.value.notifications = typeof store.state.fromData?.notifications === 'boolean' ? store.state.fromData?.notifications : true;
  radiosType.value.promotions = typeof store.state.fromData?.promotions === 'boolean' ? store.state.fromData?.promotions : true;
  radiosType.value.terms = typeof store.state.fromData?.terms === 'boolean' ? store.state.fromData?.terms : true;
});
</script>
<template>
  <div class="step-3" @click="closeAllDropdowns">
    <div class="step-tags">
      <div class="step-tag">Please provide the details of the person whose card/bank account will be used to pay.
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
          <path d="M9 13.2566C9.16993 13.2566 9.30769 13.1189 9.30769 12.9489C9.30769 12.779 9.16993 12.6412 9 12.6412"
            stroke="#A3A3A3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div class="step-3-content">
      <div class="step-3-content-hint">(*) required field</div>
      <div class="form">
        <div class="form-item" :class="{ 'error': fromData.email.error }">
          <input
            name="email"
            type="email"
            placeholder="Email *"
            v-model="fromData.email.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.firstName.error }">
          <input
            name="first-name"
            type="text"
            placeholder="First Name *"
            v-model="fromData.firstName.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.middleName.error }">
          <input
            name="middle-name"
            type="text"
            placeholder="Middle Name"
            v-model="fromData.middleName.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.familyName.error }">
          <input
            name="family-name"
            type="text"
            placeholder="Family Name *"
            v-model="fromData.familyName.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.address1.error }">
          <input
            name="address1"
            type="text"
            placeholder="Address 1"
            v-model="fromData.address1.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.address2.error }">
          <input
            name="address2"
            type="text"
            placeholder="Address 2"
            v-model="fromData.address2.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.city.error }">
          <input
            name="city"
            type="text"
            placeholder="City"
            v-model="fromData.city.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.state.error }">
          <input
            name="state"
            type="text"
            placeholder="State / Province / Region"
            v-model="fromData.state.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.zip.error }">
          <input
            name="zip"
            type="text"
            placeholder="Zip Code / Postal Code"
            v-model="fromData.zip.value"
          >
        </div>
        <div class="form-item">
          <div class="code" @click.stop="showPhoneCodeList = !showPhoneCodeList">
            {{ fromData.code.value }} <img src="../../assets/images/arrow.svg" alt="">
            <div v-if="showPhoneCodeList" class="select-list">
              <div class="select-list-item" v-for="item in countryPhoneCodes" :key="item.code"
                @click="fromData.code.value = item.code">
                {{ item.code }}
              </div>
            </div>
          </div>
          <input
            name="phone"
            type="tel"
            placeholder="Phone number *"
            v-model="fromData.phone.value"
          >
        </div>
        <div class="form-item" style="border: none;margin-top: -16px;"></div>
        <div class="form-item" style="border: none;margin-top: -16px;">
          <div class="radio" @click="radiosType.notifications = !radiosType.notifications">
            <div class="box" :class="{ 'active': radiosType.notifications }"></div>
            <div class="text">Receive text notifications on your payment status</div>
          </div>
        </div>
        <div class="form-item" :class="{ 'error': fromData.payerRelationship.error }" style="cursor: pointer;" @click.stop="showPayerRelationshipList = !showPayerRelationshipList">
          <p v-if="!fromData.payerRelationship.value" class="form-item-text label">Payer Relationship *</p>
          <p v-else class="form-item-text">{{ fromData.payerRelationship.value }}</p>
          <div class="arrow">
            <img src="../../assets/images/arrow.svg" alt="">
          </div>
          <div v-if="showPayerRelationshipList" class="select-list">
            <div class="select-list-item" v-for="item in payerRelationshipList" :key="item" @click="fromData.payerRelationship.value = item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="form-item" :class="{ 'error': fromData.identityNumber.error }">
          <input
            name="identity-number"
            type="text"
            placeholder="Student Identity Number from Home Country*"
            v-model="fromData.identityNumber.value"
          >
        </div>
        <div class="form-item" :class="{ 'error': fromData.languageName.error }">
          <input
            name="student-name"
            type="text"
            placeholder="Student Name in Native Language *"
            v-model="fromData.languageName.value"
          >
        </div>
      </div>
      <div class="radios">
        <div class="radio" @click="radiosType.promotions = !radiosType.promotions">
          <div class="box" :class="{ 'active': radiosType.promotions }"></div>
          <div class="text">I would like to receive emails from Intuipay about future discounts, promotions and offers
          </div>
        </div>
        <div class="radio" @click="radiosType.terms = !radiosType.terms">
          <div class="box" :class="{ 'active': radiosType.terms }"></div>
          <div class="text">I have read, understand, and agree to the Intuipay <a href="#" target="_blank"
              rel="noopener noreferrer">Terms of Use</a> and <a href="#" target="_blank"
              rel="noopener noreferrer">Privacy Policy</a></div>
        </div>
      </div>
      <div class="btns">
        <div class="button-previous" @click="prevStep">
          <img src="../../assets/images/arrow-left.svg" alt="">
          <div class="text">Previous</div>
        </div>
        <div class="button-primary" @click="nextStep">Next</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-3 {
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
        margin-left: 8px;
      }
    }
  }

  .step-3-content {
    width: 1056px;
    margin: 48px auto;

    .step-3-content-hint {
      font-family: Inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #A3A3A3;
    }

    .form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      gap: 16px;
      margin-top: 16px;

      .form-item {
        border: 1px solid #0000001A;
        background: #FFFFFF;
        height: 74px;
        border-radius: 8px;
        width: 520px;
        flex: 0 0 520px;
        display: flex;
        position: relative;

        &.error {
          border: 1px solid #FF0000;
        }

        .select-list {
          position: absolute;
          top: 82px;
          left: 0;
          right: 0;
          border: 1px solid #0000001A;
          background: #FFFFFF;
          border-radius: 8px;
          box-sizing: border-box;
          z-index: 100;
          overflow: hidden;
          transition: height 0.3s ease-in-out;
          max-height: 250px;
          overflow-y: auto;
          padding: 8px 0;
          min-width: 100px;

          .select-list-item {
            padding: 0 16px;
            font-family: Inter;
            font-size: 16px;
            height: 52px;
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
              background: #F5F5F5;
            }
          }
        }

        .arrow {
          padding-right: 20px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 14px;
            height: auto;
          }
        }

        .code {
          width: 74px;
          height: 72px;
          background: #FFFFFF;
          border-right: 1px solid #E5E5E5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          line-height: 18px;
          color: #000000;
          font-weight: 400;
          gap: 4px;
          border-radius: 8px 0 0 8px;
          cursor: pointer;
          position: relative;

          img {
            width: 9px;
            height: auto;

          }
        }

        input {
          border: none;
          background: none;
          outline: none;
          flex: 1;
          height: 100%;
          padding: 16px 20px;
          font-size: 16px;
          line-height: 20px;
          color: #000000;

          &::placeholder {
            color: #00000066;
          }

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }

        .form-item-text {
          flex: 1;
          height: 100%;
          padding: 16px 20px;
          font-family: Inter;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          letter-spacing: 0%;
          color: #000000;
          display: flex;
          align-items: center;

          &.label {
            color: #00000066;
          }
        }
      }
    }
  }
}

.radios {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 48px;

  .radio {
    width: 748px;
  }
}

.radio {
  height: 74px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  box-sizing: border-box;

  .box {
    width: 32px;
    height: 32px;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    &.active {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 20px;
        height: 20px;
        background: #0037C2;
        border-radius: 4px;
      }
    }
  }

  .text {
    font-family: Inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;

    a {
      color: #217BE0;
    }
  }
}

.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  gap: 48px;

  .button-previous,
  .button-primary {
    width: 312px;
  }
}
</style>
