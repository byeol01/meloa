<script setup>
import './css/best.css'
import { useRouter } from 'vue-router'
import { bestMap } from './js/bestDataMap.js'
import { ref, computed, nextTick, watch } from 'vue'

const showPopup = ref(false)
const selectedIndex = ref(null)

const currentItem = computed(() => {
  return selectedIndex.value !== null ? bestMap[selectedIndex.value] : {}
})

function closePopup() {
  showPopup.value = false
  selectedIndex.value = null
}
const popupRef = ref(null)
let startY = 0
let currentY = 0
let dragging = false

function getEventY(e) {
  return e.touches ? e.touches[0].clientY : e.clientY
}

const activeImage = ref('') // 현재 크게 보여줄 이미지

watch(selectedIndex, (newIndex) => {
  const item = bestMap[newIndex]
  if (item && item.main?.colors?.length > 0) {
    activeImage.value = item.main.colors[0].image
  }
})

const activeColorName = ref('')

function openPopup(index) {
  selectedIndex.value = index
  showPopup.value = true

  const item = bestMap[index]
  if (item && item.main?.colors?.length > 0) {
    activeImage.value = item.main.colors[0].image
    activeColorName.value = item.main.colors[0].name
  }

  nextTick(() => {
    currentY = 0
    if (popupRef.value) {
      popupRef.value.style.transform = `translateY(0px)`
    }
  })
}

// 팝업 드래그 -----------------------------------------------------------------------
function startDrag(e) {
  dragging = true;
  startY = getEventY(e); // 정확한 시작 위치 기록
}

function onDrag(e) {
  if (!dragging || !popupRef.value) return;

  const moveY = getEventY(e) - startY;

  // 드래그 이동 제한: -100 ~ +100px
  const maxOffset = 100;
  const offsetY = Math.max(-maxOffset, Math.min(maxOffset, moveY));

  currentY = offsetY;
  popupRef.value.style.transform = `translateY(${currentY}px)`;
}

function endDrag() {
  dragging = false;

  if (popupRef.value) {
    popupRef.value.style.transition = 'transform 0.2s ease';
    popupRef.value.style.transform = 'translateY(0px)';
    currentY = 0;

    setTimeout(() => {
      popupRef.value.style.transition = '';
    }, 200);
  }
}

const scrollRef = ref(null)
let isDraggingScroll = false
let scrollStartY = 0
let scrollTopAtStart = 0

function onScrollDragStart(e) {
  isDraggingScroll = true
  scrollStartY = e.touches ? e.touches[0].clientY : e.clientY
  scrollTopAtStart = scrollRef.value.scrollTop
}

function onScrollDragMove(e) {
  if (!isDraggingScroll || !scrollRef.value) return
  const currentY = e.touches ? e.touches[0].clientY : e.clientY
  const deltaY = scrollStartY - currentY
  scrollRef.value.scrollTop = scrollTopAtStart + deltaY
}

function onScrollDragEnd() {
  isDraggingScroll = false
}


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
  <section id="best">
    <div class="wrap flex">
      <h2>Let us recommend your kind of day.</h2>
      <div class="b-box">
        <ul>
          <li v-for="key in Object.keys(bestMap)" :key="key">
            <a href="#" class="btn" @click.prevent="openPopup(key)"></a>
          </li>
        </ul>
        <div class="p-wrap" v-if="showPopup" @click.self="closePopup">
          <div class="p-inner" ref="popupRef">
            <div class="p-main">
              <button class="close" @click="closePopup">×</button>
              <div class="p-content" ref="scrollRef" @mousedown="onScrollDragStart" @mousemove="onScrollDragMove"
                @mouseup="onScrollDragEnd" @mouseleave="onScrollDragEnd" @touchstart="onScrollDragStart"
                @touchmove="onScrollDragMove" @touchend="onScrollDragEnd">
                <div class="p-top">
                  <h3>{{ currentItem.main.brand }}</h3>
                  <p>{{ currentItem.main.name }}</p>
                  <p>{{ currentItem.main.price }}</p>
                  <!-- 큰 이미지 -->
                  <div class="main-img">
                    <img img :src="activeImage" :alt="activeColorName" />
                  </div>
                  <div class="p-dot">
                    <span v-for="color in currentItem.main.colors" :key="color.id" class="color-dot"
                      :style="{ backgroundColor: color.colorCode }"
                      @click="activeImage = color.image; activeColorName = color.name">
                    </span>
                  </div>
                  <p class="active-color">Color : {{ activeColorName }}</p>
                  <p class="m-desc">{{ currentItem.main.desc }}</p>
                  <div class="c-btns">
                    <button class="c-btn c-btn1">구매하기</button>
                    <button class="c-btn c-btn2">장바구니</button>
                  </div>
                  <!-- 썸네일 목록 -->
                  <div class="c-thumbs">
                    <div v-for="color in currentItem.main.colors" :key="color.id" class="thumb-block">
                      <img :src="color.image" :alt="color.name" class="thumb"
                        @click="activeImage = color.image; activeColorName = color.name" />
                    </div>
                  </div>
                </div>
                <!-- 관련 상품 텍스트 정보 -->
                <div class="p-bottom">
                  <div class="r-items">
                    <div v-for="rel in currentItem.related" :key="rel.id" class="r-info">
                      <div class="r-box">
                        <img :src="rel.image" :alt="rel.name">
                      </div>
                      <p>{{ rel.brand }}</p>
                      <p>{{ rel.name }}</p>
                      <p>{{ rel.price }}</p>
                      <div class="r-btns">
                        <button class="c-btn c-btn1">구매하기</button>
                        <button class="c-btn c-btn2">장바구니</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <button class="back" @click="goBackOrHome">뒤로가기</button>
</template>