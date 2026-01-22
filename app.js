const imageInput = document.getElementById("imageInput");
const rowsInput = document.getElementById("rowsInput");
const colsInput = document.getElementById("colsInput");
const thicknessInput = document.getElementById("thicknessInput");
const colorInput = document.getElementById("colorInput");
const opacityInput = document.getElementById("opacityInput");
const numbersToggle = document.getElementById("numbersToggle");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");
const fileMeta = document.getElementById("fileMeta");
const sizeMeta = document.getElementById("sizeMeta");
const emptyState = document.getElementById("emptyState");
const dropZone = document.querySelector(".canvas-shell");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

let currentImage = null;
let currentName = "image";

function clampNumber(value, min, max) {
  const safe = Number.isFinite(value) ? value : min;
  if (typeof max === "number") {
    return Math.min(Math.max(safe, min), max);
  }
  return Math.max(safe, min);
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return { r, g, b };
}

function getSettings() {
  const rows = clampNumber(parseInt(rowsInput.value, 10), 1, 200);
  const cols = clampNumber(parseInt(colsInput.value, 10), 1, 200);
  const thickness = clampNumber(parseInt(thicknessInput.value, 10), 1, 100);
  const opacity = clampNumber(parseFloat(opacityInput.value), 0.1, 1);
  rowsInput.value = rows;
  colsInput.value = cols;
  thicknessInput.value = thickness;
  opacityInput.value = opacity.toFixed(2);

  return {
    rows,
    cols,
    thickness,
    color: colorInput.value,
    opacity,
    showNumbers: numbersToggle.checked,
  };
}

function drawGrid() {
  if (!currentImage) {
    return;
  }

  const { rows, cols, thickness, color, opacity, showNumbers } = getSettings();
  const width = currentImage.naturalWidth;
  const height = currentImage.naturalHeight;

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(currentImage, 0, 0, width, height);

  const { r, g, b } = hexToRgb(color);
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  ctx.lineWidth = thickness;

  ctx.beginPath();

  for (let i = 1; i < cols; i += 1) {
    const x = (width / cols) * i;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  for (let i = 1; i < rows; i += 1) {
    const y = (height / rows) * i;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();

  if (showNumbers) {
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    const fontSize = Math.round(
      clampNumber(Math.min(cellWidth, cellHeight) * 0.22, 10, 72)
    );
    const textAlpha = Math.min(1, opacity + 0.25);
    ctx.save();
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${textAlpha})`;
    ctx.font = `${fontSize}px "Space Grotesk", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = Math.max(2, Math.round(fontSize * 0.08));

    let counter = 1;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = (col + 0.5) * cellWidth;
        const y = (row + 0.5) * cellHeight;
        ctx.fillText(counter.toString(), x, y);
        counter += 1;
      }
    }

    ctx.restore();
  }

  sizeMeta.textContent = `${width} x ${height}px`;
}

function handleImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      currentImage = img;
      currentName = file.name.replace(/\.[^/.]+$/, "") || "image";
      fileMeta.textContent = file.name;
      emptyState.style.display = "none";
      downloadBtn.disabled = false;
      drawGrid();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function handleDownload() {
  if (!currentImage) {
    return;
  }
  const link = document.createElement("a");
  link.download = `${currentName}-grid.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function resetSettings() {
  rowsInput.value = 3;
  colsInput.value = 3;
  thicknessInput.value = 2;
  colorInput.value = "#ffffff";
  opacityInput.value = 0.7;
  numbersToggle.checked = false;
  if (currentImage) {
    drawGrid();
  }
}

imageInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  handleImage(file);
});

[rowsInput, colsInput, thicknessInput, colorInput, opacityInput, numbersToggle].forEach(
  (input) => {
    input.addEventListener("input", drawGrid);
  }
);

resetBtn.addEventListener("click", resetSettings);

downloadBtn.addEventListener("click", handleDownload);

let dragDepth = 0;

function setDragging(isDragging) {
  if (isDragging) {
    dropZone.classList.add("is-dragging");
  } else {
    dropZone.classList.remove("is-dragging");
  }
}

document.addEventListener("dragover", (event) => {
  event.preventDefault();
});

document.addEventListener("drop", (event) => {
  event.preventDefault();
});

dropZone.addEventListener("dragenter", (event) => {
  event.preventDefault();
  dragDepth += 1;
  setDragging(true);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropZone.addEventListener("dragleave", (event) => {
  event.preventDefault();
  dragDepth = Math.max(0, dragDepth - 1);
  if (dragDepth === 0) {
    setDragging(false);
  }
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dragDepth = 0;
  setDragging(false);
  const [file] = event.dataTransfer.files;
  handleImage(file);
});
