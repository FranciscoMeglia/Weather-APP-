import './App.css';
import {useState} from "react";



function App() {

  const [city , setCity] = useState("")
  const [weather , setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    conditiontext: "",
  })
  const [error , setError] = useState(false)

  //"7d8c839f12b343cbae7182726231404"
  
  const Api_Key = process.env.REACT_APP_API_KEY;
  
  const apiWeather = () => {

    fetch(`https://api.weatherapi.com/v1/current.json?key=${Api_Key}&lang=en&q=${city}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setWeather({
            city: data.location.name,
            country: data.location.country,
            temp: (data.current.temp_c + "°C"),
            condition: data.current.condition.icon,
            conditiontext: data.current.condition.text,
          });
          setError(false);
        }
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }  

  if (error === true) {
    return (
      <div className="App">
        <header>
         <h1>Weather APP</h1>
         <input type='text' placeholder='enter a city' onChange={(e) => setCity(e.target.value)}></input>
         <button type="submit" onClick={apiWeather}>Search</button>
         <div className='clm'>
         <h3>City not found</h3>
         </div>
         <p>powered by <a href='https://www.weatherapi.com/'>www.weatherapi.com</a> </p>
         <p>©FranciscoMeglia</p>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header>
         <h1>Weather APP</h1>
         <input type='text' placeholder='enter a city' onChange={(e) => setCity(e.target.value)}></input>
         <button type="submit" onClick={apiWeather}>Search</button>
         <div className='clm'>
         <h3>{weather.city}</h3>
         <h4>{weather.country}</h4>
         <h5>{weather.temp}</h5>
         <img src={weather.condition} alt=''></img>
         <h5 className='h5_2'>{weather.conditiontext}</h5>
         </div>
         <p>powered by <a href='https://www.weatherapi.com/'>www.weatherapi.com</a> </p>
         <p className='copy'>©FranciscoMeglia</p>
        </header>
      </div>
    );
  }
}

export default App;
