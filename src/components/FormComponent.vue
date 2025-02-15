<template>
    <form>
        <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" name="title" :value="post.title"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title" />
        </div>

        <div class="mb-4">
            <label for="subTitle" class="block text-sm font-medium text-gray-700">Subtitle</label>
            <input type="text" id="subTitle" :value="post.text" name="subTitle"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subtitle" />
        </div>
        <div class="mb-4">
            <label for="text" class="block text-sm font-medium text-gray-700">Text</label>
            <textarea id="text" :value="post.text" name="text" rows="6"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the full text">Sample text for the post</textarea>
        </div>
        <div class="mb-4">
            <label for="shortText" class="block text-sm font-medium text-gray-700">Short Text</label>
            <textarea id="shortText" :value="post.shortText" name="shortText" rows="3"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter short text">Short description of the post</textarea>
        </div>
        <div class="mb-4">
            <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" id="imageUrl" :value="post.imageUrl" name="imageUrl"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL" />
        </div>
        <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" :value="post.category" id="category" name="category"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category" />
        </div>
        <div class="mb-4">
            <button type="submit"
                class="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Mentés
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { Post } from '@/types/post';
import { ref } from 'vue';

const props = defineProps(['post'])

const post = ref<Post>(props.post)
</script>

<style lang="scss" scoped></style>