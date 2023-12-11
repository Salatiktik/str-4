import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
    
    console.log($host)
    try {
        console.log('Отправка запроса на сервер');
        const response = await $host.post('/api/user/registration', { email, password, role: 'ADMIN' });
        console.log('Ответ от сервера:', response);
    
        const { data } = response;
        if (data) {
          localStorage.setItem('token', data.token);
          console.log('Токен сохранен в localStorage');
        } else {
          console.error('Ошибка: Ответ от сервера не содержит токен');
        }
    
        const decodedToken = jwtDecode(data.token);
        console.log('Декодированный токен:', decodedToken);
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
}

export const login = async (email, password) => {
    console.log($host)
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const googleAuth = async(userData)=>{
  console.log(userData)
  console.log('api/user/google/token', {userData})
    const {data} = await $host.post('api/user/google/token', userData)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    console.log($authHost)
    try{
      const {data} = await $authHost.get('api/user/auth' )
      localStorage.setItem('token', data.token)
      return jwtDecode(data.token)
    } catch (e){
      
    }
}