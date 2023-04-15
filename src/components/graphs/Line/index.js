import Plot from 'react-plotly.js';

const Line = ({x, y, title}) => {
    const getMedian = (values) => {
        values.sort((a,b) => a-b);

        let mid = Math.floor(values.length / 2);

        if (values.length % 2 == 0) {
            console.log(values[mid])
            return values[mid];
        } else {
            console.log(values[mid-1], values[mid])
            console.log((values[mid - 1] + values[mid]) / 2.0)
            return (values[mid - 1] + values[mid]) / 2.0;
        }
    };

    return (
        <Plot
            data={[
                    {
                        x: x,
                        y: y,
                        type: 'scatter',
                        fill: 'tozeroy',
                        hoveron:'points+fills'
                    }
                ]}
            layout={{
                title: title,
                shapes: [
                    {
                        type: 'line',
                        x0: x[0],
                        x1: x[x.length-1],
                        y0: getMedian(y.slice()),
                        y1: getMedian(y.slice()),
                        line: {
                            color: 'rgba(255, 0, 0, .6)',
                            width: 2,
                            dash: 'dot'
                        }
                    }
                ],
                xaxis: {
                    autorange: true,
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
            responsive={true}
        />
    )
}

export default Line;