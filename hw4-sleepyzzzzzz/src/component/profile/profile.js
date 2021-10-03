import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Image, Card, Form } from 'react-bootstrap';
import { handleUpdate, loadUsers, loadPost } from "../../actions";
import "./profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountname: '',
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

    validation = (field, value, msg, oldvalue) => {
        let idx = msg.indexOf(field);
        if (value === oldvalue) {
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
        switch (field) {
            case "accountname":
                this.validation(field, e.target.value, msg, this.props.accountname);
                break;
            case "email":
                this.validation(field, e.target.value, msg, this.props.email);
                break;
            case "phone":
                this.validation(field, e.target.value, msg, this.props.phone);
                break;
            case "zipcode":
                this.validation(field, e.target.value, msg, this.props.zipcode);
                break;
            case "pwd":
                this.validation(field, e.target.value, msg, this.props.pwd);
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
            if (this.state.accountname === "" && this.state.email === "" && this.state.phone === "" && this.state.zipcode === "" && this.state.pwd === "") {
                this.setState({ info: "No Information Change" });
            }
            else {
                this.reset();
                this.props.handleUpdate(
                    this.state.accountname, this.state.email, this.state.phone, this.state.zipcode, this.state.pwd);
            }
        }
    }

    handleUpload = () => {
        this.upload.current.click();
    }

    render() {
        let username = document.cookie.split("=")[1];
        if (username === "") {
            return <Redirect to={'/'} />
        }
        if (this.props.users.length === 0) {
            this.load_users_posts();
        }
        return (
            <Container className="container_profile">
                <Link className="link" to="/main">Main Page</Link>
                <Row className="row-5">
                    <Col className="col-5">
                        <Row>
                            <Image className="images" src={this.props.login_user.picture}></Image>
                        </Row>
                        <br></br>
                        <Row>
                            <input className="uploading" type="file" ref={this.upload} />
                        </Row>
                        <Row>
                            <button className="btn btn-primary" id="btn_upload" type="submit" onClick={this.handleUpload}>
                                Upload new picture
                            </button>
                        </Row>
                    </Col>
                    <Col className="col-6">
                        <Row>
                            <h3 id="title1">
                                <span>Folks Zone</span><br></br>
                                <span>A place</span><br></br>
                                <span>for folks</span>
                            </h3>
                        </Row>
                        <Row></Row>
                        <Row></Row>
                    </Col>
                </Row>
                <br></br>
                <Row className="row-5">
                    <Col className="col-5">
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
                    </Col>
                    <Col>
                        <Form noValidate className="form_update" onSubmit={this.onSubmit}>
                            <h1>Update Info</h1>
                            <Form.Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className={this.notValidate("accountname") ? "form-control is-invalid" : "form-control"}
                                            value={this.state.accountname}
                                            onChange={this.onChange}
                                            type="text"
                                            id="accountname"
                                            name="accountname"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Input is either empty or same as the old one
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
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
                                            Input is either empty or same as the old one
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
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
                                            Input is either empty or same as the old one
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
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
                                            Input is either empty or same as the old one
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
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
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Input is either empty or same as the old one
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <span className="info">{this.state.info}</span>
                                    <button className="btn btn-primary" id="btn_update" type="submit">
                                        Update Info
                                    </button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container >
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