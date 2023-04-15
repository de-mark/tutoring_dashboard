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
                title: title
            }}
            responsive={true}
        />
    )
}

export default Bar;