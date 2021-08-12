module.exports={
    add: ( num1, num2)=>{
        if (isNaN(num1)|| isNaN(num2)) {
            throw new Error("Valores inválidos")
        }
        return num1 + num2;
    },

    sustraction:(num1, num2)=>{
        return num1 - num2;
    },

    multiplicar:(num1, num2)=>{
        return num1 * num2;
    },
    
    division: ( num1, num2)=>{
        if (isNaN(num2===0)) {
            throw new Error("Cero no se puede dividir")
        }
        return num1 / num2;
    },

    sumArray: (values)=>{
        var sum = 0;
        for(var i = 0; i<values.length; i++){
            if (isNaN(values[i])) {
                throw new Error ("Valores invalidos");
            } else {
                sum = sum +values[i];
            }
        }
        return sum;
    }
};