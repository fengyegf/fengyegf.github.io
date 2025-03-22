<template>
  <div class="layer">
    <div class="Inner">
      <div class="logo-container">
        <RouterLink to="/" class="logo-link">
          <img class="avatar" src="@/assets/img/Head.jpg" alt="avatar" />
        </RouterLink>
      </div>

      <nav class="nav-container">
        <RouterLink to="/blogs" class="nav-link"> 博客 </RouterLink>
        <RouterLink to="/favorites" class="nav-link"> 收藏 </RouterLink>
        <RouterLink to="/timeline" class="nav-link"> 时间线 </RouterLink>
        <RouterLink to="/about" class="nav-link"> 关于我 </RouterLink>
        <RouterLink to="/friends" class="nav-link"> 友链 </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.layer {
  width: 1500px;
  padding: 0.75rem 2rem;
  background-color: var(--base-100);
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.Inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.logo-container {
  flex-shrink: 0;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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
}

.nav-link:hover {
  color: var(--primary-color);
}
</style>
