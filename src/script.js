//location api
let apiDomain=`https://api.openweathermap.org/data/2.5/weather?`;
let city=``;
let key=`ea83478d04ea758c32daab15e512ea29`;
let system=`metric`;

let sourceSearch=`${apiDomain}q=${city}&appid=${key}&unit=${system}`;
let sourcelocation=`${apiDomain}q=${city}&appid=${key}&unit=${system}`
api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//for seaerched city
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

//for current location


axios.get(sourcelocation).then(currentLocation);

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