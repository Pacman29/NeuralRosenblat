import initedArrayCreator from "../lib/initedArrayCreator";

export default class BaseNeuron {
    setInputsWeights(weights){
        this._inputsWeights = weights;
    }

    getInputsWeights(){
        return this._inputsWeights;
    }

    setInitWeightsFunction(initFunction){
        this._initWeightsFunction = initFunction;
    }

    initInputsWeights(inputsCount){
        this._inputsWeights = initedArrayCreator(inputsCount,this._initWeightsFunction);
        this._bias = this._initWeightsFunction();
    }

    reInitWeights(){
        this._inputsWeights = initedArrayCreator(this._inputsWeights.length,this._initWeightsFunction);
        this._bias = this._initWeightsFunction();
    }

    setLearningSpeed(value){
        this._learningSpeed  = value;
    }

    getLearningSpeed(){
        return this._learningSpeed;
    }

    setBias(value){
        this._bias = value;
    }

    getBias(){
        return this._bias;
    }

    getSigma(){
        return this._sigma;
    }

    solve(inputs){
        throw 'solve method is not override';
    }

    correction(){
        throw 'correction method is not override';
    }

    saveNeuron(){
        return {
            inputsWeights: this._inputsWeights,
            bias: this._bias,
            learningSpeed: this._learningSpeed,
        }
    }

    loadNeuron(obj){
        if(obj.inputsWeights === undefined || obj.bias === undefined || obj.learningSpeed === undefined)
            throw 'neuros obj is incorrect';

        this._inputsWeights = obj.inputsWeights;
        this._learningSpeed = obj.learningSpeed;
        this._bias = obj.bias;
    }

}