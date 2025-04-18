<script setup>
import { ref } from 'vue';
import { useGlobalStore } from '../../hooks/globalStore';
const emit = defineEmits(['prev', 'pay']);

const { store, setFromData } = useGlobalStore();

const prevStep = () => {
  emit('prev');
}

const nextStep = () => {
  emit('pay');
}
</script>
<template>
  <div class="step-5">
    <div class="step-5-content">
      <div class="item-info">
        <div class="item-info-title">Payment information</div>
        <div class="item-info-grid">
          <div class="item-info-item">
            <div class="item-info-item-label">You will send</div>
            <div v-if="store.state.fromData.paymentMethod.includes('USDC')" class="item-info-item-value">{{ store.state.fromData.usdcAmount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} USDC</div>
            <div v-else class="item-info-item-value">{{ store.state.fromData.payAmount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store?.state?.fromData?.anotherSymbol }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">{{ store.state?.fromData?.university?.name }} will receive</div>
            <div v-if="store.state.fromData.paymentMethod.includes('USDC')" class="item-info-item-value">{{ store.state.fromData.usdcAmount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} USDC</div>
            <div v-else class="item-info-item-value">{{ store.state.fromData.amount.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2}) }} {{ store.state.fromData.needPayAnotherSymbol }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Country or Region</div>
            <div class="item-info-item-value">{{ store.state.fromData.country }}</div>
          </div>
        </div>

      </div>
      <div class="item-info">
        <div class="item-info-title">Payment method</div>
        <div class="item-info-item">
          <div class="item-info-item-label">You Selected</div>
          <div class="item-info-item-value">{{ store.state.fromData.paymentMethod }}</div>
        </div>
      </div>
      <div class="item-info">
        <div class="item-info-title">Payer information</div>
        <div class="item-info-grid">
          <div class="item-info-item">
            <div class="item-info-item-label">First Name</div>
            <div class="item-info-item-value">{{ store.state.fromData.firstName }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Middle Name</div>
            <div class="item-info-item-value">{{ store.state.fromData.middleName || '-' }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Family Name</div>
            <div class="item-info-item-value">{{ store.state.fromData.familyName }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Address 1</div>
            <div class="item-info-item-value">{{ store.state.fromData.address1 || '-' }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Address 2</div>
            <div class="item-info-item-value">{{ store.state.fromData.address2 || '-' }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">City</div>
            <div class="item-info-item-value">{{ store.state.fromData.city || '-' }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">State / Province / Region</div>
            <div class="item-info-item-value">{{ store.state.fromData.state || '-' }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Zip Code / Postal Code</div>
            <div class="item-info-item-value">{{ store.state.fromData.zipCode || '-' }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Country</div>
            <div class="item-info-item-value">{{ store.state.fromData.country || '-' }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Phone Number</div>
            <div class="item-info-item-value">{{ store.state.fromData.code }} {{ store.state.fromData.phone }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Email</div>
            <div class="item-info-item-value">{{ store.state.fromData.email }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Payer Relationship</div>
            <div class="item-info-item-value">{{ store.state.fromData.payerRelationship }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Student Name in Native Language</div>
            <div class="item-info-item-value">{{ store.state.fromData.languageName }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Student Home Country ldentity Number</div>
            <div class="item-info-item-value">{{ store.state.fromData.identityNumber }}</div>
          </div>
        </div>
      </div>
      <div class="item-info">
        <div class="item-info-title">Student Information</div>
        <div class="item-info-grid">
          <div class="item-info-item">
            <div class="item-info-item-label">What term is this payment for?</div>
            <div class="item-info-item-value">{{ store.state.fromData.programType }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Student ID</div>
            <div class="item-info-item-value">{{ store.state.fromData.studentId }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">First Name</div>
            <div class="item-info-item-value">{{ store.state.fromData.studentFirstName }}</div>
          </div>
          <div class="item-info-item">
            <div class="item-info-item-label">Last Name</div>
            <div class="item-info-item-value">{{ store.state.fromData.studentLastName }}</div>
          </div>
        </div>
      </div>
      <div class="contact-info">
        <div class="contact-info-text">
          We will use <span>{{ store.state.fromData.email }}</span> and <span>{{ store.state.fromData.code }} {{ store.state.fromData.phone }}</span> as contact details for
          notifcations and any payment-relatedissues.
          <router-link to="/information?step=3">EDIT DETAILS</router-link>
        </div>
      </div>
      <div class="btns">
        <div class="button-previous" @click="prevStep">
          <img src="../../assets/images/arrow-left.svg" alt="">
          <div class="text">Previous</div>
        </div>
        <div class="button-primary" @click="nextStep">Pay</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-5 {
  .step-5-content {
    width: 1130px;
    margin: 48px auto;

    .item-info {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      padding-bottom: 32px;
      border-bottom: 1px solid #E5E5E5;

      .item-info-title {
        width: 317px;
        flex: 0 0 317px;
      }

      .item-info-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
    }

    .item-info-title {
      font-family: Inter;
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      color: #0B0B0B;
      margin-bottom: 16px;
    }

    .item-info-item {
      background: #FFFFFF;
      border-radius: 8px;
      height: 52px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 32px;
      width: 300px;

      &:last-child {
        margin-bottom: 0;
      }

      .item-info-item-label {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
        color: #00000066;
      }

      .item-info-item-value {
        font-family: Inter;
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;
        color: #000000;
        margin-top: 16px;
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
  }
}
.contact-info {
  width: 470px;
  margin: 48px auto;
  font-family: Inter;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #525252;

  span {
    font-weight: 700;
  }

  a {
    color: #009CEF;
    font-weight: 700;
  }
}
</style>