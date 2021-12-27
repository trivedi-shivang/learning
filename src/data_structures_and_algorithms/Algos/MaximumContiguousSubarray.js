function maximumContiguousSubarray(arr) {
    let curPosSum = 0;
    let maxSum = Math.min();
    for(let idx=0;idx<arr.length;idx++){
        curPosSum += curPosSum + 1;
        if(maxSum < curPosSum){
            maxSum = curPosSum;
        }
        if(curPosSum < 0){
            curPosSum = 0;
        }
    }
    return maxSum;
}