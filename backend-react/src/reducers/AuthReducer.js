const init = {
    id: '',
    name: '',
    age: '',
    email: '',
    password: ''
}

 export default (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state, 
                id: action.payload.id, 
                name: action.payload.name, 
                age: action.payload.age, 
                email: action.payload.email,
                password: action.payload.password
            };

        case 'KEEP_LOGIN':
            return {
                ...state, 
                id: action.payload.id, 
                name: action.payload.name, 
                age: action.payload.age, 
                email: action.payload.email,
                password: action.payload.password
            };

        case 'EDIT_SUCCESS':
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                age: action.payload.age,
                email: action.payload.email,
                password: action.payload.password
            };

        case 'LOGOUT_USER':
            return state = init

         default:
            return state
    }
} 