const taxApplier = require('../../src/usecases/tax.applier.js');
const taxApplierEntry = require('../../src/interfaces/std.operation.taxer.js');

describe("tax applier entry", () => {
    test("it should return transformed tax list", () => {
  
        expect(taxApplierEntry(JSON.stringify([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
        {"operation":"sell", "unit-cost":5.00, "quantity": 5000},
        {"operation":"sell", "unit-cost":20.00, "quantity": 3000}]
        ))).toEqual([{"tax":"0.00"},{"tax":"0.00"},{"tax":"1000.00"}]);
    });

});