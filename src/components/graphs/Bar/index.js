import Plot from 'react-plotly.js';

const Bar = ({x, y, title}) => {
    return (
        <Plot
            data={[
                    {
                        x: x,
                        y: y,
                        type: 'bar',
                        marker: {
                            color: 'rgba(134, 72, 121,.75)'
                        },
                        transforms: [{
                            type: 'sort',
                            target: 'y',
                            order: 'descending'
                        }]
                    }
                ]}
            layout={{
                title: {
                    text: `<b>${title}</b>`,
                    font:{
                        color: "#FFF"
                    } 
                },
                responsive: true,
                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)',
                font: {
                    family: `'Space Grotesk', sans-serif`,
                    size: "1rem",
                    color: "#E9A6A6"
                },
                yaxis: {
                    title: {
                        text: 'Total Sessions',
                        font:{
                            color: "#FFF"
                        } 
                    },
                    gridcolor: 'rgba(0,0,0,.35)',
                    gridwidth: 2
                },
                xaxis: {
                    title: {
                        text: 'Topic',
                        font:{
                            color: "#FFF"
                        } 
                    },
                    showgrid: false,
                    type: 'category'
                }
            }}
            // responsive={true}
            useResizeHandler={true}
            style={{width:"95%", height:"95%", margin: "0 auto"}}
        />
    )
}

export default Bar;