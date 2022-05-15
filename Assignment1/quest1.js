// Calling Function as an argument

function innerFunction() {
    console.log('I am the Inner Function');
}

function outerFunction(){

    return innerFunction();
}

console.log(outerFunction());

//----------------

function sum(a,b){
    ans = a+b;
    return ans;
}

function toNumbers(a,b){

    num1 = parseInt(a);
    num2 = parseInt(b);
    addition = sum(num1,num2);
    return addition;
}

let a = '10';
let b = '20';
 console.log(toNumbers(a,b));

