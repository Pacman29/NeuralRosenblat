import BaseNeuron from "../../BaseNeuralNetwork/neuros/baseNeuron";

export default class ActivationNeuron extends BaseNeuron{
    setActivationFunction(activationFunction){
        this._activationFunction = activationFunction;
    }

    _summator(inputs){
        let sum = -this._bias;
        for(let i = 0; i<this._inputsWeights.length; ++i)
            sum += this._inputsWeights[i]*inputs[i];
        return sum;
    }

    solve(inputs){
        this._lastInputs = inputs;
        this._lastResult = this._activationFunction(this._summator(inputs));
        return this._lastResult;
    }
}