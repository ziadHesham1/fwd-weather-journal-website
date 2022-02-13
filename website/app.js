/* Global Variables */

const tempResult = document.querySelector('#temp');
const dateResult = document.querySelector('#date');
const feelingsResult = document.querySelector('#content');
const zipCodeInput = document.querySelector('#zip');
const feelingsInput = document.querySelector('#feelings');
const generateBtn = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;


const getWeather = async (zipCode) => {
    const myKey = "f29aa3c785b3486902bdbc67295f4d97";
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}&units=metric`
    );
    try {
        if (response.ok) {
            const data = await response.json();
            return data.main.temp;
        } else {
            alert('something went wrong, please enter another zipcode')
        }
    } catch (e) {
        console.log(e);

    }

}

const sendWeatherData = async (url = '', data = {}) => {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

}


const updateUI = async () => {

    let response = await fetch('/retrieveData');

    if (response.ok) {
        await response.json().then(updateData);

        function updateData(allData) {

            dateResult.textContent = `Date: ${allData.date}`
            tempResult.textContent = `Current temperature: ${allData.temp}`
            feelingsResult.textContent = `You're feeling: ${allData.content}`
        }

    } else {
        alert("HTTP-Error: " + response.status);
    }
}

generateBtn.addEventListener("click", generateResults);

function generateResults() {
    let userFeelings = feelingsInput.value
    const zipCode = zipCodeInput.value
    if (zipCode !== '') {
        getWeather(zipCode).then(tempValue => {
            sendWeatherData('/sendData', {date: newDate, temp: tempValue, content: userFeelings})
            updateUI();
        })
    } else {
        alert('Please inter your zip code')
    }
}
