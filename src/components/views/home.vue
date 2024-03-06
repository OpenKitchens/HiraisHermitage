<script setup lang="ts">
import { ref } from "vue"
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

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

request("getThreads", {}, (data: any) => {
  threads.value = data
  console.log(data)
  loading.value = "animation: fadeInAnime 2s forwards"
  setTimeout(() => {
    loadingView.value = false
  }, 1000);
})

const threads: any = ref([])

const goView = (data: any) => {
  router.push({
    path: 'imageView',
    query: { view: data }
  });

}

const loadingView = ref(true)
const loading = ref("")
</script>

<template>
  <div class="w-screen">
    <div class="w-screen h-screen position fixed z-50 bg-black loading" :style="loading" v-if="loadingView">
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
      <div style="background-image: url('https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/background.png?v=1709734188251')"
        class="h-4/5 w-screen absolute bg-center bg-cover opacity-60"></div>
      <div class="flex items-center justify-center absolute z-10 w-screen h-4/5"></div>
    </div>

    <div class="w-screen" style="height: 90vh;">
      <div class="h-4/5 w-screen">
        <div style="position: absolute; top: 40%;left: 50%; transform: translate(-50%,-50%)">
          <h1 class="text-white text-center font-extrabold tracking-tight text-5xl">Hirai's Hermitage</h1>
        </div>
      </div>
    </div>

    <div class="w-screen bg-black pt-12">
      <div class="mx-auto pt-12 width">
        <h1 class="text-white text-left font-extrabold tracking-tight text-3xl mb-5">After Gallery</h1>

        <div class="grid gap-4 mb-20 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 mx-5 sm:mx-0 lg:mx-0">
          <div v-for="thread in threads" class="position relative card">
            <div class="flex items-center justify-center position relative card z-10" @click="goView(thread.threadID)">
              <div class="flex flex-col">
                <h1 class="text-white text-center font-extrabold tracking-tight text-3xl">
                  {{ thread.Title }}
                </h1>
                <p class="text-white text-center font-extrabold tracking-tight text-xl opacity-50">{{ thread.date }}</p>
              </div>
            </div>
            <img :src="thread.Image" class="position absolute top-0 z-0 card opacity-70">
          </div>
        </div>

        <div class="w-screen mt-20 mb-10 w-screen lg:mx-20 sm:mx-10 mx-5">
          <div class="width">
            <h1 class="text-white text-left font-bold text-3xl">After school</h1>
            <p class="text-white text-left mt-3 font-semibold opacity-50">create by MOYASI ❤️</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

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