factorialize = (num) => {
  let product = 1;

  if (num < 0) {
    return "Number must be a positive number.";
  }

  if (!Number.isInteger(num)) {
    return "Number must be a positive integer.";
  }

  for (let i = 1; i <= num; i++) {
    product = product * i;
  }

  return product;
};

let number = 0;
let fact = factorialize(number);

console.log(`The factor of ${number} is: ${fact}`);
console.log(factorialize(-50));
console.log(factorialize(1.5));
