<template>
  <div v-if="isVisible" class="scratch-wrapper">
    <div class="scratch-border">
      <div class="scratch-box">
        <div class="box-top">
          <img src="../assets/scratch1.svg" alt="복권이미지">
          <div class="title-hint">
            <h2> 오늘의 기분 예보를 긁어보세요!</h2>
            <p>"기분 맑음, 행운 확률 100% 행운의 스크래치 복권!"</p>
          </div>
        </div>

        <div class="scratch-area">
          <canvas
            ref="canvas"
            :class="{ cleared: isCleared, 'fade-out': isClearing }"
          ></canvas>

          <div class="content">
            <h3>{{ selectedMessage.title }}</h3>
            <p>{{ selectedMessage.desc }}</p>
          </div>
        </div>

        <p class="explanation">본 이벤트는 ID당 1회 참여 가능합니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const messages = [
  { title: "원피스 할인 쿠폰 2000원 할인", desc: "햇살 가득한 하루, 가벼운 원피스 하나 어때요?" },
  { title: "니트 할인 쿠폰 2000원 할인", desc: "흐린 날엔 부드러운 니트가 마음을 감싸줄 거예요." },
  { title: "우산 할인 쿠폰 2000원 할인", desc: "비 오는 날, 귀여운 우산과 함께 기분 전환 완료!" },
  { title: "머플러 할인 쿠폰 2000원 할인", desc: "눈 내리는 오늘, 포근한 머플러로 따뜻하게." },
  { title: "전 상품 할인 쿠폰 4000원 할인", desc: "오늘은 당신만의 색을 입는 날이에요. 밝게 빛나봐요!" },
  { title: "전 상품 할인 쿠폰 3000원 할인", desc: "좋아하는 음악과 어울리는 옷을 골라볼까요?" },
  { title: "전 상품 할인 쿠폰 2000원 할인", desc: "몽글몽글할 땐, 파스텔 컬러로 마음까지 부드럽게." },
  { title: "전 상품 할인 쿠폰 2000원 할인", desc: "잔잔한 바람처럼 여유로운 스타일을 입어보세요." },
  { title: "배송비 할인 쿠폰 2000원 할인", desc: "행운 배송 중! 당신에게 아이템이 찾아오고 있어요." },
  { title: "전 상품 할인 쿠폰 5000원 할인", desc: "오늘의 기분 예보: 설렘 70%, 기대 30%, 쇼핑 100%!" }
];

const selectedMessage = ref(messages[Math.floor(Math.random() * messages.length)]);
const isVisible = ref(true);
const isCleared = ref(false);
const isClearing = ref(false);
const isHintVisible = ref(true);

const canvas = ref(null);
let ctx;
let isDrawing = false;
let lastPos = null;
let scratchCheckCounter = 0;

function getPos(e) {
  const rect = canvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
}

function handleStart(e) {
  isHintVisible.value = false;
  isDrawing = true;
  lastPos = getPos(e);
}

function handleMove(e) {
  if (!isDrawing || isCleared.value) return;
  draw(e);
}

function handleEnd() {
  isDrawing = false;
  lastPos = null;
}

function draw(e) {
  if (!ctx) return;

  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = 'rgba(0,0,0,1)';

  const pos = getPos(e);
  if (!lastPos) lastPos = pos;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 60;
  ctx.beginPath();
  ctx.moveTo(lastPos.x, lastPos.y);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

  lastPos = pos;
  scratchCheckCounter++;
  if (scratchCheckCounter % 10 === 0) checkScratchRatio();
}

function checkScratchRatio() {
  const pixels = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height).data;
  const total = pixels.length / 4;
  let cleared = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) cleared++;
  }

  if (cleared / total > 0.6 && !isCleared.value) {
    isClearing.value = true;
    setTimeout(() => {
      isCleared.value = true;
    }, 800);
  }
}

onMounted(() => {
  const c = canvas.value;
  if (!c) return;

  const dpr = window.devicePixelRatio || 1;
  c.width = 550 * dpr;
  c.height = 100 * dpr;
  c.style.width = '600px';
  c.style.height = '120px';

  ctx = c.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  ctx.globalCompositeOperation = 'source-over';
  const gradient = ctx.createLinearGradient(0, 0, 550, 100);
  gradient.addColorStop(0, '#777');
  gradient.addColorStop(0.5, '#ccc');
  gradient.addColorStop(1, '#555');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 120);

  ctx.save();
  ctx.translate(260, 50);
  ctx.rotate(-0.3);
  ctx.font = '16px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  const text = 'LARA LOTTERY ';
  const textWidth = ctx.measureText(text).width;
  const xGap = textWidth + 10;
  const yGap = 35;
  for (let y = -200; y < 200; y += yGap) {
    for (let x = -400; x < 400; x += xGap) {
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();

  ctx.globalCompositeOperation = 'destination-out';

  // 파이어폭스 대응 pointer 이벤트 사용
  c.addEventListener('pointerdown', handleStart);
  c.addEventListener('pointermove', handleMove);
  c.addEventListener('pointerup', handleEnd);
  c.addEventListener('pointerleave', handleEnd);
});
</script>

<style scoped>
.scratch-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 37px;
  left: 0;
}

/* 체크 테두리 감싸는 div */
.scratch-border {
  padding: 20px;
  background-image: repeating-conic-gradient(#fff 0% 25%, #ffbdca 0% 50%);
  background-size: 20px 20px;
  display: inline-block;
  box-shadow: 35px 35px 11px #00000030;
}

.scratch-box {
  background-color: #FFD767FC;
  width: 800px;
  height: 320px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box-top {
  display: grid;
  grid-template-columns: 100px auto;
  grid-template-rows: auto;
  width: 530px;
  height: 100px;
  justify-content: center;
  column-gap: 17px;
}

.box-top img {
  width: 100px;
  height: 100px;
}

.title-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 문구 */
.title-hint h2 {
  background: #FF5B79;
  border-radius: 30px;
  font-weight: bold;
  font-size: 25px;
  color: #ffffff;
  margin-top: 13px;
  height: 43px;
  width: 360px;
  text-align: center;
  padding-top: 4px;
  text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.31);
  position: relative;
}
.title-hint h2::before, .title-hint h2::after {
  content: "";
  width: 20px;
  height: 20px;
  background-image: url(../assets/scratch2.svg);
  display: block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

}

.title-hint h2::before {
  position: absolute;
  left: -26px;
  bottom: 12px;
}

.title-hint h2::after {
  position: absolute;
  right: -26px;
  bottom: 12px;

}

.title-hint p {
font-weight: 700;
color: #333232;
margin-top: 8px;
font-size: 18px;
}
/* 새로운 영역: 캔버스와 컨텐츠 겹치게 */
.scratch-area {
  position: relative;
  width: 600px;
  height: 120px;
  margin: 20px 0 10px 0;
  transform: translateY(-6px);
}

/* 긁기 캔버스 */
canvas {
  width: 600px;
  height: 120px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9999; /* ⚠️ 무조건 최상단에 */
  cursor: pointer;
  border-radius: 70px;
  pointer-events: auto !important; /* ⭐⭐ 이거 필수! */
}
/* 긁기 완료 후 사라짐 */
canvas.fade-out {
  opacity: 0;
  transition: opacity 0.8s ease;
}
canvas.cleared {

}

.canvas-explanation {

}

/* 긁은 후 나타나는 내용 */
.content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 600px;
  height: 120px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1E3A5F;
  font-weight: bold;
  z-index: 1; /* canvas 아래 */
  pointer-events: none; /* 긁을 수 있게 */
  border-radius: 70px;
}

.content h3 {
  order: 2;
  font-size: 26px;
  margin-top: 10px;
  color: #37618c;
  font-weight: 800;
}

.content p {
  order: 1;
  font-size: 17px;
  margin-top: 0;
  color: #636970;
  font-weight: 800;
}

/* 힌트 애니메이션 */
@keyframes pulseText {
  0%, 100% {
    color: #3a3a3a;
  }
  50% {
    color: #5c5c5c;
  }
}
@keyframes growShrink {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.scratch-hint {
  position: absolute;
  bottom: 68px;;
  z-index: 3;
  font-size: 14px;
  font-weight: 700;
  color: #3a3a3a;
}

.explanation {
  position: absolute;
  bottom: 11px;
  font-size: 13px;
  right: 85px;
  background-color: #fff;
  width: 230px;
  text-align: center;
  border-radius: 11px;
  font-weight: 500;
  height: 19px;
}

</style>
