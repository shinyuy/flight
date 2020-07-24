import React, { Component } from "react";
import axios from "axios";
import Countdown from "./Countdown";

import "./flightdetails.css";

export default class FlightDetails extends Component {
  state = {
    data: null,
  };
  componentDidMount() {
    let id = this.props.match.params._id;
    axios
      .get(`http://localhost:5000/flight/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const data = this.state.data ? (
      <div className="flight-container">
        <div className="flight-image">
          <img src={this.state.data.flight.images[0]} alt="Flight" />
        </div>
        <div className="country-destination-container">
          <div>From: {this.state.data.flight.country}</div>
          <div>To: {this.state.data.flight.destination}</div>
        </div>
        <div className="country-destination-container">
          <div>Number: {this.state.data.flight.number}</div>
          <div className="">Name: {this.state.data.flight.name}</div>
        </div>

        <Countdown date={this.state.data.flight.departure} />
      </div>
    ) : (
      <div>Loading flight details</div>
    );
    return <>{data}</>;
  }
}
