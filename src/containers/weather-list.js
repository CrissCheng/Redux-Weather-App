import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component{

	renderWeather(cityData){
		const temps = cityData.list.map(list => list.main.temp);
		const pres= cityData.list.map(list => list.main.pressure);
		const hum= cityData.list.map(list => list.main.humidity);
		const { lon, lat } = cityData.city.coord;
		

		return(
			<tr key={cityData.city.name}>
				<td>{cityData.city.name}<GoogleMap lon={lon} lat={lat}/></td>
				<td>
					<Chart data={temps} color="blue" units="K" />
				</td>
				<td>
					<Chart data={pres} color="orange" units="Pa" />
				</td>
				<td>
					<Chart data={hum} color="red" units="%" />
				</td>
			</tr>
			);
	}

	render(){
		return(
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (K)</th>
						<th>Pressure (Pa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>


			);


	}
}


function mapStateToProps(state){
	return { weather: state.weather };
}


export default connect(mapStateToProps)(WeatherList);