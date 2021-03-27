import {getWeatherByCity} from './apiService.js'

const viewElems = {};

const getDOMElem = (id) => {
    return document.getElementById(id);
}

const connectHTMLElems = () =>{
    viewElems.mainContainer = getDOMElem('mainContainer');
    viewElems.weatherSearchView = getDOMElem('weatherSearchView');
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');
    
    viewElems.searchInput = getDOMElem('searchInput');
    viewElems.searchButton = getDOMElem('searchButton');
    viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');

    viewElems.weatherCity = getDOMElem('weatherCity');
    viewElems.weatherIcon = getDOMElem('weatherIcon');

    viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');

    viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
    
}

const setupListeners =() => {
    viewElems.searchInput.addEventListener('keydown',onEnterSubmit);
    viewElems.searchButton.addEventListener('click',onClickSubmit);
    viewElems.returnToSearchBtn.addEventListener('click',returnToSearch);
}

const  initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = (event) => {
    console.log(event);
    
    if (event.key === 'Enter'){
        fadeInOut();
        let city = viewElems.searchInput.value
        getWeatherByCity(city).then(data =>{
            dispayWeatherData(data);            
        });
    }
};
const onClickSubmit = () => {
    fadeInOut();
    let city = viewElems.searchInput.value
        getWeatherByCity(city).then(data =>{
            dispayWeatherData(data);  
        });
};

const dispayWeatherData = data =>{
    switchView();
    fadeInOut();

    const weather = data.consolidated_weather[0];
    console.log(data);
    console.log(weather);
    viewElems.weatherCity.innerText= data.title ;
    viewElems.weatherIcon.src=
    `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    viewElems.weatherIcon.alt=weather.weather_state_name;
    viewElems.weatherIcon.width="150";
    viewElems.weatherIcon.height="150";
    const currTemp=weather.the_temp.toFixed(2);
    const maxTemp =weather.max_temp.toFixed(2);
    const minTemp =weather.min_temp.toFixed(2);

    viewElems.weatherCurrentTemp.innerText=`Current temperature: ${currTemp}°C`;
    viewElems.weatherMaxTemp.innerText=`Max temperature: ${maxTemp}°C`;
    viewElems.weatherMinTemp.innerText=`Min temperature: ${minTemp}°C`;
}

const fadeInOut = () => {
    console.log('hello')
    if (viewElems.mainContainer.style.opacity === "1" |  viewElems.mainContainer.style.opacity ===''){
        viewElems.mainContainer.style.opacity = "0"
        console.log('hello-1')
    } else {
        viewElems.mainContainer.style.opacity = "1"
        console.log('hello-2')
    }
}
const switchView = ()  => {
    if (viewElems.weatherSearchView.style.display !== 'none'){
        viewElems.weatherSearchView.style.display = 'none'
        viewElems.weatherForecastView.style.display = 'block'
    } else {
        viewElems.weatherForecastView.style.display = 'none'
        viewElems.weatherSearchView.style.display = 'flex'
    }
     
    viewElems.weatherForecastView = getDOMElem('weatherForecastView');
}

const returnToSearch = () => {
    fadeInOut();
    setTimeout(()=>{
        switchView();
        fadeInOut();
    },500);
    
}

document.addEventListener('DOMContentLoaded',initializeApp)
