import Chart from 'chart.js/auto'
import { FaViruses, FaBed, FaHeartbeat, FaHeartBroken } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import classNames from 'classnames';



function MyChart() {
    const [dataCovid, setCovidData] = useState({});
    const [dataChart, setDataChart] = useState({});
    const [tab, setTab] = useState('cases');

    useEffect(() => {
        fetch('https://static.pipezero.com/covid/data.json')
            .then(response => response.json())
            .then(response => {
                setCovidData(response.total.internal);
                const labels = response.overview.map(day => day.date.replace('-', '/'));
                let chartName = 'Số ca nhiễm';
                let color = '#EF6038';
                switch (tab) {
                    case 'treating':
                        chartName = 'Ca điều trị';
                        break;
                    case 'recovered':
                        chartName = 'Khỏi bệnh';
                        color = '#4FBA69';
                        break;
                    case 'death':
                        chartName = 'Tử vong';
                        color = '#999B9B';
                        break;
                    default:
                        break;
                }
                const data = response.overview.map(day => Math.abs(day[tab]))
                setDataChart({ labels, chartName, data, color })
            });
    }, [tab]);


    const data = {
        labels: dataChart.labels,
        datasets: [{
            label: dataChart.chartName,
            data: dataChart.data,
            borderWidth: 1,
            barThickness: 24,
            backgroundColor: dataChart.color,
            height: 1000
        }]
    };

    return (
        <>
            <div className="chart-body">
                <div
                    className={classNames('card', 'cases', { active: tab === 'cases' })}
                    onClick={() => {
                        setTab('cases')
                    }}
                >
                    <FaViruses style={{ color: "#EF6038", fontSize: "24px" }}></FaViruses>
                    <div>
                        <div className="card-title">Nhiễm bệnh</div>
                        <b>{new Intl.NumberFormat().format(dataCovid.cases)}</b>
                    </div>
                </div>
                <div
                    className={classNames('card', 'treating', { active: tab === 'treating' })}
                    onClick={() => {
                        setTab('treating')
                    }}
                >
                    <FaBed style={{ color: "#EF6038", fontSize: "24px" }}></FaBed>
                    <div>
                        <div className="card-title">Đang điều trị</div>
                        <b>{new Intl.NumberFormat().format(dataCovid.treating)}</b>
                    </div>
                </div>
                <div
                    className={classNames('card', 'recovered', { active: tab === 'recovered' })}
                    onClick={() => {
                        setTab('recovered')
                    }}
                >
                    <FaHeartbeat style={{ color: "#4FBA69", fontSize: "24px" }}></FaHeartbeat>
                    <div>
                        <div className="card-title">Khỏi bệnh</div>
                        <b>{new Intl.NumberFormat().format(dataCovid.recovered)}</b>
                    </div>
                </div>
                <div
                    className={classNames('card', 'death', { active: tab === 'death' })}
                    onClick={() => {
                        setTab('death')
                    }}
                >
                    <FaHeartBroken style={{ color: "#000", fontSize: "24px" }}></FaHeartBroken>
                    <div>
                        <div className="card-title">Tử vong</div>
                        <b>{new Intl.NumberFormat().format(dataCovid.death)}</b>
                    </div>
                </div>
            </div>
            <Bar
                data={data}
                height={230}
            >
            </Bar>
        </>
    );
}

export default MyChart;
