const readline = require("readline")
const taxApplier = require("../usecases/tax.applier.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

let taxesMap = [];

rl.on('line', (input) => {

    if (input === '' || input === undefined) {
        taxesMap.forEach(taxes => rl.write(JSON.stringify(taxes) + '\n'));
        process.exit();
    } else {
        const taxList = taxApplierEntry(input);
        taxesMap.push(taxList);
    }
});

const taxApplierEntry = (input) => {
    let operationList = JSON.parse(input).map( op =>(
        {operationType: op.operation,
        unitCost: op['unit-cost'], 
        quantity: op.quantity} ));
    
    return taxApplier(operationList).taxList.map((tax) => {
        return {tax: tax};
      });
}

module.exports = taxApplierEntry;
