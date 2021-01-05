import Axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            customer : [],
            message : ''
        }
    }

    componentDidMount(){
        Axios.get('/api/customer')
        .then((res)=>{
            this.setState({
                customer: res.data
            })
        }).catch(error => console.log(error))
    }

    onDelete(id, event){
        event.preventDefault()
        fetch(`/api/customer/delete/${id}`,{
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
        }).then(res=>{
            this.componentDidMount()
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 mt-5">
                    <div className="card">
                        <div className="card-header">
                        <div className="row">
                               <div className="col-md-6">
                                    <h3>Data Customer</h3>
                               </div>
                               <div className="col-md-6 text-right">
                                  <Link className="btn btn-info" to="/add">Add</Link>
                               </div>
                           </div>
                        </div>
                
                        <div className="card-body">
                            <table className="table">
                               <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                               </thead>
                               <tbody>
                                       {
                                           this.state.customer !== null?
                                           this.state.customer.map(cus=>{
                                            return(
                                                <tr key={cus.id}>
                                                    <td>{cus.name}</td>
                                                    <td>{cus.phoneNumber}</td>
                                                    <td>{cus.email}</td>
                                                    <td>
                                                        <button data-id={cus.id} onClick={this.onDelete.bind(this, cus.id)}>Delete</button>
                                                        <Link className="btn btn-info" to={`/${cus.id}/edit`}>Edit</Link>
                                                    </td>
                                                </tr>
                                            )
                                           }):'nulll'
                                       }
                               </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

export default Home;

