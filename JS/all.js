//ヘッダーボタン
const headerBtn = document.querySelector(".header__hamburger");
const headerLine = document.querySelectorAll(".hamburger__line");

//スライダー
const slider = document.querySelector(".slider");
let btnState = 0;//0は閉じている。1は開いている。
headerBtn.addEventListener("click", () => {
    console.log("通過");

    btnState += 1;
    buttonStyleChange();
})

//クリック時のボタン装飾の変化
const buttonStyleChange = (state) => {
    headerLine[0].classList.toggle("firstLineOpen")
    headerLine[1].classList.toggle("secondLineOpen")
    headerLine[2].classList.toggle("thirdLineOpen")
}