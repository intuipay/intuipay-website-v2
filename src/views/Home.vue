<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useGlobalStore } from '../hooks/globalStore';
import { universityList } from '../libs/index.js'
import { countryPhoneCodes } from '../libs/index.js'
import person1 from '../assets/images/home/person1.png'
import person from '../assets/images/home/person.png'
import person3 from '../assets/images/home/person3.png'
import person4 from '../assets/images/home/person4.png'
import person2 from '../assets/images/home/person2.png'


import CN from '../assets/images/home/cn.svg'
import US from '../assets/images/home/usa.svg'
import HK from '../assets/images/home/hk.svg'
import JP from '../assets/images/home/jp.svg'
import VN from '../assets/images/home/vn.svg'
import IN from '../assets/images/home/in.svg'
import UK from '../assets/images/home/uk.svg'

const countryList = [
  {
    text: 'India',
    img: IN
  },
  {
    text: 'China',
    img: CN
  },
  {
    text: 'USA',
    img: US
  },
  {
    text: 'Hongkong',
    img: HK
  },
  {
    text: 'Japan',
    img: JP
  },
  {
    text: 'Vietnam',
    img: VN
  }
]

// 货币
const currencyList = [
  {
    text: 'USD',
    img: US
  },
  {
    text: 'GBP',
    img: UK
  },
  {
    text: 'JPY',
    img: JP
  }
]

const list = [{
  name: 'Amina (Nigeria)',
  role: 'NYU Abu Dhabi',
  avatar: person,
  text: '“I used to spend hours in bank queues just to wire money—and then wait 5 days for it to clear. With Intuipay, I paid my tuition during my lunch break, saved $800 on fees, and got a confirmation email from my school in 12 minutes. No more panic before deadlines!”'
}, {
  name: 'Rohan (India)',
  role: 'University of Toronto',
  avatar: person1,
  text: '“I used to spend hours in bank queues just to wire money—and then wait 5 days for it to clear. With Intuipay, I paid my tuition during my lunch break, saved $800 on fees, and got a confirmation email from my school in 12 minutes. No more panic before deadlines!”'
}, {
  name: 'Mai (Vietnam)',
  role: 'Australian National University',
  avatar: person2,
  text: '“I almost lost my scholarship because my wire transfer took 6 days. With Intuipay, I paid my tuition during a coffee break.”'
}, {
  name: 'Gabriel (Brazil)',
  role: 'UCLA',
  avatar: person3,
  text: '“Exchange rates fluctuations could  — I used to check 5 times a day before paying tuition. Intuipay’s rate tracker messaged me when BRL/USD spiked, so I paid my bill instantly and saved 2 months’ rent. Now I tell all my friends about Intuipay.”'
}, {
  name: 'Wei (China)',
  role: 'University of Edinburgh',
  avatar: person4,
  text: '“Before discovering Intuipay, I faced a lot of issues paying tuition. I always try to send as soon as possible because it feels like a huge chore. Intuipay’s local partners let me pay in RMB and converted it to GBP at a rate 3% better than my bank, and my payment arrived in 8 minutes.”'
}]

AOS.init({
  once: true,
  duration: 750
});

const { setUniversity, setFromData, store, clearData } = useGlobalStore();
const router = useRouter()
const selectItem = ref('phone')
const search = ref('')
const selectCountryPhoneCodes = ref(countryPhoneCodes[0].code)
const searchHistory = ref([])
const isShowSearchList = ref(false)
const showPhoneCodeList = ref(false)
const selectCurrency = ref(currencyList[0])
const showCurrencyList = ref(false)
const selectCountry = ref(countryList[0])
const showCountryList = ref(false)
const getUniversityList = () => {
  if (search.value) {
    return universityList.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))
  } else {
    if (searchHistory.value.length > 0) {
      return searchHistory.value
    } else {
      return []
    }
  }
}

const clearHistory = () => {
  localStorage.removeItem('searchList')
  searchHistory.value = []
}

const bindSearch = (item) => {
  search.value = item.name
  isShowSearchList.value = false
  if (searchHistory.value.find(history => history.name === item.name)) {
    console.log('')
  } else {
    addHistory(item)
  }
  toInformation()
}

const addHistory = (item) => {
  searchHistory.value.push(item)
  localStorage.setItem('searchList', JSON.stringify(searchHistory.value))
}

const toInformation = () => {
  console.log(search.value)
  // search.value 是否在universityList
  if (universityList.find(item => item.name === search.value)) {
    setUniversity(universityList.find(item => item.name === search.value))
    setFromData({
      ...store.state.fromData,
      university: universityList.find(item => item.name === search.value)
    })
    router.push(`/information`)
  } else {
    alert('Please enter the correct institution name')
  }
}

onMounted(() => {
  clearData()
  const localSearchList = localStorage.getItem('searchList')
  if (localSearchList) {
    searchHistory.value = JSON.parse(localSearchList)
  }
})
</script>

<template>
  <div class="home" @click="isShowSearchList = false; showPhoneCodeList = false; showCountryList = false; showCurrencyList = false">
    <div class="section">
      <div class="section-wrapper">
        <div class="section-content">
          <img src="../assets/images/home/frame4.svg" alt="" class="bg">
          <img src="../assets/images/home/frame5.svg" alt="" class="bg">
          <div class="ft-img-wrapper" data-aos="fade-up" data-aos-delay="400">
            <img src="../assets/images/home/frame18.webp" alt="" class="ft-img">
          </div>
          <div class="section-content-hd" data-aos="fade-up" data-aos-delay="100">
            <img src="../assets/images/home/ellipse.png" alt="">
            <span>Intuipay Announces Partnership with NTU Singapore</span>
          </div>
          <div class="section-content-title" data-aos="fade-up" data-aos-delay="200">
            <p>
              <span>Pay international tuition faster, cheaper, smarter, with</span>
              <img src="../assets/images/home/frame9.svg" alt="">
              <span>Intuipay</span>
            </p>
          </div>
          <div class="section-content-search" data-aos="fade-up" data-aos-delay="300" @click.stop>
            <div class="section-content-search-input">
              <input type="text" v-model="search" placeholder="Enter Institution Name (EN/Abbreviations)"
                @focus="isShowSearchList = true">
            </div>
            <div class="section-content-search-btn" @click="toInformation">
              <img src="../assets/images/home/search.svg" alt="">
              <span>Search</span>
            </div>
            <div v-if="isShowSearchList && (searchHistory.length > 0 || search)" class="search-list">
              <div v-if="searchHistory.length > 0 && !search" class="history">
                <p>Search history</p>
                <span @click="clearHistory">Clear</span>
              </div>
              <div class="search-list-item" v-for="(item, index) in getUniversityList()" :key="index"
                @click="bindSearch(item)">
                <div class="search-item-left">
                  <img :src="item.icon" alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div class="search-item-right">
                  <img :src="item.countryIcon" alt="">
                </div>
              </div>
              <div v-if="getUniversityList().length === 0 && search" class="search-list-item">
                <p class="search-list-item-no">Nothing Here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="payment">
      <div class="payment-title" data-aos="fade-up" data-aos-delay="100">Payment <span>Partner</span></div>
      <div class="payment-img" data-aos="fade-up" data-aos-delay="200">
        <vue3-seamless-scroll :list="list" hover :step="2" direction="left">
          <div class="payment-img-item">
            <img src="../assets/images/home/frame95.png" alt="">
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
    <div class="settlement">
      <img src="../assets/images/home/frame109.svg" alt="" class="settlement-img">
      <div class="settlement-title" data-aos="fade-up" data-aos-delay="100">As Fast As<span> 10-Minute Settlement</span></div>
      <div class="settlement-subtitle" data-aos="fade-up" data-aos-delay="200">
        Fastest settlement guaranteed! Process and settle payment in as low as 10 minutes <br /> compared to the typical 3-7 business days.
      </div>
      <img src="../assets/images/home/frame109.svg" alt="" class="settlement-img rotate180">
      <div class="img-list">
        <div class="img-list-item" data-aos="fade-up" data-aos-delay="400">
          <img src="../assets/images/home/frame100.webp" alt="">
        </div>
        <div class="img-list-item" data-aos="fade-up" data-aos-delay="300">
          <img src="../assets/images/home/frame99.webp" alt="">
        </div>
        <div class="img-list-item" data-aos="fade-up" data-aos-delay="500">
          <img src="../assets/images/home/frame101.png" alt="">
        </div>
      </div>
    </div>
    <div class="best-price">
      <img src="../assets/images/home/frame109.svg" alt="" class="best-price-bg">
      <div class="best-price-title" data-aos="fade-up" data-aos-delay="100">As Low As <span>0% Fee</span></div>
      <div class="best-price-subtitle" data-aos="fade-up" data-aos-delay="200">
        Best price guaranteed! Achieving 60–100% cost reduction compared to all alternatives, <br /> including credit / debit cards, online payment platforms, and bank transfers.
      </div>
      <div class="best-price-img" data-aos="fade-up" data-aos-delay="300">
        <img src="../assets/images/home/frame98.png" alt="">
        <div class="best-price-img-bg" data-aos="fade-up" data-aos-delay="50">
          <div class="best-price-img-bg-item">
            <img src="../assets/images/home/frame115.svg" alt="" class="best-price-img-bg-item-line" data-aos="fade-up"
              data-aos-delay="100">
            <img src="../assets/images/home/1.png" alt=""
              class="best-price-img-bg-item-logo best-price-img-bg-item-logo1" data-aos="fade-up" data-aos-delay="150">
            <img src="../assets/images/home/2.png" alt=""
              class="best-price-img-bg-item-logo best-price-img-bg-item-logo2" data-aos="fade-up" data-aos-delay="200">
          </div>
          <div class="best-price-img-bg-item">
            <img src="../assets/images/home/frame116.svg" alt="" class="best-price-img-bg-item-line">
            <img src="../assets/images/home/3.png" alt=""
              class="best-price-img-bg-item-logo best-price-img-bg-item-logo3" data-aos="fade-up" data-aos-delay="250">
            <img src="../assets/images/home/4.png" alt=""
              class="best-price-img-bg-item-logo best-price-img-bg-item-logo4" data-aos="fade-up" data-aos-delay="300">
            <img src="../assets/images/home/5.png" alt=""
              class="best-price-img-bg-item-logo best-price-img-bg-item-logo5" data-aos="fade-up" data-aos-delay="350">
            <img src="../assets/images/home/6.png" alt=""
              class="best-price-img-bg-item-logo best-price-img-bg-item-logo6" data-aos="fade-up" data-aos-delay="400">
          </div>
        </div>
      </div>
    </div>
    <div class="support">
      <div class="support-title" data-aos="fade-up" data-aos-delay="100"><span>24/7 Accessibility</span> and Support
      </div>
      <div class="support-subtitle" data-aos="fade-up" data-aos-delay="200">
        Process and settle payments via Intuipay 24/7 without relying on traditional banking hours. <br /> Monitor
        progress live and access multilingual support.
      </div>
      <div class="support-img">
        <img src="../assets/images/home/frame108.svg" alt="" class="support-img-1">
        <div class="support-img-2-wrapper" data-aos="fade-up" data-aos-delay="300">
          <div class="support-img-2-logo">
            <img src="../assets/images/home/frame91.svg" alt="">
          </div>
          <img src="../assets/images/home/frame11.svg" alt="" class="support-img-2">
        </div>
        <img src="../assets/images/home/frame109.svg" alt="" class="support-img-3 rotate180">
      </div>
    </div>
    <div class="why">
      <div class="why-title" data-aos="fade-up" data-aos-delay="100"><span>Why</span> Choose Intuipay</div>
      <div class="why-subtitle" data-aos="fade-up" data-aos-delay="200">
        Hear what they say about us and why you should choose Intuipay
      </div>
      <div class="why-scroll" data-aos="fade-up" data-aos-delay="300">
        <vue3-seamless-scroll :list="list" hover :step="2" direction="left">
          <div class="scroll-list">
            <div class="scoll-item" v-for="data in list" :key="data.name">
              <div class="scoll-item-text">
                {{ data.text }}
              </div>
              <div class="user-info">
                <div class="user-info-avatar">
                  <img :src="data.avatar" alt="">
                </div>
                <div class="user-info-name-wrapper">
                  <div class="user-info-name">
                    {{ data.name }}
                  </div>
                  <div class="user-info-role">
                    {{ data.role }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
    <div class="section section-1">
      <div class="section-wrapper">
        <div class="section-content">
          <div class="select">
            <div class="select-item" :class="{ 'select-item-active': selectItem === 'email' }"
              @click="selectItem = 'email'">
              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.71443 0.5H15.2859C15.917 0.5 16.4287 1.01168 16.4287 1.64286V11.3571C16.4287 11.9883 15.917 12.5 15.2859 12.5H2.71443C2.08323 12.5 1.57157 11.9883 1.57157 11.3571V1.64286C1.57157 1.01168 2.08323 0.5 2.71443 0.5Z"
                  fill="#A3A3A3" />
                <path
                  d="M17 3L9.78769 6.88194C9.56654 6.95822 9.28782 7 9 7C8.71218 7 8.43346 6.95822 8.21231 6.88194L1 3"
                  stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="select-item" :class="{ 'select-item-active': selectItem === 'phone' }"
              @click="selectItem = 'phone'">
              <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.94444 0.111328H12.0556C12.8533 0.111328 13.5 0.758028 13.5 1.55577V17.4447C13.5 18.2424 12.8533 18.8891 12.0556 18.8891H1.94444C1.14668 18.8891 0.499999 18.2424 0.499999 17.4447V1.55577C0.499999 0.758028 1.14668 0.111328 1.94444 0.111328Z"
                  fill="white" />
                <rect width="10" height="12" rx="1" transform="matrix(-1 0 0 1 12 2)" fill="#fff" />
                <path d="M7.72217 17H6.27772H7.72217Z" fill="#fff" />
                <path d="M7.72217 17H6.27772" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>
          </div>
          <img src="../assets/images/home/frame4.svg" alt="" class="bg">
          <img src="../assets/images/home/frame5.svg" alt="" class="bg">
          <div class="section-1-content-title" data-aos="fade-up" data-aos-delay="100">
            <p>Why pay 5% more? We’ll text you the dip</p>
          </div>
          <div class="section-content-subtitle" data-aos="fade-up" data-aos-delay="200">
            <p>We will notify you on Phone Massage so you never miss a chance to save money.</p>
          </div>
          <div class="section-1-content-img" data-aos="fade-up" data-aos-delay="300">
            <div class="section-1-content-img-item" @click.stop="showCountryList = !showCountryList">
              <div class="section-1-content-img-item-left">
                <img :src="selectCountry.img" alt="">
                <span>{{ selectCountry.text }}</span>
              </div>
              <div class="section-1-content-img-item-right">
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 1L8 8L0.999999 1" stroke="#262626" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
              <div v-if="showCountryList" class="select-list">
                <div class="select-list-item" v-for="item in countryList" :key="item.country"
                  @click="selectCountry = item">
                  <img :src="item.img" alt="">
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </div>
            <div class="section-1-content-img-item" @click.stop="showCurrencyList = !showCurrencyList">
              <div class="section-1-content-img-item-left">
                <img :src="selectCurrency.img" alt="">
                <span>{{ selectCurrency.text }}</span>
              </div>
              <div class="section-1-content-img-item-right">
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 1L8 8L0.999999 1" stroke="#262626" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
              <div v-if="showCurrencyList" class="select-list">
                <div class="select-list-item" v-for="item in currencyList" :key="item.country"
                  @click="selectCurrency = item">
                  <img :src="item.img" alt="">
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="input" data-aos="fade-up" data-aos-delay="400">
            <div v-if="selectItem === 'email'" class="email">
              <input type="text" placeholder="Email">
            </div>
            <div v-else class="phone">
              <div class="phone-code" @click.stop="showPhoneCodeList = !showPhoneCodeList">{{
                selectCountryPhoneCodes
                }}
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 1.25L5.5 5.75L1 1.25" stroke="#262626" stroke-width="1.3" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <div v-if="showPhoneCodeList" class="select-list" style="top: 82px;">
                  <div class="select-list-item" v-for="item in countryPhoneCodes" :key="item.code"
                    @click="selectCountryPhoneCodes = item.code">
                    {{ item.code }}
                  </div>
                </div>
              </div>
              <input type="text" placeholder="Phone number *">
            </div>
            <div class="btn">Sign up for rate alerts</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-content">
        <span>© 2025 IntuiPay. All rights reserved.</span>
        <div class="footer-content-link">
          <a href="#">
            <img src="../assets/images/home/f.svg" alt="">
          </a>
          <a href="#">
            <img src="../assets/images/home/x.svg" alt="">
          </a>
          <a href="#">
            <img src="../assets/images/home/i.svg" alt="">
          </a>
          <a href="#">
            <img src="../assets/images/home/l.svg" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;

  .section {
    padding: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 16px;

    .section-wrapper {
      border: 1px solid #E5E5E5;
      background: #F5F5F5;
      border-radius: 16px;
      width: 100%;
      height: 100%;
      padding: 8px;
      box-sizing: border-box;
    }

    .section-content {
      position: relative;
      background: linear-gradient(0deg, #0037C2 0%, #ADC4FF 92.52%);
      border: 1px solid #D4D4D4;
      box-shadow: 0px 8px 16px 0px #A7BBC959;
      border-radius: 16px;
      width: 100%;
      padding: 60px 133px 30px 133px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .ft-img-wrapper {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        padding: 0 34px 0 52px;
        box-sizing: border-box;
      }

      .ft-img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .section-content-hd {
        position: relative;
        z-index: 2;
        box-shadow: 0px 0px 14.7px 0px #FFFFFF99 inset;
        border: 1px solid #FFFFFF99;
        background: #FFFFFF33;
        height: 58px;
        border-radius: 58px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          width: 34px;
          height: 34px;
        }

        span {
          font-size: 14px;
          font-weight: 700;
          color: #FFFFFF;
        }
      }

      .section-content-title {
        position: relative;
        z-index: 2;
        font-size: 40px;
        font-weight: 700;
        color: #FFFFFF;
        text-align: center;
        font-family: 'iquost';
        line-height: 72px;
        font-size: 56px;
        margin-top: 32px;

        p {
          img {
            vertical-align: middle;
            margin: 0 .4em;
          }
        }

        .section-content-title-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;

          img {
            width: 72px;
          }
        }
      }

      .section-content-search {
        position: relative;
        z-index: 2;
        height: 60px;
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 90px;
        border: 1px solid #0000001A;
        border-radius: 60px;
        padding-left: 24px;
        box-sizing: border-box;
        background: #FFFFFF;
        margin-bottom: 211px;

        .search-list {
          position: absolute;
          top: 64px;
          left: 0;
          width: 732px;
          background: #FFFFFF;
          z-index: 88;
          box-sizing: border-box;
          border: 1px solid #0000001A;
          box-shadow: 0px 4px 8px 0px #00000014;
          border-radius: 8px;
          max-height: 300px;
          overflow-y: auto;

          .history {
            padding: 0px 16px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            font-family: Inter;
            font-weight: 400;
            font-size: 12px;
            color: #A3A3A3;
            background: #F5F5F5;

            span {
              text-decoration: underline;
              cursor: pointer;
            }
          }

          .search-list-item {
            padding: 0px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            height: 76px;
            border-bottom: 1px solid #F5F5F5;
            cursor: pointer;
            box-sizing: border-box;

            .search-list-item-no {
              font-family: Inter;
              font-weight: 400;
              font-size: 16px;
              line-height: 18px;
              color: #A3A3A3;
            }

            .search-item-left {
              display: flex;
              align-items: center;
              gap: 10px;

              img {
                width: 32px;
                height: 32px;
              }

              span {
                font-family: Inter;
                font-weight: 400;
                font-size: 16px;
                line-height: 18px;
                color: #000000;
              }
            }

            .search-item-right {
              img {
                width: 16px;
                height: auto;
              }
            }
          }
        }

        .section-content-search-input {
          width: 704px;
          font-size: 16px;
          font-weight: 400;
          color: #000000;

          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: #FFFFFF;

            &::placeholder {
              color: #00000066;
            }
          }
        }

        .section-content-search-btn {
          width: 175px;
          height: 100%;
          box-sizing: border-box;
          background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
          border: 1px solid #E5E5E5;
          box-shadow: 2px 6px 4px 0px #FFFFFF59 inset;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 0 60px 60px 0;
          cursor: pointer;

          img {
            width: 24px;
            height: 24px;
          }

          span {
            font-size: 16px;
            font-weight: 500;
            color: #FFFFFF;
          }
        }
      }
    }
  }

  .payment {
    position: relative;
    padding: 32px 0;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 93px;
      z-index: 9;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) -2%, #FFFFFF 93.6%);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 93px;
      z-index: 9;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) -2%, #FFFFFF 93.6%);
      transform: rotate(180deg);
    }

    .payment-title {
      font-family: 'iquost';
      font-size: 32px;
      color: #1C1C1C;
      text-align: center;
      margin-bottom: 24px;

      span {
        background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .payment-img {
      // width: 100%;
      // position: relative;
      overflow: hidden;
      height: 92px;
      padding-top: 20px;

      .payment-img-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
      }

      img {
        width: 2556px;
        height: auto;
        margin-right: 124px;
      }
    }
  }

  .settlement {
    position: relative;
    box-sizing: border-box;

    .settlement-img {
      width: 100%;
      height: 182px;
      object-fit: cover;
    }

    .settlement-title {
      margin-top: 32px;
      font-family: 'iquost';
      font-size: 56px;
      line-height: 72px;
      color: #1C1C1C;
      text-align: center;
      margin-bottom: 16px;

      span {
        background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .settlement-subtitle {
      font-family: 'Inter';
      margin-top: 16px;
      color: #A3A3A3;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0%;
      text-align: center;
    }

    .img-list {
      margin-top: -89px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      width: 100%;


      .img-list-item {
        position: relative;

        &:nth-child(1) {
          left: 262px;
        }

        &:nth-child(3) {
          left: -292px;
        }

        &:nth-child(2) {
          z-index: 9;
        }

        img {
          width: 532px;
          height: auto;
          object-fit: cover;
        }
      }

    }
  }

  .best-price {
    padding-top: 64px;
    box-sizing: border-box;

    .best-price-bg {
      width: 100%;
      height: 182px;
      object-fit: cover;
    }

    .best-price-title {
      margin-top: 32px;
      font-family: 'iquost';
      font-size: 56px;
      line-height: 72px;
      color: #1C1C1C;
      text-align: center;
      margin-bottom: 16px;

      span {
        background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .best-price-subtitle {
      font-family: 'Inter';
      font-size: 16px;
      line-height: 20px;
      color: #A3A3A3;
      text-align: center;
    }

    .best-price-img {
      margin-top: 32px;
      text-align: center;
      position: relative;

      img {
        width: 532px;
        height: auto;
        object-fit: cover;
        z-index: 2;
        position: relative;
      }

      .best-price-img-bg {
        position: absolute;
        top: 66px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        .best-price-img-bg-item {
          position: relative;

          &+.best-price-img-bg-item {
            margin-top: 100px;
          }

          .best-price-img-bg-item-line {
            width: 100%;
            height: auto;
            object-fit: cover;
          }

          .best-price-img-bg-item-logo {
            height: 56px;
            width: auto;
            position: absolute;

            &.best-price-img-bg-item-logo1 {
              left: 50px;
              top: -28px;
            }

            &.best-price-img-bg-item-logo2 {
              right: 65px;
              top: -28px;
            }

            &.best-price-img-bg-item-logo3 {
              left: 93px;
              top: -28px;
            }

            &.best-price-img-bg-item-logo4 {
              right: 123px;
              top: -28px;
            }

            &.best-price-img-bg-item-logo5 {
              left: 64px;
              bottom: -28px;
            }

            &.best-price-img-bg-item-logo6 {
              right: 109px;
              bottom: -28px;
            }

          }
        }
      }
    }

  }

  .support {
    padding-top: 90px;
    box-sizing: border-box;

    .support-title {
      font-family: 'iquost';
      font-size: 56px;
      line-height: 72px;
      color: #1C1C1C;
      text-align: center;
      margin-bottom: 16px;

      span {
        background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .support-subtitle {
      font-family: 'Inter';
      font-size: 16px;
      line-height: 20px;
      color: #A3A3A3;
      text-align: center;
    }

    .support-img {
      text-align: center;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .support-img-2-wrapper {
        position: relative;
        width: 1216px;
        border: 1px solid #E5E5E5;
        border-radius: 16px;
        margin: 0 auto;

        .support-img-2 {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .support-img-2-logo {
          position: absolute;
          width: 126px;
          height: 126px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

        }
      }
    }
  }

  .why {
    padding: 60px 0;
    box-sizing: border-box;

    .why-title {
      font-family: 'iquost';
      font-size: 56px;
      line-height: 72px;
      color: #1C1C1C;
      text-align: center;
      margin-bottom: 16px;

      span {
        background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .why-subtitle {
      text-align: center;
      font-family: 'Inter';
      font-size: 16px;
      line-height: 20px;
      color: #A3A3A3;
    }

    .why-scroll {
      margin-top: 60px;
      overflow: hidden;

      .scroll-list {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
      }

      .scoll-item {
        padding: 48px;
        box-sizing: border-box;
        width: 544px;
        margin-right: 64px;
        position: relative;

        &::after {
          content: '';
          display: block;
          width: 1px;
          height: 225px;
          top: 0;
          bottom: 0;
          margin: auto;
          background: #E5E5E5;
          position: absolute;
          right: -32px;
          top: 0;
        }

        .scoll-item-text {
          // 5行
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: 'Inter';
          font-size: 16px;
          line-height: 1.55;
          color: #0E0637;
          font-weight: 500;
          height: 125px;
        }

        .user-info {
          margin-top: 42px;
          display: flex;
          align-items: center;
          gap: 16px;

          .user-info-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .user-info-name-wrapper {
            .user-info-name {
              font-family: 'Inter';
              font-size: 14px;
              line-height: 1.45;
              color: #000;
              font-weight: 500;
            }

            .user-info-role {
              font-family: Inter;
              font-weight: 400;
              font-size: 12px;
              line-height: 135%;
              letter-spacing: 0.5%;
              margin-top: 2px;
              color: #717184;
            }

          }
        }
      }
    }
  }

  .section-1 {
    .section-wrapper {
      .section-content {
        padding: 38px 0;
        position: relative;

        .select {
          position: absolute;
          top: 21px;
          right: 28px;
          width: 112px;
          height: 52px;
          padding: 4px;
          background: #FFFFFF;
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          .select-item {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &.select-item-active {
              background: linear-gradient(180deg, #0037C2 0%, #217BE0 100%);
              box-shadow: 2px 6px 4px 0px #FFFFFF59 inset;

              svg {
                path {
                  fill: #FFFFFF;
                  stroke: #125CD3;
                }

                rect {
                  stroke: #125CD3;
                  fill: #125CD3;
                }
              }
            }

            svg {
              path {
                fill: #A3A3A3;
                stroke: #FFFFFF;
              }

              rect {
                stroke: #FFFFFF;
                fill: #FFFFFF;
              }
            }
          }
        }
      }
    }

    .section-1-content-title {
      position: relative;
      z-index: 2;
      font-family: 'iquost';
      font-weight: 400;
      font-size: 48px;
      line-height: 100%;
      letter-spacing: -2%;
      text-align: center;
      vertical-align: middle;
      color: #FFFFFF;
    }

    .section-content-subtitle {
      position: relative;
      z-index: 2;
      font-family: 'Inter';
      font-weight: 400;
      font-size: 18px;
      line-height: 20px;
      letter-spacing: 0%;
      color: #FFFFFF;
      text-align: center;
      margin-top: 16px;
    }

    .section-1-content-img {
      margin-top: 48px;
      // width: 352px;
      height: 88px;
      gap: 16px;
      border-radius: 8px;
      border-width: 1px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      box-sizing: border-box;
      position: relative;
      background: #FFFFFF66;
      border: 1px solid #FFFFFF;

      .section-1-content-img-item {
        // width: 152px;
        height: 56px;
        justify-content: space-between;
        border-radius: 8px;
        border-width: 1px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px solid #0000001A;
        position: relative;
        cursor: pointer;

        .section-1-content-img-item-left {
          display: flex;
          align-items: center;
          gap: 8px;

          img {
            width: 32px;
            height: 32px;
          }

          span {
            font-family: Inter;
            font-weight: 500;
            font-size: 16px;
            line-height: 18px;
            color: #000000;
          }
        }
      }
    }

    .input {
      position: relative;
      z-index: 2;
      margin-top: 48px;
      width: 900px;
      height: 74px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-radius: 8px;
      border: 1px solid #0000001A;
      padding-right: 16px;
      box-sizing: border-box;
      background: #FFFFFF;
      // overflow: hidden;

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: #FFFFFF;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        box-sizing: border-box;
        padding: 0 16px;

        &::placeholder {
          color: #00000066;
        }
      }

      .email {
        flex: 1;
        height: 100%;
      }

      .phone {
        flex: 1;
        display: flex;
        align-items: center;

        .phone-code {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
          border: 1px solid #0000001A;
          border-radius: 8px 0 0 8px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 74px;
          height: 74px;
          gap: 4px;
          cursor: pointer;
          position: relative;

          svg {
            width: 11px;
            height: 7px;
          }
        }

        input {
          padding: 0 20px;
        }
      }

      .btn {
        flex: 0 0 214px;
        width: 214px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #171717;
        border: 2px solid #E5E5E5;
        border-radius: 8px;
        box-shadow: 2px 6px 4px 0px #FFFFFF59 inset;
        font-weight: 500;
        font-size: 16px;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
  }

  .footer {
    padding: 64px 43px;
    box-sizing: border-box;

    .footer-content {
      padding-top: 32px;
      border-top: 1px solid #E5E5E5;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-family: Inter;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0%;
        color: #737373;
      }

      .footer-content-link {
        display: flex;
        align-items: center;
        gap: 16px;

        a {
          width: 20px;
          height: 20px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}

.rotate180 {
  transform: rotate(180deg);
}

.select-list {
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;
  min-width: 100px;
  border: 1px solid #0000001A;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 8px 0px;
  box-sizing: border-box;
  z-index: 100;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  max-height: 250px;
  overflow-y: auto;

  .select-list-item {
    padding: 0 16px;
    font-family: Inter;
    font-size: 16px;
    height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    &:hover {
      background: #F5F5F5;
    }
  }
}
</style>

<style lang="scss">
.vue3-seamless-wrapper {
  display: flex;
}
</style>
