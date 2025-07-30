<script setup>
import './css/header.css'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isEventPage = computed(() => route.path === '/event')
</script>

<template>
  <header :class="{ 'event-header': isEventPage }" id="header">
    <div class="wrap flex">
      <div class="nav-right">
        <img :src="isEventPage ? '/img/event-my.png' : '/img/my.png'" alt="유저 아이콘" class="icon" />
        <img :src="isEventPage ? '/img/event-bag.png' : '/img/bag.png'" alt="장바구니" class="icon" />
        <img :src="isEventPage ? '/img/event-hamburger.png' : '/img/hamburger.png'" alt="햄버거 아이콘" class="icon" />
      </div>
    </div>
  </header>
</template>
