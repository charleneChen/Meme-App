import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", function (e) {
    const radios = document.getElementsByClassName("radio");

    for (let radio of radios) {
        radio.classList.remove("highlight");
    }

    document
        .getElementById(e.target.id)
        .parentElement.classList.add("highlight");
});

getImageBtn.addEventListener("click", renderCat);

memeModalCloseBtn.addEventListener("click", closeModal);

function closeModal() {
    memeModal.style.display = "none";
}

function getMatchingCatsArray() {
    const isGif = gifsOnlyOption.checked;

    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector(
            'input[type="radio"]:checked'
        ).value;
        const matchingCatsArray = catsData.filter(function (cat) {
            if (isGif) {
                return cat.isGif && cat.emotionTags.includes(selectedEmotion);
            } else {
                return cat.emotionTags.includes(selectedEmotion);
            }
        });
        return matchingCatsArray;
    }
}

function getSingleCat() {
    const catsArray = getMatchingCatsArray();
    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomIndex = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomIndex];
    }
}

function renderCat() {
    const catObj = getSingleCat();
    memeModalInner.innerHTML = `
        <img 
            class="cat-img"
            src="/images/${catObj.image}"
            alt="${catObj.alt}"
            >
    `;
    memeModal.style.display = "flex";
}

function getEmotionsArray(cats) {
    const emotionsArray = [];

    // A horrible for loop
    // for (let i = 0; i < cats.length; i++) {
    //     for (let j = 0; j < cats[i].emotionTags.length; j++) {
    //         emotionsArray.push(cats[i].emotionTags[j]);
    //     }
    // }

    // A nicer way of iterating: for of syntax
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats);
    let radioItems = ``;
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="emotionRadios"> 
        </div>
        `;
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
