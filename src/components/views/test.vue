<script setup lang="ts">
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

request("reset", {}, (data: any) => {
  console.log(data)
  router.push({
    path: 'imageView',
    query: { view: uuid }
  });
},)
</script>

<template>
  <h1 class="text-white text-center font-bold text-3xl">Delete...</h1>
</template>

<style scoped></style>