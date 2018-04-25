export default class BaseNeuralNetworkManager {
    save(){
        throw 'save method is not override';
    }

    load(){
        throw 'load method is not override';
    }

    solve(input){
        throw 'solve method is not override';
    }

    train(dataset){
        throw 'train method is not override';
    }

    correction(result){
        throw 'correction method is not override';
    }
}