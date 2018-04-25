import BaseNeuron from "../../BaseNeuralNetwork/neuros/baseNeuron";

export default class SNeuron extends BaseNeuron{
    constructor(){
        super();
        this._transformationFunction = (input) => {
            return input;
        }
    }


    setTransformationFunction(transformationFunction){
        this._transformationFunction = transformationFunction;
    }

    solve(input){
        return this._transformationFunction(input);
    }

    correction(){

    }

    saveNeuron(){
        return {
            neuronType: 'SNeuron',
        }
    }

    loadNeuron(obj){
        if(obj.neuronType !== 'SNeuron')
            throw 'neuron type is incorrect';
    }
}