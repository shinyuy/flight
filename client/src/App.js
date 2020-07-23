import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import Header from "./components/header/Header";
//import Footer from "./components/footer/Footer";
import Flights from "./components/flights/Flights";
import FlightDetails from "./components/flights/FlightDetails";
import AddFlight from "./components/dashboard/AddFlight";
import DeleteFlight from "./components/dashboard/DeleteFlight";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Auth from "./HOC/auth/Auth";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(Flights, false, false)} />
          <Route exact path="/login" component={Auth(Login, false, false)} />
          <Route exact path="/register"  component={Auth(Register, true, false)} />
          <Route exact path="/flight_details/:_id" component={Auth(FlightDetails, false, false)} />
          <Route exact path="/add_flight" component={Auth(AddFlight, true, false)} />
          <Route exact path="/delete_flight" component={Auth(DeleteFlight, true, false)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
