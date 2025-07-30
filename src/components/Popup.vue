<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // ✅ 추가

const isVisible = ref(true);
const dontShow = ref(false);
const router = useRouter(); // ✅ 라우터 인스턴스 가져오기

function handleClose() {
  if (dontShow.value) {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('scratchClosedDate', today);
  }
  isVisible.value = false;
}

function handleMore() {
  router.push('/event'); // ✅ 이벤트 페이지로 이동
}

onMounted(() => {
  const savedDate = localStorage.getItem('scratchClosedDate');
  const today = new Date().toISOString().slice(0, 10);
  if (savedDate === today) {
    isVisible.value = false;
  }
});
</script>

<template>
  <div v-if="isVisible" class="scratch-container">
    <button class="close-btn" @click="handleClose">
      <span class="icon">×</span>
    </button>
    <h2>당신을 위한 오늘의 기분 좋은 쇼핑 예보.</h2>
    <p>Your Daily Forecast for Feel-Good Finds.</p>
    <a href="#" class="scratch-box more-btn" @click.prevent="handleMore">
      더보기
    </a>
    <label class="dont-show">
      <input type="checkbox" v-model="dontShow" /> 오늘 하루 이 창 안보기
    </label>
  </div>
</template>


<style scoped>
.scratch-container {
  position: absolute;
  width: 330px;
  height: 180px;
  background: #FFF9CE;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  left: 50%;
  z-index: 2;
  bottom: 50%;
  justify-content: center;
  align-items: center;
  z-index: 300;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));
  transform: translate(-50%, 50%);
}

.scratch-container h2 {
  font-size: 15px;
  font-weight: 800;
  color: #464e55;
  margin-top: 20px;
}

.scratch-container p {
  font-size: 13px;
  font-weight: 800;
  color: #5d6871;
  margin: 4px 0 17px;
}

.scratch-box.more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  height: 73px;
  background-color: #b6d4ec;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 12px;

}

.dont-show {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #464e55;
  user-select: none;
  margin-bottom: 10px;
  transform: translateX(-60%);
}

.dont-show input {
  margin-right: 6px;
}

.close-btn {
  width: 25px;
  height: 25px;
  padding: 0;
  background: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  box-shadow: 1px 1px 2px #ccc;
}

.close-btn .icon {
  color: #FF6B6B;
  font-weight: 700;
  font-size: 22px;
}
</style>
