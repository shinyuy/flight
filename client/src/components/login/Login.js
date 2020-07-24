import React, { Component } from "react";
import axios from "axios";

import "./login.css"
import { MyApiClient } from '../../HOC/apiclient/MyAPIClient';

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    success: false,
    errorMessage: false
  };

  register = (email, password) => {
    MyApiClient
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data)
          if(res.data.loginSuccess){
               this.props.history.push('/add_flight')
          }else{
              this.setState({
                  errorMessage: true
              })
          }
       
      })
      .catch(error => {
        console.log(error);
        this.setState({
          errorMessage: true
        });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    this.register(this.state);
  };

  render() {
    const { email, password } = this.state;

    return (
      
        <div className="login-container">
              <h3>Login</h3>

            <div style={{ color: "red" }}>
              {this.state.errorMessage === true
                ? "Login Unsuccessful, email or password incorrect"
                : ""}
            </div>

              <form onSubmit={this.handleSubmit}>
                    <label htmlFor="">Email</label><br/>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      id="email"
                      name="email"
                      onChange={this.handleChange}
                      required
                      placeholder="Enter Email Address"
                    /><br/>
                    <label htmlFor="">Password</label><br/>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      id="password"
                      name="password"
                      onChange={this.handleChange}
                      required
                      placeholder="Enter Password"
                    /><br/>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ marginTop: "20px" }}
                >
                  Login
                </button>

                <div style={{ color: "red" }}>
              {this.state.errorMessage === true
                ? "Login Unsuccessful, email or password incorrect"
                : ""}
            </div>
              </form>
        </div>
  
    );
  }
}