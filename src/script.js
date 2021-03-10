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

    let time = document.querySelector("#time");
        function timeFunction() 
        {
            let now = new Date();
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
time.innerHTML = timeFunction();

    

//output for seaerched city/button response
function dataWeather(response)
    {  console.log(response.data);
        //for city
        let htmlCityValue = response.data.name;
        let htmlCity = document.querySelector("#city");
        htmlCity.innerHTML = htmlCityValue;

        //degree in celsius
        let tempRound = Math.round(response.data.main.temp);
        let tempChange = document.querySelector("#degree-today");
        tempChange.innerHTML = (`${tempRound}℃`);

        //humidity
        let humRound = Math.round(response.data.main.humidity);
        let humChange = document.querySelector("#humidity");
        humChange.innerHTML = `Humidity ${humRound} %`;

        //windspeed
        let windRound = response.data.wind.speed;
        let windChange = document.querySelector("#wind-speed");
        windChange.innerHTML = `Wind speed ${windRound} m/s`;

        //sky description
        let skyChange = document.querySelector("#sky");
        skyChange.innerHTML = `${response.data.weather[0].description}`;

        //icon
        let weatherIcon= document.querySelector("#large-image")
        weatherIcon.setAttribute("src" ,`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

        //broken icon
        let weatherBroken= document.querySelector("#large-image")
        weatherBroken.setAttribute("alt" ,`${response.data.weather[0].description}`);
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
    searchForm.addEventListener("submit",searchValue);

//output for current location

    let locationForm = document.querySelector("#search-location");
    locationForm.addEventListener("click",getLocation);

    formatPlace("tokyo") ;