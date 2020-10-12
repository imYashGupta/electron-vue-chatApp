<template>
    <div>
        <div class="spinner-grow" role="status" :class="classes">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    props:["classes"]
};
</script>

<style>
</style>