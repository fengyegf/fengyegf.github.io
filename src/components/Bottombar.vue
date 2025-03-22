<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">Copyright © - All right reserved by MLeaf-coder</p>
      <div class="beian-container">
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=51018002000145"
          class="beian-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
            alt="备案图标"
            class="beian-icon"
          />
          川公网安备51018002000145
        </a>
        <a
          href="https://beian.miit.gov.cn/"
          class="beian-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          蜀ICP备2023029817号-1
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--base-content);
  padding: 1rem;
  margin-top: 1.25rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
}

.copyright {
  text-align: center;
}

.beian-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.beian-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.beian-link:hover {
  color: var(--primary-color);
}

.beian-icon {
  height: 1rem;
  margin-right: 0.25rem;
}
</style>
