import BaseNeuralLayer from "../../BaseNeuralNetwork/neuralLayers/baseNeuralLayer";
import SNeuron from "../neuros/SNeuron";

export default class SNeuralLayer extends BaseNeuralLayer{
    constructor(){
        super();
    }

    addNeuron(transformationFunction){
        let neuron = new SNeuron();
        neuron.setTransformationFunction(transformationFunction);
        super.addNeuron(neuron);
    }

    solve(inputs){
        let results = [];
        this._neurons.forEach((neuron,i) => {
            results.push(neuron.solve(inputs[i]));
        });
        return results;
    }

    correction(){

    }

    saveNeuralLayer(){
        let obj = super.saveNeuralLayer();
        obj.neuralLayerType = 'SNeuralLayer';
        return obj;
    }

    loadNeuralLayer(obj){
        if(obj.neuralLayerType !== "SNeuralLayer")
            throw 'neuralLayerType is incorrect';

        for(let neuronObj of obj.neurons){
            let neuron = new SNeuron();
            neuron.loadNeuron(neuronObj);
            super.addNeuron(neuron);
        }
    }

    setActivationFunction(activationFunction){
    }

    setInitWeightsFunction(init){
    }

    setTransformationFunction(trFunc){
        this._neurons.forEach(neuron => {
            neuron.setTransformationFunction(trFunc);
        })
    }
}