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
const openingAnimation = gsap.timeline({});
openingAnimation.to(".firstView__shutter", {
    y: "-100%",
    ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.42,0.298 0.578,0.446 0.77,0.626 0.818,1.001 1,1 "),
    duration: 1,
})
    .fromTo(".firstView__logo", {
        autoAlpha: 0,
        scale: 0,
    },
        {
            autoAlpha: 1,
            scale: 1,
            ease: "elastic.out(1,0.5)",
        })
    .fromTo(".decoImgs", {
        autoAlpha: 0,
        scale: 0,
    },
        {
            autoAlpha: 1,
            scale: 1,
            ease: "elastic.out(1,0.5)",
            onComplete: () => {
                var duration = 3 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                var interval = setInterval(function () {
                    var timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    var particleCount = 50 * (timeLeft / duration);
                    // since particles fall down, start a bit higher than random
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }, 250);
            }
        }, "<+.2")
    .fromTo(".shelf", {
        autoAlpha: 0,
        scale: 0,
    }, {
        autoAlpha: 1,
        scale: 1,
        ease: "elastic.out(1,0.5)",
    }, "<+.3")
    .to(".header", {
        y: 0,
    }, "<+")

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

// //紙吹雪
// var duration = 3 * 1000;
// var animationEnd = Date.now() + duration;
// var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

// function randomInRange(min, max) {
//     return Math.random() * (max - min) + min;
// }

// var interval = setInterval(function () {
//     var timeLeft = animationEnd - Date.now();

//     if (timeLeft <= 0) {
//         return clearInterval(interval);
//     }

//     var particleCount = 50 * (timeLeft / duration);
//     // since particles fall down, start a bit higher than random
//     confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
//     confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
// }, 250);