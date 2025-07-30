<script setup>
import Sidebar from './components/Sidebar.vue'
import HeaderNav from './components/HeaderNav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Sidebar />
  <HeaderNav />
  <router-view :key="$route.fullPath" />
  <Footer></Footer>
</template>

