import axios from '../config/axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies()

export const onRegister = (name, age, email, password) => {
     return () => {
         axios.post('/users', {
             name, age, email, password
         }).then(res => {
             console.log("Register successful");

         }).catch(e => {
             console.log(e.response.data);
         })
     }
 }

export const onLoginClick = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/login', { email, password })
            console.log(res);

            cookie.set('masihLogin', res.data.name, { path: '/' })
            cookie.set('idLogin', res.data._id, { path: '/' })
            cookie.set('age', res.data.age, { path: '/' })
            cookie.set('email', res.data.email, { path: '/' })
            cookie.set('password', res.data.password, { path: '/' })


            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data._id, 
                    name: res.data.name,
                    age: res.data.age,
                    email: res.data.email,
                    password: res.data.password
                }
            })

        } catch (e) {
            console.log(e);

        }
    }
}

export const editProfile = (name, age, email, password, userid) => {
    return async dispatch => {
        try {
            if(password === ''){
                var res = await axios.patch(`/users/${userid}`, {
                    name, age, email,
                });
            } else{
                var res = await axios.patch(`/users/${userid}`, {
                name, age, email, password
                })
            } 

            cookie.get('masihLogin', res.data.name, { path: '/' })
            cookie.get('idLogin', res.data._id, { path: '/' })
            cookie.get('age', res.data.age, { path: '/' })
            cookie.get('email', res.data.email, { path: '/' })
            cookie.get('password', res.data.password, { path: '/' })
            console.log(res);

            dispatch({
                type: 'EDIT_SUCCESS',
                payload: {
                    id: res.data._id,
                    name: res.data.name,
                    age: res.data.age,
                    email: res.data.email,
                    password: res.data.password
                }
            })
            
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const keepLogin = (name, id, age, email, password) => {
    if(name === undefined && id === undefined){
        return{
            type: 'KEEP_LOGIN',
            payload: {
                id: '',
                name: '',
                age: 0,
                email: '',
                password: ''
            }
        } 
    }return{
        type: 'KEEP_LOGIN',
        payload: {
            id, 
            name,
            age,
            email,
            password
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('masihLogin')
    cookie.remove('idLogin')
    cookie.remove('age')
    cookie.remove('name')
    cookie.remove('email')
    cookie.remove('password')
    return {type: 'LOGOUT_USER'}
}
