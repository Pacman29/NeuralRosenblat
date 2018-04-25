import ActivationNeuron from "./ActivationNeuron";

export default class ANeuron extends ActivationNeuron{
    correction(){

    }

    saveNeuron(){
        return {
            neuronType: 'ANeuron',
            neuronParams: super.saveNeuron(),
        }
    }

    loadNeuron(obj){
        if(obj.neuronType !== 'ANeuron')
            throw 'neuron type is incorrect';

        super.loadNeuron(obj.neuronParams);
    }

}