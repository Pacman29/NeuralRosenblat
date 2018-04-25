import BaseNeuralNetworkManager from "../BaseNeuralNetwork/BaseNeuralNetworkManager";
import SNeuralLayer from "./neuralLayers/SNeuralLayer";
import ANeuralLayer from "./neuralLayers/ANeuralLayer";
import RNeuralLayer from "./neuralLayers/RNeuralLayer";
import fs from "mz/fs";
export default class Perceptron extends BaseNeuralNetworkManager {
    get layers() {
        return this._layers;
    }
    constructor() {
        super();
        this._layers = {
            S: new SNeuralLayer(),
            A: new ANeuralLayer(),
            R: new RNeuralLayer(),
        }
    }



    /*
    * {
    *   inputsCount: n,
    *   RNeuronsCount: n,
    *   S: {
    *     transformationFunction: () => {return 0..1}
    *   },
    *   A: {
    *     learningSpeed: 1,
    *     bias: 0,
    *     activationFunction: (x) => {return 0..1} ,
    *   },
    *   R: {
    *     learningSpeed: 1,
    *     bias: 0,
    *     activationFunction: (x) => {return -1..1} ,
    *     initWeightsFunction: ()=> {return w}
    *   },
    * }
    * */
    createNeuralNetwork(options){
        for(let i = 0; i<options.inputsCount; ++i){
            this._layers.S.addNeuron(options.S.transformationFunction);
        }
        let ANeuronsCount = Math.pow(2,options.inputsCount)-1;
        for(let i = 0; i<ANeuronsCount; ++i){
            let wArray = [];
            wArray.length = options.inputsCount;
            wArray.fill(-1);
            let tmp = parseInt(i+1,10).toString(2).split("").map(x => {
                return Number(x) === 0 ? -1 : 1;
            });

            for(let j = 0 ; j< tmp.length; ++j)
                wArray[wArray.length-1-j] = tmp[tmp.length-1-j];

            let index = 0;
            let initW = () => {
                return wArray[index++];
            };


            this._layers.A.addNeuron(
                options.inputsCount,
                options.A.learningSpeed,
                options.A.bias,
                options.A.activationFunction,
                initW
                );
        }
        for(let i=0; i<options.RNeuronsCount; ++i ){
            this._layers.R.addNeuron(
                ANeuronsCount,
                options.R.learningSpeed,
                options.R.bias,
                options.R.activationFunction,
                options.R.initWeightsFunction
                )
        }
    }

    solve(inputs){
        let result = inputs;
        result = this._layers.S.solve(result);
        result = this._layers.A.solve(result);
        result = this._layers.R.solve(result);
        return result;
    }

    correction(needValues){
        this._layers.R.correction(needValues);
    }

    train(dataset){
        let flagCheck = true;
        let iter = 0;
        while (flagCheck){
            flagCheck = false;
            dataset.forEach(data => {
                let results = this.solve(data.inputs);
                results.forEach((result,i) => {
                    if(result !== data.result[i]){
                        this.correction(data.result);
                        flagCheck = true;
                    }
                });

            });
            if(!(iter%1)){
                dataset.forEach(data => {
                    console.log(`${iter}\t${data.inputs}\t${this.solve(data.inputs)}`)
                })
            }
            iter++;
        }
    }

    async save(fileName){
        let config = [];
        Object.keys(this._layers).forEach(key => {
            config.push(this._layers[key].saveNeuralLayer());
        });
        let obj = {
            neuralType: 'Perceptron',
            neuralConfig: config,
        };
        try {
            await fs.writeFile(fileName,JSON.stringify(obj,null,2))
        } catch (err) {
            console.log('config not save');
        }
        console.log('config save');
    }

    static async load(fileName,RInitWeightsFunction,
                      AActiavationFunction,RActiavationFunction,transformationFunction){
        let data;
        try {
            data = JSON.parse(await fs.readFile(fileName, 'utf8'));
        } catch (err) {
            console.log('config not read');
        }
        if(data.neuralType !== 'Perceptron'){
            console.log('config not support');
            return;
        }
        let network = new Perceptron();
        data.neuralConfig.forEach(layer => {
            switch (layer.neuralLayerType){
                case 'ANeuralLayer': {
                    network._layers.A.loadNeuralLayer(layer);
                    network._layers.A.setActivationFunction(AActiavationFunction);
                    break;
                }
                case 'RNeuralLayer':{
                    network._layers.R.loadNeuralLayer(layer);
                    network._layers.R.setActivationFunction(RActiavationFunction);
                    network._layers.R.setInitWeightsFunction(RInitWeightsFunction);
                    break;
                }
                case 'SNeuralLayer':{
                    network._layers.S.loadNeuralLayer(layer);
                    network._layers.S.setTransformationFunction(transformationFunction);
                    break;
                }
            }
        });
        return network;
    }
}
