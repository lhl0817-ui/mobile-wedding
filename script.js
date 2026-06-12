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