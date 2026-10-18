function loadPreset(type) {
  saveHistory();
  state.canvasObjects = [];
  selectObject(null);

  const presetData = PRESET_TEMPLATES[type] || [];
  
  // 获取当前画布真实的宽高
  const canvasW = designCanvas.clientWidth || 337;
  const canvasH = designCanvas.clientHeight || 600;

  presetData.forEach((item, idx) => {
    // 根据当前画布大小进行缩放适配 (假设预设是基于 337x600 设计的)
    const scaleX = canvasW / 337;
    const scaleY = canvasH / 600;
    
    state.canvasObjects.push({
      id: state.nextId++,
      rotate: 0,
      ...item,
      x: item.x * scaleX,
      y: item.y * scaleY,
      zIndex: idx + 1
    });
  });

  renderCanvas();
}
window.loadPreset = loadPreset;