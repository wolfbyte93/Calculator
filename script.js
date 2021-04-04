class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.repeatOperand = ''
        this.operation = undefined
        this.previousOperandTextElement.innerText = ''
    }

    delete(){
        if(this.currentOperand != ''){
            this.currentOperand = this.currentOperand.toString().slice(0, this.currentOperand.length-1)
        }
        
    }

    appendNumber(number){
        if(number == "."){
            if(this.currentOperand.indexOf(".") < 0){
                this.currentOperand += number
            }
        }else{
            this.currentOperand += number  
        }
        
    }

    chooseOperation(operation){
       this.operation = operation
       if(this.currentOperand == ''){
           if(this.previousOperand == ''){
               this.previousOperand = "0"
               this.previousOperandTextElement.innerText += this.previousOperand + this.operation
           }else{
               this.previousOperandTextElement.innerText = this.previousOperandTextElement.innerText.slice(0, this.previousOperandTextElement.innerText.length-1)
               this.previousOperandTextElement.innerText += this.operation
           }  
       }else{
           if(this.currentOperand.substring(0,1) == "."){
               this.currentOperand = 0 + this.currentOperand
            }

           if(this.previousOperand != ''){
               this.previousOperandTextElement.innerText = ''
           }
           this.previousOperand = this.currentOperand
           this.previousOperandTextElement.innerText += this.previousOperand + this.operation
           this.currentOperand = ''   
       }
       
    }

    compute(){
        if(["*","-","+","÷"].includes(this.previousOperandTextElement.innerText.substring(this.previousOperandTextElement.innerText.length-1)) == true){
            if(this.operation != undefined){
                        if(this.currentOperand == ''){
                            this.currentOperand = this.previousOperand
                        }
                        if(this.currentOperand.substring(0,1) == "."){
                            this.currentOperand = 0 + this.currentOperand
                        }
                        this.previousOperandTextElement.innerText += this.currentOperand
                        this.repeatOperand = this.currentOperand
                        switch(this.operation){
                            case "+":
                                this.currentOperand = parseFloat(this.previousOperand) + parseFloat(this.currentOperand)
                                break;
                            case "-":
                                this.currentOperand = parseFloat(this.previousOperand) - parseFloat(this.currentOperand)
                                break;
                            case "*":
                                this.currentOperand = parseFloat(this.previousOperand) * parseFloat(this.currentOperand)
                                break;
                            case "÷":
                                this.currentOperand = parseFloat(this.previousOperand) / parseFloat(this.currentOperand)
                                break;
                        }
                        if(this.currentOperand.toString().length > 16){
                            this.currentOperand = this.currentOperand.toPrecision(16)
                        }
                        this.currentOperand = this.currentOperand.toString()    
                    }
        }else if(this.previousOperand != ''){
            this.previousOperandTextElement.innerText = this.currentOperand + this.operation + this.repeatOperand
            switch(this.operation){
                case "+":
                    this.currentOperand = parseFloat(this.currentOperand) + parseFloat(this.repeatOperand)
                    break;
                case "-":
                    this.currentOperand = parseFloat(this.currentOperand) - parseFloat(this.repeatOperand)
                    break;
                case "*":
                    this.currentOperand = parseFloat(this.currentOperand) * parseFloat(this.repeatOperand)
                    break;
                case "÷":
                    this.currentOperand = parseFloat(this.currentOperand) / parseFloat(this.repeatOperand)
                    break;
            }

        }
        while(toString(this.currentOperand).substring(this.currentOperand.length-1) == 0 && toSting(this.currentOperand).indexOf(".") > 0){
            this.currentOperand = this.currentOperand.slice(0, this.currentOperand.length-1) 
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
    }

    setRandomColour(){
        let letters = '0123456789ABCDEF';
        let colour1 = '#';
        let colour2 = '#'
        for (let i = 0; i < 6; i++) {
            colour1 += letters[Math.floor(Math.random() * 16)];
        }

        for (let i = 0; i < 6; i++) {
            colour2 += letters[Math.floor(Math.random() * 16)];
        }

        document.querySelector('body').style.background = "linear-gradient("+colour1+", "+colour2+")"
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
    calculator.setRandomColour()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})