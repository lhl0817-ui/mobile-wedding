const galleryImages =
document.querySelectorAll(".gallery-grid img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const closeBtn =
document.getElementById("close-btn");

const prevBtn =
document.getElementById("prev-btn");

const nextBtn =
document.getElementById("next-btn");

const counter =
document.getElementById("photo-counter");

let currentIndex = 0;

function showImage(index){

    lightboxImg.src =
    galleryImages[index].src;

    counter.textContent =
    `${index + 1} / ${galleryImages.length}`;
}

galleryImages.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentIndex = index;

        showImage(currentIndex);

        lightbox.style.display = "flex";

    });

});

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= galleryImages.length){

        currentIndex = 0;

    }

    showImage(currentIndex);

});

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
        galleryImages.length - 1;

    }

    showImage(currentIndex);

});

closeBtn.addEventListener("click",()=>{

    lightbox.style.display = "none";

});
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {

    touchStartX =
    e.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend", (e) => {

    touchEndX =
    e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe(){

    const swipeDistance =
    touchEndX - touchStartX;

    if(swipeDistance > 50){

        currentIndex--;

        if(currentIndex < 0){

            currentIndex =
            galleryImages.length - 1;

        }

        showImage(currentIndex);

    }

    if(swipeDistance < -50){

        currentIndex++;

        if(currentIndex >= galleryImages.length){

            currentIndex = 0;

        }

        showImage(currentIndex);

    }

}
function copyAccount(id){

    const text =
    document.getElementById(id).textContent;

    navigator.clipboard.writeText(text);

    alert("계좌번호가 복사되었습니다.");
}
const accordionBtns =
document.querySelectorAll(".accordion-btn");

accordionBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const content =
        btn.nextElementSibling;

        content.classList.toggle("active");

        if(content.classList.contains("active")){

            btn.textContent =
            btn.textContent.replace("▼","▲");

        }else{

            btn.textContent =
            btn.textContent.replace("▲","▼");

        }

    });

});
const weddingDate =
new Date("2026-10-10T12:00:00");

function updateCountdown(){

    const now = new Date();

    const diff =
    weddingDate - now;

    const days =
    Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
    Math.floor(
        (diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
        (diff % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds =
    Math.floor(
        (diff % (1000 * 60))
        / 1000
    );

   document.getElementById("days")
.textContent = days;

document.getElementById("hours")
.textContent =
String(hours).padStart(2,"0");

document.getElementById("minutes")
.textContent =
String(minutes).padStart(2,"0");

document.getElementById("seconds")
.textContent =
String(seconds).padStart(2,"0");
}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);
const bgm =
document.getElementById("bgm");

const musicBtn =
document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {

    if(!isPlaying){

        bgm.play();

        musicBtn.textContent =
        "🔇 음악 끄기";

        isPlaying = true;

    }else{

        bgm.pause();

        musicBtn.textContent =
        "🎵 음악 켜기";

        isPlaying = false;
    }

});
const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

fadeElements.forEach((el) => {
    observer.observe(el);
});
const galleryImgs = document.querySelectorAll(".gallery-grid img");

const galleryObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const index =
                Array.from(galleryImgs).indexOf(entry.target);

            setTimeout(() => {

                entry.target.classList.add("show");

            }, index * 70);

            galleryObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.2
});

galleryImgs.forEach((img) => {
    galleryObserver.observe(img);
});
const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {

    const shareData = {
        title: "이호령 ♥ 편영미 결혼합니다",
        text: "2026년 10월 10일 토요일 12시\n로터스101",
        url: "https://lhl0817-ui.github.io/mobile-wedding/"
    };

    try {

        if (navigator.share) {

            await navigator.share(shareData);

        } else {

            throw new Error();

        }

    } catch {

        await navigator.clipboard.writeText(
            shareData.url
        );

        alert("청첩장 링크가 복사되었습니다.\n카카오톡 대화창에 붙여넣어 공유해주세요.");
    }

});
window.addEventListener("DOMContentLoaded", () => {

    const topBtn = document.getElementById("topBtn");

    if (!topBtn) return;

    topBtn.addEventListener("click", () => {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

    });

});