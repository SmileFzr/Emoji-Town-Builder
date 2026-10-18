// ==================== Toast 提示 ====================
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
  }, 2000);
}

// ==================== 语言切换 ====================
function switchLanguage(lang) {
  currentLang = lang;
  const info = LANGUAGES[lang];
  document.getElementById('langFlag').textContent = info.flag;
  document.getElementById('langCode').textContent = info.code;

  const t = I18N[lang];

  // 顶部栏
  document.getElementById('appTitle').textContent = t.title;
  document.getElementById('lblCustomSize').textContent = t.customSize;
  document.getElementById('lblExport').textContent = t.export;
  document.getElementById('lblExportPNG').textContent = t.exportPNG;
  document.getElementById('lblExportText').textContent = t.exportText;
  document.getElementById('hintText').textContent = t.canvasReady;

  // 悬浮按钮
  document.getElementById('lblRotate').textContent = t.rotate;
  document.getElementById('lblAlign').textContent = t.align;
  document.getElementById('lblLayerUp').textContent = t.layerUp;
  document.getElementById('lblLayerDown').textContent = t.layerDown;
  document.getElementById('lblDuplicate').textContent = t.duplicate;
  document.getElementById('lblDelete').textContent = t.delete;
  document.getElementById('lblUndo').textContent = t.undo;
  document.getElementById('lblRedo').textContent = t.redo;

  // 底部面板
  document.getElementById('btnToggleMenu').querySelector('span').textContent =
    state.isMenuCollapsed ? t.openPalette : t.collapse;

  // 自定义尺寸弹窗
  document.getElementById('customSizeTitle').textContent = t.customSize;
  document.getElementById('labelW').textContent = t.customW;
  document.getElementById('labelH').textContent = t.customH;
  document.getElementById('btnCancelSize').textContent = t.cancel;
  document.getElementById('btnConfirmSize').textContent = t.confirm;

  // 重绘分类 Tabs（翻译名字）
  renderCategoryTabs();

  showToast(`${info.flag} ${info.name}`);
}
window.switchLanguage = switchLanguage;

// ==================== 自定义尺寸 ====================
function openCustomSizeModal() {
  document.getElementById('inputCustomW').value = designCanvas.clientWidth;
  document.getElementById('inputCustomH').value = designCanvas.clientHeight;
  document.getElementById('customSizeModal').classList.remove('hidden');
}
window.openCustomSizeModal = openCustomSizeModal;

function closeCustomSizeModal() {
  document.getElementById('customSizeModal').classList.add('hidden');
}
window.closeCustomSizeModal = closeCustomSizeModal;

function applyCustomSize() {
  const w = parseInt(document.getElementById('inputCustomW').value);
  const h = parseInt(document.getElementById('inputCustomH').value);
  
  if (!w || !h || w < 100 || h < 100 || w > 2000 || h > 2000) {
    showToast('请输入 100 - 2000 之间的有效尺寸');
    return;
  }

  const oldW = designCanvas.clientWidth;
  const oldH = designCanvas.clientHeight;

  designCanvas.style.width = `${w}px`;
  designCanvas.style.height = `${h}px`;

  // 重映射坐标
  if (oldW > 0 && oldH > 0) {
    const scaleX = w / oldW;
    const scaleY = h / oldH;
    state.canvasObjects.forEach(obj => {
      obj.x = obj.x * scaleX;
      obj.y = obj.y * scaleY;
    });
  }

  state.aspectRatio = 'custom';
  document.getElementById('lblAspectRatio').textContent = `${w}×${h}`;

  closeCustomSizeModal();
  renderCanvas();
  showToast(`尺寸已设为 ${w}×${h}`);
}
window.applyCustomSize = applyCustomSize;