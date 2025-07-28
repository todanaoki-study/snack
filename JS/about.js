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
