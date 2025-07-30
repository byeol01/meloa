<script setup>
import { useRoute, useRouter } from 'vue-router'
import { weatherMap } from './js/weatherDataMap.js'
import './css/codyList.css'
import './css/codyDetail.css'
import './css/itemList.css'

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import { ref, onMounted, nextTick, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const weatherType = route.params.weatherType || 'rainy'
const weatherData = weatherMap[weatherType]

const codys = weatherData.cody
const items = weatherData.items
const detailImages = weatherData.detail || []

const itemList = ref([])
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
    groups.push(itemList.value.slice(i, i + 2))
  }
  return groups
})

const slide = weatherData.slide
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
}[weatherType]

// scrollTrigger
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pinWrapRef = ref(null)
const innerRef = ref(null)

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await nextTick()

  const pinEl = pinWrapRef.value
  const innerEl = innerRef.value

  const extra = 100
  const distance = innerEl.scrollHeight - pinEl.clientHeight + extra

  ScrollTrigger.create({
    trigger: "#detail",
    start: "top top",
    end: `+=${distance}`,
    pin: true,
    scrub: true,
  })

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

  window.addEventListener('load', () => ScrollTrigger.refresh())
})

// 뒤로가기
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

  <section id="detail">
    <div class="d-wrap">
      <div class="pin-wrap" ref="pinWrapRef">
        <div class="d-left inner-scroll" ref="innerRef">
          <div class="group-card" v-for="cody in codys" :key="cody.id">
            <div class="s-img-box">
              <img class="s-image" :src="detailImages.find(d => d.group === cody.group)?.image" alt="" />
            </div>
            <div class="d-card">
              <ul class="d-lists">
                <li v-for="item in items.filter(i => i.group === cody.group)" :key="item.id" class="d-list">
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
            gap: '20px',
            arrows: false,
            pagination: false,
            drag: true,
            autoplay: false
          }" aria-label="추천 아이템 슬라이더">
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
