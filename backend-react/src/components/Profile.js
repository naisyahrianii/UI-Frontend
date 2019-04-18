import React, { Component } from 'react';
import {Button} from 'reactstrap';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

import {editProfile} from '../actions/index';
import {onLogoutUser} from '../actions/index';

import axios from '../config/axios';

const cookie = new Cookies()

class Profile extends Component {
    state = {
        edit: true,
        editAvatar: 0
    }

    // componentDidMount () {
    //     this.getAvatar()
    // }

    // getAvatar = async () => {
    //     try {
    //         const res = await axios.get(`/avatar/${cookie.get('idLogin')}`)
    //         this.setState({tasks: res.data})
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }


    fileUpload = async (userid) => {
        const formData = new FormData()
        var imagefile = this.gambar

        const date = new Date().getTime()

        formData.append('avatar', imagefile.files[0])

        try {
            await axios.post(`/users/${userid}/avatar`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            this.setState({editAvatar: date})
            console.log("berhasil upload file");

        } catch (e) {
            console.log(e);

        }
    }

    deleteAvatar = async (userid, ava) => {
        const date = new Date().getTime()

        try {
           await axios.delete(`/users/${userid}/avatar/${ava}`)
           this.setState({editAvatar: date})
        } catch (e) {
           console.log(e);
           
       }
    }

    deleteUser = async (userid) => {
        try {
            await axios.delete(`/users/${userid}`)
            this.props.onLogoutUser()
        } catch (e) {
            console.log(e);
            
        }
    }

    saveProfile = async userid => {
       const name = this.name.value;
       const age = this.age.value;
       const email = this.email.value;
       const password = this.password.value;
       this.props.editProfile(name, age, email, password, userid);
       this.setState({edit: !this.state.edit})
    }

    cancelEdit = () => {
        this.setState({edit: !this.state.edit})
    }

    userProfile = () => {
        // const {userId, name, age, email} = this.props
        const {name, age, email, id} = this.props.user
        if(this.state.edit){
            return(
                <div>
                    <h1 className="mt-3 text-capitalize">{name}, {age}</h1>
                    <Button color="secondary" onClick={() => {this.setState({edit: !this.state.edit})}}>Edit profile</Button>
                    <Link to='/register'><Button color="danger" onClick={() => this.deleteUser(id)} className="ml-1">
                        Delete account
                    </Button></Link>
                </div>
            )
        } return (
            <div className="mt-4">
                <h1>Edit Your Profile</h1>
                <div>
                    Name: <input type="text" ref={input => {this.name = input}} defaultValue={name}></input>
                </div>
                <div className="mt-2">
                    Age: <input type="number" className="ml-3" ref={input => {this.age = input}} defaultValue={age}></input>
                </div>
                <div className="mt-2">
                    Email: <input type="email" ref={input => {this.email = input}} defaultValue={email}></input>
                </div>
                <div className="mt-2">
                    Password: <input type="password" ref={input => {this.password = input}}></input>
                </div>
                <Button color="success" className="mt-3" onClick={() => {this.saveProfile(id)}}>Save profile</Button>
                <Button color="warning" className="mt-3 ml-2" onClick={() => {this.cancelEdit()}}>Cancel</Button>
            </div>

        )
    }

    render(){
        if(cookie.get('idLogin')){
            return (
              <div className="container">
                <img alt="img" src={`http://localhost:2009/users/${cookie.get('idLogin')}/avatar/${this.state.editAvatar}`} className="mt-4 mb-4"/>
                <div className="custom-file">
                  <input type="file" id="myfile" ref={input => (this.gambar = input)}/>
                </div>
                <Button color="primary" onClick={() => this.fileUpload(this.props.user.id)}>
                  Upload avatar
                </Button>
                <Button color="warning" onClick={() => this.deleteAvatar(this.props.user.id)} className="ml-1">
                  Remove avatar
                </Button>
                <div>
                    {/* <h1 className="mt-3 text-capitalize">Name: {this.props.name}</h1>
                    <h1>Age: {this.props.age}</h1>
                    <Button color="secondary">Edit profile</Button>
                    <Link to='/register'><Button color="danger" onClick={() => this.deleteUser(this.props.userId)} className="ml-1">
                        Delete account
                    </Button></Link> */}
                    {this.userProfile()}
                </div>
              </div>
            );
        } return <Redirect to='/login'/>
    }
}

const mps = state => {
    return {
        user: state.auth
    };
  };

export default connect (mps, {onLogoutUser, editProfile})(Profile);