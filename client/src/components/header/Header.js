import React, { Component } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

import { MyApiClient } from '../../HOC/apiclient/MyAPIClient';
import "./header.css";
import logo from "../../images/logo.jpg";

class Header extends Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true,
      }
    ],
    user: [
      {
        name: "Add Flight",
        linkTo: "/add_flight",
        public: false,
      },
      {
        name: "Delete Flight",
        linkTo: "/delete_flight",
        public: false,
      },
      {
        name: "Login",
        linkTo: "/login",
        public: true,
      },
      {
        name: "Register",
        linkTo: "/register",
        public: false,
      },
      {
        name: "Log out",
        linkTo: "/login",
        public: false,
      },
    ],
  };

  logoutHandler = () => {
    MyApiClient
      .get("/logout")
      .then((res) => {
        if (res.data.success) {
          this.props.history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div
        className="logout-link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
      {item.name}
      </div>
    ) : (
        <div key={i} className="link">
          <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>  
        </div>
      
    );

  showLinks = (type) => {
    let list = [];
    if (this.props.user) {
      type.forEach((item) => {
        if (!this.props.user.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "Login" && item.name !== "Register") {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== "dashboard") {
        return this.defaultLink(item, i);
      } else {
        return this.dashboardLink(item, i);
      }
    });
  };

  render() {
    return (
      <div className="header-container">
        <div className="logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <div className="links">
          {this.showLinks(this.state.page)}
          {this.showLinks(this.state.user)}
        </div>
      </div>
    );
  }
}

export default Header;
