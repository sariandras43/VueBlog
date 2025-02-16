<template>
    <div>
        <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 class="text-2xl font-bold mb-6 text-center">Poszt felvitele</h2>

            <div class="mb-4">
                <label for="title" class="block text-sm font-medium text-gray-700">Cím:</label>
                <input type="text" id="title" name="title" v-model="post.title"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cím" />
            </div>

            <div class="mb-4">
                <label for="subTitle" class="block text-sm font-medium text-gray-700">Alcím:</label>
                <input type="text" id="subTitle" v-model="post.subTitle" name="subTitle"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alcím" />
            </div>
            <div class="mb-4">
                <label for="text" class="block text-sm font-medium text-gray-700">Főszöveg:</label>
                <textarea id="text" v-model="post.text" name="text" rows="6"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Főszöveg"></textarea>
            </div>
            <div class="mb-4">
                <label for="shortText" class="block text-sm font-medium text-gray-700">Alszöveg:</label>
                <textarea id="shortText" v-model="post.shortText" name="shortText" rows="3"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alszöveg"></textarea>
            </div>
            <div class="mb-4">
                <label for="imageUrl" class="block text-sm font-medium text-gray-700">Kép URL:</label>
                <input type="url" id="imageUrl" v-model="post.imageUrl" name="imageUrl"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kép URL" />
            </div>
            <div class="mb-4">
                <label for="category" class="block text-sm font-medium text-gray-700">Kategória:</label>
                <input type="text" v-model="post.category" id="category" name="category"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kategória" />
            </div>
            <div class="mb-4">
                <div class="text-center text-white bg-red-500 rounded-lg py-2 my-4" v-if="errorMessage != ''">
                    <p class="">{{ errorMessage }}</p>

                </div>
                <button @click=" newPost()"
                    class="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Felvitel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { Post } from '@/types/post';
import axios from 'axios';
import { ref } from 'vue';

const post = ref<Post>({
    id: undefined,
    category: "",
    imageUrl: "",
    shortText: "",
    text: "",
    subTitle: "",
    title: ""
})
const errorMessage = ref('')


async function newPost() {
    await axios.post<Post>("http://localhost:3000/posts", post.value)
        .then((res: Post | any) => {
            router.push("/")
        })
        .catch((err: Error) => {
            errorMessage.value = err.message;
        })
}
</script>

<style lang="scss" scoped></style>