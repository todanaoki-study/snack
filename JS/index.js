//記述ルールはdiscordにて確認。

const item = document.querySelectorAll(".instagram__container img");

item.forEach((target, index) => {
    target.addEventListener("mouseover", () => {
        watermark(target);
    })

    target.addEventListener("mouseout", () => {
        unWatermark(target);
    })
})

const watermark = (item) => {
    gsap.to(item, {
        autoAlpha: 0,
    })
}

const unWatermark = (item) => {
    gsap.to(item, {
        autoAlpha: 1,
    })
}