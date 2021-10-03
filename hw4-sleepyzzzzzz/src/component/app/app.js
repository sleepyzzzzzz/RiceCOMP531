import React from 'react';
import { connect } from "react-redux";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { loadUsers, loadPost } from "../../actions";
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
      <Navbar className="navbar">
        <Container className="container">
          <h1 id="title">Welcome to folksZone</h1>
          <Nav defaultActiveKey="/">
            <Nav.Item>
              <Link className="nav-link" to="/login">LOGIN</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/register">REGISTER</Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);