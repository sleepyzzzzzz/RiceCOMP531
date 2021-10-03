import React from 'react';
import { Button } from 'react-bootstrap';
import { Grid, ListItem, ListItemText, Avatar, ListItemAvatar, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment_edit: '',
            msg: '',
            show: false,
            update: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comment.content !== this.props.comment.content) {
            this.setState({ show: false });
            this.props.handleInfo();
        }
        if (this.state.update && this.props.info) {
            this.setState({ msg: this.props.info, update: false });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
        });
    }

    handleClose = () => {
        this.setState({ comment_edit: '', msg: '', show: false });
        this.props.handleInfo();
    }

    edit = () => {
        let show = this.state.show ? false : true;
        this.setState({ show: show });
    }

    handleUpdate = () => {
        this.props.handleUpdate(this.state.comment_edit, this.props.comment.id);
        this.setState({ comment_edit: '', update: true });
    }

    displayEdit = () => {
        return (
            <div style={{ display: this.state.show ? 'block' : 'none' }}>
                <textarea
                    className="form-control"
                    id="comment_edit"
                    name='comment_edit'
                    value={this.state.comment_edit}
                    onChange={this.onChange}
                    rows="2"
                />
                <Grid container spacing={3}>
                    <Grid item xs={6} className='btns-comments'>
                        <Button id="btn-comment-update" onClick={this.handleUpdate}>Update</Button>
                    </Grid>
                    <Grid item xs={6} className='btns-comments'>
                        <Button id="btn-comment-back" onClick={this.handleClose}>Back</Button>
                    </Grid>
                    <Grid item xs={12} className='comment-info'>
                        <span>{this.state.msg}</span>
                    </Grid>
                </Grid>
            </div>
        );
    }

    render() {
        return (
            <div className='comment'>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={this.props.comment.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.comment.author}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {this.props.comment.content}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <span id="comment-time" className="text-muted">{new Date(this.props.comment.date).toLocaleString()}</span>
                    <IconButton onClick={this.edit}>
                        <EditIcon />
                    </IconButton>
                </ListItem>
                {this.displayEdit()}
            </div>
        );
    }
}