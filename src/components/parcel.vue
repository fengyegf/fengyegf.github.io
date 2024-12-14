<template>
    <div class="avatar">
        <div class="card">
            <div class="avatar-image">
                <img src="@/assets/img/tx.jpg" alt="Avatar">
            </div>
            <div class="user-info">
                <div class="user-name">
                    <h1>{{ config.author }}</h1>
                    <hr class="thick-hr">
                </div>
                <div class="user-introduction">
                    <p>{{ config.introduce }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import config from '@/config/Config';
</script>
<style>
.card {
    width: 290px;
    background-color: var(--background-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 4px rgba(194, 194, 194, 0.497);
    padding: 10px;
    border-radius: 20px;
}

.avatar-image img {
    margin: 15px;
    width: 260px;
    height: 260px;
    border-radius: 20px;
}

.user-introduction {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>