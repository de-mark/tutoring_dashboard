const getMedian = (values) => {
    values.sort((a,b) => a-b);

    let mid = Math.floor(values.length / 2);

    if (values.length % 2 == 0) {
        return values[mid];
    } else {
        return (values[mid - 1] + values[mid]) / 2.0;
    }
};

export default getMedian;