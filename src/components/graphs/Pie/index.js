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
                title: title
            }}
            responsive={true}
        />
    )
}

export default Pie;