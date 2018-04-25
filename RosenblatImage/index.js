import Perceptron from "./Perceptron";
import initA from "./initA";
import dataset from "./dataset";
import ANeuron from "./Perceptron/neuros/ANeuron";
import RNeuron from "./Perceptron/neuros/RNeuron";

async function testPerceptron() {
    let net = new Perceptron();

    let layers = net.layers;

    let inputsCount = dataset[0].inputs.length;

    for(let i = 0; i<inputsCount; ++i){
        layers.S.addNeuron((x) => x);
    }

    initA.forEach(initObj => {
       let neuron = new ANeuron();
       neuron.setInputsWeights(initObj.weights);
       neuron.setBias(initObj.bias);
       neuron.setLearningSpeed(0.1);
       neuron.setActivationFunction(x => x >= 0 ? 1 : 0);
       layers.A.addNeuron(neuron);
    });

    for(let i = 0; i<10; ++i){
        layers.R.addNeuron(initA.length,0.01,0,(x) => x > 0 ? 1: -1, () => 0);
    }

    net.train(dataset);
    console.log('check');
    dataset.forEach(data => {
        console.log(`${data.inputs}\t${net.solve(data.inputs)}`)
    });
    net.save('perceptron-config.json')
}

async function load(input) {
    let RinitWeightsFunction = ()=>  0;
    let AactivationFunction = (x) => {
        return x >= 0 ? 1 : 0;
    };
    let RactivationFunction = (x) => {
        return x>0 ? 1 : -1;
    };
    let StransformationFunction = (x) => {return x};

    let net = await Perceptron.load('perceptron-config.json',
        RinitWeightsFunction,AactivationFunction,RactivationFunction,StransformationFunction);
    return net.solve(input)
}

(async function main() {
    //testPerceptron();
    console.log(await load([
        1,1,1,1,1,
        1,0,0,0,0,
        1,0,0,0,0,
        1,0,0,0,1,
        1,1,1,1,1
    ]))
})();