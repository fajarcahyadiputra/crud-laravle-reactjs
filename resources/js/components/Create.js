import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router-dom';

class Create extends Component{

    constructor(props){
        super(props);
        this.state = {
            name:'',
            phoneNumber:'',
            email: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault();
        const customer = JSON.stringify(this.state);
        fetch('/api/customer/create', {
            method: 'POST',
            headers: {"Content-Type":'application/json'},
            body: customer
        }).then(res=>{
            this.setState({
                name: '',
                phoneNumber: '',
                email: ''
            })
            this.props.history.push('/');
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
                            <div className="card-header">Page Creat Data</div>
                            <div className="card-body">
                                <form method="post" onSubmit={this.onSubmit}>
                                   <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" onChange={this.onChange} name="name" className="form-control" />
                                   </div>
                                   <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="number" onChange={this.onChange} name="phoneNumber" className="form-control" />
                                   </div>
                                   <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" onChange={this.onChange} name="email" className="form-control" />
                                   </div>
                                   <button className="btn btn-success" type="submit">Save</button>
                                   <Link className="btn btn-warning ml-2" to="/">Back</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;
