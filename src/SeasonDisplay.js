import React from 'react';




function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        }
        else {
          error(xhr);
          return "error"
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
  }

function GetDay(extra)
{
    var today = new Date();
    var day = today.getDay();
    var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
    var fate;

    if(day+ parseInt(extra) > 6)
    {
         fate = day + parseInt(extra) - 6;
    }
    else
    {
        fate = day + parseInt(extra);
    }


    var thisDay = daylist[fate];
    return thisDay;
}



function GetDate(extra)
{
    var today = new Date();
    today.setDate(today.getDate() + parseInt(extra));
    var result = today.toString();
    var res = result.substr(4,12);
    return res;
}

function GetTemp(data)
{
   data = parseFloat(data);
   //console.log(data)
   var result = (data - 273.15) * 9/5 + 32;
   result = Math.round(result);
  return  (result +"°F");
}

function GetHumidity(data)
{
 return  data+"%";
}

function GetWind(data, direction)
{
    data = Math.round(parseFloat(data) *  2.237);

   
    if((direction > 315)) //315
    {
        return data +"mph NW "
    }
    else if((direction > 270))//270
    {
        return data +"mph W "
    }
    else if((direction > 225)) //225
    {
        return data +"mph SW "
    }
    else if((direction > 180)) //180
    {
        return data +"mph S "
    }
    else if((direction > 135)) //135
    {
        return data +"mph SE "
    }
    else if((direction > 90)) //90
    {
        return data +"mph E "
    }
    else if((direction > 45)) //45
    {
        return data +"mph NE "
    }
    else
    {
        return data +"mph N "
    }



  
}

function GetIcon(data)
{
    data = parseInt(data);
    console.log(data)

    if(data <= 300) //thunderstorm
    {
        return 'fas fa-poo-storm';
    }
    else if(data <= 400) //rain drizzle
    {
        return 'fas fa-cloud-rain';
    }
    else if(data <= 600) //rain
    {
        return 'fas fa-cloud-showers-heavy';
    }
    else if(data <= 700) //snow
    {
        return 'fas fa-snowflake';
    }
    else if(data < 800) //smog
    {
        return 'fas fa-smog';
    }
    else if(data === 800) //clear
    {
        return 'fas fa-sun';
    }
    else //clouds
    {
        return 'fas fa-cloud-sun';
    }
   
}


class SeasonDisplay extends React.Component{

    

    constructor(props)
    {
        super(props);
        //var weather;
        this.factor = 0


        this.state = {
            Temp:"" ,
            Humidity: '', 
            Wind: "",
            Direction:"",
            SunCode:""
         }

         console.log(this.props.cityname)
 
 
         loadJSON(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.cityname}&appid=630ee10ce49c0ef1c2ac6043db3652d9`,     
         (data) =>{
         console.log("success");
         this.weather = data;
         //console.log(this.weather.list[this.props.extra].main.temp);
         //console.log(this.weather.list[this.props.extra].main.humidity);
         // console.log(this.weather.list[(this.props.extra * 8) + 4].weather[0].id);
 
         var today = new Date()
         var hour = Math.round((today.getHours() + 1) / 3);
 
                        var temp= this.weather.list[(this.props.extra * 8) + hour].main.temp;
                        var humidity= this.weather.list[(this.props.extra * 8) + hour].main.humidity;
                        var wind= this.weather.list[(this.props.extra * 8) + hour].wind.speed;
                        var direction= this.weather.list[(this.props.extra * 8) + 4].wind.deg;
                        var suncode= this.weather.list[(this.props.extra * 8) + 4].weather[0].id;
 
                        this.setState({Temp: temp})
                        this.setState({Humidity: humidity})
                        this.setState({Wind: wind})
                        this.setState({Direction: direction});
                        this.setState({SunCode: suncode});
     }, JSON);
    
    }

    UNSAFE_componentWillReceiveProps()
    {
        this.factor = 1;
    }

    render()
    {
        if(this.factor > 0)
        {
            this.factor = this.factor - 1
        loadJSON(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.cityname}&appid=630ee10ce49c0ef1c2ac6043db3652d9`,     
        (data) =>{
        console.log("success");
        this.weather = data;
        //console.log(this.weather.list[this.props.extra].main.temp);
        //console.log(this.weather.list[this.props.extra].main.humidity);
        // console.log(this.weather.list[(this.props.extra * 8) + 4].weather[0].id);

        var today = new Date()
        var hour = Math.round((today.getHours() + 1) / 3);

                       var temp= this.weather.list[(this.props.extra * 8) + hour].main.temp;
                       var humidity= this.weather.list[(this.props.extra * 8) + hour].main.humidity;
                       var wind= this.weather.list[(this.props.extra * 8) + hour].wind.speed;
                       var direction= this.weather.list[(this.props.extra * 8) + 4].wind.deg;
                       var suncode= this.weather.list[(this.props.extra * 8) + 4].weather[0].id;

                       this.setState({Temp: temp})
                       this.setState({Humidity: humidity})
                       this.setState({Wind: wind})
                       this.setState({Direction: direction});
                       this.setState({SunCode: suncode});
    }, JSON);
}
   
       


        return(
             <div className="weather-card">
                 <h3 className="Day">{GetDay(this.props.extra)}</h3>
                 <h4 className="Date">{GetDate(this.props.extra)}</h4>
                 <h1 className="Temperature">{GetTemp(this.state.Temp)}</h1>
                 <div className="sun-status"><i className={GetIcon(this.state.SunCode)}></i></div>
                 <div className="contents">
                    <h6 className="Humidity">Humidity: {GetHumidity(this.state.Humidity)}</h6>
                    <h6 className="Wind">Wind: {GetWind(this.state.Wind , this.state.Direction)}</h6>
                </div>

             </div>);
    }

};

export default SeasonDisplay;