import React from 'react';
import { connect } from "react-redux";
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { loadUsers, loadPost, handleInfo } from "../../actions";
import { Grid } from '@material-ui/core';
import "./app.css";

class App extends React.Component {
  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then(
        (res) =>
          this.props.loadUsers(res)
      );
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then(
        (res) =>
          this.props.loadPost(res)
      );
  }

  render() {
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
    users: state.users,
    posts: state.posts,
    accountname: state.accountname,
    displayname: state.displayname,
    email: state.email,
    phone: state.phone,
    birthdate: state.birthdate,
    zipcode: state.zipcode,
    pwd: state.pwd,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: (users) => dispatch(loadUsers(users)),
    loadPost: (posts) => dispatch(loadPost(posts)),
    handleInfo: () => dispatch(handleInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);