import react from 'react';
import React from 'react';


function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success();
        }
        else {
          error()
          return "error"
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
  }




class CitySearch extends react.Component{

    constructor(props)
    {
        super(props);
        this.state = ({
                value:"" ,
                Humidity: '', 
                Wind: "",
                Direction:"",
                SunCode:"",
                error:""
             });

            
    }



    findcity = (event) =>
    {
        event.preventDefault();

        console.log(this.state.value);

        loadJSON(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&appid=630ee10ce49c0ef1c2ac6043db3652d9`,     
        (data) =>{
        console.log("success");
        this.setState({error:""});
        this.props.findcity(this.state.value);

    }, () => {this.setState({error:"invalid city"})})

    }


    render(){
    return(
            <form autoComplete="off" onSubmit={this.findcity}>
                <div className="finder">
                    <div className="finder__outer">
                        <div className="finder__inner">
                            <button className="searcher" type="submit"><i className="fas fa-search"></i></button>
                            <input id="finder__input" type="text" name="city" value={this.state.value} placeholder='city name' onChange={e => this.setState({value: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <h6 className='errorMessage'>{this.state.error}</h6>
        </form>
        );
        }

};

export default CitySearch;