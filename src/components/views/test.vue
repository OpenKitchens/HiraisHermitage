
<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from 'vue-router';

const username = "";
const Title = "";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const YYYYMMDD = `${year}/${month}/${date}`;

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

request("reset", {}, (data: any) => {
  console.log(data)
})
</script>
<template>
  <div>hi</div>
 </template>
