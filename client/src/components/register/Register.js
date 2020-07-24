import React, { Component } from "react";
//import axios from "axios";

import "./register.css"
import { MyApiClient } from '../../HOC/apiclient/MyAPIClient';

export default class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    formSuccess: null
  };

  register = (
    firstname,
    lastname,
    email,
    date,
    password
  ) => {
    MyApiClient
      .post("/register", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          success: true
        });
        setTimeout(() => {
          this.props.history.push("/login");
        }, 2000);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          errorMessage: true
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    this.register(this.state);
  };

 handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  imagesHandler = images => {
    this.setState({
      images: images
    });
    console.log(this.state);
  };

  render() {
    const { firstname, lastname, email, password} = this.state;
    return (
      <div className="register-container">
        <form onSubmit={this.handleSubmit}>
            <h3>Register</h3>
              <label htmlFor="name">First Name</label><br/>
              <input
                className="form-control"
                type="text"
                value={firstname}
                id="firstname"
                name="firstname"
                onChange={this.handleChange}
                required
                placeholder="Enter first names as on ID card"
              /><br/>
              <label htmlFor="name">Last Name</label><br/>
              <input
                className="form-control"
                type="text"
                value={lastname}
                id="lastname"
                name="lastname"
                onChange={this.handleChange}
                required
                placeholder="Enter last names as on ID card"
              /><br/>
          
              <label htmlFor="email">Email</label><br/>
              <input
                className="form-control"
                type="email"
                value={email}
                id="email"
                name="email"
                onChange={this.handleChange}
                placeholder="Enter email"
              /><br/>
          
            <label htmlFor="email">Password</label><br/>
            <input
              className="form-control"
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Enter password"
            /><br/>
          
          <button
            type="submit"
            className="btn btn-secondary"
            style={{ marginTop: "20px" }}
          >
            Create Account
          </button>
        </form>
      </div>
    );
  }
}