// ==================== 拖拽 / 旋转 / 双指缩放 ====================
let dragObjId = null;
let dragStartX = 0;
let dragStartY = 0;
let initialObjX = 0;
let initialObjY = 0;

let initialRotateVal = 0;

let pinchInitialDist = 0;
let pinchInitialScale = 1;

// 角度吸附（接近 0/90/180/270/360 时自动对齐）
function snapAngle(angle) {
  let normalized = ((angle % 360) + 360) % 360;
  const snapPoints = [0, 90, 180, 270, 360];
  const threshold = 6;

  for (let p of snapPoints) {
    if (Math.abs(normalized - p) <= threshold) {
      return p % 360;
    }
  }
  return Math.round(normalized);
}

function setupInteraction() {
  const handleStart = (clientX, clientY, target) => {
    const objEl = target.closest('.canvas-obj');
    if (objEl) {
      const id = parseInt(objEl.dataset.id);
      selectObject(id);
      const obj = state.canvasObjects.find(o => o.id === id);
      if (obj) {
        dragObjId = id;
        dragStartX = clientX;
        dragStartY = clientY;
        initialObjX = obj.x;
        initialObjY = obj.y;
        initialRotateVal = obj.rotate;
      }
    } else if (target === designCanvas || target === canvasObjectsContainer) {
      if (state.isRotateMode && state.selectedId !== null) {
        dragObjId = state.selectedId;
        dragStartX = clientX;
        dragStartY = clientY;
        const obj = state.canvasObjects.find(o => o.id === state.selectedId);
        if (obj) initialRotateVal = obj.rotate;
      } else {
        selectObject(null);
      }
    }
  };

  const handleMove = (clientX, clientY) => {
    if (!dragObjId) return;
    const obj = state.canvasObjects.find(o => o.id === dragObjId);
    if (!obj) return;

    if (state.isRotateMode) {
      const deltaX = clientX - dragStartX;
      const rawAngle = initialRotateVal + deltaX * 0.8;
      obj.rotate = snapAngle(rawAngle);

      const objEl = canvasObjectsContainer.querySelector(`.canvas-obj[data-id="${dragObjId}"]`);
      if (objEl) {
        objEl.style.transform = `scale(${obj.scale}) rotate(${obj.rotate}deg)`;
      }
      if (rotateAngleTxt) {
        rotateAngleTxt.textContent = `Rotation Mode (${Math.round(obj.rotate)}°) ${obj.rotate % 90 === 0 ? '🎯 Snapped' : ''}`;
      }
    } else {
      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;

      obj.x = initialObjX + deltaX;
      obj.y = initialObjY + deltaY;

      const objEl = canvasObjectsContainer.querySelector(`.canvas-obj[data-id="${dragObjId}"]`);
      if (objEl) {
        objEl.style.left = `${obj.x}px`;
        objEl.style.top = `${obj.y}px`;
      }
    }
  };

  const handleEnd = () => {
    if (dragObjId) {
      saveHistory();
    }
    dragObjId = null;
    pinchInitialDist = 0;
  };

  // ----- 鼠标事件 -----
  designCanvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY, e.target);
  });

  window.addEventListener('mousemove', (e) => {
    if (dragObjId) {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    }
  });

  window.addEventListener('mouseup', handleEnd);

  // ----- 触摸事件 -----
  designCanvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      const objEl = e.target.closest('.canvas-obj');
      if (objEl) {
        handleStart(t.clientX, t.clientY, e.target);
      } else if (!state.isRotateMode && state.selectedId !== null) {
        dragStartX = t.clientX;
        dragStartY = t.clientY;
        const activeObj = state.canvasObjects.find(o => o.id === state.selectedId);
        if (activeObj) {
          initialObjX = activeObj.x;
          initialObjY = activeObj.y;
        }
      } else {
        handleStart(t.clientX, t.clientY, e.target);
      }
    } else if (e.touches.length === 2 && state.selectedId !== null) {
      const activeObj = state.canvasObjects.find(o => o.id === state.selectedId);
      if (activeObj) {
        dragObjId = state.selectedId;
        const t1 = e.touches[0];
        const t2 = e.touches[1];

        // 两指中点作为平移参考
        dragStartX = (t1.clientX + t2.clientX) / 2;
        dragStartY = (t1.clientY + t2.clientY) / 2;

        pinchInitialDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        pinchInitialScale = activeObj.scale;
        initialObjX = activeObj.x;
        initialObjY = activeObj.y;
      }
    }
  }, { passive: false });

  designCanvas.addEventListener('touchmove', (e) => {
    if (!dragObjId && state.selectedId === null) return;
    e.preventDefault();

    if (e.touches.length === 1 && dragObjId) {
      const t = e.touches[0];
      handleMove(t.clientX, t.clientY);
    } else if (e.touches.length === 2 && state.selectedId !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

      const obj = state.canvasObjects.find(o => o.id === state.selectedId);
      if (obj) {
        // 双指缩放
        if (pinchInitialDist > 0) {
          const scaleFactor = dist / pinchInitialDist;
          obj.scale = Math.min(Math.max(pinchInitialScale * scaleFactor, 0.3), 5.0);
        }

        // 双指同时平移
        const currentCenterX = (t1.clientX + t2.clientX) / 2;
        const currentCenterY = (t1.clientY + t2.clientY) / 2;
        const deltaX = currentCenterX - dragStartX;
        const deltaY = currentCenterY - dragStartY;

        obj.x = initialObjX + deltaX;
        obj.y = initialObjY + deltaY;

        const objEl = canvasObjectsContainer.querySelector(`.canvas-obj[data-id="${state.selectedId}"]`);
        if (objEl) {
          objEl.style.left = `${obj.x}px`;
          objEl.style.top = `${obj.y}px`;
          objEl.style.transform = `scale(${obj.scale}) rotate(${obj.rotate}deg)`;
        }
      }
    }
  }, { passive: false });

  designCanvas.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      pinchInitialDist = 0;
    }

    if (e.touches.length === 1 && state.selectedId !== null) {
      const t = e.touches[0];
      dragStartX = t.clientX;
      dragStartY = t.clientY;
      const activeObj = state.canvasObjects.find(o => o.id === state.selectedId);
      if (activeObj) {
        initialObjX = activeObj.x;
        initialObjY = activeObj.y;
      }
    }

    if (e.touches.length === 0) {
      if (!dragObjId && e.target === designCanvas && !state.isRotateMode) {
        selectObject(null);
      }
      handleEnd();
    }
  });
  designCanvas.addEventListener('touchcancel', handleEnd);
}