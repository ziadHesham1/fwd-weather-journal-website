/* Global Variables */

const tempResult = document.querySelector('#temp');
const dateResult = document.querySelector('#date');
const feelingsResult = document.querySelector('#content');
const zipInput = document.querySelector('#zip');
const feelingsInput = document.querySelector('#feelings');
const generateBtn = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}` ;




generateBtn.addEventListener("click", generateResults);

function generateResults() {
    let userFeelings = feelingsInput.value
    getWeather().then(value => {
        postData('/add', {date: newDate, temp: value, content: userFeelings})
        retrieveData();
    })
}


// https://api.openweathermap.org/data/2.5/weather?zip=90210&appid=f29aa3c785b3486902bdbc67295f4d97&units=metric
const getWeather = async () => {
    const myKey = "f29aa3c785b3486902bdbc67295f4d97";
    const zipCode = zipInput.value
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}&units=metric`
    );
    const data = await response.json();

    console.log(`weather data `);
    // console.log(data);

    return data.main.temp;
}

const postData = async (url = '', data = {}) => {
    // console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)  // body data type must match "Content-Type" header
    });

   /* try {
        const newData = await response.json();
        console.log(`newData : `);
        console.log(newData);
        return newData
    } catch (error) {

        console.log("error: ", error);
        // appropriately handle the error
    }*/
}


const retrieveData = async () => {


    let response = await fetch('/all');

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        await response.json().then(udateData);

        function udateData(data) {
            /*console.log('allData:');
            console.log(data[data.length - 1]);*/
            let allData = data[data.length - 1]
            dateResult.textContent = `Date: ${allData.date}`
            tempResult.textContent = `Current temperature: ${allData.temp}`
            feelingsResult.textContent = `You're feeling: ${allData.content}`
        }


    } else {
        alert("HTTP-Error: " + response.status);
    }
}

