import React from 'react';
import { connect } from "react-redux";
import { Nav, Navbar } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import { handleInfo } from "../../actions";
import { Grid } from '@material-ui/core';
import "./app.css";

class App extends React.Component {

  render() {
    let username = document.cookie.split("=")[1];
    if (typeof (username) !== "undefined") {
      if ((this.props.redirect || username !== "")) {
        return <Redirect to={'/main'} />
      }
    }
    return (
      <Grid>
        <Navbar className="navbar">
          <Grid item xs={12} sm={10}>
            <h1 className="title">Welcome</h1>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Nav defaultActiveKey="/">
              <Nav.Item>
                <Link className="nav-link" to="/login" onClick={() => this.props.handleInfo()}>LOGIN</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/register" onClick={() => this.props.handleInfo()}>REGISTER</Link>
              </Nav.Item>
            </Nav>
          </Grid>
        </Navbar>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.info
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInfo: () => dispatch(handleInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);