import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./auth.css"
import { MyApiClient } from '../../HOC/apiclient/MyAPIClient';

export default function(ComposedClass, reload, adminRoute) {
  class AuthCheck extends Component {
    state = {
      loading: true,
      user: null
    };

    componentDidMount() {
      MyApiClient.get("/auth").then(res => {
        console.log(res.data)
        let user = res.data;
        if (!user.isAuth) {
          if (reload) {
            this.props.history.push("/login");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/add_flight");
          } else {
            if (reload === false) {
              this.props.history.push("/add_flight");
            }
          }
        }
        this.setState({
          loading: false,
          user: user
        })
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      return (
        <>
          <Header {...this.props} user={this.state.user} /> 
          <ComposedClass {...this.props} user={this.state.user} />
          <Footer/> 
        </>
      );
    }
  }
  return AuthCheck;
}