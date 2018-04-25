import BaseNeuralLayer from "../../BaseNeuralNetwork/neuralLayers/baseNeuralLayer";
import RNeuron from "../neuros/RNeuron";
import SNeuron from "../neuros/SNeuron";

export default class RNeuralLayer extends BaseNeuralLayer{
    constructor(){
        super();
    }

    addNeuron(inputsCount,learningSpeed,bias,activationFunction,initWeightsFunction){
        let neuron = new RNeuron();
        neuron.setActivationFunction(activationFunction);
        neuron.setInitWeightsFunction(initWeightsFunction);
        neuron.initInputsWeights(inputsCount);
        neuron.setLearningSpeed(learningSpeed);
        neuron.setBias(bias);
        super.addNeuron(neuron);
    }

    solve(inputs){
        let results = [];
        this._neurons.forEach((neuron) => {
            results.push(neuron.solve(inputs));
        });
        return results;
    }

    correction(needValues){
        this._neurons.forEach((neuron,i) => {
            neuron.correction(needValues[i]);
        })
    }

    saveNeuralLayer(){
        let obj = super.saveNeuralLayer();
        obj.neuralLayerType = 'RNeuralLayer';
        return obj;
    }

    loadNeuralLayer(obj){
        if(obj.neuralLayerType !== "RNeuralLayer")
            throw 'neuralLayerType is incorrect';

        for(let neuronObj of obj.neurons){
            let neuron = new RNeuron();
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