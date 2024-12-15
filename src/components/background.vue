<!-- 背景 -->
<template>
    <div class="background">
        <img src="@/assets/img/background/1.png" alt="background">
        <!-- 下方为背景灰色蒙版 -->
        <div class="overlay"></div>
    </div>
</template>


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
    transform: scaleX(-1);
}


.overlay {
    position: absolute;
    top: 0;
    z-index: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.5s ease, transform 0.5s ease;
}

.overlay.night-mode {
    background-color: rgba(0, 0, 0, 0.4);
    ;
    transform: scale(1.1);
    animation: expand 0.5s ease-out;
}

@keyframes expand {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.1);
    }
}
</style>