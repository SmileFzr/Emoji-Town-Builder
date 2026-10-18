// ==================== 应用启动入口 ====================
function initApp() {
  renderCategoryTabs();
  renderEmojiGrid();
  loadPreset('town');
  setupInteraction();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}