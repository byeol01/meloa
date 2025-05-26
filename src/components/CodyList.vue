<script setup>
import { useRoute, useRouter } from 'vue-router'
import { weatherMap } from './js/weatherDataMap.js';
import './css/codyList.css';
import './css/codyDetail.css';
import './css/itemList.css';

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import { ref, onMounted, nextTick, computed } from 'vue'

const route = useRoute();
const weatherType = route.params.weatherType || 'rainy';
const weatherData = weatherMap[weatherType];

const codys = weatherData.cody;
const items = weatherData.items;
const items2 = weatherData.items2;
const select = weatherData.select?.[0]?.image
const detailImages = weatherData.detail || [];

const itemList = ref([])
const swiperRef = ref()
const showSwiper = ref(false)

onMounted(() => {
  itemList.value = weatherMap[weatherType]?.items || []

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      showSwiper.value = true
    })
  })
})
const groupedItems = computed(() => {
  const groups = []
  for (let i = 0; i < itemList.value.length; i += 2) {
    groups.push(items.value.slice(i, i + 2))
  }
  return groups
})

const slide = weatherData.slide;

const groupedSlide = computed(() => {
  const groups = []
  for (let i = 0; i < slide.length; i += 2) {
    groups.push(slide.slice(i, i + 2))
  }
  return groups
})

const weatherTypeLabel = {
  rainy: '비 오는 날',
  sunny: '화창한 날',
  snowy: '눈 오는 날',
  cloudy: '흐린 날',
}[weatherType];

// detail 스크롤 애니메이션 ----------------------------------------------------------
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const pinWrapRef = ref(null)
const innerRef = ref(null)

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await nextTick()
  gsap.registerPlugin(ScrollTrigger)

  const pinEl = pinWrapRef.value
  const innerEl = innerRef.value

  const pinH = pinEl.clientHeight
  const contentH = innerEl.scrollHeight
  const extra = 100;
  const distance = innerEl.scrollHeight - pinEl.clientHeight + extra;

  // pin 설정
  ScrollTrigger.create({
    trigger: "#detail",
    start: "top top",
    end: `+=${distance}`,
    pin: true,
    scrub: true,
  })

  // 내부 스크롤 애니메이션
  gsap.to(innerEl, {
    y: -distance,
    ease: "none",
    scrollTrigger: {
      trigger: "#detail",
      start: "top top",
      end: `+=${distance}`,
      scrub: true,
    },
  })

  // 리소스 로드(이미지, 글꼴 등) 끝난 뒤에도 한 번 더
  window.addEventListener('load', () => ScrollTrigger.refresh())
})

//뒤로가기 버튼 -----------------------------------------------------------------------
const router = useRouter()

function goBackOrHome() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

</script>

<template>
  <section id="codylist">
    <div class="wrap">
      <div class="cody-layout">
        <div class="cody-left">
          <div class="cody-list">
            <div v-for="select in weatherData.cody" :key="select.id" class="s-card">

              <div class="c-img-box">
                <img :src="select.image" alt="" class="c-image" />
              </div>
              <p class="cody-desc">{{ select.desc }}</p>
            </div>
          </div>

        </div>


        <div class="cody-right" :class="['page', 'theme', weatherType]">

          <h3 class="a-title">날씨 따라 즐기는 하루</h3>
          <ul class="a-lists">
            <li v-for="(a, i) in weatherData.activities" :key="i" class="a-list">
              <h4>{{ a.title }}</h4>
              <p>{{ a.desc }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section id="detail" ref="detailRef">
    <div class="d-wrap">
      <div class="pin-wrap" ref="pinWrapRef">
        <div class="d-left inner-scroll" ref="innerRef">
          <div class="group-card" v-for="cody in codys" :key="cody.id">
            <div class="s-img-box">
              <img class="s-image" :src="detailImages.find(d => d.group === cody.group)?.image" alt="" />
            </div>
            <!-- 하단 아이템 리스트 -->
            <div class="d-card">
              <ul class="d-lists">
                <li v-for="item in items.filter(i => i.group === cody.group)" :key="item.id" class="d-list">
                  <img :src="item.image" :alt="item.brand + ' 제품 이미지'" class="d-thumb" />

                  <div class="d-thumb-box">
                    <img :src="item.image" :alt="item.brand + ' 제품 이미지'" class="d-thumb" />
                  </div>

                  <div class="d-text">
                    <strong>{{ item.brand }}</strong>
                    <p>{{ item.desc }}</p>
                    <div>
                      <span class="color-dot" :style="{ backgroundColor: item.colorCode }"></span>
                      <p>{{ item.color }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="side">
        </div>

        <div class="side"></div>

      </div>
    </div>
  </section>
  <section id="item">
    <div class="wrap flex">
      <div class="i-layout">
        <div class="i-main">
          <img :src="weatherData.select[0].image" alt="" class="i-image" />
        </div>

        <div class="i-box" v-if="showSwiper">
          <Splide :options="{
            perPage: 2,
            type: 'slide', // loop이 필요 없으면 slide로도 가능
            gap: '20px',
            arrows: false, // 좌우 화살표 보여줄지 여부
            pagination: false, // 아래 dot 표시
            drag: true,
            autoplay: false,  // 자동 넘김 비활성화
          }" aria-label="추천 아이템 슬라이더">
            <SplideSlide v-for="(group, i) in groupedItems" :key="i">
              <div class="vertical-group">
                <div v-for="item in group" :key="item.id" class="i-card">
                  <img :src="item.image" class="i-thumb" :alt="item.brand + ' 제품 이미지'" />
                  <div class="i-info">
                    <strong>{{ item.brand }}</strong>
                    <p>{{ item.desc }}</p>
                    <p>{{ item.price }}</p>

                    <SplideSlide v-for="(group, i) in groupedSlide" :key="i">
                      <div class="vertical-group">
                        <div v-for="slide in group" :key="slide.id" class="i-card">
                          <div class="i-thumb-box">
                            <img :src="slide.image" class="i-thumb" :alt="slide.brand + ' 제품 이미지'" />
                          </div>
                          <div class="i-info">
                            <strong>{{ slide.brand }}</strong>
                            <p>{{ slide.desc }}</p>
                            <p>{{ slide.price }}</p>
                            <div class="i-dot">
                              <span class="color-dot" :style="{ backgroundColor: slide.colorCode }"></span>
                              <p>Color : {{ slide.color }}</p>
                            </div>

                            <span>
                              <button>구매하기</button>
                              <button>장바구니</button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </SplideSlide>
          </Splide>
        </div>

      </div>
    </div>
  </section>
  <button class="back" @click="goBackOrHome">뒤로가기</button>
</template>
