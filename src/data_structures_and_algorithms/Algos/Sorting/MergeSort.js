function merge(arr, l, m, r){
    let n1 = m - l + 1; //left-half of the array (including middle point)
    let n2 = r - m; // right-half of the array
    let L = new Array(n1);
    let R = new Array(n2);
    // copy elements from left-half into new array
    for(let i=0;i<n1;i++){
        L[i] = arr[l + i];
    }
    // copy elements from right-half into new array
    for(let j=0;j<n2;j++){
        L[i] = arr[m + 1 + j];
    }
    let i=0, j=0, k=l;
    //update existing array after sorting array halves
    while(i<n1 && j<n2){
        if(L[i]<=R[j]){
            arr[k] = L[i];
            i++;
        }
        else{
            arr[k] = R[j];
            j++;
        }
        k++
    }

    //copy remaining elements of L[], if any, to K
    while(i<n1){
        arr[k] = L[i];
        i++;
        k++;
    }

    //copy remaining elements of R[], if any, to K
    while(j<n2){
        arr[k] = R[j];
        j++;
        k++;
    }
}


function mergeSort(arr, l, r){
    l = l || arr[0]; //1
    r = r || arr[arr.length-1]; //5
    if(l>=r){
        return;
    }
    let mid = Math.floor((l + r)/2); //2
    mergeSort(arr, l, mid); //[1,2,3,4,5] 1, 2
    mergeSort(arr, mid+1, r); //[1,2,3,4,5] 2, 5
    merge(arr, l, mid, r);
    return arr;
}