/* Global Variables */
const weatherResult = document.querySelector('#temp');
const dateResult = document.querySelector('#date');
const feelingsResult = document.querySelector('#content');
const zipInput = document.querySelector('#zip');
const feelingsInput = document.querySelector('#feelings');
const generateBtn = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;
DUMMY_TEXT = 'from dom'

class FetchWeather {
    async getCurrent(zipCode) {
        const myKey = "f29aa3c785b3486902bdbc67295f4d97";

        //make request to url
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}&units=metric`
        );

        const data = await response.json();

        // console.log(data);

        return data.main.temp;
    }
}


const ft = new FetchWeather();
// const zipInput = 90210

generateBtn.addEventListener("click", function (e) {

    // set variable with  zipcode input
    // and print it to the console
    // console.log(`zipInput : ${userZipcode}`);

    // set variable with feelings input
    let userFeelings = feelingsInput.value
    // and print it to the console
    // console.log(`feelingsInput : ${userFeelings}`);
    // give the feeling var to the feeling div
    feelingsResult.textContent = `your feeling: ${userFeelings}`

    // give the date to the date div
    dateResult.textContent = `date: ${newDate}`

    // get the weather with the zipcode variable 
    // and set it and to a variable
    // give the weather temp to the temp div
    ft.getCurrent(zipInput.value).then(receivedWeather =>
        weatherResult.textContent = `current weather: ${receivedWeather}`
    );

});
