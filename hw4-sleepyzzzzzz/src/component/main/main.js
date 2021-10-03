import React from 'react';
import { Container, Row, Col, Card, InputGroup, FormControl, Button, Image, Carousel, ListGroup } from 'react-bootstrap';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { handleChange, handleLogout, handleProfile, loadUsers, loadPost, updateStatus, updateFollowed, addPost } from "../../actions";
import "./main.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            new_post: '',
            new_followed_user: '',
            msg: '',
            search: '',
            post_display: []
        }
        this.upload = React.createRef();
        this.inputPost = React.createRef();
        this.search = React.createRef();
    }

    load_users_posts = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then((res) => res.json())
            .then(
                (res) =>
                    this.props.loadPost(res)
            );
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then((res) => res.json())
            .then(
                (res) =>
                    this.props.loadUsers(res)
            );
    }

    handleUpload = () => {
        this.upload.current.click();
    }

    displayPost = () => {
        let posts;
        if (this.state.post_display.length === 0 && this.state.search === "") {
            posts = this.props.posts;
        }
        else {
            posts = this.state.post_display;
        }
        let displaypost = posts.map(post => {
            return (
                <Carousel.Item key={post.id}>
                    <Card>
                        <Card.Body>
                            <Image className="images" src={post.photo}></Image>
                            <Row className="post_info">{post.author}</Row>
                            <Row className="post_time">{post.timestamp}</Row>
                            <Row>{post.body}</Row>
                            <br></br>
                            <Row>
                                <Col>
                                    <button className="btn btn-primary" type="submit">
                                        Edit
                                    </button>
                                </Col>
                                <Col>
                                    <button className="btn btn-primary" type="submit">
                                        Comment
                                    </button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br></br>
                </Carousel.Item>
            );
        });
        return displaypost;
    }

    displayFollowedUsers = () => {
        let displayfollowed;
        if (this.props.followed) {
            displayfollowed = this.props.followed.map(follow => {
                return (
                    <ListGroup.Item key={follow.accountname}>
                        <Card>
                            <Card.Body>
                                <Image className="images" src={follow.picture}></Image>
                                <Row className="user_info">
                                    {follow.accountname}
                                </Row>
                                <Row className="user_status">
                                    {follow.status}
                                </Row>
                                <br></br>
                                <Row className="info_btn">
                                    <button className="btn btn-primary" type="submit" id={follow.accountname} onClick={this.unfollow}>
                                        Unfollow
                                    </button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                );
            });
        }
        else {
            displayfollowed = "";
        }
        return displayfollowed;
    }

    clearPost = () => {
        this.setState({ new_post: "" });
    }

    addpost = () => {
        this.props.addPost(this.props.accountname, this.state.new_post);
        this.clearPost();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
            post_display: this.props.posts
        });
    }

    updatestatus = () => {
        this.props.updateStatus(this.state.status);
        this.setState({ status: "" });
    }

    unfollow = (e) => {
        this.props.updateFollowed(e.target.id, "unfollow");
    }

    addFollowed = () => {
        if (this.state.new_followed_user !== "") {
            let find = false;
            for (let i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].accountname === this.state.new_followed_user) {
                    find = true;
                    break;
                }
            }
            if (find) {
                this.props.updateFollowed(this.state.new_followed_user, "add");
            }
            else {
                this.setState({ msg: "No such user/You are this user" });
            }
            this.setState({ new_followed_user: "" });
        }
    }

    filterpost = (e) => {
        let user_posts = this.props.posts;
        let new_posts = [];
        if (e.target.id === "searchauthor") {
            for (let i = 0; i < user_posts.length; i++) {
                if (this.state.search === user_posts[i].author) {
                    new_posts.push(user_posts[i]);
                }
            }
        }
        else if (e.target.id === "searchtext") {
            for (let i = 0; i < user_posts.length; i++) {
                let tmp = user_posts[i].body.split(" ");
                for (let j = 0; j < tmp.length; j++) {
                    if (this.state.search === tmp[j]) {
                        new_posts.push(user_posts[i]);
                        break;
                    }
                }
            }
        }
        this.setState({ post_display: new_posts });
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
            <Container className="container_main">
                <Row className="row-2">
                    <Col className="col-5">
                        <Card>
                            <Row className="row">
                                <Col className="col">
                                    <Link className="link" to="/" onClick={() => this.props.handleLogout()}>Log Out</Link>
                                </Col>
                                <Col className="col">
                                    <Link className="link" to="/profile" onClick={() => this.props.handleProfile()}>Profile</Link>
                                </Col>
                            </Row>
                            <Card.Body>
                                <Image className="images" src={this.props.login_user.picture}></Image>
                                <Card.Title>{this.props.accountname}</Card.Title>
                                <Card.Subtitle>
                                    {this.props.status}
                                </Card.Subtitle>
                                <br></br>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        className="form-control"
                                        value={this.state.status}
                                        name="status"
                                        id="status"
                                        placeholder="New Status"
                                        onChange={this.onChange}
                                    />
                                    <InputGroup.Append>
                                        <button className="btn btn-primary" type="submit" onClick={this.updatestatus}>
                                            Update
                                        </button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-7">
                        <Row className="row-5">
                            <Col className="col-7">
                                <Row>
                                    <Col className="col-6">
                                        <input className="uploading" type="file" ref={this.upload} />
                                        <Button className="btn_upload" variant="outline-primary" onClick={this.handleUpload}>
                                            Add Image
                                        </Button>
                                    </Col>
                                    <Col className="col-6">
                                        <textarea
                                            className="form-control"
                                            id="new_post"
                                            name="new_post"
                                            value={this.state.new_post}
                                            placeholder="Your post here"
                                            rows="5"
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col className="col">
                                        <button className="btn btn-primary" type="submit" onClick={this.clearPost}>
                                            Cancel
                                        </button>
                                    </Col>
                                    <Col className="col">
                                        <button className="btn btn-primary" type="submit" onClick={this.addpost}>
                                            Post
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-5">
                                <h3 id="title1">
                                    <span>Folks Zone</span><br></br>
                                    <span>A place</span><br></br>
                                    <span>for folks</span>
                                </h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col className="col-5">
                        <Row>
                            <span style={{ color: "blue", "fontSize": 25 }}>Following:</span>
                            <ListGroup id="carousel_follow">
                                {this.displayFollowedUsers()}
                            </ListGroup>
                        </Row>
                        <br></br>
                        <Row>
                            <Container>
                                <Row>
                                    <InputGroup className="md-3">
                                        <FormControl
                                            className="form-control"
                                            value={this.state.new_followed_user}
                                            name="new_followed_user"
                                            id="new_followed_user"
                                            placeholder="User"
                                            onChange={this.onChange}
                                        />
                                        <InputGroup.Append>
                                            <button className="btn btn-primary col-5" type="submit" onClick={this.addFollowed}>
                                                Add
                                            </button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <span className="info">{this.state.msg}</span>
                                </Row>
                            </Container>
                        </Row>
                    </Col>
                    <Col></Col>
                    <Col className="col-6">
                        <Row>
                            <InputGroup>
                                <FormControl
                                    id="search"
                                    name="search"
                                    value={this.state.searchauthor}
                                    placeholder="Search Here"
                                    onChange={this.onChange}
                                />
                                <InputGroup.Append>
                                    <Button id="searchauthor" variant="outline-secondary" onClick={this.filterpost}>Search By Author</Button>
                                    <Button id="searchtext" variant="outline-secondary" onClick={this.filterpost}>Search By Text</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Row>
                        <br></br>
                        <Row>
                            <Carousel id="carousel_post">
                                {this.displayPost()}
                            </Carousel>
                        </Row>
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
        posts: state.posts,
        accountname: state.accountname,
        displayname: state.displayname,
        status: state.status,
        followed: state.followed,
        picture: state.picture,
        redirect: state.redirect
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (field, value) => dispatch(handleChange(field, value)),
        handleLogout: () => dispatch(handleLogout()),
        handleProfile: () => dispatch(handleProfile()),
        loadUsers: (users) => dispatch(loadUsers(users)),
        loadPost: (posts) => dispatch(loadPost(posts)),
        updateStatus: (status) => dispatch(updateStatus(status)),
        updateFollowed: (accountname, method) => dispatch(updateFollowed(accountname, method)),
        addPost: (accountname, new_post) => dispatch(addPost(accountname, new_post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);