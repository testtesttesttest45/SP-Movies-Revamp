const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Who are you?', name => {
    console.log(`Hey there ${name}!`);
    readline.close();
});

const x = 5;

// example of For Loop
console.log('For Loop');
for (let i = 0; i < x; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// example of While Loop
console.log('While Loop');
let i = 0;
while (i < x) {
    console.log(i); // 0, 1, 2, 3, 4
    i++;
}

// example of Do While Loop
console.log('Do While Loop');
i = 0;
do {
    console.log(i);  // 0, 1, 2, 3, 4
    i++;
} while (i < x);

// example of For In Loop
console.log('For In Loop');
const obj = {
    name: 'John',
    age: 30
};
for (let key in obj) {
    console.log(key, ': ', obj[key]); // name: John, age: 30
}

// example of For Of Loop
console.log('For Of Loop');
const arr = ['John', 'Jane', 'Mark'];
for (let value of arr) {
    console.log(value); // John, Jane, Mark
}

// example of For Each Loop
console.log('For Each Loop');
arr.forEach(function(value) {
    console.log(value); // John, Jane, Mark
});

// example of For Each Loop with Arrow Function
console.log('For Each Loop with Arrow Function');
arr.forEach(value => console.log(value)); // John, Jane, Mark



