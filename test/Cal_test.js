var assert = require('assert');
const calc = require("../samples/Calc")

describe("Calculadora", ()=>{
    before(()=>{
        console.log("Probando las funciones");
    });

    after(()=>{
        console.log("Fin de las pruebas")
    });

    //SUMAR
    describe("Sumar", ()=>{
        it("Debe retornar 5", ()=>{
            assert.equal(calc.add(3,2), 5);
        });

        it("Debe retornar 5", ()=>{
            assert.equal(calc.add(3,2), 5);
        });
    });

    //Assert throws evaluar una exepción
        it("Retornar error",()=>{
            assert.throws(
                function(){
                    calc.add(5, 'hola');
                },
            {
                name: "Error",
                message: "Valores inválidos"
            }
            );
        });

    //RESTAR
    describe("Restar", ()=>{
        it("Debe retornar 2", ()=>{
            assert.equal(calc.sustraction(5,3), 2);
        });

        it("Debe retornar -10", ()=>{
            assert.equal(calc.sustraction(10,20), -10);
        });
    });

    //Multiplicar
    describe("Multiplicar", ()=>{
        it("Debe retornar 25", ()=>{
            assert.equal(calc.multiplicar(5,5), 25);
        });
    });


    //División
    describe("Dividir", ()=>{
        it("Debe retornar 5", ()=>{
            assert.equal(calc.division(10,2), 5);
        });
    });

    //Arreglos
    describe('Arreglos', ()=>{
        it("Debe retornar 21", ()=>{
            assert.equal(calc.sumArray([1,2,3,4,5,6]), 21);
        });

        //Retornar Error
        it("Debe retornar error al colocar Hola",()=>{
            assert.throws(
                function(){
                    calc.sumArray([2,6,1, `hola`])
                },
                {
                    name:"Error",
                    message:"Valores invalidos"
                }
            )
        });
    });
});
