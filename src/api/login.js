import axios from 'axios'

const tokenKey = 'accessToken'

export default class LoginService {
  _urlBase = 'https://localhost:5001'

  // отправка запроса к контроллеру AccountController для получения токена
  async getTokenAsync(payload) {
    // деструктурируем объект с информацией для входа
    const { username, password } = payload
    const userInfo = { UserName: username, Password: password }
    // отправляем запрос с данными на сервер и получаем токен в случае успешной обработки
    // sessionStorage.setItem(tokenKey, 1)
    // sessionStorage.setItem('role', 'admin')
    // return ({ role: 'admin', token: 1 })
    const response = await fetch(this._urlBase + '/token', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userInfo)
    })
    // переводим данные в json
    const data = await response.json()

    // если запрос прошел нормально
    if (response.ok === true) {
      // сохраняем в хранилище sessionStorage токен доступа
      sessionStorage.setItem(tokenKey, data.access_token)
      sessionStorage.setItem('role', data.role)
      sessionStorage.setItem('username', data.username)
      return await data
    } else {
      // если произошла ошибка, из errorText получаем текст ошибки
      return data.errorText
    }
  }
  // регистрация нового пользователя
  async register(payload, flag) {
    const { username, password, email, employeeId } = payload
    let role
    let sendObj
    // определяем отправляемые объекты в зависимости от назначаемой роли пользователя
    switch (flag) {
      case 'admin':
        role = 1
        sendObj = { UserName: username, Password: password, Email: email, RoleId: role, EmployeeId: employeeId }
        break
      case 'employee':
        role = 2
        sendObj = { UserName: username, Password: password, Email: email, RoleId: role, EmployeeId: employeeId }
        break
      case 'client':
        role = 3
        sendObj = { UserName: username, Password: password, Email: email, RoleId: role }
        break
    }
    // отправляем на сервер информацию для регистрации пользователя
    const response = await axios.post(this._urlBase + '/registration', sendObj)
    // возвращаем статус запроса, чтобы сказать пользователю, успешно ли прошла регистрация
    return response
  }

  // отправка запроса к контроллеру ValuesController
  async getData(url) {
    const token = sessionStorage.getItem(tokenKey)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token // передача токена в заголовке
      }
    })
    if (response.ok === true) {
      const data = await response.json()
      alert(data)
    } else {
      console.log('Status: ', response.status)
    }
  }
}

