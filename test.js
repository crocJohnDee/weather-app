let i = 5;
let j = 9;
let k = 6;

function getSequenceSum(i, j, k) {
    let arr1 = [];
    let arr2 = [];
    let result = 0;
    for (i; i < j; i++) {
        result += i;
    }
    for (j; j >= k; j--) {
        result += j;
    }


    return result;
}
console.log(getSequenceSum(i, j, k));

