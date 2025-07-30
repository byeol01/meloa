<script setup>
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal'
</script>

<template>
  <div class="calendar-page">
    <h2>🗓️ 달력 페이지</h2>
    <VueCal :time="false" />
  </div>
</template>
