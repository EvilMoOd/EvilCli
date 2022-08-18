<script setup lang="ts">
  import { formDate } from '@/utils/time';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import AppIcon from '@/components/AppIcon.vue';
  import { useRouter } from 'vue-router';
  const time = ref(formDate(Date.now()));
  let timer: any;
  const router = useRouter();
  function goLogin() {
    router.push({ name: 'Login' });
  }
  function updateTime() {
    time.value = formDate(Date.now());
  }
  onMounted(() => {
    timer = setInterval(updateTime, 1000);
  });
  onBeforeUnmount(() => {
    clearInterval(timer);
  });
</script>

<template>
  <div class="layout">
    <h1>木的vue脚手架</h1>
    <img src="@/assets/images/he.png" alt="" />
    <a href="https://github.com/evilsfdd/MyTemplateByVite">
      <app-icon icon="mdi:github" class="text-5xl cursor-pointer"></app-icon>
    </a>
    <span class="text-green-100">给个star呗</span>
    <div class="clock">
      <p class="time">{{ time }}</p>
    </div>
    <div class="box">
      <h3>语言:Typescript+scss+h5</h3>
      <h3>框架：vue3.2(vue-router路由+pinia仓库)+TailWind CSS</h3>
      <h3>库：dayjs+lodash+ElementsUI-plus组件库+Iconfy图标库+dayjs日期库+lodash函数库</h3>
      <h3>工具：vite2+eslint+prettier+自动导入</h3>
      <h3></h3>
    </div>
    <button @click="goLogin">登录页</button>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    background: #0f3854;
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background-size: 100%;
    // background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background-size: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    color: #fff;
    .clock {
      // background-color: #111;
      font-family: 'Share Tech Mono', monospace;
      text-align: center;
      color: #daf6ff;
      text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
      border-radius: 40px;
      padding: 20px;
      .time {
        letter-spacing: 0.05em;
        font-size: 40px;
        padding: 5px 0;
      }
    }
  }
  img {
    border-radius: 20%;
    width: 20%;
  }
  h2 {
    font-size: 40px;
  }

  h3 {
    position: relative;
    font-size: 1.5rem;
    &::before {
      transform: scaleX(0);
      transform-origin: bottom right;
      content: ' ';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      inset: 0 0 0 0;
      background: rgba(10, 175, 230, 0.5);
      z-index: -1;
      transition: transform 0.3s ease;
    }
    &:hover::before {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }

  body {
    min-block-size: 100%;
    min-inline-size: 100%;
    margin: 0;
    box-sizing: border-box;
    display: grid;
    place-content: center;
    font-family: system-ui, sans-serif;
  }

  @media (orientation: landscape) {
    body {
      grid-auto-flow: column;
    }
  }

  div {
    font-size: 20px;
  }
  button {
    width: 100px;
    height: 40px;
    background-color: rgba(85, 50, 50, 0.133);
    border-radius: 30px;
    &:hover {
      background-color: rgba(236, 231, 231, 0.603);
    }
  }
  h1 {
    font-size: 4rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 5px;
    color: #fff;
    position: relative;
    animation: typing 3s steps(5) forwards infinite alternate-reverse;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 100%;
      background-color: #fff;
      animation: blink 1s linear infinite;
    }
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes typing {
    0% {
      width: 0;
    }
    100% {
      width: 680px;
    }
  }
</style>
