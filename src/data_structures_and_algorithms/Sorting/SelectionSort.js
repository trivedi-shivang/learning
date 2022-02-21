
// For every iteration, place the smallest element towards the starting of the array (sorted array)
function selectionSort(arr){
    if(!arr) return;
    for(let i=0;i<arr.length-1;i++){
        let min = i;
        for(let j=i+1;j<arr.length;j++){
            if(arr[j]< arr[min]) min = j;
        }
        [arr[i], arr[min]] = [arr[min], arr[i]]
    }
    return arr;
}