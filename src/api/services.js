import axios from 'axios'

export default class ApiService {
  _apiBase = 'https://localhost:5001/api'

  async Get(url, params) {
    let fullUrl = this._apiBase + url
    if (Array.isArray(params)) {
      params.forEach((item) => {
        if (item[0] !== undefined) {
          fullUrl += `${item[0]}=${item[1]}&`
        }
      })
    }
    const data = await axios.get(fullUrl)
    return data
  }
  async Post(url, value) {
    const fullUrl = this._apiBase + url
    const data = await axios.post(fullUrl, value)
    return data
  }
  async Put(url, id, value) {
    const fullUrl = this._apiBase + url + `/${id}`
    const data = await axios.put(fullUrl, value)
    return data
  }
  async Delete(url, id) {
    const fullUrl = this._apiBase + url + `id=${id}`
    const data = await axios.delete(fullUrl)
    return data
  }

  // ЗАЯВКИ
  async getDeliveries() {
    return await this.Get('/Deliveries')
  }
  // принять заявку
  async takeDelivery(id, value) {
    const fullUrl = this._apiBase + '/Deliveries' + `/${id}`
    const data = await axios.put(fullUrl, id)
    return await data
  }
  // получить единицы заявки по ее id
  async getDeliveryItemsOfDelivery(id) {
    const fullUrl = this._apiBase + '/DeliveryItems/' + id
    const data = await axios.get(fullUrl)
    return await data
  }
  // получить типы топлива
  async getFuelTypes() {
    return await this.Get('/FuelTypes')
  }
  // получить колонки
  async getFillingColumns() {
    return await this.Get('/FillingColumns')
  }
  async postFillingColumnFuelType(payload) {
    return await this.Post('/FillingColumns', payload)
  }

  async getStations() {
    return await this.Get('/Stations')
  }
  async getFuels() {
    return await this.Get('/Fuels')
  }
  async getEmployees() {
    return await this.Get('/Employees')
  }
  async createEmployee(payload) {
    return await this.Post('/Employees', payload)
  }
  async getPositions() {
    return await this.Get('/Positions')
  }

  async postPricelistItem(payload) {
    //    const { FuelId, BeginDate, Price, Note } = payload
    const fullUrl = this._apiBase + '/PriceLists'
    const data = await axios.post(fullUrl, payload)
    return data
  }
  async getPricelist() {
    return await this.Get('/Pricelists')
  }

  // получаем данные по складу выбранной станции
  async getStorage(id) {
    const fullUrl = this._apiBase + '/Storages/' + id
    const data = await axios.get(fullUrl)
    return await data
  }

  // получить доступное топливо на заказ
  async getFuelsToOrder(id) {
    const fullUrl = this._apiBase + '/FillingColumns/' + id
    const data = await axios.get(fullUrl)
    return await data
  }
  // получение заказов
  async getOrders() {
    return await this.Get('/Orders')
  }

  async getOrdersOfUser(name) {
    console.log(name)
    const fullUrl = this._apiBase + '/Orders/' + name
    const data = await axios.get(fullUrl)
    return await data
  }

  async createOrder(payload) {
    console.log(payload)
    return await this.Post('/Orders', payload)
  }

  async postDelivery(payload) {
    const id = await this.Post('/Deliveries', payload)
    console.log(`from services: ${id}`)
    return id
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}`)
    return this._transformPlanet(person)
  }

}
