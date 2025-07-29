//ヘッダーボタン
const headerBtn = document.querySelector(".header__hamburger");
const headerLine = document.querySelectorAll(".hamburger__line");

//メニューの表示
const menu = document.querySelector(".slider");

//スライダー
const slider = document.querySelector(".slider");
let btnState = 0;//0は閉じている。1は開いている。
headerBtn.addEventListener("click", () => {

    buttonStyleChange(btnState);
})

//クリック時のボタン装飾の変化
const buttonStyleChange = (state) => {
    headerLine[0].classList.toggle("firstLineOpen");
    headerLine[1].classList.toggle("secondLineOpen");
    headerLine[2].classList.toggle("thirdLineOpen");
    openMenu(state);
}

//メニューの出現
const openMenu = (state) => {
    console.log("通過");
    if (state == 0) {
        gsap.to(".slider", {
            y: 0,
            duration: 1,
            autoAlpha: 1,
            ease: "power1.out",
        })
        btnState = 1;
    }
    else if (state == 1) {
        gsap.to(".slider", {
            y: "-100%",
            duration: 1,
            autoAlpha: 0,
            ease: "power1.out",
        })
        btnState = 0;
    }
}

//************map処理
//map移動に必要な変数
const mapWrap = document.querySelector(".map__slider");
const bg = document.querySelector(".map__img");
const map = document.querySelector(".map__inner");
let stopPos;

window.addEventListener("scroll", (e) => {
    transform(mapWrap);
});
//transform関数を定義
const transform = ((target) => {
    const targetTop = target.offsetTop;
    const parent = target.parentElement.offsetTop;
    const posY = (parent - targetTop) * -0.1;
    //マップ背景が中心に来たらスライド開始
    console.log(posY);
    if (posY > 0 && posY < stopPos) {
        bg.style.transform = `translateX(${posY * -1}%) scale(1)`;
        gsap.to(".map__speech", {
            autoAlpha: 0,
        })
    }

    if (posY >= stopPos) {
        console.log("透過解除");
        gsap.to(".map__speech", {
            autoAlpha: 1,
        })
    }

})

//************リサイズ完了を知らせる処理
let resizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    timer = setTimeout(resizeComp, 300);
})

//画面幅ごとにスクロール量調整
function resizeComp() {
    if (window.innerWidth < 800) {
        stopPos = 112;
    }
    else if (window.innerWidth >= 800) {
        stopPos = 163;
    }
}
//起動時一度初期化
resizeComp();