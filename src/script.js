//adding current location date
    let dateoutput = document.querySelector("#date");
        function formatDate() {
        let now = new Date();

        let dayList = 
        [
        `Sunday`,
        `Monday`,
        `Tueday`,
        `Wednesday`,
        `Thursday`,
        `Friday`,
        `Saturday`
        ];

        let monthList = 
        [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`
        ];

  let day = dayList[now.getDay()];
  let month = monthList[now.getMonth()];
  let date = now.getDate();

  let dateSentence = `${day} ${month} ${date}`;
  return dateSentence;
}

//adding time

        function timeFunction(timestamp) 
        {
            let now = new Date(timestamp);
            let hour = now.getHours();
                if (hour < 10) 
                {hour=`0${hour}`};
            let minute = now.getMinutes();
                if (minute < 10) 
                {minute= `0${minute}`};
            let date2Sentnce = `${hour}:${minute}`;
            return date2Sentnce;
        }
//output of date and time
dateoutput.innerHTML = formatDate();

    

//output for seaerched city/button response
function dataWeather(response)
    {    //for city
        let htmlCityValue = response.data.name;
        let htmlCity = document.querySelector("#city");
        htmlCity.innerHTML = htmlCityValue;

        //degree in celsius
        //celsius outside of function
        celsius = response.data.main.temp;
        //let metric=`°C`
        //let imperical=`°F`
        let tempChange = document.querySelector("#degree-today");
        tempChange.innerHTML = (`${Math.round(celsius)}°C`);

        

        //humidity
        let humRound = Math.round(response.data.main.humidity);
        let humChange = document.querySelector("#humidity");
        humChange.innerHTML = `Humidity ${humRound} %`;

        //windspeedS
        let windRound = response.data.wind.speed;
        let windChange = document.querySelector("#wind-speed");
        windChange.innerHTML = `Wind speed ${windRound} m/s`;

        //sky description
        let skyChange = document.querySelector("#sky");
        skyChange.innerHTML = `${response.data.weather[0].description}`;

        //icon
        let weatherIcon= document.querySelector("#large-image");
        weatherIcon.setAttribute("src" ,`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

        //change background according to weather using icon code
        let background= document.querySelector("#background")
        let color1= null;
        let color2= null;
        let iconCode=response.data.weather[0].icon;
        if  (iconCode === "01d" || iconCode === "01n"){color1=`#7DB9DE`; color2=`#FAD689`;}
        else if (iconCode === "02d" || iconCode === "02n"){color1=`#77969A`;color2=`#FAD689`;}
        else if (iconCode === "03d" || iconCode === "03n"){color1=`#787878`;color2=`#FFFFFB`;}
        else if (iconCode === "04d" || iconCode === "04n"){color1=`#4F4F48`;color2=`#BDC0BA`;}
        else if (iconCode === "09d" || iconCode === "09n"){color1=`#0F2540`;color2=`#BDC0BA`;}
        else if (iconCode === "10d" || iconCode ==="10n"){color1=`#72636E`;color2=`#BDC0BA`;}
        else if (iconCode === "11d" || iconCode ==="11n"){color1=`#897D55`;color2=`#FAD689`;}
        else if (iconCode === "13d" || iconCode ==="13n"){color1=`#FCFAF2`;color2=`#A5DEE4`;}
        else if (iconCode === "50d" || iconCode ==="50n"){color1=`#77969A`;color2=`#6A8372`;};  
    
        let cssBackground= (`
            <style> 
            .body {
            background-image: radial-gradient(circle,
            ${color2} 0%,
            ${color1} 100%);} 

            .bodyBottom {
                background-color:${color1};}
            .bodySearch
            {
                background-color:${color2};}
            </style>
    `   );
        background.innerHTML=cssBackground;




        //broken icon
        let weatherBroken= document.querySelector("#large-image")
        weatherBroken.setAttribute("alt" ,`${response.data.weather[0].description}`);

        //time updated
        let timeUpdate= document.querySelector("#time")
        timeUpdate.innerHTML=timeFunction(response.data.dt*1000);
    }
    

//default api attributes
    let apiKey = `ea83478d04ea758c32daab15e512ea29`;
    let degreeSystem = `metric`;
    let url = `https://api.openweathermap.org/data/2.5/weather?`;
    

//location api for searched city

    function formatPlace(city) 
    {
        let urlWeather = `${url}q=${city}&appid=${apiKey}&units=${degreeSystem}`;
        axios.get(urlWeather).then(dataWeather);
     }

    function searchValue(event)
    {  event.preventDefault();      
        let result = document.querySelector("#search-text");
        formatPlace(result.value);
    }

 //api for current location

    function getLocation() 
    {
        navigator.geolocation.getCurrentPosition(formatLocation);
    }

    function formatLocation(position) 
    {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let urlWeather22 = `${url}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${degreeSystem}`;
        axios.get(urlWeather22).then(dataWeather);
    }
    
    let searchForm = document.querySelector("#searchEngine,#search-button");
    searchForm.addEventListener("submit", searchValue);

//output for current location

    let locationForm = document.querySelector("#search-location");
    locationForm.addEventListener("click", getLocation);
//converting C to F
//making celsius null to prevent F from calculating endlessly

let celsius=null;

function convertTemperature(event)
    {   event.preventDefault();
        let temperatureImperical= (celsius * 9/5) + 32;
         let temperature = document.querySelector("#degree-today");
        temperature.innerHTML = `${Math.round(temperatureImperical)}°F`;
    }

    let convert = document.querySelector("#Convert");
    convert.addEventListener("click", convertTemperature);

    function convertTemperatureBack(event)
    {   event.preventDefault();
        let temperatureImperical= celsius;
         let temperature = document.querySelector("#degree-today");
        temperature.innerHTML = `${Math.round(temperatureImperical)}°C`;
    }

    let convertBack = document.querySelector("#ConvertBack");
    convertBack.addEventListener("click", convertTemperatureBack);



formatPlace("tokyo") ;