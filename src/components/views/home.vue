<script setup lang="ts">
import { ref } from "vue"
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

//通信
const request = (accessPoint: any, data: any, func: any) => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let request = new Request(`https://entertaining-balanced-practice.glitch.me/${accessPoint}`, {
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
})

const threads: any = ref([])

const goView = (data: any) => {
  router.push({
    path: 'imageView',
    query: { view: data }
  });

}
</script>

<template>
  <div class="mx-auto" style="width: 1020px">
    <div class="flex justify-between position fixed mt-2" style="width: 1020px">
      <RouterLink class="text-white text-center font-bold text-3xl" to="/">After school</RouterLink>

      <RouterLink class="px-5 py-2 bg-gray-200 text-black font-semibold rounded-full hover:bg-gray-300" to="/postThread">
        スレッド投稿
      </RouterLink>
    </div>
  </div>
  <div class="h-screen w-screen fixed -z-50">
    <div style="background-image: url('/images/background.png')"
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

  <div class="w-full bg-black pt-12">
    <div class="mx-auto pt-12" style="width: 1020px">
      <h1 class="text-white text-left font-extrabold tracking-tight text-3xl mb-5">After Gallery</h1>

      <div class="grid grid-cols-3 gap-4">
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

    </div>
  </div>
</template>

<style scoped>
.card {
  width: 320px;
  height: 320px;
  object-fit: cover;
}
</style>