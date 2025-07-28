//リサイズ完了を知らせる処理
let indexResizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(indexResizeTimer);
    timer = setTimeout(indexResizeComp, 300);
})

//todo　検証予定
//それぞれドーナツの出現方式を記録。
let opUp;
let opDown;
let opLeft;
let width;
function indexResizeComp() {
    //以下に処理を分けて書く
    if (window.innerWidth <= 1200) {
        console.log("フルサイズ");

    }
    else if (window.innerWidth < 1200) {
        console.log("デスクトップ");

    }
    else if (window.innerWidth < 800) {
        console.log("タブレット");

    }
    else if (window.innerWidth < 429) {
        console.log("スマホ");

    }
    console.log();
}
//todo　検証予定
//サイト開始時いったん処理
indexResizeComp();

//オープニングアニメーションに関して
// const shutterSE = new Audio("../../sound/shutter.mp3");
const openingAnimation = gsap.timeline({});
openingAnimation.to(".firstView__shutter", {
    y: "-100%",
    ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.42,0.298 0.578,0.446 0.77,0.626 0.818,1.001 1,1 "),
    duration: 1,
}).to(".firstView__logo", {
    width: width,
})

//ループアニメーションに関して
// gsap.to(".decoImgs__donut", {
//     zoom: 1.05,
//     duration: 1,
//     repeat: -1,
//     repeatDelay: 0.5,
//     ease: "power3.out",
//     yoyo: true,
// })


//firstViewのjs

//instagramセクションのjs
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