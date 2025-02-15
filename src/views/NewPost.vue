<template>
    <div>
        <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 class="text-2xl font-bold mb-6 text-center">Poszt szerkesztése</h2>

            <form>
                <div class="mb-4">
                    <label for="title" class="block text-sm font-medium text-gray-700">Cím:</label>
                    <input type="text" id="title" name="title" v-model="post.title"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title" />
                </div>

                <div class="mb-4">
                    <label for="subTitle" class="block text-sm font-medium text-gray-700">Alcím:</label>
                    <input type="text" id="subTitle" v-model="post.subTitle" name="subTitle"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter subtitle" />
                </div>
                <div class="mb-4">
                    <label for="text" class="block text-sm font-medium text-gray-700">Főszöveg:</label>
                    <textarea id="text" v-model="post.text" name="text" rows="6"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the full text">Sample text for the post</textarea>
                </div>
                <div class="mb-4">
                    <label for="shortText" class="block text-sm font-medium text-gray-700">Alszöveg:</label>
                    <textarea id="shortText" v-model="post.shortText" name="shortText" rows="3"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter short text">Short description of the post</textarea>
                </div>
                <div class="mb-4">
                    <label for="imageUrl" class="block text-sm font-medium text-gray-700">Kép URL:</label>
                    <input type="url" id="imageUrl" v-model="post.imageUrl" name="imageUrl"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter image URL" />
                </div>
                <div class="mb-4">
                    <label for="category" class="block text-sm font-medium text-gray-700">Kategória:</label>
                    <input type="text" v-model="post.category" id="category" name="category"
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter category" />
                </div>
                <div class="mb-4">
                    <button @click="newPost()"
                        class="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Mentés
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Post } from '@/types/post';
import axios from 'axios';
import { ref } from 'vue';

const post = ref<Post>({
    category: "",
    imageUrl: "",
    shortText: "",
    text: "",
    subTitle: "",
    title: ""
})
const errorMessage = ref('')


function newPost() {
    axios.post<Post>("http://localhost:3000/posts", post.value)
        .then((res: Post | any) => {
            // router.push("/")
            console.log(res)
        })
        .catch((err: Error) => {
            alert(err.message)
        })
}
</script>

<style lang="scss" scoped></style>