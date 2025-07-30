<script setup>
import { useRouter } from 'vue-router';
import { Calendar } from 'v-calendar';
import Sidebar from './Sidebar.vue'

const router = useRouter();

const tiles = [
  {
    type: 'sunny',
    image: '/img/bg_sunny-1.png',
    title: '맑음',
    description: ['맑은 날, 산뜻함을 더해줄', '추천템 확인하기'],
    clickable: true
  },
  {
    type: 'cloudy',
    image: '/img/bg_cloudy.png',
    title: '흐림',
    description: ['흐린 날, 기분 전환해줄', '추천템 확인하기'],
    clickable: true
  },
  {
    type: 'rainy',
    image: '/img/bg_rainy.png',
    title: '비',
    description: ['습기와 꿉꿉함을 날려줄', '추천템 확인하기'],
    clickable: true
  },
  {
    type: 'snowy',
    image: '/img/bg_snowy.png',
    title: '눈',
    description: ['새하얀 눈과 어울리는', '추천템 확인하기'],
    clickable: true
  },
  {
    type: 'empty',
    image: '/img/bg_sunny-2.png',
    clickable: true
  },
  {
    type: 'event',
    image: '/img/bg_event.png',
    title: '이벤트',
    description: ['(무드앤)의 이벤트 소식', '확인하러 가기'],
    clickable: true
  },
];

function goToWeather(type) {
  if (type === 'event') {
    router.push('/event');
  } else {
    router.push(`/${type}`);
  }
}
import { ref } from 'vue';

const calendarMarks = ref([
  {
    dates: new Date(),
    dot: true,
    popover: {
      label: '오늘'
    }
  }
]);
</script>

<template>
  <Sidebar />
  <section id="weather">
    <div class="wrap">
      <HeaderNav />
      <div class="w-grid">
        <div class="tile-text">
          <h2>오늘의 날씨를<br>
            골라보세요!</h2>
          <p>날씨에 맞는 옷과 활동을<br>
            추천해드려요</p>
        </div>
        <div v-for="tile in tiles" :key="tile.type" class="tile" @click="goToWeather(tile.type)">
          <div class="tile-box">
            <img :src="tile.image" :alt="tile.title" class="tile-img" />
          </div>
          <div class="tile-content">
            <h2 class="tile-title">{{ tile.title }}</h2>
            <p><span v-for="(line, idx) in tile.description" :key="idx">{{ line }}<br /></span></p>

          </div>
        </div>
        <div class="calendar-box">
          <Calendar mode="month" is-expanded :attributes="calendarMarks" style="width: 342px; height: 342px;" />
        </div>
      </div>
    </div>
  </section>
</template>