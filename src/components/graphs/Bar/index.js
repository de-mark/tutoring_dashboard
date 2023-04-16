import Plot from 'react-plotly.js';

const Bar = ({x, y, title}) => {
    return (
        <Plot
            data={[
                    {
                        x: x,
                        y: y,
                        type: 'bar'
                    }
                ]}
            layout={{
                title: `<b>${title}</b>`,
                font: {
                    family: `'Space Grotesk', sans-serif`,
                    size: "1rem"
                },
            }}
            responsive={true}
        />
    )
}

export default Bar;