import Perceptron from "./Perceptron";


async function testPerceptron() {
    let dataset = [
        {
            inputs: [0,0],
            result: [-1],
        },
        {
            inputs: [0,1],
            result: [1],
        },
        {
            inputs: [1,0],
            result: [1],
        },
        {
            inputs: [1,1],
            result: [-1],
        },
    ];
    let net = new Perceptron();

    net.createNeuralNetwork({
         inputsCount: 2,
         RNeuronsCount: 1,
         S: {
              transformationFunction: (x) => {return x}
            },
         A: {
              learningSpeed: 1,
              bias: 0,
              activationFunction: (x) => {
                  return x > 0 ? 1 : 0;
              } ,
            },
         R: {
              learningSpeed: 1,
              bias: 0,
              activationFunction: (x) => {
                  return x>0 ? 1 : -1;
              } ,
              initWeightsFunction: ()=> {return 0}
              },
        });

    net.train(dataset);
    console.log('check');
    dataset.forEach(data => {
        console.log(`${data.inputs}\t${net.solve(data.inputs)}`)
    });
    net.save('perceptron-config.json')
}

async function load(input) {
    let RinitWeightsFunction = ()=> {return 0};
    let AactivationFunction = (x) => {
        return x > 0 ? 1 : 0;
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
    console.log(await load([0,0]))
})();