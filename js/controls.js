// ==================== 旋转模式切换 ====================
btnToggleRotateMode.addEventListener('click', () => {
  if (state.selectedId !== null) {
    state.isRotateMode = !state.isRotateMode;
    updateVisuals();
    showToast(state.isRotateMode ? 'Rotate mode ON' : 'Move mode ON');
  }
});

// ==================== 一键摆正（0°） ====================
document.getElementById('btnSnapStraight').addEventListener('click', () => {
  const obj = state.canvasObjects.find(o => o.id === state.selectedId);
  if (obj) {
    saveHistory();
    obj.rotate = 0;
    updateVisuals();
    showToast('Aligned to 0°');
  }
});

// ==================== 复制选中对象 ====================
document.getElementById('btnDuplicateObj').addEventListener('click', () => {
  const srcObj = state.canvasObjects.find(o => o.id === state.selectedId);
  if (srcObj) {
    saveHistory();
    const copyObj = {
      id: state.nextId++,
      emoji: srcObj.emoji,
      x: srcObj.x + 20,
      y: srcObj.y + 20,
      scale: srcObj.scale,
      rotate: srcObj.rotate,
      zIndex: state.canvasObjects.length + 1
    };
    state.canvasObjects.push(copyObj);
    selectObject(copyObj.id);
    renderCanvas();
    showToast('Copied');
  }
});

// ==================== 图层上移 ====================
document.getElementById('btnLayerUp').addEventListener('click', () => {
  const obj = state.canvasObjects.find(o => o.id === state.selectedId);
  if (obj) {
    saveHistory();
    obj.zIndex += 1;
    updateVisuals();
    showToast('Layer Up');
  }
});

// ==================== 图层下移 ====================
document.getElementById('btnLayerDown').addEventListener('click', () => {
  const obj = state.canvasObjects.find(o => o.id === state.selectedId);
  if (obj) {
    saveHistory();
    obj.zIndex = Math.max(1, obj.zIndex - 1);
    updateVisuals();
    showToast('Layer Down');
  }
});

// ==================== 删除选中对象 ====================
document.getElementById('btnDeleteObj').addEventListener('click', () => {
  if (state.selectedId !== null) {
    saveHistory();
    state.canvasObjects = state.canvasObjects.filter(o => o.id !== state.selectedId);
    selectObject(null);
    renderCanvas();
    showToast('Deleted');
  }
});

// ==================== 撤回 & 重做 ====================
document.getElementById('btnUndoObj').addEventListener('click', () => {
  undoLastAction();
});

document.getElementById('btnRedoObj').addEventListener('click', () => {
  redoLastAction();
});

// ==================== 底部面板折叠 ====================
btnToggleMenu.addEventListener('click', () => {
  state.isMenuCollapsed = !state.isMenuCollapsed;
  if (state.isMenuCollapsed) {
    emojiMenuPanel.classList.add('translate-y-[120%]', 'opacity-0');
    toggleMenuIcon.className = 'fa-solid fa-chevron-up text-brand-400';
    toggleMenuText.textContent = I18N[currentLang].openPalette;
  } else {
    emojiMenuPanel.classList.remove('translate-y-[120%]', 'opacity-0');
    toggleMenuIcon.className = 'fa-solid fa-chevron-down text-brand-400';
    toggleMenuText.textContent = I18N[currentLang].collapse;
  }
});

// ==================== 清空画布 ====================
document.getElementById('btnClear').addEventListener('click', () => {
  if (state.canvasObjects.length === 0) return;
  saveHistory();
  state.canvasObjects = [];
  selectObject(null);
  renderCanvas();
  showToast('Canvas Cleared');
});