import { reactive, toRaw } from "vue";

const store = reactive({
  state: {
    fromData: {
      country: '',
      amount: '',
      currency: '',
    },
    university: {
      name: '',
      icon: '',
      logo: '',
      countryIcon: '',
      country: '',
    },
    payments: []
  }
});

const setFromData = (data) => {
  store.state.fromData = data;
}

const setUniversity = (data) => {
  store.state.university = data;
}

const clearData = () => {
  store.state.fromData = {};
  store.state.university = {};
}

const setPayments = (data) => {
  store.state.payments = data;
}

export const useGlobalStore = () => ({
  store,
  setFromData,
  setUniversity,
  clearData,
  setPayments
});
