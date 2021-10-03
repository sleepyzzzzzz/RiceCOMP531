import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Grid, Divider, Avatar } from '@material-ui/core';
import { connect } from "react-redux";
import { getAvatar, handleLogout, goProfile, getStatus, updateStatus, getUsername, getLink, updateLinkAccount } from "../../actions";
import Follow from './following/index';
import Articles from './articles/index';
import "./main.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            msg: '',
            img: ''
        }
    }

    componentDidMount() {
        this.props.getAvatar();
        this.props.getStatus();
        this.props.getUsername();
        this.props.getLink();
        if (this.props.link.length !== 0) {
            this.props.updateLinkAccount();
        }
    }

    // componentDidUpdate(prevProps) {
    //     // if (prevProps.link !== this.props.link) {
    //     //     this.props.updateLinkAccount();
    //     // }
    // }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
        });
    }

    // User
    displayStatus = () => {
        return (
            <span>
                {this.props.status}
            </span>
        );
    }

    updatestatus = () => {
        this.props.updateStatus(this.state.status);
        this.setState({ status: "" });
    }

    render() {
        let username = document.cookie.split("=")[1];
        if (username === "" || typeof (username) === "undefined") {
            return <Redirect to={'/'} />
        }
        return (
            <Grid container spacing={3} id="main-page">
                <Grid item xs={5}>
                    <Grid item xs={12} className="User-Info">
                        <Grid container spacing={3}>
                            <Grid item xs={6} className="links">
                                <Link to="/main" onClick={() => this.props.handleLogout()}>Log Out</Link>
                            </Grid>
                            <Grid item xs={6} className="links">
                                <Link to="/profile" onClick={() => this.props.goProfile()}>Profile</Link>
                            </Grid>
                            <Grid item xs={12}>
                                <div id="user-info">
                                    <Avatar id="user-img" alt='' src={this.props.avatar} />
                                    <h3>{this.props.accountname}</h3>
                                    {this.displayStatus()}
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
                    <Follow />

                </Grid>

                <Divider orientation="vertical" flexItem />

                <Articles />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountname: state.accountname,
        displayname: state.displayname,
        status: state.status,
        follow: state.follow,
        follow_info: state.follow_info,
        avatar: state.avatar,
        posts: state.posts,
        link: state.link,
        info: state.info
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsername: () => dispatch(getUsername()),
        getAvatar: () => dispatch(getAvatar()),
        getStatus: () => dispatch(getStatus()),
        goProfile: () => dispatch(goProfile()),
        handleLogout: () => dispatch(handleLogout()),
        updateStatus: (status) => dispatch(updateStatus(status)),
        getLink: () => dispatch(getLink()),
        updateLinkAccount: () => dispatch(updateLinkAccount()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);