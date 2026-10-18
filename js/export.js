// ==================== 导出 PNG ====================
document.getElementById('btnExportPNG').addEventListener('click', () => {
  const curSelected = state.selectedId;
  selectObject(null);
  showToast('Exporting PNG...');

  setTimeout(() => {
    html2canvas(designCanvas, { backgroundColor: null, scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = `emoji-town-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      selectObject(curSelected);
    });
  }, 150);
});

// ==================== 导出文本 Emoji 网格 ====================
document.getElementById('btnExportTextGrid').addEventListener('click', () => {
  const gridWidth = 9, gridHeight = 16;
  const cellW = designCanvas.clientWidth / gridWidth;
  const cellH = designCanvas.clientHeight / gridHeight;
  const grid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill('🌿'));

  [...state.canvasObjects].sort((a, b) => a.zIndex - b.zIndex).forEach(obj => {
    const col = Math.floor((obj.x + 16) / cellW);
    const row = Math.floor((obj.y + 16) / cellH);
    if (row >= 0 && row < gridHeight && col >= 0 && col < gridWidth) {
      grid[row][col] = obj.emoji;
    }
  });

  document.getElementById('textExportContent').textContent = grid.map(r => r.join(' ')).join('\n');
  document.getElementById('exportTextModal').classList.remove('hidden');
});

function closeTextExportModal() {
  document.getElementById('exportTextModal').classList.add('hidden');
}
window.closeTextExportModal = closeTextExportModal;

document.getElementById('btnCopyTextGrid').addEventListener('click', () => {
  const text = document.getElementById('textExportContent').textContent;
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  showToast('Text grid copied!');
});