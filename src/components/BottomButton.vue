<script setup>
import './css/bottomButton.css'
</script>

<template>
  <aside id="aside">
    <div class="aside-box">
      <button>
        <router-link to="/sunny">
          <i class="a-icon">맑음</i>
        </router-link>
      </button>

      <button>
        <router-link to="/cloudy">
          <i class="a-icon">흐림</i>
        </router-link>
      </button>

      <button>
        <router-link to="/rainy">
          <i class="a-icon">비</i>
        </router-link>
      </button>


      <button>
        <router-link to="/snowy">
          <i class="a-icon">눈</i>
        </router-link>
      </button>
    </div>
  </aside>
</template>