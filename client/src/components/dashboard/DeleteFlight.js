import React, { Component } from "react";
//import axios from "axios";
import moment from "moment";

import "./deleteflight.css";
import { MyApiClient } from '../../HOC/apiclient/MyAPIClient';

export default class DeleteFlight extends Component {
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
    MyApiClient
      .get("/flights")
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data.flights });
      })
      .catch({
        function(error) {
          console.log(error);
        },
      });
  };

 deleteFlight = (id) => {
      MyApiClient.delete("/flights",{
          id:id
      }).then({})
  }

  render() {
    const { data } = this.state;
    return (
      <div className="deleteflight-container">
        <table>
          <thead>
            <tr>
                <th>Flight Image</th>
              <th>Flight Name</th>
              <th>Country</th>
              <th>Departure Date</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            {data.length <= 0
              ? "Loading Flights ..."
              : data.map(function (flight, i) {
                  return (
                    <tr key={i}>
                      <td>
                        <img src={flight.images[0]} alt="plain" />
                      </td>
                      <td>{flight.name}</td>
                      <td>{flight.country}</td>
                      <td>{moment(flight.departure).format("MM-DD-YYYY")}</td>
                      <td>{flight.destination}</td>
                      <button id="delete" onClick={() => {this.deleteFlight(flight._id)}}>Delete Flight</button>
                    </tr>
                  );
                }, this)}
          </tbody>
        </table>
      </div>
    );
  }
}
