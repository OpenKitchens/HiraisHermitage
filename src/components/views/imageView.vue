<script setup lang="ts">
import { ref } from "vue"
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();
//通信
const request = (accessPoint: any, data: any, func: any) => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let request = new Request(`https://after-school-440db2b96f2e.herokuapp.com/${accessPoint}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });
  fetch(request)
    .then(response => {
      // レスポンス変換
      return response.json();
    })
    .then(data => {
      // データ処理
      func(data)
    })
    .catch(error => {
      // エラー処理
      console.error(error)
    });
}

request("getThread", { threadID: route.query.view }, (data: any) => {
  thread.value = data
  console.log(data)
  background.value = `background-image: url('${data.Image}')`
  loading.value = "animation: fadeInAnime 2s forwards"
  setTimeout(() => {
    loadingView.value = false
  }, 1000);
})

const thread: any = ref({})
const background = ref("")
const loading = ref("")
const loadingView = ref(true)

const favoriteSrc = ref("https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/heart.svg?v=1709734221332")
const badSrc = ref("https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/bad.svg?v=1709734220184")

const favorite = () => {
  favoriteSrc.value = "https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/heart.fill.svg?v=1709734220740"
  badSrc.value = "https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/bad.svg?v=1709734220184"

  request("count", { threadID: route.query.view, key: "favorite" }, (data: any) => {
  })

  request("uncount", { threadID: route.query.view, key: "bad" }, (data: any) => {
  })
  thread.value.favorite++
  thread.value.bad--

  if (thread.value.bad <= 0) {
    thread.value.bad = 0
  }
}

const bad = () => {
  badSrc.value = "https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/bad.fill.svg?v=1709734219671"
  favoriteSrc.value = "https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/heart.svg?v=1709734221332"

  request("uncount", { threadID: route.query.view, key: "favorite" }, (data: any) => {
  })

  request("count", { threadID: route.query.view, key: "bad" }, (data: any) => {
  })
  thread.value.bad++
  thread.value.favorite--

  if (thread.value.favorite <= 0) {
    thread.value.favorite = 0
  }
}


</script>

<template>
  <div class="w-full h-full position fixed z-20 bg-black loading" :style="loading" v-if="loadingView">
    <h1 class="text-white text-center font-bold text-3xl"
      style="position: absolute;top: 50vh;left: 50vw;transform: translate(-50%,-50%);">
      After school
    </h1>
  </div>
  <div class="w-screen lg:mx-20 sm:mx-10 mx-5">
    <div class="flex justify-between position fixed mt-5 z-30 width">
      <RouterLink class="text-white text-center font-bold text-3xl" to="/">After school</RouterLink>

      <RouterLink class="px-5 py-2 bg-gray-200 text-black font-semibold rounded-full hover:bg-gray-300"
        to="/postThread">
        スレッド投稿
      </RouterLink>
    </div>
  </div>
  <div class="h-screen w-screen fixed -z-50">
    <div :style="background" class="h-4/5 w-screen absolute bg-center bg-cover opacity-30"></div>
    <div class="flex items-center justify-center absolute z-10 w-screen h-4/5"></div>
  </div>

  <div class="w-screen" style="height: 90vh;">
    <div class="h-4/5 w-screen">
      <div style="position: absolute; top: 40%;left: 50%; transform: translate(-50%,-50%);width: 70vw;">
        <div class="flex">
          <img :src="thread.Image" class="card mr-10 hidden md:block">
          <div class="my-auto ml-10">
            <h1 class="text-white text-left font-extrabold tracking-tight text-5xl">{{ thread.Title }}</h1>
            <p class="text-white font-bold mt-3 text-xl opacity-50 text-left">{{ thread.username }}・{{ thread.date }}
            </p>
            <div class="flex mt-12">
              <button
                class="w-12 h-12  bg-pink-600 text-lg text-white font-semibold rounded-full hover:bg-pink-700 border-2 border-pink-500"
                @click="favorite"><img :src="favoriteSrc" class="m-auto"></button>
              <p class="text-white text-center font-extrabold tracking-tight text-xl mr-5 opacity-50 mx-5 my-auto">{{
    thread.favorite }}</p>
              <button
                class="w-12 h-12  bg-purple-600 text-lg text-white font-semibold rounded-full hover:bg-purple-700 border-2 border-purple-500"
                @click="bad"><img :src="badSrc" class="m-auto"></button>
              <p class="text-white text-center font-extrabold tracking-tight text-xl mr-5 opacity-50 mx-5 my-auto">{{
    thread.bad }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 320px;
  height: 320px;
  object-fit: cover;
}


.width {
  width: calc(100vw - 2.5rem);

  @media (min-width: 640px) {
    width: calc(100vw - 5rem);
  }

  @media (min-width: 1024px) {
    width: calc(100vw - 10rem);
  }
}
</style>

<style>
@keyframes fadeInAnime {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>