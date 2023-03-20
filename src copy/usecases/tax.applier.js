const OperationAccumulator = require('../entities/operation.accumulator.js')

const taxApplier = (operationList) => {

    return operationList.reduce((operationAcc, operation) => {

        return accumulateOperation(operationAcc, operation);
      
      }, new OperationAccumulator());

}

const accumulateOperation = (operationAccumulator, operation) => {

    let newOperationAccumulator = {};
    if (operation.operationType === 'buy')
        newOperationAccumulator = doBuyOperation(operationAccumulator, operation);
    else 
        newOperationAccumulator = doSellOperation(operationAccumulator, operation);

    return newOperationAccumulator;
}

const decimalTransform = (num) => num.toFixed(2);

function doSellOperation(operationAccumulator, operation) {
    let newOpAccumulator = { ...operationAccumulator}
    const profit = (operation.unitCost - newOpAccumulator.averagePrice) * operation.quantity;
    const taxPercent = 0.2;

    if (operationShouldBeTaxed(profit, newOpAccumulator, operation))
      newOpAccumulator.taxList.push(decimalTransform((profit + newOpAccumulator.prejudice) * taxPercent));
    else
        newOpAccumulator.taxList.push(decimalTransform(0));

    newOpAccumulator.prejudice += profit;
    if (newOpAccumulator.prejudice > 0)
        newOpAccumulator.prejudice = 0;
    newOpAccumulator.totalQuantity -= operation.quantity;

    return newOpAccumulator;
}

function operationShouldBeTaxed(profit, newOpAccumulator, operation) {
    const taxLimit = 20000;
    return ((profit + newOpAccumulator.prejudice) > 0) && (operation.unitCost * operation.quantity > taxLimit);
}

function doBuyOperation(operationAccumulator, operation) {
    let newOpAccumulator = { ...operationAccumulator}
    const totalPrice = newOpAccumulator.averagePrice * newOpAccumulator.totalQuantity +
        operation.unitCost * operation.quantity;

    const totalQuantity = (newOpAccumulator.totalQuantity + operation.quantity);

    newOpAccumulator.averagePrice = totalPrice / totalQuantity;

    newOpAccumulator.totalQuantity += operation.quantity;
    newOpAccumulator.taxList.push(decimalTransform(0));

    return newOpAccumulator;
}

module.exports = taxApplier;



