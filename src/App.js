import React from 'react';

import {Cards, Chart, CountryPicker} from './components'

import styles from './App.module.css';
import { fetchData } from './api';

// TUTORIAL FOR IMPORT/EXPORT https://www.youtube.com/watch?v=s9kNndJLOjg

class App extends React.Component{
    state = {
        data: {},
        country: '',
    }
    // console.log(data)
    async componentDidMount(){
        const fetchedData = await fetchData();
        // console.log(fetchedData);

        this.setState({data:fetchedData})

    }
    handleCountryChange = async(country) => {
        const fetchedData = await fetchData(country)
        this.setState({data:fetchedData, country:country})
        console.log(country);
        
    }
    render(){
        const {data, country} = this.state;
        return(
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}></Chart>
                
            </div>

        )
    }


}


export default App;