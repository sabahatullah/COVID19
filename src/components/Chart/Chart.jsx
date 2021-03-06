import React, {useState, useEffect} from 'react';
import styles from './Chart.module.css';
import { fetchDailyData } from '../../api';
import {Line, Bar} from 'react-chartjs-2';

const Chart = ({data:{confirmed, recovered, deaths}, country}) => {
   
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchAPI = async() =>{
            setDailyData(await fetchDailyData());

        }
        fetchAPI();

        // console.log(dailyData)
    }, []);

    const lineChart = (
        dailyData.length 
        ? (<Line data={{
            labels:dailyData.map(({date}) => date),
            datasets:[{
                data:dailyData.map(({confirmed}) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill:true,

            }, {
                data:dailyData.map(({deaths}) => deaths),
                label: 'Deaths',
                borderColor: '#ff0000',
                fill:true,

            }]
        }}
        />) : null
    );
        console.log(confirmed, recovered, deaths)
    const barChart = (
        confirmed
        ? (
            <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'people', 
                    backgroundColor: [
                        'yellow','green','red'
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            
            }}
            options= {{
                legend: {display: false},
                title: {display:true, text: `Current state is ${country}`},
            }}
            
        
            />
        )
        : null
        
    )


    return(
        <div className={styles.container}>
            {country ? barChart :lineChart}
        </div>
    )

}

export default Chart;
