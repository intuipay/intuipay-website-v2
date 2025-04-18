<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#000000',
  },
  step: {
    type: Number,
    default: 1,
  },
});
</script>
<template>
  <div :style="{ color: props.color }">
    <svg v-if="props.step == 1" width="33" height="32" viewBox="0 0 33 32" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="0.5" width="31" height="31" rx="15.5" stroke="currentColor" />
      <g clip-path="url(#clip0_71_4668)">
        <path
          d="M19.5 17.5C21.7091 17.5 23.5 15.7091 23.5 13.5C23.5 11.2909 21.7091 9.5 19.5 9.5C17.2909 9.5 15.5 11.2909 15.5 13.5C15.5 15.7091 17.2909 17.5 19.5 17.5Z"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M19.5 14.5V12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M10.5 20L12.9437 22.0364C13.3032 22.336 13.7562 22.5 14.2241 22.5H20.6667C21.1269 22.5 21.5 22.1269 21.5 21.6667C21.5 20.7462 20.7538 20 19.8333 20H15.3543"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M13.5 19L14.25 19.75C14.6642 20.1642 15.3358 20.1642 15.75 19.75C16.1642 19.3358 16.1642 18.6642 15.75 18.25L14.5858 17.0858C14.2107 16.7107 13.702 16.5 13.1716 16.5H10.5"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_71_4668">
          <rect width="14" height="14" fill="none" transform="translate(10 9)" />
        </clipPath>
      </defs>
    </svg>

    <svg v-if="props.step == 2" width="32" height="32" viewBox="0 0 32 32" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="currentColor" />
      <g clip-path="url(#clip0_71_4679)">
        <path
          d="M17.3514 14.3066C17.3002 14.1617 17.2211 14.0299 17.1207 13.9177C16.9071 13.679 16.5966 13.5288 16.2511 13.5288H15.3481C14.7729 13.5288 14.3066 13.9951 14.3066 14.5702C14.3066 15.0596 14.6474 15.483 15.1255 15.5876L16.5004 15.8883C17.036 16.0055 17.4178 16.4801 17.4178 17.0284C17.4178 17.6727 16.8954 18.1955 16.2511 18.1955H15.4733C14.9653 18.1955 14.5332 17.8708 14.373 17.4177"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.8623 13.529V12.3623" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.8623 19.3622V18.1956" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.998 22.4985V19.9985H13.498" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M22.3879 14.804C23.0099 18.1119 20.9856 21.3914 17.6805 22.2769C15.151 22.9547 12.57 22.043 10.998 20.154"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M9.61199 17.1961C8.98994 13.8881 11.0143 10.6087 14.3193 9.7231C16.8487 9.04535 19.4295 9.95692 21.0015 11.8457"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M21.001 9.50171V12.0017H18.501" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_71_4679">
          <rect width="14" height="14" fill="white" transform="translate(9 9)" />
        </clipPath>
      </defs>
    </svg>

    <svg v-if="props.step == 3" width="32" height="32" viewBox="0 0 32 32" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="currentColor" />
      <g clip-path="url(#clip0_71_4691)">
        <g clip-path="url(#clip1_71_4691)">
          <path
            d="M16.2023 13.7224C16.1438 13.5568 16.0535 13.4062 15.9387 13.2779C15.6946 13.0052 15.3398 12.8335 14.9449 12.8335H13.9128C13.2555 12.8335 12.7227 13.3664 12.7227 14.0237C12.7227 14.583 13.1121 15.0668 13.6585 15.1864L15.2298 15.5301C15.8419 15.664 16.2782 16.2064 16.2782 16.833C16.2782 17.5694 15.6813 18.1668 14.9449 18.1668H14.056C13.4754 18.1668 12.9816 17.7958 12.7985 17.2779"
            stroke="#currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.5 12.8333V11.5" stroke="#currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.5 19.5001V18.1667" stroke="#currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M21 9.5H11.5C10.9696 9.5 10.4609 9.71071 10.0858 10.0858C9.71071 10.4609 9.5 10.9696 9.5 11.5V22.5L12 21L14.5 22.5L17 21L19.5 22.5V11C19.5 10.6022 19.658 10.2206 19.9393 9.93934C20.2206 9.65804 20.6022 9.5 21 9.5ZM21 9.5C21.3978 9.5 21.7794 9.65804 22.0607 9.93934C22.342 10.2206 22.5 10.6022 22.5 11V14.5H19.5"
            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_71_4691">
          <rect width="14" height="14" fill="white" transform="translate(9 9)" />
        </clipPath>
        <clipPath id="clip1_71_4691">
          <rect width="14" height="14" fill="white" transform="translate(9 9)" />
        </clipPath>
      </defs>
    </svg>
    <svg v-if="props.step == 4" width="32" height="32" viewBox="0 0 32 32" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="currentColor" />
      <g clip-path="url(#clip0_71_4068)">
        <path
          d="M18 16.5C20.4853 16.5 22.5 15.6046 22.5 14.5C22.5 13.3954 20.4853 12.5 18 12.5C15.5147 12.5 13.5 13.3954 13.5 14.5C13.5 15.6046 15.5147 16.5 18 16.5Z"
          stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13.5 14.5V20.5C13.5 21.6 15.5 22.5 18 22.5C20.5 22.5 22.5 21.6 22.5 20.5V14.5" stroke="#A3A3A3"
          stroke-linecap="round" stroke-linejoin="round" />
        <path d="M22.5 17.5C22.5 18.6 20.5 19.5 18 19.5C15.5 19.5 13.5 18.6 13.5 17.5" stroke="#A3A3A3"
          stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M17.9 10.5088C16.7315 9.78765 15.3713 9.43889 14 9.50878C11.51 9.50878 9.5 10.4088 9.5 11.5088C9.5 12.0988 10.08 12.6288 11 13.0088"
          stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11 19.0088C10.08 18.6288 9.5 18.0988 9.5 17.5088V11.5088" stroke="#A3A3A3" stroke-linecap="round"
          stroke-linejoin="round" />
        <path d="M11 16.0088C10.08 15.6288 9.5 15.0988 9.5 14.5088" stroke="#A3A3A3" stroke-linecap="round"
          stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_71_4068">
          <rect width="14" height="14" fill="white" transform="translate(9 9)" />
        </clipPath>
      </defs>
    </svg>

  </div>

</template>