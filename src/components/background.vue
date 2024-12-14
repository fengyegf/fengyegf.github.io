<template>
    <div class="background">
        <!-- <img :src="backgroundImg" alt="background"> -->
        <img src="@/assets/img/background/1.png" alt="background">
    </div>
</template>

<script setup>
// const backgroundImg = "https://bing.img.run/uhd.php";
</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.background img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>