import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Image, Card, Form, Button } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import { handleUpdate, loadUsers, loadPost } from "../../actions";
import "./profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayname: '',
            email: '',
            phone: '',
            zipcode: '',
            pwd: '',
            info: '',
            msg: []
        };
        this.upload = React.createRef();
    }

    load_users_posts = () => {
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

    validation = (field, value, msg, oldvalue, reg) => {
        let idx = msg.indexOf(field);
        let validate = reg.test(value);
        if (value === oldvalue || (!validate && field !== 'pwd')) {
            if (idx === -1) {
                msg.push(field);
            }
        }
        else {
            if (idx !== -1) {
                msg.splice(idx, 1);
            }
        }
    }

    onChange = (e) => {
        this.setState({ info: '' });
        this.setState({ [e.target.name]: e.target.value });
        let field = e.target.name;
        let msg = this.state.msg;
        let reg = '';
        switch (field) {
            case "email":
                reg = /^[^@]*@[^@]*\.[^@]*$/;
                this.validation(field, e.target.value, msg, this.props.email, reg);
                break;
            case "phone":
                reg = /^\d{3}-\d{3}-\d{4}$/;
                this.validation(field, e.target.value, msg, this.props.phone, reg);
                break;
            case "zipcode":
                reg = /^\d{5}$/;
                this.validation(field, e.target.value, msg, this.props.zipcode, reg);
                break;
            case "pwd":
                reg = /^\w\W$/;
                this.validation(field, e.target.value, msg, this.props.pwd, reg);
                break;
            default:
                break;
        }
        this.setState({ msg: msg });
    }

    notValidate = (field) => {
        return this.state.msg.indexOf(field) !== -1;
    }

    reset = () => {
        this.setState({
            accountname: '',
            displayname: '',
            email: '',
            phone: '',
            zipcode: '',
            pwd: '',
            info: '',
            msg: []
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let msg = this.state.msg;
        this.setState({ msg: msg });
        if (this.state.msg.length > 0) {
            return false;
        }
        else {
            if (this.state.email === "" && this.state.phone === "" && this.state.zipcode === "" && this.state.pwd === "") {
                this.setState({ info: "No Information Change" });
            }
            else {
                this.reset();
                this.props.handleUpdate(this.state.email, this.state.phone, this.state.zipcode, this.state.pwd);
            }
        }
    }

    handleUpload = () => {
        this.upload.current.click();
    }

    render() {
        let username = document.cookie.split("=")[1];
        if (username === "" || typeof (username) === "undefined") {
            return <Redirect to={'/'} />
        }
        if (this.props.users.length === 0) {
            this.load_users_posts();
        }
        return (
            <Grid container id="profile-page">
                <Grid item xs={12} sm={10}>
                    <h5 className="title">Welcome to Profile Page</h5>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Link className="nav-link" to="/main">Main Page</Link>
                </Grid>
                <Grid item xs={12} id="profile-img">
                    <Image alt="img" id="user-img-profile" src={this.props.login_user.picture} roundedCircle></Image>
                    <br></br>
                    <div id="profile-upload">
                        <input className="uploading" type="file" ref={this.upload} />
                        <Button id="btn_upload" type="submit" onClick={this.handleUpload}>
                            Upload new picture
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={6} className="updates">
                    <Container id="container_display">
                        <Card>
                            <Card.Body>
                                <Card.Title>Current Info</Card.Title>
                                <Card.Text>
                                    <span>
                                        username: {this.props.accountname}<br />
                                        email: {this.props.email}<br />
                                        phone: {this.props.phone}<br />
                                        zipcode: {this.props.zipcode}<br />
                                        password: {this.props.pwd}<br />
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                </Grid>

                <Grid item xs={6} className="updates">
                    <Form noValidate className="form-update" onSubmit={this.onSubmit}>
                        <h1>Update Info</h1>
                        <Form.Row>
                            <Grid item xs={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className={this.notValidate("email") ? "form-control is-invalid" : "form-control"}
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        type="text"
                                        id="email"
                                        name="email"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Input is either same as the old one or not valid: proper format is ###@##.##
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Grid>
                            <Grid item xs={6}>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        className={this.notValidate("phone") ? "form-control is-invalid" : "form-control"}
                                        value={this.state.phone}
                                        onChange={this.onChange}
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="123-123-1234"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Input is either same as the old one or not valid: proper format is 123-123-1234
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Grid>
                        </Form.Row>
                        <Form.Row>
                            <Grid item xs={6}>
                                <Form.Group>
                                    <Form.Label>Zipcode</Form.Label>
                                    <Form.Control
                                        className={this.notValidate("zipcode") ? "form-control is-invalid" : "form-control"}
                                        value={this.state.zipcode}
                                        onChange={this.onChange}
                                        type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        placeholder="12345"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Input is either same as the old one or not valid: proper format is 12345
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Grid>
                            <Grid item xs={6}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        className={this.notValidate("pwd") ? "form-control is-invalid" : "form-control"}
                                        value={this.state.pwd}
                                        onChange={this.onChange}
                                        type="password"
                                        id="pwd"
                                        name="pwd"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Input is same as the old one
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Grid>
                        </Form.Row>
                        <Form.Row id="profile-btn">
                            <Button id="btn-update-info" type="submit">
                                Update Info
                            </Button>
                        </Form.Row>
                        <div>
                            <span id="update-info">{this.state.info}</span>
                        </div>
                    </Form>
                </Grid>
            </Grid >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        login_user: state.login_user,
        accountname: state.accountname,
        displayname: state.displayname,
        email: state.email,
        phone: state.phone,
        zipcode: state.zipcode,
        pwd: state.pwd,
        picture: state.picture,
        status: state.status,
        info: state.info,
        redirect: state.redirect
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleUpdate: (accountname, email, phone, zipcode, pwd) => dispatch(handleUpdate(accountname, email, phone, zipcode, pwd)),
        loadUsers: (users) => dispatch(loadUsers(users)),
        loadPost: (posts) => dispatch(loadPost(posts)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);