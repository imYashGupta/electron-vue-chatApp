<template>
    <figure class="avatar" :class="size">
        <img
            v-if="user.displayPicture!=null"
            @error="user.displayPicture=null"
            :src="user.displayPicture"
            class="rounded-circle"
            alt="image"
        />
        <span
            v-else
            class="avatar-title bg-success rounded-circle"
            :class="user.meta.color[0]"
        >{{ user.name[0] }}</span>
    </figure>
</template>

<script>
export default {
    props: ["user","size"],
};
</script>

<style>
</style>