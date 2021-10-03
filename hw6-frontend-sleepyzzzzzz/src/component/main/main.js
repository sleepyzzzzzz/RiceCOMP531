import React from 'react';
import { InputGroup, FormControl, Button, Image, ListGroup } from 'react-bootstrap';
import { Grid, Avatar, ListItem, ListItemText, ListItemAvatar, Divider } from '@material-ui/core';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { handleChange, handleLogout, loadUsers, loadPost, updateStatus, updateFollowed, addPost, filterPost } from "../../actions";
import Commentlist from './comment';
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
            post_display: [],
            img: ''
        }
        this.upload = React.createRef();
        this.inputPost = React.createRef();
        this.search = React.createRef();
        this.show = false;
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

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
            post_display: this.props.posts
        });
    }

    // User
    updatestatus = () => {
        this.props.updateStatus(this.state.status);
        this.setState({ status: "" });
    }

    // Follower
    unfollow = (e) => {
        this.props.updateFollowed(e.target.id, "unfollow");
    }

    addFollowed = () => {
        if (this.state.new_followed_user !== "") {
            this.props.updateFollowed(this.state.new_followed_user, "add");
            this.setState({ new_followed_user: "" });
        }
    }

    displayFollowedUsers = () => {
        let displayfollowed;
        let followed = [];
        if (this.props.followed) {
            this.props.followed.forEach(follow => followed.push(JSON.parse(follow)));
        }
        if (followed) {
            displayfollowed = followed.map(follow => {
                return (
                    <ListGroup className="follow" key={follow.accountname}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="img" src={follow.picture} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={follow.accountname}
                                secondary={follow.status}
                            />
                            <Button className="btn-unfollow" type="submit" id={follow.accountname} onClick={this.unfollow}>
                                Unfollow
                            </Button>
                        </ListItem>
                        <Divider light />
                    </ListGroup>
                );
            });
        }
        else {
            displayfollowed = "";
        }
        return displayfollowed;
    }

    // Posts
    handleUpload = () => {
        this.upload.current.click();
    }

    handlePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ img: URL.createObjectURL(e.target.files[0]) });
        }
    }

    clearPost = () => {
        this.setState({ new_post: "", img: "" });
    }

    addpost = () => {
        this.props.addPost(this.props.accountname, this.state.new_post, this.state.img);
        this.clearPost();
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
                <ListGroup key={post.timestamp}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="img" src={post.author_avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={post.author}
                            secondary={post.timestamp}
                        />
                    </ListItem>
                    <div className="post-info">
                        <div>
                            <span>{post.body}</span>
                        </div >
                        <div className="post-img">
                            <Image className="images" src={post.photo} style={{ display: post.photo ? "block" : "none" }}></Image>
                        </div>
                    </div>
                    <br></br>
                    <Grid container spacing={3} className="post-info">
                        <Grid item xs={5}>
                            <Button id="btn-edit" type="submit">
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button id="btn-comment" type="submit">
                                Comment
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            {<Commentlist posts={post} />}
                        </Grid>
                    </Grid>
                    <br></br>
                </ListGroup>
            );
        });
        return displaypost;
    }

    filterpost = (e) => {
        let method = e.target.id === "searchauthor" ? "author" : "text";
        this.props.filterPost(this.state.search, method);
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
        if (username === "" || typeof (username) === "undefined") {
            return <Redirect to={'/'} />
        }
        if (this.props.users.length === 0) {
            this.load_users_posts();
        }
        return (
            <Grid container spacing={3} id="main-page">
                <Grid item xs={5}>

                    <Grid item xs={12} className="User-Follow">
                        <Grid container spacing={3}>
                            <Grid item xs={6} className="links">
                                <Link to="/" onClick={() => this.props.handleLogout()}>Log Out</Link>
                            </Grid>
                            <Grid item xs={6} className="links">
                                <Link to="/profile">Profile</Link>
                            </Grid>
                            <Grid item xs={12}>
                                <div id="user-info">
                                    <Image alt="img" id="user-img" src={this.props.login_user.picture} roundedCircle></Image>
                                    <h3>{this.props.accountname}</h3>
                                    <span>{this.props.status}</span>
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
                                            <Button id="btn-update" type="submit" onClick={this.updatestatus}>
                                                Update
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <br></br>
                    <Grid item xs={12} className="User-Follow">
                        <Grid>
                            <Grid item xs={12} className="wrapper-follower">
                                {this.displayFollowedUsers()}
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <InputGroup className="md-3">
                                        <FormControl
                                            className="form-control"
                                            value={this.state.new_followed_user}
                                            name="new_followed_user"
                                            id="new_followed_user"
                                            placeholder="Username for user want to follow"
                                            onChange={this.onChange}
                                        />
                                        <InputGroup.Append>
                                            <Button id="btn-addfollow" type="submit" onClick={this.addFollowed}>
                                                Add
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                                <div className="follow-info">
                                    <span>{this.props.info}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                            <input className="uploading" type="file" accept="image/*" ref={this.upload} onChange={this.handlePhoto} />
                            <Button id="btn-upload" variant="outline-primary" onClick={this.handleUpload}>
                                <img id="btn-upload-img" src={this.state.img} style={{ display: this.state.img ? "block" : "none" }} /><br></br>
                                <span id="btn-upload-text" style={{ display: this.state.img ? "none" : "block" }}>Add Image</span>
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <textarea
                                className="form-control"
                                id="new_post"
                                name="new_post"
                                value={this.state.new_post}
                                placeholder="Post something"
                                rows="5"
                                onChange={this.onChange}
                            />
                        </Grid>
                        <Grid item xs={6} className="btn-grid">
                            <Button id="btn-cancel" type="submit" onClick={this.clearPost}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} className="btn-grid">
                            <Button id="btn-post" type="submit" onClick={this.addpost}>
                                Post
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <InputGroup>
                                    <FormControl
                                        id="search"
                                        name="search"
                                        value={this.state.searchauthor}
                                        placeholder="Search Here"
                                        onChange={this.onChange}
                                    />
                                    <InputGroup.Append>
                                        <Button id="searchauthor" variant="outline-secondary" onClick={this.filterpost}>By Author</Button>
                                        <Button id="searchtext" variant="outline-secondary" onClick={this.filterpost}>By Text</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="wrapper-posts">
                            {this.displayPost()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        login_user: state.login_user,
        user_posts: state.user_posts,
        posts: state.posts,
        accountname: state.accountname,
        displayname: state.displayname,
        status: state.status,
        followed: state.followed,
        picture: state.picture,
        info: state.info,
        filtered_posts: state.filtered_posts,
        redirect: state.redirect
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (field, value) => dispatch(handleChange(field, value)),
        handleLogout: () => dispatch(handleLogout()),
        loadUsers: (users) => dispatch(loadUsers(users)),
        loadPost: (posts) => dispatch(loadPost(posts)),
        updateStatus: (status) => dispatch(updateStatus(status)),
        updateFollowed: (accountname, method) => dispatch(updateFollowed(accountname, method)),
        addPost: (accountname, new_post, img) => dispatch(addPost(accountname, new_post, img)),
        filterPost: (value, method) => dispatch(filterPost(value, method)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);