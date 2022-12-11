let input = `noop
noop
addx 5
addx 21
addx -16
noop
addx 1
noop
noop
addx 4
addx 1
addx 4
addx 1
noop
addx 4
addx -9
noop
addx 19
addx -5
noop
noop
addx 5
addx 1
addx -38
addx 5
addx -2
addx 2
noop
noop
addx 7
addx 9
addx 20
addx -3
addx -18
addx 2
addx 5
noop
noop
addx -2
noop
noop
addx 7
addx 3
addx -2
addx 2
addx -28
addx -7
addx 5
noop
addx 2
addx 32
addx -27
noop
noop
noop
noop
noop
addx 7
noop
addx 22
addx -19
noop
addx 5
noop
addx -7
addx 17
addx -7
noop
addx -20
addx 27
noop
addx -16
addx -20
addx 1
noop
addx 3
addx 15
addx -8
addx -2
addx -6
addx 14
addx 4
noop
noop
addx -17
addx 22
noop
addx 5
noop
noop
noop
addx 2
noop
addx 3
addx -32
addx -5
noop
addx 4
addx 3
addx -2
addx 34
addx -27
addx 5
addx 16
addx -18
addx 7
noop
addx -2
addx -1
addx 8
addx 14
addx -9
noop
addx -15
addx 16
addx 2
addx -35
noop
noop
noop
noop
addx 3
addx 4
noop
addx 1
addx 4
addx 1
noop
addx 4
addx 2
addx 3
addx -5
addx 19
addx -9
addx 2
addx 4
noop
noop
noop
noop
addx 3
addx 2
noop
noop
noop`;

let instructions = input.split('\n');

let sum = 1;
let numberOfCycle = 0;
let currentPosition = [];
let multipleNumber = 40;
let screen = [];
let currentRow = 0;

function getCurrentPosition(number){
    let array = [];
    array.push(number -1);
    array.push(number);
    array.push(number +1);
    return array;
}

function checkIfCurrentPointIsInCurrentPosition(currentPoint, currentPosition){
    return currentPosition.includes(currentPoint);
}

for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i];
    let [command, value] = instruction.split(' ');
    let cycle = 0;
    if(command === 'noop') {
        cycle = 1;
    }
    if(command === 'addx') {
        cycle = 2;
    }
    for(let j = 0; j < cycle; j++){
        currentPosition = getCurrentPosition(sum);
        console.log(currentPosition);
        
        if(checkIfCurrentPointIsInCurrentPosition(numberOfCycle, currentPosition)) {
            screen[currentRow] = screen[currentRow] ? screen[currentRow] + '#' : '#';
        } else {
            screen[currentRow] = screen[currentRow] ? screen[currentRow] + '.' : '.';
        }
        
        numberOfCycle++;
        if(numberOfCycle === multipleNumber) {
            currentRow++;
            numberOfCycle = 0;
        }
    }
    if(command === 'addx') {
        sum += Number(value);
    }
    console.log(numberOfCycle, sum);
}

console.log(screen);

//RLEZFLGE