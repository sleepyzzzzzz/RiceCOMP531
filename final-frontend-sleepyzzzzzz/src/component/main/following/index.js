import React from 'react';
import { InputGroup, FormControl, Button, ListGroup, Tabs, Tab } from 'react-bootstrap';
import { Grid, Avatar, ListItem, ListItemText, ListItemAvatar, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";
import { getAll, getFollow, updateFollow, filterPost, handleInfo } from "../../../actions";

class Follow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_followed_user: '',
            img: '',
            msg: '',
            update: false
        }
    }

    componentDidMount() {
        this.props.getFollow();
        this.props.getAll();
        this.props.filterPost('', '');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.follow.length !== this.props.follow.length) {
            this.props.filterPost('', '');
        }
        if (this.state.update && this.props.info !== '') {
            this.setState({ msg: this.props.info, update: false });
            this.props.handleInfo();
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: ""
        });
    }

    unfollow = (e) => {
        this.props.updateFollow(e.target.id, "unfollow");
        this.setState({ msg: '', update: true });
    }

    addFollowed = () => {
        if (this.state.new_followed_user !== "") {
            this.props.updateFollow(this.state.new_followed_user, "add");
            this.setState({ new_followed_user: "", msg: '', update: true });
        }
    }

    displayFollowedUsers = () => {
        let follow = this.props.follow_info;
        let displayfollow;
        if (follow) {
            displayfollow = follow.map(follow => {
                return (
                    <ListGroup className="follow" key={follow.username}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="img.png" src={follow.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={follow.username}
                                secondary={follow.headline}
                            />
                            <Button className="btn-unfollow" type="submit" id={follow.username} onClick={this.unfollow}>
                                Unfollow
                            </Button>
                        </ListItem>
                        <Divider light />
                    </ListGroup>
                );
            });
        }
        else {
            displayfollow = "";
        }
        return displayfollow;
    }

    displayAll = () => {
        let all = this.props.all;
        let displayall = '';
        if (all) {
            displayall = all.map((user, index) => {
                return (
                    <ListGroup className="follow" key={index}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="img.png" src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.username}
                            />
                        </ListItem>
                        <Divider light />
                    </ListGroup>
                );
            });
        }
        else {
            displayall = "";
        }
        return displayall;
    }

    render() {
        return (
            <Tabs defaultActiveKey="follow" id="controlled-tab">
                <Tab eventKey="all" title="All Users">
                    <Grid item xs={12} className="User-Follow">
                        {this.displayAll()}
                    </Grid>
                </Tab>
                <Tab eventKey="follow" title="Following">
                    <Grid item xs={12} className="User-Follow">
                        <Grid item xs={12} className="wrapper-follower">
                            {this.displayFollowedUsers()}
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <InputGroup className="md-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><SearchIcon /></InputGroup.Text>
                                    </InputGroup.Prepend>
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
                                <span>{this.state.msg}</span>
                            </div>
                        </Grid>
                    </Grid>
                </Tab>
            </Tabs>
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
        all: state.all,
        info: state.info,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: () => dispatch(getAll()),
        getFollow: () => dispatch(getFollow()),
        updateFollow: (username, method) => dispatch(updateFollow(username, method)),
        filterPost: (value, method) => dispatch(filterPost(value, method)),
        handleInfo: () => dispatch(handleInfo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow);