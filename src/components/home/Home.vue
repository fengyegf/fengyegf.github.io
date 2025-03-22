<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <div class="title">
            <p>hello</p>
            <p>,</p>
            <p class="highlight">MLeaf-coder</p>
          </div>
          <div class="subtitle">
            <p>一个记录生活和日志的地方,想要了解一下吗？</p>
          </div>
          <button class="cta-button" @click="navigateToBlog">点击了解</button>
        </div>
        <div class="hero-image">
          <img src="@/assets/img/Background.png" alt="Background" />
        </div>
      </div>
    </div>
    <div class="blog-section">
      <p class="blog-subtitle">闲来无事要看看什么吗？</p>
    </div>
    <div class="divider">Card</div>
    <div>
      <Card />
    </div>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToBlog = () => {
  router.push("/blogs");
};
</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  display: flex;
}
.blog-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-top: 50px;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider::before {
  margin-right: 0.5em;
}

.divider::after {
  margin-left: 0.5em;
}
.blog-section p {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}
.title p {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}
.hero-section {
  height: 100%;
  width: 80%;
  padding: 10px;
}
.hero-image {
  width: auto;
  height: 800px;
  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
}
.title p {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
}
.title .highlight {
  color: var(--primary-color);
}
.subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}
.cta-button {
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 8px;
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.cta-button:hover {
  background-color: var(--primary-color);
  color: white;
}
</style>
