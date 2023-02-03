const avgArray = (array) => {
    let sum = 0
    for (let i = 0; i < array.length; i += 1) {
    sum += array[i]
    }
    let avg = sum / array.length;
    avg = parseFloat(avg.toFixed(2))
    
    return avg
}

const maxArray = (array) => {
    let max = Math.max(...array);
    return max;
}

const minArray = (array) => {
    let min = Math.min(...array);
    return min;
}

export {avgArray, maxArray, minArray}