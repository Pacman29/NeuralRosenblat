export default function initedArrayCreator(count, init = 0) {
    let arr = [];
    arr.length = count;
    if(typeof init === 'function'){
        for(let i = 0; i< arr.length; ++i)
            arr[i] = init();
    } else {
        arr.fill(init);
    }
    return arr;
}