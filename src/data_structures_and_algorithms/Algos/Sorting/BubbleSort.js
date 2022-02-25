// compares adjacent items and swaps them if needed (asc by default)
function bubbleSort(arr){
    for(let idx=0;idx<arr.length-1;idx++){
        for(let idx2=idx+1;idx2<arr.length-idx;idx2++){
            if(arr[idx2]< arr[idx]){
                [arr[idx], arr[idx2]] =[arr[idx2], arr[idx]]
            }
        }        
    }
}
[5,4,3,2,1] [4,5,3,2,1] [4,3,5,2,1] [4,3,2,5,1] [4,3,2,1,5]
