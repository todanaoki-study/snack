window.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".review__item");
  const container = document.querySelector(".review__list");

  if (window.innerWidth >= 768) {
    const containerRect = container.getBoundingClientRect();
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const placedItems = []; // 配置済みの要素の位置

    items.forEach((item) => {
      const itemWidth = item.offsetWidth;
      const itemHeight = item.offsetHeight;

      let placed = false;
      let attempts = 0;
      let left, top;

      while (!placed && attempts < 100) {
        left = Math.random() * (containerWidth - itemWidth);
        top = Math.random() * (containerHeight - itemHeight);

        const overlap = placedItems.some((pos) => {
          return !(
            (
              left + itemWidth < pos.left || // 右が左より左
              left > pos.left + itemWidth || // 左が右より右
              top + itemHeight < pos.top || // 下が上より上
              top > pos.top + itemHeight
            ) // 上が下より下
          );
        });

        if (!overlap) {
          placed = true;
          placedItems.push({ left, top });
        }

        attempts++;
      }

      // 見つかった位置を適用
      item.style.position = "absolute";
      item.style.left = `${left}px`;
      item.style.top = `${top}px`;
    });
  }
});

const slide = document.getElementById("slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const indicator = document.getElementById("indicator");
const lists = document.querySelectorAll(".list");
const totalSlides = lists.length;
let count = 0;
let autoPlayInterval;
function updateListBackground() {
  for (let i = 0; i < lists.length; i++) {
    lists[i].style.backgroundColor =
      i === count % totalSlides ? "#000" : "#fff";
  }
}
function nextClick() {
  slide.classList.remove(`slide${(count % totalSlides) + 1}`);
  count++;
  slide.classList.add(`slide${(count % totalSlides) + 1}`);
  updateListBackground();
}
function prevClick() {
  slide.classList.remove(`slide${(count % totalSlides) + 1}`);
  count--;
  if (count < 0) count = totalSlides - 1;
  slide.classList.add(`slide${(count % totalSlides) + 1}`);
  updateListBackground();
}
function startAutoPlay() {
  autoPlayInterval = setInterval(nextClick, 3000);
}
function resetAutoPlayInterval() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}
next.addEventListener("click", () => {
  nextClick();
  resetAutoPlayInterval();
});
prev.addEventListener("click", () => {
  prevClick();
  resetAutoPlayInterval();
});
indicator.addEventListener("click", (event) => {
  if (event.target.classList.contains("list")) {
    const index = Array.from(lists).indexOf(event.target);
    slide.classList.remove(`slide${(count % totalSlides) + 1}`);
    count = index;
    slide.classList.add(`slide${(count % totalSlides) + 1}`);
    updateListBackground();
    resetAutoPlayInterval();
  }
});
startAutoPlay();

const unit = 100;
const canvasList = [];
const colorList = [];
const info = {
  seconds: 0,
  t: 0,
};

// 初期化
const init = () => {
  const waveCanvas = document.getElementById("waveCanvas");
  if (!waveCanvas) return;

  canvasList.push(waveCanvas);
  colorList.push(["#97c1cb", "#97c1cb", "#97c1cb"]);

  canvasList.forEach((canvas) => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 200;
    canvas.contextCache = canvas.getContext("2d");
  });

  update();
};

// アニメーション更新
const update = () => {
  canvasList.forEach((canvas, i) => {
    draw(canvas, colorList[i]);
  });

  info.seconds += 0.014;
  info.t = info.seconds * Math.PI;

  setTimeout(update, 35);
};

// 波の描画
const draw = (canvas, colors) => {
  const context = canvas.contextCache;
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawWave(canvas, colors[0], 1, 3, 0);
  drawWave(canvas, colors[1], 0.8, 2, 250);
  drawWave(canvas, colors[2], 0.6, 1.6, 100);
};

// 波の単体描画
const drawWave = (canvas, color, alpha, zoom, delay) => {
  const context = canvas.contextCache;
  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.beginPath();

  drawSine(canvas, info.t / 0.5, zoom, delay);

  context.lineTo(canvas.width + 10, canvas.height);
  context.lineTo(0, canvas.height);
  context.closePath();
  context.fill();
};

// サイン波を描画
const drawSine = (canvas, t, zoom, delay) => {
  const context = canvas.contextCache;
  const xAxis = Math.floor(canvas.height / 2);
  const yAxis = 0;

  let x = t;
  let y = Math.sin(x) / zoom;

  context.moveTo(yAxis, unit * y + xAxis);

  for (let i = yAxis; i <= canvas.width + 10; i += 10) {
    x = t + (-yAxis + i) / unit / zoom;
    y = Math.sin(x - delay) / 3;
    context.lineTo(i, unit * y + xAxis);
  }
};

init();

window.addEventListener("DOMContentLoaded", () => {
  const doodles = document.querySelectorAll(".doodle");
  const container = document.querySelector(".bg-doodles");
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  doodles.forEach((doodle) => {
    const x = Math.random() * (width - 60);
    const y = Math.random() * (height - 60);
    const rotation = (Math.random() - 0.5) * 30;

    doodle.style.left = `${x}px`;
    doodle.style.top = `${y}px`;
    doodle.style.transform = `rotate(${rotation}deg)`;
  });
});
