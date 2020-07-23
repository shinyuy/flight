import React, { Component } from "react";
import moment from 'moment';

import "./countdown.css";

export default class Countdown extends Component {
  state = {
    deadLine: "May, 31, 2021",
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
  };

  getCountdown(deadLine) {
    const time =  Date.parse(deadLine) - Date.parse(new Date());
    if (time < 0) {
      console.log("Departure time passed");
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      
      console.log(hours)
      this.setState({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  }

  componentDidMount() {
    //setInterval(() => this.getCountdown(this.state.deadLine), 1000);
    
    let date = new Date(this.props.date);
    console.log(date)
    //alert(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());

    this.setState({deadLine: date})
    setInterval(() => this.getCountdown(this.state.deadLine), 1000);
  }

  render() {
      console.log(this.props)
    return (
      <div className="countdown-container">
        <div className="countdown-top">
            <div>Departure Date:  {moment(this.props.date).format('MM-DD-YYYY')}</div>
            Departure In
    
        </div>
        <div className="countdown-bottom">
          <div className="countdown-time">
            {this.state.days}
            <div className="countdown-tag">Days</div>
          </div>
          <div className="countdown-time">
            {this.state.hours}
            <div className="countdown-tag">Hs</div>
          </div>

          <div className="countdown-time">
            {this.state.minutes}
            <div className="countdown-tag">Mins</div>
          </div>

          <div className="countdown-time">
            {this.state.seconds}
            <div className="countdown-tag">sec</div>
          </div>
        </div>
      </div>
    );
  }
}
