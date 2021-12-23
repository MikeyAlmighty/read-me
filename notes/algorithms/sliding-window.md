# Sliding Window

Useful for any subset/sub-array calculations.
Good at making O(n^2) into linear execution time O(n).

Fixed length:
``` typescript
const maxSubsetArray = (arr: number[], n: number) => {
    let maxSum = 0;
    let tempSum = 0;

    if (arr.length < n) return null;

    for (let i = 0; i < n; i++) {
        maxSum += arr[i];
    }

    // baseline
    tempSum = maxSum;

    // 1st iteration: tempSum = 17;
    // [2, 6, 9, 2, 1, 8, 5, 6, 3];
    //  ^     ^
    for (let i = n; i < arr.length; i++) {
        let prev = arr[i - n];
        let next = arr[i];
        // Subtract prev element from tempSum and add next element to tempSum to get new tempSum
        tempSum = tempSum - prev + next;
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}


const arr: number[] = [2, 6, 9, 2, 1, 8, 5, 6, 3];
const n: number = 3;
console.log(maxSubsetArray(arr, n));
```

