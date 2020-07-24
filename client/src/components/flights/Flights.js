import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment';

import "./flights.css";

export default class Flights extends Component {
  state = {
    data: [],
    name: null,
    intervalIsSet: false,
  };

  componentDidMount() {
    this.getFlights();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getFlights, 600000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillMount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getFlights = () => {
    axios
      .get("http://localhost:5000/flights")
      .then((res) => {
          console.log(res)
        this.setState({ data: res.data.flights });
      })
      .catch({
        function(error) {
          console.log(error);
        },
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="flights-container">
        {data.length <= 0
          ? "Loading Flights ..."
          : data.map(function (flight, i) {
              return (
                <div className="">
                  <Link to={`/flight_details/${flight._id}`} className="flight">
                    <div className="image">
                      <img src={flight.images[0]} alt="plain" />
                    </div>
                    <div className="info">
                      <span>{flight.name}</span>
                      <span>{flight.number}</span>
                      <span>{moment(flight.departure).format('MM-DD-YYYY')}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>
    );
  }
}
