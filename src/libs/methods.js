import edu from '../assets/images/information/edu.png';
import usdc from '../assets/images/information/usdc.png';
import alipay from '../assets/images/information/alipay.png';
import unionpay from '../assets/images/information/unionpay.png';
import visa from '../assets/images/information/visa.png';
import mastercard from '../assets/images/information/mastercard.png';
import rmb from '../assets/images/information/rmb.png';
import paypal from '../assets/images/information/paypal.png';
import american from '../assets/images/information/american.png';

export const paymentMethods = [
  {
    name: 'EDU Chain in Chinese Yuan (CNY)',
    icon: edu,
    processingFee: 0,
    fxMarkupRate: 0.01,
    additionalFee: 0,
    fee: '0.01',
    description: 'Select payment method will take <span>~20-60 MINUTES</span>',
    title: 'FAST & MOST POPULAR',
    background: 'linear-gradient(180deg, #0037C2 0%, #217BE0 100%)',
    note: `<p>Enjoy the fastest payment experience with funds arriving at your institution in 20-60 minutes and instant confirmation upon completion.</p><p>Your payment in CNY will be converted to USDC (a digital US dollar) and securely transferred via EDU Chain, our high-speed blockchain network.</p><p>Please have your payment method and institution invoice ready before starting the payment.</p>
    <div style="margin-top: 24px;">Please note:</div><p>EDU Chain, an official partner of Intuipay, is the world’s first blockchain network designed specifically for education finance (edu-fi).</p><p>USDC is a stablecoin issued by Circle, an official partner of Intuipay, that maintains a 1:1 value with the US Dollar, ensuring your payment amount remains stable during transfer.</p><p>In some cases, we may require additional documentation to comply with relevant regulations.</p>`,
  },
  {
    name: 'EDU Chain in USD Coin (USDC)',
    icon: usdc,
    description: 'Select payment method will take <span>10 MINUTES</span>',
    processingFee: 0,
    fxMarkupRate: 0,
    additionalFee: 0,
    fee: '0',
    title: 'FASTEST & CHEAPEST, IF YOU ALREADY OWN ENOUGH USDC',
    background: '#16A34A',
    note: `
      <p>Enjoy the fastest payment experience with funds arriving at your institution in 20-60 minutes and instant confirmation upon completion.</p>
      <p>You will be promoted to transfer the specified USDC amount to the beneficiary wallet address given at the end of the booking process. Intuipay will deliver your funds securely to your institution's bank account within minutes after confirmation on the blockchain.</p>
      <p>Student information will be required during the payment process to ensure proper routing.</p>
      <p>Please note:</p>
      <p>EDU Chain, an official partner of Intuipay, is the world’s first blockchain network designed specifically for education finance (edu-fi).</p>
      <p>USDC is a stablecoin issued by Circle, an official partner of Intuipay, that maintains a 1:1 value with the US Dollar, ensuring your payment amount remains stable during transfer.</p>
      <p>In some cases, we may require additional documentation to comply with relevant regulations.</p>
      <p>You must have sufficient USDC in a compatible wallet to use this payment method.</p>
    `,
  }
];

export const paymentMethodsOther = [
  {
    name: 'Alipay in Chinese Yuan (CNY) ',
    icon: alipay,
    description: 'Select payment method will take <span>1-2 DAYS</span>',
    fee: '0.04',
    note: `
      <p>You will be required to upload the tuition invoice provided by your institution and other documents that may be required according to relevant laws and regulations.</p>
      <p>Student & Payer must be a Mainland China citizen to be eligible to make a payment successfully.</p>
      <p>The recommended amount is not more than 300,000 CNY.</p>
      <p>After you complete your payment, your documents still need to be verified. Once the document verification passes, Intuipay will update the payment status and will then convert and deliver funds to your institution.</p>
    `,
  },
  {
    name: 'RMB transfer in Chinese Yuan (CNY)-A Payment notice / bill / invoice from institution is required',
    icon: rmb,
    description: 'Select payment method will take <span>3-7 Days</span>',
    fee: '0.04',
    extra_fee: '80',
    note: `
      <p>You will be required to upload the tuition invoice provided by your institution. Please make sure the document is ready for upload. *</p>
      <p>Student & Payer must be a Mainland China citizen to be eligible to make a payment successfully.</p>
      <p>Payment invoice and payer information will be validated once the funds are received by Intuipay’s authorized partner in China.</p>
      <p>Please transfer CNY (RMB) to the beneficiary bank account (large payments are accepted) according to the instruction given at the end of the booking process. Intuipay will deliver your funds securely within 1 business day after regulatory check is completed and funds received by Intuipay.</p>
    `
  },
  {
    name: 'UnionPay debit card in Chinese Yuan (CNY)',
    icon: unionpay,
    description: 'Select payment method will take <span>1-3 Days</span>',
    fee: '0.04',
    note: `
      <p>Enjoy the fastest payment experience with no documents required and instant issuance of receipt upon payment.</p>
      <p>Please ready your China UnionPay debit card and the cardholder’s phone to receive payment verification message before starting the payment.</p>
      <p>Please note:</p>
      <p>If you are paying with a China Construction Bank Debit card, please enable the overseas transaction feature through “Account Inquiry-Management-Account Security” of Mobile Banking.</p>
      <p><span>If you are paying with a Bank of China Debit card, please pre-adjust the online payment limit in the mobile banking app or online banking, please refer to <a href="https://www.unionpayintl.com/ZT/EducationExpends/" target="_blank">this link</a>.</span></p>
    `
  },
  {
    name: 'Visa Debit / Credit in Chinese Yuan (CNY)',
    icon: visa,
    description: 'Select payment method will take <span>1-3 Days</span>',
    fee: '0.057',
    important_info: 'Important info',
  },
  {
    name: 'Mastercard Debit / Credit in Chinese Yuan (CNY)',
    icon: mastercard,
    description: 'Select payment method will take <span>1-3 Days</span>',
    fee: '0.057',
    important_info: 'Important info',
  },
  {
    name: 'American Express in Chinese Yuan (CNY)',
    icon: american,
    description: 'Select payment method will take <span>1-3 Days</span>',
    fee: '0.078',
    important_info: 'Important info',
  },
  {
    name: 'PayPal in Chinese Yuan (CNY)',
    icon: paypal,
    description: 'Select payment method will take <span>1-2 Days</span>',
    fee: '0.084',
    extra_fee: '0.3',
    note: `
      <p>You will be required to upload the tuition invoice provided by your institution and other documents that may be required according to relevant laws and regulations.</p>
      <p>Student & Payer must have a PayPal account linked to a Chinese bank account or payment method to use this option.</p>
      <p>After you complete your payment via PayPal, your documents still need to be verified. Once the document verification passes, Intuipay will update the payment status and will then convert and deliver funds to your institution. Please allow 1-2 business days for the entire process to complete.</p>
    `
  }
];