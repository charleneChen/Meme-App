import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");

emotionRadios.addEventListener("change", function (e) {
    const radios = document.getElementsByClassName("radio");

    for (let radio of radios) {
        radio.classList.remove("highlight");
    }

    document
        .getElementById(e.target.id)
        .parentElement.classList.add("highlight");
});

getImageBtn.addEventListener("click", getMatchingCatsArray);

function getMatchingCatsArray() {
    const isGif = gifsOnlyOption.checked;

    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector(
            'input[type="radio"]:checked'
        ).value;
        const matchingCatsArray = catsData.filter(function (cat) {
            return cat.emotionTags.includes(selectedEmotion);
        });
    }
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
