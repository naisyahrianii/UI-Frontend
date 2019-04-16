import React, { Component } from 'react'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'
import axios from '../config/axios'

const cookie = new cookies()

class Editprofile extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        const userid = cookie.get('idLogin')
        this.getProfile(userid)
    }

    getProfile = async (userid) => {
        try {
            const res = await axios.get(`/users/me/${userid}`)
            this.setState({data: res.data})
            
        } catch (e) {
            console.log(e);
        }
    }

    onButtonClick = async (userid) => {
        const formData = new FormData()

        const name = this.name.value
        const email = this.email.value
        const age = this.age.value
        const password = this.password.value
        const avatar = this.image.files[0]

        formData.append('name', name)
        formData.append('age', age)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar)

        const res = await axios.post(`/editprofile/${userid}`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(res);
        
        
        
    }

    render() {
        if(this.state.data !== null){
            var {name, email, age} = this.state.data.user
        }
        return (
            <div className="container">
                <form>
                    <h1>Edit Profile</h1>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input ref={input => this.name = input} type="text" class="form-control" id="name" defaultValue={name}  />
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input ref={input => this.email = input} type="email" class="form-control" id="email" defaultValue={email} />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="age">Age</label>
                    <input ref={input => this.age = input} type="number" class="form-control" id="age" defaultValue={age} />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input ref={input => this.password = input} type="password" class="form-control" id="password"/>
                </div>
                <div className="custom-file">
                        <input type="file" id="myfile" multiple="multiple"  ref={input => this.image = input}/>
                </div>
                </form>
                <button type="submit" class="btn btn-primary" onClick={() => this.onButtonClick(this.props.id)}>Submit</button>
            </div>
        )
    }
}
const mapStateToprops = state => {
    return {id: state.auth.id}
}
export default connect(mapStateToprops)(Editprofile)