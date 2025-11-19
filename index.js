import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");

emotionRadios.addEventListener("change", function (e) {
    console.log(e.target.id);
});

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
