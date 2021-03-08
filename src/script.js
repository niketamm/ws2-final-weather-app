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
            let minute = now.getMinutes();
            let date2Sentnce = `Current Time ${hour}:${minute}`;
            return date2Sentnce;
        }
//output of date and time
dateoutput.innerHTML = formatDate();
time.innerHTML = timeFunction();


//default display weather is tokyo
    function formatPlaceDefault(event) 
    {
        let apiKey = `ea83478d04ea758c32daab15e512ea29`;
        let degreeSystem = `metric`;
        let cityName=`Tokyo`
        let url = `https://api.openweathermap.org/data/2.5/weather?`;
        let urlWeatherDefault = `${url}q=${cityName}&appid=${apiKey}&units=${degreeSystem}`;
        axios.get(urlWeatherDefault).then(dataWeatherDefault);
    }

    function dataWeatherDefault(response)
    {
        console.log(response.data);

        //for city
        let htmlCityValue = response.data.name;
        let htmlCity = document.querySelector("#city");
        htmlCity.innerHTML = htmlCityValue;

        //degree
        let tempRound = Math.round(response.data.main.temp);
        let tempChange = document.querySelector("#degree-today");
        tempChange.innerHTML = tempRound;

        //humidity
        let humRound = Math.round(response.data.main.humidity);
        let humChange = document.querySelector("#humidity");
        humChange.innerHTML = `Humidity ${humRound} %`;

        //windspeed
        let windRound = response.data.wind.speed;
        let windChange = document.querySelector("#wind-speed");
        windChange.innerHTML = `Wind speed ${windRound} m/s`;
    }

formatPlaceDefault();


//location api for searched city

    function formatPlace(event) 
    {
        event.preventDefault();
        let result = document.querySelector("#search-text");
        let cityName = result.value;
        let apiKey = `ea83478d04ea758c32daab15e512ea29`;
        let degreeSystem = `metric`;
        let url = `https://api.openweathermap.org/data/2.5/weather?`;
        let urlWeather = `${url}q=${cityName}&appid=${apiKey}&units=${degreeSystem}`;
        axios.get(urlWeather).then(dataWeather);
    }

//output for seaerched city
    function dataWeather(response)
    {
        console.log(response.data);

        //for city
        let htmlCityValue = response.data.name;
        let htmlCity = document.querySelector("#city");
        htmlCity.innerHTML = htmlCityValue;

        //degree
        let tempRound = Math.round(response.data.main.temp);
        let tempChange = document.querySelector("#degree-today");
        tempChange.innerHTML = tempRound;

        //humidity
        let humRound = Math.round(response.data.main.humidity);
        let humChange = document.querySelector("#humidity");
        humChange.innerHTML = `Humidity ${humRound} %`;

        //windspeed
        let windRound = response.data.wind.speed;
        let windChange = document.querySelector("#wind-speed");
        windChange.innerHTML = `Wind speed ${windRound} m/s`;
    }

    let searchForm = document.querySelector("#searchEngine,#search-button");
    searchForm.addEventListener("submit",formatPlace);

//api for current location

    function getLocation() 
    {
        navigator.geolocation.getCurrentPosition(formatLocation);
    }

    function formatLocation(position) 
    {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let apiKey = `ea83478d04ea758c32daab15e512ea29`;
        let degreeSystem = `metric`;
        let url = `https://api.openweathermap.org/data/2.5/weather?`;
        let urlWeather22 = `${url}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${degreeSystem}`;
        axios.get(urlWeather22).then(currentLocation);
    }


//output for current location

    function currentLocation(response) 
    {
        console.log(response.data);

        //city
        let htmlCityValue = response.data.name;
        let htmlCity = document.querySelector("#city");
        htmlCity.innerHTML = htmlCityValue;

        //degree-today
        let tempRound = Math.round(response.data.main.temp);
        let tempChange = document.querySelector("#degree-today");
        tempChange.innerHTML = tempRound;

        //humidity
        let humRound = Math.round(response.data.main.humidity);
        let humChange = document.querySelector("#humidity");
        humChange.innerHTML = `Humidity ${humRound} %`;

        //wind-speed
        let windRound = response.data.wind.speed;
        let windChange = document.querySelector("#wind-speed");
        windChange.innerHTML = `Wind speed ${windRound} m/s`;
    }

    let locationForm = document.querySelector("#search-location");
    locationForm.addEventListener("click",getLocation);