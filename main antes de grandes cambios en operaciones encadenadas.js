class Calculator {
    firstNumber;
    nextNumber;
    decimalLength = '0000';

constructor (firstNumber, nextNumber = 0) {
    this.firstNumber = firstNumber;
    this.nextNumber = nextNumber;
};

rounding (toBeRounded) { return Math.floor(toBeRounded * ~~('1' + this.decimalLength)) /  ~~('1' + this.decimalLength)};

    get addition ()         { return this.rounding(this.firstNumber + this.nextNumber) };
    get substraction ()     { return this.rounding(this.firstNumber - this.nextNumber) };
    get multiplication ()   { return this.rounding(this.firstNumber * this.nextNumber) };
    get division ()         { return this.rounding(this.firstNumber / this.nextNumber) };
    get squareRoot ()       { return this.rounding(Math.sqrt(this.firstNumber)) };
    get percentage ()       { return this.rounding(this.nextNumber / 100) }; // OJO NEXT NUMBER
    get sign ()             { return this.rounding(this.firstNumber * -1) };

};


// new code from 09/12

let inputDisplay = [];
let inputsBuffer = [];
let calculatorOperations = {}

    const getNumber = (id) => {
        const number = document.getElementById(id);
        const zeroClear = document.getElementById("on");
        number.addEventListener("click", () => { 
            const numberValue = number.value
            const zeroOn = zeroClear.parentNode;
            if(zeroOn) { 
                zeroOn.removeChild(zeroClear)
            };
                if(inputDisplay.length < 13) { // longitud max de datos 
                inputDisplay.push(numberValue);
                showInDisplay(inputDisplay[inputDisplay.length -1])
            }
            console.log(inputDisplay.join('')) // to DELETE
        });
    };

    

    const showInDisplay = (number) => {
        const workingDisplay = document.createElement("span");
        workingDisplay.textContent = number;
        
        const display = document.getElementById("display-numbers");
        display.appendChild(workingDisplay);
    };



    const operationSaver = (id) => {
        const operator = document.getElementById(id);
        const zeroClear = document.getElementById("on");
        
        operator.addEventListener("click", () => { 

            const zeroOn = zeroClear.parentNode;
            if (zeroOn) { 
                zeroOn.removeChild(zeroClear);
            };

            inputDisplay.push(operatorIdentifier(id));
            showInDisplay(inputDisplay[inputDisplay.length -1])
            inputDisplay.pop();
            inputsBuffer.push(inputDisplay.join(''));
            inputDisplay = [];


            if (!calculatorOperations.operator) {
                
                calculatorOperations.operator = operatorIdentifier(id);
                calculatorOperations.numberA = inputsBuffer[0];

            } else {
                
                calculatorOperations.numberB = inputsBuffer[1];
                inputsBuffer.shift();

                if (id === 'add') {
                    if (calculatorOperations.operator !== operatorIdentifier(id)) {
                        calculatorOperations.operatorN = calculatorOperations.operator;
                    }
                    const operation = new Calculator(~~calculatorOperations.numberA, ~~calculatorOperations.numberB);
                    calculatorOperations.numberN = operation.addition;

                }  else if (id === 'substract') {
                    calculatorOperations.operatorN = operatorIdentifier(id);
                    const operation = new Calculator(calculatorOperations.numberA, calculatorOperations.numberB);
                    calculatorOperations.numberN = operation.substraction;
                }
                    
                const displayClear = document.getElementById("display-numbers");
                const displayUsed = displayClear.parentNode;
                    displayUsed.removeChild(displayClear);
                    const resetedDisplay = document.createElement("span");
                        resetedDisplay.setAttribute("id", "display-numbers");
                        display = document.querySelector(".calculator-display");
                        display.appendChild(resetedDisplay);

                showInDisplay(calculatorOperations.numberN); // temporal, he de borrar contenido de pantalla y volver a crearlo con esta cantidad
                inputsBuffer = [];
                inputsBuffer[0] = calculatorOperations.numberN;
                delete calculatorOperations.NumberA;
                calculatorOperations.numberA = inputsBuffer[0];
                delete calculatorOperations.NumberB;

                calculatorOperations.operatorN = calculatorOperations.operator;
                delete calculatorOperations.operatorN;
                showInDisplay(operatorIdentifier(id));

            
                        
            }
            console.log(inputDisplay.join('')) // to DELETE
            console.log(inputDisplay) // to DELETE
            console.log(calculatorOperations);// to DELETE
            console.log(inputsBuffer);// to DELETE

            
        });
    };


    const operatorIdentifier = (id) => {
        let operatorID = id;
        switch (operatorID) {
            case 'add': 
                return '+';
            case 'substract': 
                return '-';
            case 'multiplicate': 
                return 'x';
            case 'divide': 
                return  '÷';
            case 'percentage': 
                return '%';
            case 'sign': 
                return '-';
            case 'equal':
                return  '=';
            case 'all-clear':
                return 'C';
            default: 
                return 'err';
        };

    };

/* const operatorId= id => id;
    const operatorIndex = inputDisplay.findIndex(operatorId);
    const numberA = inputDisplay.slice */


/* OBJETIVOS:

    - cuando usuario introduce negativo en cualquier momento, transforma el valor existente en ese momento en negativo
    - el operador . añade un punto y convierte el numero en decimal xd
    - el operador % solo responde despues despues de otro operador, sumando restando multiplicando o diviendiendo por el % por ciento que es el numero 2
    - OJO!!!!! valor quitar el operador +/- y poner raiz cuadrada o quitar % y poner raiz cuadrada
    - /// si añado raiz cuadra:     
            - raiz cuadrada no es pera otro numero, opera el anterior
    - cuando usuario introduce operador extraemos el primer string de datos númericos para convertirlo en numeros
    - cuando usario introduce nuevo operador o = extraermos segundo string lo convertimos en número y lo operamos con el primero segun el operador
    - el resultado se presenta en pantalla y pasa a ser el first number
    - el operador = no opera sinmplemente ordena operar lo anterior y se queda a la espera de nuevo operador y nuevo numero para operar
    - dividir por 0 tiene que devolver error





*/

getNumber("0"); getNumber("1"); getNumber("2"); getNumber("3");
getNumber("4"); getNumber("5"); getNumber("6"); getNumber("7");
getNumber("8"); getNumber("9");
operationSaver("add"); operationSaver("substract");


/*
console.log(operation.addition)
console.log(operation.substraction)
console.log(operation.multiplication)
console.log(operation.division)
console.log(operation.percentage)
console.log(operation.squareRoot)
*/