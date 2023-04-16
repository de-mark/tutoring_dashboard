import Plot from 'react-plotly.js';

import getMedian from "../../../utils/getMedian";

const Line = ({x, y, title}) => {
    return (
        <Plot
            data={[
                    {
                        x: x,
                        y: y,
                        type: 'scatter',
                        fill: 'tozeroy',
                        mode: 'lines+markers',
                        marker: {
                            size: 4,
                            color: 'rgba(233, 166, 166, .25)'
                        },
                        line: {
                            color: "#864879"
                        },
                        hoveron:'points'
                    }
                ]}
            layout={{
                title: `<b>${title}</b>`,
                responsive: true,
                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)',
                font: {
                    family: `'Space Grotesk', sans-serif`,
                    size: "1rem",
                    color: "#E9A6A6"
                },
                shapes: [
                    {
                        type: 'line',
                        x0: x[0],
                        x1: x[x.length-1],
                        y0: getMedian(y.slice()),
                        y1: getMedian(y.slice()),
                        line: {
                            color: 'rgba(255, 95, 126,.9)',
                            width: 2,
                            dash: 'dot'
                        }
                    }
                ],
                yaxis: {
                    autorange: true,
                    title: 'Number of Sessions (Per Day)',
                    gridcolor: 'rgba(0,0,0,.35)',
                    gridwidth: 2
                },
                xaxis: {
                    title: 'Day',
                    autorange: true,
                    showgrid: false,
                    zeroline: false,
                    range: ['2021-01-1', '2023-12-31'],
                    rangeselector: {
                        buttons: [
                            {step: 'all'},
                            {
                                count: 3,
                                label: '3YTD',
                                step: 'year',
                                stepmode: 'todate'
                            },
                            {
                                count: 2,
                                label: '2YTD',
                                step: 'year',
                                stepmode: 'todate'
                            },
                            {
                                count: 1,
                                label: '1YTD',
                                step: 'year',
                                stepmode: 'todate'
                            },
                            {
                                count: 6,
                                label: '6MTD',
                                step: 'month',
                                stepmode: 'todate'
                            },
                            {
                                count: 1,
                                label: '1MTD',
                                step: 'month',
                                stepmode: 'todate'
                            }
                        ]
                    },
                    rangeslider: {
                        visible: true
                    },
                    type: 'date'
                }
            }}
            useResizeHandler={true}
            style={{width:"95%", height:"95%", margin: "0 auto"}}
        />
    )
}

export default Line;