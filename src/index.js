import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import CitySearch from './CitySearch'
import react from 'react';




class Ap extends react.Component{


    constructor(props)
    {
        super(props);
        this.state = ({
                city:"Las Vegas" ,
             });
            
    }

    cityfinder = (cityname) =>
    {
        this.setState({city: cityname})
    }


    refactor = (cityname) =>
    {
        return cityname.replace(/ /g,'')
    }



    render()
    {
            return(
                <div>
                    <div className="row">
                        <div className="col-12">
                        
                        <h1 className="weather-title">Five Day Forcast</h1>
                        <h4 className="weather-title">{this.state.city}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <CitySearch findcity= {this.cityfinder}/>
                        </div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row weather-container">
                        
                        <div className="col-1 center"></div>
                        <div className="col-2 center" ><SeasonDisplay cityname={this.refactor(this.state.city)} extra="0"/></div>
                        <div className="col-2 center" ><SeasonDisplay cityname={this.refactor(this.state.city)} extra="1"/></div>
                        <div className="col-2 center" ><SeasonDisplay cityname={this.refactor(this.state.city)} extra="2"/></div>
                        <div className="col-2 center" ><SeasonDisplay cityname={this.refactor(this.state.city)} extra="3"/></div>
                        <div className="col-2 center" ><SeasonDisplay cityname={this.refactor(this.state.city)} extra="4"/></div>
                        <div className="col-1 center" ></div>

                    </div>
                </div>
                );
    }

};



ReactDOM.render(<Ap/>, document.querySelector('#root'));
