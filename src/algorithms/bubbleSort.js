import {swap} from './helpers';

function bubbleSort(array){
    
    const animations = [];
    let isSorted = false;
    let counter = 0;

    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length - 1 - counter; i++) {
            animations.push([i, i+1]); //elements we are comparing
            animations.push([i, i+1]); //we push them again to revert the color 
            if (array[i]>array[i+1]) {
                animations.push([i, i+1, array[i], array[i+1], counter, true]); // we push idx of the values we need to swap, plus the actual values , plus the counter to change color of sorted values
                swap(array, i, i+1);
                isSorted = false;
            }
            else{
                animations.push([i,i+1,false]);
            }
        }
        counter++;   
    }
    return animations; 
}

export default bubbleSort;

