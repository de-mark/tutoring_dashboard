const aggregateColumn = (rows, column, aggType, optTargetValue) => {
    // optTargetValue used to select column you want the sum / median /etc of
    let res = {}

    rows.forEach((r) => {
        let currColVal;
        if (column == "DATE") {
            currColVal = `${r.DATE.getFullYear()}-${r.DATE.getMonth() + 1}-${r.DATE.getDate()}`;
        } else {
            currColVal = r[column];
        }

        switch(aggType){
            case "count":
                if (currColVal in res) {
                    res[currColVal]++;
                } else {
                    res[currColVal] = 1;
                }
                break;
            case "sum":
                if (currColVal in res) {
                    res[currColVal] += parseInt(r[optTargetValue]);
                } else {
                    res[currColVal] = parseInt(r[optTargetValue]);
                }
                break;
            default:
                break;
        }
    })

    return res;
}

export default aggregateColumn;