let input = `Monkey 0:
  Starting items: 97, 81, 57, 57, 91, 61
  Operation: new = old * 7
  Test: divisible by 11
    If true: throw to monkey 5
    If false: throw to monkey 6

Monkey 1:
  Starting items: 88, 62, 68, 90
  Operation: new = old * 17
  Test: divisible by 19
    If true: throw to monkey 4
    If false: throw to monkey 2

Monkey 2:
  Starting items: 74, 87
  Operation: new = old + 2
  Test: divisible by 5
    If true: throw to monkey 7
    If false: throw to monkey 4

Monkey 3:
  Starting items: 53, 81, 60, 87, 90, 99, 75
  Operation: new = old + 1
  Test: divisible by 2
    If true: throw to monkey 2
    If false: throw to monkey 1

Monkey 4:
  Starting items: 57
  Operation: new = old + 6
  Test: divisible by 13
    If true: throw to monkey 7
    If false: throw to monkey 0

Monkey 5:
  Starting items: 54, 84, 91, 55, 59, 72, 75, 70
  Operation: new = old * old
  Test: divisible by 7
    If true: throw to monkey 6
    If false: throw to monkey 3

Monkey 6:
  Starting items: 95, 79, 79, 68, 78
  Operation: new = old + 3
  Test: divisible by 3
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 7:
  Starting items: 61, 97, 67
  Operation: new = old + 4
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 5`;

let arrayOfMonkeys = [];

class Monkey {
	constructor(name, items, operation, test, testSuccess, testFail, numberOfInspects) {
		this.name = name;
		this.startingItems = items;
		this.operation = operation;
		this.test = test;
		this.testSuccess = testSuccess;
		this.testFail = testFail;
		this.numberOfInspects = numberOfInspects;
	}
}

let monkeys = input.split("\n\n");

for (let i = 0; i < monkeys.length; i++) {
	let name = monkeys[i].split(":")[0];
	let items = [];
	for (let j = 0; j < monkeys[i].split('\n')[1].split(' ').length; j++) {
		if (!isNaN(parseInt(monkeys[i].split('\n')[1].split(' ')[j])))
			items.push(parseInt(monkeys[i].split('\n')[1].split(' ')[j]));
	}
	let operation = monkeys[i].split('\n')[2].split(':').pop().trim();
	operation = operation.split(' = ').pop().trim();
	let test = monkeys[i].split('\n')[3].split(':').pop().trim();
	let testSuccess = monkeys[i].split('\n')[4].split(':').pop().trim();
	let testFail = monkeys[i].split('\n')[5].split(':').pop().trim();
	arrayOfMonkeys.push(new Monkey(name, items, operation, test, testSuccess, testFail, 0));
}

for (let a = 0; a < 20; a++) {
	for (let i = 0; i < arrayOfMonkeys.length; i++) {
		let itemsLength = arrayOfMonkeys[i].startingItems.length;
		for (let j = 0; j < itemsLength; j++) {
			arrayOfMonkeys[i].numberOfInspects++;

			let operation = arrayOfMonkeys[i].operation.split('old').join(arrayOfMonkeys[i].startingItems[0]);
			let result = eval(operation);

			//Monkey gets bored with item
			result = Math.floor(result / 3);

			//test result for success
			let test = parseInt(arrayOfMonkeys[i].test.split(' ')[2]);
			if (result % test === 0) {
				//success
				let monkey = arrayOfMonkeys[i].testSuccess.split(' ')[3];
				arrayOfMonkeys[monkey].startingItems.push(result);
				arrayOfMonkeys[i].startingItems.shift();
			} else {
				//fail
				let monkey = arrayOfMonkeys[i].testFail.split(' ')[3];
				arrayOfMonkeys[monkey].startingItems.push(result);
				arrayOfMonkeys[i].startingItems.shift();
			}
		}
	}
}

function totalInspects() {
	let total = [];
	for (let i = 0; i < arrayOfMonkeys.length; i++) {
		total.push(arrayOfMonkeys[i].numberOfInspects);
	}

	findLargest3(total);
	return total[0] * total[1];
}

function findLargest3(array) {
	array.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
	return array.slice(0, 2);
}

console.log(totalInspects());