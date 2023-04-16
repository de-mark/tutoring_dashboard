import Plot from 'react-plotly.js';

const Pie = ({x, y, title}) => {
    return (
        <Plot
            data={[
                    {
                        labels: x,
                        values: y,
                        type: 'pie'
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

export default Pie;