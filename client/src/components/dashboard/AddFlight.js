import React, { Component } from "react";
import axios from "axios";

import File from "./File";
import "./addflight.css";

export default class AddApplicant extends Component {
  state = {
    data: [],
    name: "",
    country: "",
    number: "",
    departure: "",
    boardingStatus: "",
    destination: "",
    image: "",
    errorMessage: false,
    success: false,
  };

  putDataToDB = (
    name,
    country,
    number,
    departure,
    boardingStatus,
    destination,
    image
  ) => {
    console.log(this.state);
    axios
      .post("http://localhost:5000/flights", {
        name: this.state.name,
        country: this.state.country,
        number: this.state.number,
        departure: this.state.departure,
        boardingStatus: this.state.boardingStatus,
        destination: this.state.destination,
        image: this.state.image,
      })
      .then((res) => console.log(res.data))
      .then((res) => {
        this.setState({
          name: "",
          country: "",
          number: "",
          departure: "",
          boardingStatus: "",
          destination: "",
          image: "",
          success: true
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: true,
        });
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    this.putDataToDB(this.state);
  };

  imagesHandler = (images) => {
    this.setState({
      images: images,
    });
    console.log(this.state);
  };

  render() {
    const {
      name,
      country,
      number,
      departure,
      boardingStatus,
      destination,
    } = this.state;
    return (
      <div className="addflight-container">
          
        <div style={{ color: "green" }}>
          {this.state.success === true ? "Flight added successfully" : ""}
        </div>
        <div style={{ color: "red" }}>
          {this.state.errorMessage === true ? "Request failed" : ""}
        </div>
        <h2>Add Flight</h2>

        <File  
          imagesHandler={(images) => this.imagesHandler(images)}
          reset={this.state.formSuccess}
        />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Flight Name</label><br/>
          <input
            className="form-control"
            type="text"
            value={name}
            id="name"
            name="name"
            onChange={this.handleChange}
            required
            placeholder="Enter flight company name"
          /><br/>
          <label htmlFor="email">Country</label><br/>
          <select
            className="form-control"
            value={country.option}
            onChange={this.handleChange}
            id="country"
            name="country"
            required
          >
            <option>Choose Flight</option>
            <option>Germany</option>
            <option>Belgium</option>
            <option>France</option>
            <option>England</option>
            <option>Switzerland</option>
            <option>Denmark</option>
          </select><br/>

          <br/>
          <label htmlFor="number">Flight Number</label><br/>
          <input
            className="form-control"
            type="text"
            value={number}
            id="number"
            name="number"
            onChange={this.handleChange}
            required
            placeholder="Enter flight number"
          /><br/>
          <label htmlFor="age">Departure date</label><br/>
          <input
            className="form-control"
            type="date"
            value={departure}
            id="departure"
            name="departure"
            onChange={this.handleChange}
            required
            placeholder="Choose date"
          /><br/>
          <label>Destination</label><br/>
          <input
            className="form-control"
            type="text"
            value={destination}
            id="destination"
            name="destination"
            onChange={this.handleChange}
            required
            placeholder="Enter destination"
          /><br/>
          <label htmlFor="region">Boarding Status</label><br/>
          <select
            className="form-control"
            value={boardingStatus.option}
            onChange={this.handleChange}
            id="boardingStatus"
            name="boardingStatus"
            required
          > <option>Select</option>
            <option>Active</option>
            <option>Closed</option>
          </select><br/>

          <button
            type="submit"
            className="btn btn-secondary"
            style={{ marginTop: "20px" }}
          >
            Add Flight
          </button>
        </form>
        <div style={{ color: "green" }}>
          {this.state.success === true ? "Flight added successfully" : ""}
        </div>
        <div style={{ color: "red" }}>
          {this.state.errorMessage === true
            ? "Request failed, try again later"
            : ""}
        </div>
      </div>
    );
  }
}
