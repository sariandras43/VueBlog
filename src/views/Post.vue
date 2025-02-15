<template>

</template>

<script setup lang="ts">
import { Post } from "@/types/post";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
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