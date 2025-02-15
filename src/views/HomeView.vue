<template>
  <main>
    <h1>Üdvözöllek a blogomon!</h1>
    <!-- <p>Ez egy egyszerű autentikációs példa alkalmazás Vue 3 és JWT használatával.</p>
    <p>Az applikációban bemutatásra kerül, hogyan készíts védett oldalakat, mint a Profil oldal.</p> -->
    <div class="flex items-center space-x-4 my-4 mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <input type="text" id="search" placeholder="Keresés a címekben"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      <button
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Search
      </button>
    </div>

    <div class="max-w-screen-xl mx-auto p-4" v-if="posts != undefined">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white" v-for="p in posts">
          <img class="w-full" :src="p.imageUrl" alt="Card image">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ p.title }}</div>
            <p class="text-gray-700 text-base">
              {{ p.shortText }}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              class="inline-block bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{{
                p.category }}
            </span>
          </div>
          <div class="px-6 pb-4">
            <RouterLink :to="`posts/${p.id}`" class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2
              focus:ring-blue-400">
              Tovább olvasom
            </RouterLink>
          </div>
        </div>

      </div>
    </div>


  </main>
</template>

<script lang="ts" setup>
import { Post } from '@/types/post';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const posts = ref<Post[]>();

onMounted(() => {
  axios.get<Post[]>("http://localhost:3000/posts").then((res: Post[] | any) => {
    posts.value = res.data;
    console.log(posts.value);
  })
})
</script>