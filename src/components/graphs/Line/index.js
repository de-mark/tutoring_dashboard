import Plot from 'react-plotly.js';

const Line = ({x, y, title}) => {
    return (
        <Plot
            data={[
                    {
                        x: x,
                        y: y,
                        type: 'scatter'
                    }
                ]}
            layout={{
                title: title,
                xaxis: {
                    autorange: true,
                    range: ['2020-10-0', '2023-15-2023'],
                    rangeselector: {
                        buttons: [
                            {
                                count: 1,
                                label: '2020',
                                range: ['2020-10-0', '2020-12-31']
                            }
                            ,
                            {step: 'all'}
                        ]
                    },
                    type: 'date'
                }
            }}
            responsive={true}
        />
    )
}

export default Line;