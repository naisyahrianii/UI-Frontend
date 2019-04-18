import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from '../config/axios';



const cookie = new Cookies()


class Home extends Component {
    state = {
        tasks: []
    }

    componentDidMount () {
        this.getTasks();
    }

    getTasks = async () => {
        try {
            const res = await axios.get(`/tasks/${cookie.get('idLogin')}`)
            this.setState({tasks: res.data})
        } catch (e) {
            console.log(e);
        }
    }

    onDouble = async (taskid, owner) => {
        await axios.delete('/tasks',{data: {taskid, owner}})
        this.getTasks()
    }

    renderList = () => {
        return this.state.tasks.map (task => {
            if(task.completed === false){
                return (
                <li onDoubleClick={() => {this.onDouble(task._id, this.props.id)}} className="list-group-item d-flex justify-content-between row-hl" key={task._id}>
                    <span className="item-hl">{task.description}</span>
                    <span className="item-hl">
                    <button className='btn btn-outline-primary' onClick={() => {this.doneTask(task._id, this.props.id)}}>Done</button>
                    </span>
                </li>
                );
            } return(
                <li onDoubleClick={() => {this.onDouble(task._id, this.props.id)}} className="list-group-item d-flex justify-content-between row-hl" key={task._id}>
                    <span className="item-hl">{task.description}</span>
                    <span className="item-hl">
                    <button className='btn btn-outline-warning' onClick={() => {this.undoneTask(task._id, this.props.id)}}>Undone</button>
                    </span>
                </li>
            )
        })
    }

    addTask = async (userid) => {
        const description = this.task.value

         try {
            await axios.post(`/tasks/${userid}`,{
                description
            })
            this.getTasks()
        } catch (e) {
            console.log(e);

        }

     }

    doneTask = async (taskid, userid) => {
        try {
           await axios.patch(`/tasks/${taskid}/${userid}`, {
               completed: true
           })
           this.getTasks()
        } catch (e) {
            console.log(e);
        }
    }

    undoneTask = async (taskid, userid) => {
        try {
           await axios.patch(`/tasks/${taskid}/${userid}`, {
               completed: false
           })
           this.getTasks()
        } catch (e) {
            console.log(e);
        }
    }

    render(){
        if(cookie.get('idLogin')){
            return(
                <div className='container'>
                <h1 className="display-4 text-center animated bounce delay-1s">Todo List</h1>
                    <form className="form-group mt-5">
                        <input type="text" className="form-control" placeholder="What are you planning to do today?" ref={input => this.task = input}/>
                    </form>
                    <button type="submit" className="btn btn-block btn-primary mt-3" onClick={() => this.addTask(this.props.id)}>Lets Go !</button>
                    <ul className="list-group list-group-flush mb-5 mt-4">{this.renderList()}</ul>
            </div>
            )
        } return <Redirect to='/login'/>
    }
}

const mapStateToProps = state => {
    return {name: state.auth.name, id: state.auth.id}
}

export default connect(mapStateToProps)(Home);