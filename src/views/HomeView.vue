<template>
  <main>
    <div class="flex items-center space-x-4 my-4 mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <input type="text" v-model="titleToSearch" id="search" placeholder="Keresés a címekben"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      <button @click="getData()"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Keresés
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
          <div class="flex flex-col">
            <RouterLink :to="`posts/${p.id}`"
              class="w-25 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition m-2">
              Tovább olvasom
            </RouterLink>
            <RouterLink :to="`editpost/${p.id}`" v-if="authStore.isAuthenticated"
              class="w-25 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300 transition m-2">
              Módosítás
            </RouterLink>
            <button @click="deletePost(p.id)" :to="`posts/${p.id}`" v-if="authStore.isAuthenticated"
              class="w-25 bg-red-500 text-left text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition m-2">
              Törlés
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-2" v-if="pages.length !== 1">
      <button class="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-500 text-white flex items-center justify-center"
        v-for="p in pages" @click="getData(p - 1)">
        {{ p }}
      </button>
    </div>

  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { Post } from '@/types/post';
import axios from 'axios';
import { onMounted, ref } from 'vue';
const authStore = useAuthStore()
authStore.initializeAuth()
const posts = ref<Post[]>();
const titleToSearch = ref<string>("");
let maxPage: number;
let currentPage = 1;
const pages = ref<number[]>([]);


async function getData(pageIndex = 0) {

  let appropriateCounter = 0;
  await axios.get<Post[]>("http://localhost:3000/posts")
    .then((res: Post[] | any) => {
      posts.value = [];
      for (let i = pageIndex * 8; i < 8 * (pageIndex + 1); i++) {
        const post: Post = res.data[i];
        currentPage = pageIndex + 1;
        if (post.title.includes(titleToSearch.value)) {
          posts.value.push(post)
        }
      }
      if (!titleToSearch.value) {
        if (res.data.length % 8 == 0) {
          maxPage = (res.data.length / 8)
        } else {
          maxPage = (res.data.length / 8) + 1;

        }

      }
      else {
        res.data.forEach(post => {
          if (post.title.includes(titleToSearch.value)) {
            appropriateCounter++;
          }
        });
        if (appropriateCounter % 8 == 0) {
          maxPage = (appropriateCounter / 8)
        } else {
          maxPage = (appropriateCounter / 8) + 1;
        }
      }
    })

  pages.value = [];
  for (let n = 1; n <= maxPage; n++) {
    pages.value.push(n);
  }
}
onMounted(() => {
  getData();
})

function deletePost(id) {
  axios.delete("http://localhost:3000/posts/" + id)
    .then((res) => {
      getData();
    })
    .catch((err: Error) => alert(err.message))
}
</script>