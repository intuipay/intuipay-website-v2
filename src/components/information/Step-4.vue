<script setup>
import { ref, onMounted } from 'vue';
import { useMessage } from 'naive-ui'
import { useGlobalStore } from '../../hooks/globalStore';
import { countryPhoneCodes } from '../../libs/index.js'

const emit = defineEmits(['next', 'prev']);

const { store, setFromData } = useGlobalStore();
const message = useMessage();

const isShowExpectedYearList = ref(false);
const isShowProgramTypeList = ref(false);
const isShowTermList = ref(false);
const showPhoneCodeList = ref(false);
const expectedYearList = ref([]);
const programTypeList = ref(['Graduate', 'Undergraduate', 'Other']);
const termList = ref(['Fall 2024', 'Spring 2025', 'Summer 2025', 'Fall 2025', 'Spring 2026', 'Summer 2026', 'Fall 2026', 'Spring 2027', 'Summer 2027', 'Fall 2027', 'Spring 2028', 'Summer 2028', 'Fall 2028']);
const formData = ref({
  expectedYear: '',
  programType: '',
  term: '',
  studentMobileNumber: '',
  studentMobileNumberCode: '',
  studentId: '',
  studentFirstName: '',
  studentLastName: '',
  studentPersonalEmail: '',
  studentAddress1: '',
  studentAddress2: '',
});

const error = ref({
  expectedYear: '',
  programType: '',
  term: '',
  studentMobileNumber: '',
  studentId: '',
  studentFirstName: '',
  studentLastName: '',
  studentPersonalEmail: '',
  studentAddress1: '',
  studentAddress2: '',
})

for (let i = 0; i < 7; i++) {
  expectedYearList.value.push(new Date().getFullYear() + i);
}

// 关闭所有下拉菜单的方法
const closeAllDropdowns = () => {
  isShowExpectedYearList.value = false;
  isShowProgramTypeList.value = false;
  isShowTermList.value = false;
  showPhoneCodeList.value = false;
};

const nextStep = () => {
  if (!formData.value.expectedYear) {
    error.value.expectedYear = 'Expected year is required';
    message.error(error.value.expectedYear);
    return
  } else {
    error.value.expectedYear = '';
  }
  if (!formData.value.programType) {
    error.value.programType = 'Program type is required';
    message.error(error.value.programType);
    return
  } else {
    error.value.programType = '';
  }
  if (!formData.value.studentPersonalEmail) {
    error.value.studentPersonalEmail = 'Student personal email is required';
    message.error(error.value.studentPersonalEmail);
    return
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailRegex.test(formData.value.studentPersonalEmail)) {
      error.value.studentPersonalEmail = 'Invalid email address';
      message.error(error.value.studentPersonalEmail);
      return
    } else {
      error.value.studentPersonalEmail = '';
    }
  }
  if (!formData.value.studentMobileNumber) {
    error.value.studentMobileNumber = 'Student mobile number is required';
    message.error(error.value.studentMobileNumber);
    return
  } else {
    error.value.studentMobileNumber = '';
  }
  if (!formData.value.term) {
    error.value.term = 'Term is required';
    message.error(error.value.term);
    return
  } else {
    error.value.term = '';
  }
  if (!formData.value.studentId) {
    error.value.studentId = 'Student ID is required';
    message.error(error.value.studentId);
    return
  } else {
    error.value.studentId = '';
  }
  if (!formData.value.studentFirstName) {
    error.value.studentFirstName = 'Student first name is required';
    message.error(error.value.studentFirstName);
    return
  } else {
    error.value.studentFirstName = '';
  }
  if (!formData.value.studentLastName) {
    error.value.studentLastName = 'Student last name is required';
    message.error(error.value.studentLastName);
    return
  } else {
    error.value.studentLastName = '';
  }

  setFromData({
    ...store.state.fromData,
    expectedYear: formData.value.expectedYear,
    programType: formData.value.programType,
    term: formData.value.term,
    studentMobileNumber: formData.value.studentMobileNumber,
    studentMobileNumberCode: formData.value.studentMobileNumberCode,
    studentId: formData.value.studentId,
    studentFirstName: formData.value.studentFirstName,
    studentLastName: formData.value.studentLastName,
    studentPersonalEmail: formData.value.studentPersonalEmail,
    studentAddress1: formData.value.studentAddress1,
    studentAddress2: formData.value.studentAddress2,
  })
  emit('next');
}

const prevStep = () => {
  emit('prev');
}

onMounted(() => {
  if (store.state.fromData.country) {
    const country = countryPhoneCodes.find(item => item.country === store.state.fromData.country);
    if (country) {
      formData.value.studentMobileNumberCode = country.code;
    } else {
      formData.value.studentMobileNumberCode = '+86';
    }
  }
  formData.value.expectedYear = store.state.fromData.expectedYear;
  formData.value.programType = store.state.fromData.programType;
  formData.value.term = store.state.fromData.term;
  formData.value.studentMobileNumber = store.state.fromData.studentMobileNumber;
  formData.value.studentFirstName = store.state.fromData.studentFirstName;
  formData.value.studentLastName = store.state.fromData.studentLastName;
  formData.value.studentAddress1 = store.state.fromData.studentAddress1;
  formData.value.studentAddress2 = store.state.fromData.studentAddress2;
  formData.value.studentPersonalEmail = store.state.fromData.studentPersonalEmail;
  formData.value.studentId = store.state.fromData.studentId;
});
</script>
<template>
  <div class="step-4" @click="closeAllDropdowns">
    <div class="step-4-content">
      <div class="step-4-content-hint">Academic Information</div>
      <div class="form">
        <div class="form-item" :class="{ 'error': error.expectedYear }" style="cursor: pointer;"
          @click.stop="isShowExpectedYearList = !isShowExpectedYearList">
          <p v-if="!formData.expectedYear" class="form-item-text label">Expected year of completion.*</p>
          <p v-else class="form-item-text">{{ formData.expectedYear }}</p>
          <div class="arrow">
            <img src="../../assets/images/arrow.svg" alt="">
          </div>
          <div v-if="isShowExpectedYearList" class="select-list">
            <div class="select-list-item" v-for="item in expectedYearList" :key="item"
              @click="formData.expectedYear = item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="form-item" :class="{ 'error': error.programType }" style="cursor: pointer;"
          @click.stop="isShowProgramTypeList = !isShowProgramTypeList">
          <p v-if="!formData.programType" class="form-item-text label">Program type *</p>
          <p v-else class="form-item-text">{{ formData.programType }}</p>
          <div class="arrow">
            <img src="../../assets/images/arrow.svg" alt="">
          </div>
          <div v-if="isShowProgramTypeList" class="select-list">
            <div class="select-list-item" v-for="item in programTypeList" :key="item"
              @click="formData.programType = item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="form-item" :class="{ 'error': error.studentPersonalEmail }">
          <input type="text" placeholder="Student Personal Email *" v-model="formData.studentPersonalEmail">
        </div>
        <div class="form-item" :class="{ 'error': error.studentMobileNumber }">
          <div class="code" @click.stop="showPhoneCodeList = !showPhoneCodeList">
            {{ formData.studentMobileNumberCode }}<img src="../../assets/images/arrow.svg" alt="">
            <div v-if="showPhoneCodeList" class="select-list">
              <div class="select-list-item" v-for="item in countryPhoneCodes" :key="item.code"
                @click="formData.studentMobileNumberCode = item.code">
                {{ item.code }}
              </div>
            </div>
          </div>
          <input type="number" placeholder="Student mobile number *" v-model="formData.studentMobileNumber">
        </div>
      </div>
      <div class="step-4-content-hint" style="margin-top: 16px;">Student Information</div>
      <div class="form">
        <div class="form-item" :class="{ 'error': error.term }" style="cursor: pointer;"
          @click.stop="isShowTermList = !isShowTermList">
          <p v-if="!formData.term" class="form-item-text label">What term is this payment for?*</p>
          <p v-else class="form-item-text">{{ formData.term }}</p>
          <div class="arrow">
            <img src="../../assets/images/arrow.svg" alt="">
          </div>
          <div v-if="isShowTermList" class="select-list">
            <div class="select-list-item" v-for="item in termList" :key="item" @click="formData.term = item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="form-item" :class="{ 'error': error.studentId }">
          <input type="text" placeholder="Student lD *" v-model="formData.studentId">
        </div>
        <div class="form-item" :class="{ 'error': error.studentFirstName }">
          <input type="text" placeholder="First Name *" v-model="formData.studentFirstName">
        </div>
        <div class="form-item" :class="{ 'error': error.studentLastName }">
          <input type="text" placeholder="Last Name*" v-model="formData.studentLastName">
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
.step-4 {
  .step-4-content {
    width: 1056px;
    margin: 48px auto;

    .step-4-content-hint {
      font-family: Inter;
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      color: #0B0B0B;
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