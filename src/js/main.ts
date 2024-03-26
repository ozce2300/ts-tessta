function firstElement<T>(array: T[]): T {
    return array[0];
}

let numberArray: number[] = [1, 2, 3, 4, 5];
let firstNumber: number = firstElement(numberArray);
console.log(firstNumber); // Output: 1
