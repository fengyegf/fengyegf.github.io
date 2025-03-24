<template>
  <div class="layer">
    <div class="inner">
      <div class="logo-container">
        <RouterLink to="/" class="logo-link">
          <img class="avatar" src="@/assets/img/Head.jpg" alt="avatar" />
        </RouterLink>
      </div>

      <!-- 汉堡菜单按钮 (小屏幕才显示) -->
      <button class="menu-toggle" @click="toggleMenu" aria-label="打开菜单">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- 导航菜单 -->
      <nav class="nav-container" :class="{ active: menuOpen }">
        <RouterLink to="/blogs" class="nav-link" @click="closeMenu">
          博客
        </RouterLink>
        <RouterLink to="/favorites" class="nav-link" @click="closeMenu">
          收藏
        </RouterLink>
        <RouterLink to="/timeline" class="nav-link" @click="closeMenu">
          时间线
        </RouterLink>
        <RouterLink to="/about" class="nav-link" @click="closeMenu">
          关于我
        </RouterLink>
        <RouterLink to="/friends" class="nav-link" @click="closeMenu">
          友链
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 控制菜单开关状态
const menuOpen = ref(false);

// 切换菜单状态
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    document.body.style.overflow = "hidden"; // 防止菜单打开时背景滚动
  } else {
    document.body.style.overflow = ""; // 恢复滚动
  }
};

// 关闭菜单
const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<style scoped>
.layer {
  width: 100%;
  max-width: 1500px;
  padding: 0.75rem 2rem;
  background-color: var(--base-100);
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  z-index: 100;
  position: relative;
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.logo-container {
  flex-shrink: 0;
  z-index: 102;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.nav-container {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--base-content);
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: var(--primary-color);
}

/* 在活动链接下添加下划线效果 */
.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

/* 汉堡菜单按钮 */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 102;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--base-content);
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* 在中等屏幕上的样式调整 */
@media (max-width: 1536px) {
  .layer {
    width: 95%;
    border-radius: 25px;
  }
}

/* 在平板上的样式调整 */
@media (max-width: 992px) {
  .layer {
    padding: 0.75rem 1.5rem;
  }

  .nav-container {
    gap: 1.5rem;
  }
}

/* 在小屏幕上的汉堡菜单样式 */
@media (max-width: 768px) {
  .layer {
    border-radius: 20px;
    padding: 0.75rem 1rem;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-container {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 300px;
    height: 100vh;
    background-color: var(--base-100);
    flex-direction: column;
    padding: 80px 2rem 2rem;
    gap: 1.5rem;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 101;
  }

  .nav-container.active {
    right: 0;
  }

  .nav-link {
    font-size: 1.2rem;
    width: 100%;
    text-align: left;
    padding: 0.75rem 0;
  }

  /* 汉堡菜单动画 */
  .menu-toggle:hover span {
    background-color: var(--primary-color);
  }

  .active .menu-toggle span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  .active .menu-toggle span:nth-child(2) {
    opacity: 0;
  }

  .active .menu-toggle span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}

/* 在超小屏幕上的额外调整 */
@media (max-width: 480px) {
  .avatar {
    width: 40px;
    height: 40px;
  }

  .layer {
    padding: 0.5rem 1rem;
  }

  .nav-container {
    width: 85%;
    padding: 70px 1.5rem 1.5rem;
  }
}
</style>
