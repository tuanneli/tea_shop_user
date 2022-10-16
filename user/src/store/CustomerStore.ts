import {makeAutoObservable} from "mobx";
import {ICustomer, IHistory} from "../types/customerTypes";
import {CustomerService, GoodsService} from "../api/API";

export default class CustomerStore {

    constructor() {
        makeAutoObservable(this);
    }

    _customers = [] as ICustomer[];

    get customers() {
        return this._customers;
    }

    _errorMessage = "";

    get errorMessage() {
        return this._errorMessage;
    }

    _isFound = false;

    get isFound() {
        return this._isFound;
    }

    _customer = {} as ICustomer;

    get customer() {
        return this._customer;
    }

    setCustomers(customersData: ICustomer[]) {
        this._customers = customersData;
    }

    setErrorMessage(message: string) {
        this._errorMessage = message;
    }

    setIsFound(bool: boolean) {
        this._isFound = bool;
    }

    setCustomer(customerData: ICustomer) {
        this._customer = customerData;
    }

    async addCustomer(name: string, phone: string) {
        try {
            const response = await CustomerService.registerCustomer(name, phone);
            this.setCustomer(response.data);
            this.setIsFound(true);
            this.setErrorMessage("");
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrorMessage(e.response?.data?.message);
        }
    }

    async getCustomer(phone: string) {
        try {
            const response = await CustomerService.findCustomer(phone);
            this.setCustomer(response.data);
            this.setIsFound(true);
            this.setErrorMessage("");
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrorMessage(e.response?.data?.message);
        }
    }

    async getCustomers() {
        try {
            const response = await CustomerService.findCustomers();
            this.setCustomers(response.data);
            this.setErrorMessage("");
            return response.data;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrorMessage(e.response?.data?.message);
        }
    }
}