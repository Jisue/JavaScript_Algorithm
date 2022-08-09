const arr = [1, 5, 3, 2, 6];

const quickSort = (arr) => {
    if(arr.length <= 1) return arr;

    const pivot = arr[0];
    const tail = arr.slice(1);

    const left = tail.filter((item) => item < pivot);
    const right = tail.filter((item) => item > pivot);

    return quickSort(left).concat([pivot], quickSort(right));
}

const sortArr = quickSort(arr);
console.log(sortArr);