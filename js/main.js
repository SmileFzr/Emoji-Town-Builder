function initApp() {
  renderCategoryTabs();
  renderEmojiGrid();
  
  // 初始化时触发一次尺寸计算
  setTimeout(() => {
    changeAspectRatio(state.aspectRatio);
  }, 50);
  
  loadPreset('town');
  setupInteraction();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}