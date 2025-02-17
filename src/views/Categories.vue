<template>
    <div class="max-w-2xl mx-auto mt-10" v-if="categories != undefined">
        <ul class="space-y-4">
            <li class="p-4 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition duration-200"
                v-for="c in categories">
                <span href="#" class="text-xl font-semibold text-blue-700">{{ c }}</span>
            </li>
        </ul>
    </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Post } from '@/types/post';



const categories = ref<Set<string>>(new Set());
onMounted(() => {
    getData();
})

async function getData() {
    await axios.get<Post[]>("http://localhost:3000/posts")
        .then((res) => {
            res.data.forEach(p => {
                categories.value.add(p.category)
            });
        })
}
</script>

<style scoped></style>