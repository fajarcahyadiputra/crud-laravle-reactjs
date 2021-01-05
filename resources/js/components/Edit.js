import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import {Link} from 'react-router-dom';


class Edit extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: 0,
            name:'',
            phoneNumber:'',
            email: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
       const id = this.props.match.params.id;

       fetch(`/api/customer/edit/${id}`)
       .then(res=> res.json())
       .then(res=>{
          this.setState({
              id : res.id,
              name: res.name,
              email: res.email,
              phoneNumber: res.phoneNumber
          })
       })
       .catch(err=>{
           console.log(err)
       })
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const name = this.state.name == ''? this.state.customer.name : this.state.name;
        const email = this.state.email == ''? this.state.customer.email : this.state.email;
        const phoneNumber = this.state.phoneNumber == ''? this.state.customer.phoneNumber : this.state.phoneNumber;
        
        fetch(`/api/customer/${this.state.id}/update`, {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({
                name: name,
                email: email,
                phoneNumber: phoneNumber
            })
        })
        .then(res=>{
            return res.json();
        })
        .then(res=>{
            this.props.history.push('/');
        })
        .catch(err=>{
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
                            Page Edit Data
                        </div>
                        <div className="card-body">
                        <form method="post" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input onChange={this.onChange} type="text" name="name" id="name" value={this.state.name || ''} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input onChange={this.onChange} type="number" name="phoneNumber" value={this.state.phoneNumber || ''} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input onChange={this.onChange} type="email" name="email" value={this.state.email || ''} className="form-control" />
                            </div>
                            <button className="btn btn-success" type="submit">Edit</button>
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

export default Edit;
