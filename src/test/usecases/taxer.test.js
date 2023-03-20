const taxApplier = require('../../src/usecases/tax.applier.js');
const Operation = require('../../src/entities/operation.js');

describe("stock operation taxer", () => {
    test("it should return case 1 response", () => {
        const input = [
          new Operation("buy", 10, 100),
          new Operation("sell", 15, 50),
          new Operation("sell", 15, 50)
        ];
  
        expect(taxApplier(input).taxList).toEqual(["0.00", "0.00", "0.00"]);
    });

    test("it should return case 2 response", () => {
        const input = [
          new Operation("buy", 10, 1000),
          new Operation("sell", 20, 5000),
          new Operation("sell", 5, 5000)
        ];
  
        expect(taxApplier(input).taxList).toEqual(["0.00", "10000.00", "0.00"]);
    });

    test("it should return case 3 response", () => {
        const input = [
          new Operation("buy", 10, 10000),
          new Operation("sell", 5, 5000),
          new Operation("sell", 20, 3000)
        ];
  
        expect(taxApplier(input).taxList).toEqual(["0.00", "0.00", "1000.00"]);
    });

    test("it should return case 4 response", () => {
        const input = [
          new Operation("buy", 10, 10000),
          new Operation("buy", 25, 5000),
          new Operation("sell", 15, 10000)
        ];
  
        expect(taxApplier(input).taxList).toEqual(["0.00", "0.00", "0.00"]);
    });

    test("it should return case 5 response", () => {
        const input = [
          new Operation("buy", 10, 10000),
          new Operation("buy", 25, 5000),
          new Operation("sell", 15, 10000),
          new Operation("sell", 25, 5000),
        ];
  
        expect(taxApplier(input).taxList).toEqual(["0.00", "0.00", "0.00", "10000.00"]);
    });

    test("it should return case 6 response", () => {
        const input = [
            new Operation("buy", 10, 10000),
            new Operation("sell", 2, 5000),
            new Operation("sell", 20, 2000),
            new Operation("sell", 20, 2000),
            new Operation("sell", 25, 1000)
        ];
  
        expect(taxApplier(input).taxList).toEqual(["0.00", "0.00","0.00","0.00",
       "3000.00"]);
    });

    test("it should return case 7 response", () => {
      const input = [
        new Operation("buy", 10, 10000),
        new Operation("sell", 2, 5000),
        new Operation("sell", 20, 2000),
        new Operation("sell", 20, 2000),
        new Operation("sell", 25, 1000),
        new Operation("buy", 20, 10000),
        new Operation("sell", 15, 5000),
        new Operation("sell", 30, 4350),
        new Operation("sell", 30, 650)
      ];

      expect(taxApplier(input).taxList).toEqual(["0.00", "0.00","0.00","0.00",
       "3000.00", "0.00", "0.00","3700.00", "0.00"]);
    });

    test("it should return case 8 response", () => {
        const input = [
          new Operation("buy", 10, 10000),
          new Operation("sell", 50, 10000),
          new Operation("buy", 20, 10000),
          new Operation("sell", 50, 10000)
        ];
  
        expect(taxApplier(input).taxList).toEqual(["0.00", "80000.00","0.00","60000.00"]);
      });
});