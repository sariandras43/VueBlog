<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4" v-if="post != undefined">
        <div class="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <img :src="post.imageUrl" alt="Blog Image" class="w-full h-72 object-contain">

            <div class="p-6">
                <h1 class="text-3xl font-bold text-gray-900">{{ post.title }}</h1>
                <h2 class="text-xl text-gray-600 mt-2">{{ post.subTitle }}</h2>

                <div class="mt-4 text-sm text-gray-500">
                    <span class="font-semibold">Kategória:</span> {{ post.category }}
                </div>

                <div class="mt-6 text-gray-800">
                    <p class="leading-relaxed">{{ post.text }}</p>
                </div>

                <div class="mt-6 text-center">
                    <router-link to="/"
                        class="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
                        Vissza a kezdőlapra
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Post } from "@/types/post";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const errorMessage = ref('')
const route = useRoute()
const id = route.params.id
const router = useRouter();

const post = ref<Post>()

onMounted(() => {
    axios.get<Post>("http://localhost:3000/posts/" + id)
        .then((res: Post | any) => {
            post.value = res.data;
        })
        .catch((err: Error) => {
            errorMessage.value = err.message
        })
})

</script>

<style scoped></style>