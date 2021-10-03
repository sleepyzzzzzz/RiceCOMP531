import React from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleChange, handleLogin } from "../../actions";
import "./login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountname: '',
            pwd: '',
            msg: []
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.props.handleChange(e.target.name, e.target.value)
    }

    notValidate = (field) => {
        return this.state.msg.indexOf(field) !== -1;
    }

    onSubmit = (e) => {
        e.preventDefault();
        let msg = [];
        if (this.state.accountname === "") {
            msg.push("accountname");
        }
        if (this.state.pwd === "") {
            msg.push("pwd");
        }
        this.setState({ msg: msg });
        if (msg.length > 0) {
            return false;
        }
        else {
            this.props.handleLogin();
        }
    }

    render() {
        let username = document.cookie.split("=")[1];
        if (this.props.redirect || username !== "") {
            return <Redirect to={'/main'} />
        }
        return (
            <Container>
                <Form noValidate className="form" onSubmit={this.onSubmit}>
                    <h1 className="formheader">Login</h1>
                    <Form.Row className="form-row">
                        <Form.Group>
                            <Form.Label className="form-label">Account Name</Form.Label>
                            <Form.Control
                                className={this.notValidate("accountname") ? "form-control is-invalid" : "form-control"}
                                value={this.state.accountname}
                                onChange={this.onChange}
                                type="text"
                                id="accountname"
                                name="accountname"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Account Name cannot be empty
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className={this.notValidate("pwd") ? "form-control is-invalid" : "form-control"}
                                value={this.state.pwd}
                                onChange={this.onChange}
                                type="password"
                                id="pwd"
                                name="pwd"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Password cannot be empty
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            <Row>
                                <button className="btn btn-primary" id="btn_login" type="submit">
                                    Login
                                </button>
                            </Row>
                            <br></br>
                            <Row>
                                <span className="info">{this.props.info}</span>
                            </Row>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        login_user: state.login_user,
        accountname: state.accountname,
        pwd: state.pwd,
        info: state.info,
        redirect: state.redirect
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (field, value) => dispatch(handleChange(field, value)),
        handleLogin: () => dispatch(handleLogin()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);