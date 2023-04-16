import Plot from 'react-plotly.js';

const Bar = ({x, y, title}) => {
    return (
        <Plot
            data={[
                    {
                        x: x,
                        y: y,
                        type: 'bar',
                        transforms: [{
                            type: 'sort',
                            target: 'y',
                            order: 'descending'
                        }]
                    }
                ]}
            layout={{
                title: `<b>${title}</b>`,
                responsive: true,
                font: {
                    family: `'Space Grotesk', sans-serif`,
                    size: "1rem"
                },
            }}
            // responsive={true}
            useResizeHandler={true}
            style={{width:"95%", height:"95%", margin: "0 auto"}}
        />
    )
}

export default Bar;