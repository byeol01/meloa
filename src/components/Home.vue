<script setup>
import './css/main.css'
import Weather from './Weather.vue';
import Popup from './Popup.vue'
import BottomButton from './BottomButton.vue'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const showPopup = ref(false);
const dontShowAgain = ref(false);
const todayKey = `hidePopup_${new Date().toISOString().slice(0, 10)}`;

onMounted(() => {
  const hideToday = localStorage.getItem(todayKey);
  if (!hideToday) {
    showPopup.value = true;
  }
});

function goToEvent() {
  router.push('/event');
}

function handleClose() {
  if (dontShowAgain.value) {
    localStorage.setItem(todayKey, 'true');
  }
  showPopup.value = false;
}

function scrollToSection() {
  const section = document.querySelector('.weather');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <Popup v-if="showPopup" @close="handleClose" :dont-show-again.sync="dontShowAgain" />

  <div id="title">
    <div class="t-img-box">
      <div class="title-img">
      </div>
      <div class="scroll-button" @click="scrollToSection">
        <span>scroll</span>
        <span>▼</span>
      </div>
    </div>
  </div>

  <div class="title-text">
    <h2>날씨에 맞는 당신의 스타일<br>지금 확인해보세요</h2>
    <p>오늘 날씨를 선택하고<br>스타일을 추천 받아보세요</p>
  </div>



  <div class="weather">
    <Weather />
  </div>

  <BottomButton />
</template>
