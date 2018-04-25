export default class BaseNeuralLayer{
    constructor(){
        this._neurons = [];
    }

    addNeuron(neuron){
        this._neurons.push(neuron);
    }

    solve(){
        throw 'solve method is not override';
    }

    getNeurons(){
        return this._neurons;
    }

    correction(){
        throw 'correction method is not override';
    }

    saveNeuralLayer(){
        let neurons = [];
        this._neurons.forEach(neuron => {
           neurons.push(neuron.saveNeuron());
        });
        return {
            neurons
        }
    }

    loadNeuralLayer(){
        throw 'loadNeuralLayer method is not implement';
    }

    reInitWeights(){
        this._neurons.forEach(neuron => {
            neuron.reInitWeights();
        });
    }
}