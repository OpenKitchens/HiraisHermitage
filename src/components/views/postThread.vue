<script setup lang="ts">
import { ref } from "vue"
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();
const username = ref("");
const Title = ref("");

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const YYYYMMDD = `${year}/${month}/${date}`;

//通信
const request = (accessPoint: any, data: any, func: any) => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let request = new Request(`https://frozen-thicket-61367-2b17a9177877.herokuapp.com/${accessPoint}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });
  fetch(request)
    .then(response => {
      // レスポンス変換
      func(data)
    })
    .then(data => {
      // データ処理
    })
    .catch(error => {
      // エラー処理
      console.error(error)
    });
}

const submit = () => {
  const uuid = crypto.randomUUID()
  request("postThread", {
    Title: Title.value,
    Image: "https://tadaup.jp/4561eec7.png",
    favorite: 0,
    bad: 0,
    date: YYYYMMDD,
    username: username.value,
    threadID: uuid,
  }, (data: any) => {
    console.log(data)
    router.push({
      path: 'imageView',
      query: { view: uuid }
    });
  })
}
</script>

<template>
  <div class="mx-auto" style="max-width: 1020px">
    <div class="flex justify-between mt-2" style="max-width: 1020px">
      <RouterLink class="text-white text-center font-bold text-3xl" to="/">After school</RouterLink>
    </div>

    <div class="max-w-md mx-auto">
      <div class="relative z-0 w-full mb-5 group mx-20" style="width: calc(100vw - 10rem)">

        <RouterLink to="/" class="flex mt-12 mb-10">
          <div class="w-12 h-12 rounded-full hover:bg-white-300 border border-zinc-600">
            <img src="/icons/back.svg" class="m-auto" style="margin-top: 15px;">
          </div>
          <h1 class="text-white font-bold text-2xl my-auto ml-3">Back</h1>
        </RouterLink>

        <input type="text"
          class="mt-8 block py-2.5 px-0 w-full text-xl text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-600 peer"
          placeholder="ユーザー名" required v-model="username" />

        <input type="text"
          class="mt-8 block py-2.5 px-0 w-full text-xl text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-600 peer"
          placeholder="記事のタイトル" required v-model="Title" />

        <button type="submit" class="mt-12 px-5 py-2 bg-gray-200 text-black font-semibold rounded-full hover:bg-gray-300"
          @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>