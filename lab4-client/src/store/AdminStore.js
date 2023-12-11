import {makeAutoObservable} from "mobx";

export default class AdminStore {
    constructor() {
        this._model = "_"
        makeAutoObservable(this)
    }

    get model() {
        return this._model
    }
}