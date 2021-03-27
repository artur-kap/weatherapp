import {getWeatherByCity} from './apiService.js'
import {mapListToDOMElements} from './DOMActions.js'

class WeatherApp{
    constructor(){
        this.viewElems = {};
        this.initializeApp();
    }

    initializeApp = () =>{
        this.connectDOMElements();
        this.setupListeners();
    }
    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown',this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click',this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click',this.returnToSearch);
    }

    handleSubmit = (event) => {
        if (event.type ==='click' || event.key==='Enter'){
            this.fadeInOut();
            let city = this.viewElems.searchInput.value
            getWeatherByCity(city).then(data =>{
            this.dispayWeatherData(data);  
            });
        }
    };

    fadeInOut = () => {
        console.log('hello')
        if (this.viewElems.mainContainer.style.opacity === "1" |  this.viewElems.mainContainer.style.opacity ===''){
            this.viewElems.mainContainer.style.opacity = "0"
            console.log('hello-1')
        } else {
            this.viewElems.mainContainer.style.opacity = "1"
            console.log('hello-2')
        }
    }

    switchView = ()  => {
        if (this.viewElems.weatherSearchView.style.display !== 'none'){
            this.viewElems.weatherSearchView.style.display = 'none'
            this.viewElems.weatherForecastView.style.display = 'block'
        } else {
            this.viewElems.weatherForecastView.style.display = 'none'
            this.viewElems.weatherSearchView.style.display = 'flex'
        }         
    }

    returnToSearch = () => {
        this.fadeInOut();
        setTimeout(()=>{
            this.switchView();
            this.fadeInOut();
        },500);        
    }

    dispayWeatherData = data =>{
        this.switchView();
        this.fadeInOut();
    
        const weather = data.consolidated_weather[0];
        console.log(data);
        console.log(weather);
        this.viewElems.weatherCity.innerText= data.title ;
        this.viewElems.weatherIcon.src=
        `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
        this.viewElems.weatherIcon.alt=weather.weather_state_name;
        this.viewElems.weatherIcon.width="150";
        this.viewElems.weatherIcon.height="150";
        const currTemp=weather.the_temp.toFixed(2);
        const maxTemp =weather.max_temp.toFixed(2);
        const minTemp =weather.min_temp.toFixed(2);
    
        this.viewElems.weatherCurrentTemp.innerText=`Current temperature: ${currTemp}°C`;
        this.viewElems.weatherMaxTemp.innerText=`Max temperature: ${maxTemp}°C`;
        this.viewElems.weatherMinTemp.innerText=`Min temperature: ${minTemp}°C`;
    }
}



const onClickSubmit = () => {
    fadeInOut();
    let city = viewElems.searchInput.value
        getWeatherByCity(city).then(data =>{
            dispayWeatherData(data);  
        });
};







document.addEventListener('DOMContentLoaded',new WeatherApp())
