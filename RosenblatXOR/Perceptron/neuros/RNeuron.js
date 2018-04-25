import ActivationNeuron from "./ActivationNeuron";

export default class RNeuron extends ActivationNeuron{
    // -1 or 1
    correction(needValue){
        if(needValue === this._lastResult)
            return;
        this._sigma = -this._lastResult;
        for(let i = 0; i<this._inputsWeights.length; ++i)
            this._inputsWeights[i] += this._sigma * this._learningSpeed * this._lastInputs[i];
        this._bias -= this._sigma * this._learningSpeed;
    }

    saveNeuron(){
        return {
            neuronType: 'RNeuron',
            neuronParams: super.saveNeuron(),
        }
    }

    loadNeuron(obj){
        if(obj.neuronType !== 'RNeuron')
            throw 'neuron type is incorrect';

        super.loadNeuron(obj.neuronParams);
    }
}