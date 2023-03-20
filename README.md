## Introduction

STOCK OPERATION TAXER is a project which calculates taxes by writing them out to the stdout given some stock operation list passed at stdin.
It was developed with NodeJS/javascript, readline module to read and write to std and jest for the unit tests.
The architecture was roughly inspired by Clean Arch. In this case the domain objects should be located at entities package, 
domain logics at usecases package and objects that implements external interaction at interfaces package.
The logic at tax.applier.js basically accumulates all tax operations by using map reduce and returns it to the caller interface.


## Installation Instructions

-make sure node environment is installed on your machine
-enter npm install


## Run Tests

at root folder of the project type on terminal npm run test


## Run Application

At the root folder of the project type on terminal: npm run start
Enter a stock input list with a line break at the end as follows:
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000}]
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]
[{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":10.00, "quantity": 5000}]

the following output should be printed at stdout:
[{"tax":"20000.00"},{"tax":"0.00"},{"tax":"8000.00"},{"tax":"8000.00"},{"tax":"5000.00"}]
[{"tax":"20000.00"},{"tax":"20000.00"}]
[{"tax":"40000.00"},{"tax":"10000.00"}]
