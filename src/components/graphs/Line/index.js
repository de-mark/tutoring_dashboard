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
                title: title
            }}
            responsive={true}
        />
    )
}

export default Line;