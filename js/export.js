// 导出网格时，行列数根据当前画布比例动态计算
document.getElementById('btnExportTextGrid').addEventListener('click', () => {
  const [w, h] = state.aspectRatio.split('/').map(Number);
  
  // 基准网格：按 9:16 划分为 9x16，其他比例按比例换算
  const gridWidth = w * 1; 
  const gridHeight = h * 1; 
  
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