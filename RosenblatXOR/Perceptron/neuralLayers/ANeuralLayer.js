import BaseNeuralLayer from "../../BaseNeuralNetwork/neuralLayers/baseNeuralLayer";
import ANeuron from "../neuros/ANeuron";
import RNeuron from "../neuros/RNeuron";

export default class ANeuralLayer extends BaseNeuralLayer{
    constructor(){
        super();
    }

    addNeuron(inputsCount,learningSpeed,bias,activationFunction,initWeightsFunction){
        let neuron = new ANeuron();
        neuron.setActivationFunction(activationFunction);
        neuron.setInitWeightsFunction(initWeightsFunction);
        neuron.initInputsWeights(inputsCount);
        neuron.setLearningSpeed(learningSpeed);
        neuron.setBias(bias);
        super.addNeuron(neuron);
    }

    solve(inputs){
        let results = [];
        this._neurons.forEach((neuron,i) => {
            results.push(neuron.solve(inputs));
        });
        return results;
    }

    correction(){

    }

    saveNeuralLayer(){
        let obj = super.saveNeuralLayer();
        obj.neuralLayerType = 'ANeuralLayer';
        return obj;
    }

    loadNeuralLayer(obj){
        if(obj.neuralLayerType !== "ANeuralLayer")
            throw 'neuralLayerType is incorrect';

        for(let neuronObj of obj.neurons){
            let neuron = new ANeuron();
            neuron.loadNeuron(neuronObj);
            super.addNeuron(neuron);
        }
    }

    setActivationFunction(activationFunction){
        this._neurons.forEach(neuron => {
            neuron.setActivationFunction(activationFunction)
        })
    }

    setInitWeightsFunction(init){
        this._neurons.forEach(neuron => {
            neuron.setInitWeightsFunction(init);
        })
    }

    setTransformationFunction(trFunc){
    }
}