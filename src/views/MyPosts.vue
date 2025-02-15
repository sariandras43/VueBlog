<template>
    <div>

        <div v-if="posts != undefined">
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
                            p.category }}</span>
                </div>
                <div class="px-6 pb-4">
                    <button
                        class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Részletek
                    </button>
                    <button
                        class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Szerkesztés
                    </button>
                    <button
                        class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        @click="deletePost(p.id)">
                        Törlés
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { Post } from '@/types/post';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const posts = ref<Post[]>();

onMounted(() => {
    axios.get<Post[]>("http://localhost:3000/posts").then((res: Post[] | any) => {
        posts.value = res.data;
    })
})

function deletePost(id) {
    axios.get<Post[]>("http://localhost:3000/posts").then((res: Post[] | any) => {
        posts.value = res.data;
    })
}

</script>

<style scoped></style>