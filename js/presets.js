// ==================== 预设场景加载 ====================
function loadPreset(type) {
  saveHistory();
  state.canvasObjects = [];
  selectObject(null);

  const presetData = PRESET_TEMPLATES[type] || [];
  presetData.forEach((item, idx) => {
    state.canvasObjects.push({
      id: state.nextId++,
      rotate: 0,
      ...item,
      zIndex: idx + 1
    });
  });

  renderCanvas();
}
window.loadPreset = loadPreset;