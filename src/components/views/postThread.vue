<script setup lang="ts">
import { ref } from "vue"
import { useRouter, RouterLink } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';


let shougakuseiangouTable: {[key: string]: string} = {
  "a": "b",
  "b": "c",
  "c": "d",
  "d": "e",
  "e": "f",
  "f": "g",
  "g": "h",
  "h": "i",
  "i": "j",
  "j": "k",
  "k": "l",
  "l": "m",
  "m": "n",
  "n": "o",
  "o": "p",
  "p": "q",
  "q": "r",
  "r": "s",
  "s": "t",
  "t": "u",
  "u": "v",
  "v": "w",
  "w": "x",
  "x": "y",
  "y": "z",
  "z": "a"
}

function angouka(input: any) {
  let output: string = "";
  for (let i = 0; i < input.length; i++) {
    if (shougakuseiangouTable.hasOwnProperty(input.charAt(i))) {
      output += shougakuseiangouTable[input.charAt(i)];
    } else {
      output += input.charAt(i);
    }
  }
  return output;
}

function replaceExtension(url: any) {
  // URLの末尾が.qohで終わっている場合に.pngに置き換える正規表現
  let regex = /\.qoh$/;
  // URLが.qohで終わっている場合は.pngに置き換える
  if (regex.test(url)) {
    return url.replace(regex, ".png");
  } else {
    return url; // .qohで終わっていない場合はそのまま返す
  }
}

const isPush = ref(false)
const button = ref("Submit")

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
  let request = new Request(`https://after-school-440db2b96f2e.herokuapp.com/${accessPoint}`, {
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


const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    // ファイルが選択された時の処理
    console.log('Selected file:', input.files[0]);
  }
};


const submit = () => {
  isPush.value = true
  button.value = "Submit..."
  if (fileInput.value && fileInput.value.files && fileInput.value.files.length) {
    const formData = new FormData();
    formData.append('image', fileInput.value.files[0]);

    //fetch('http://localhost:3000/upload', {
    fetch('https://5dce1c89-2fc2-4aae-aabe-548ca2ee1d87-00-9z1w8shx3ap6.riker.replit.dev/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {

        const Image = "https://ahead-button-gazelle.glitch.me/service?url=" + replaceExtension(angouka(data))
        console.log(Image)
        console.log(replaceExtension(angouka(data)))

        const uuid = uuidv4()
        request("postThread", {
          Title: Title.value,
          Image: Image,
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
        },)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
};
</script>

<template>
  <div class="mx-auto" style="max-width: 1020px">
    <div class="flex justify-between mt-2 mx-10" style="max-width: 1020px">
      <RouterLink class="text-white text-center font-bold text-3xl" to="/">After school</RouterLink>
    </div>

    <div class="max-w-md mx-auto">
      <div class="relative z-0 w-full mb-5 group mx-20" style="width: calc(100vw - 10rem)">
      </div>

      <div class="mx-5">
        <RouterLink to="/" class="flex mt-12 mb-10">
          <div class="w-12 h-12 rounded-full hover:bg-white-300 border border-zinc-600">
            <img src="https://cdn.glitch.global/2f98fdae-c2e3-44cc-9bff-fd5c79c00955/back.svg?v=1709734219151" class="m-auto" style="margin-top: 15px;">
          </div>
          <h1 class="text-white font-bold text-2xl my-auto ml-3">Back</h1>
        </RouterLink>
        <input type="text"
          class="mt-8 block py-2.5 px-0 w-full text-xl text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-600 peer rounded-none"
          placeholder="ユーザー名" required v-model="username" />

        <input type="text"
          class="mt-8 block py-2.5 px-0 w-full text-xl text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-600 peer rounded-none"
          placeholder="記事のタイトル" required v-model="Title" />

        <label
          class="mt-8 block py-2.5 px-0 w-full text-xl text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-white-500 focus:outline-none focus:ring-0 focus:border-white-600 peer rounded-none">
          Upload Images
          <input class="hidden" ref="fileInput" type="file" @change="handleFileChange">
        </label>
        <button type="submit"
          class="mt-12 px-5 py-2 bg-gray-200 text-black font-semibold rounded-full hover:bg-gray-300" @click="submit"
          :disabled="isPush">{{ button }}</button>
      </div>
    </div>
  </div>

  https://ahead-button-gazelle.glitch.me/service?url=iuuqt://5edf1d89-2gd2-4bbf-bbcf-548db2ff1e87-00-9a1x8tiy3bq6.sjlfs.sfqmju.efw/jnbhf-1709733123372.png
  https://ahead-button-gazelle.glitch.me/service?url=iuuqt://5edf1d89-2gd2-4bbf-bbcf-548db2ff1e87-00-9a1x8tiy3bq6.sjlfs.sfqmju.efw/jnbhf-1709727862553.png
</template>

<style scoped></style>