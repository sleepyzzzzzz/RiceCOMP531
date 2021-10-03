import React from 'react';
import { Button, Image, ListGroup, Modal } from 'react-bootstrap';
import { Grid, Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Commentlist } from './comment/index';

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            new_post: '',
            msg: '',
            search: '',
            img: '',
            post_edit: '',
            show_post: false,
            show_comment: false,
            update: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.post.text === this.props.post.text && this.props.info && this.state.update) {
            this.setState({ msg: this.props.info, update: false });
            this.props.handleInfo();
        }
        if (prevProps.post.author !== this.props.post.author && !this.state.update && this.state.msg !== '') {
            this.setState({ msg: '' });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
        });
    }

    handleClose = () => {
        if (this.state.show_post) {
            this.setState({ post_edit: '', show_post: false, msg: '' });
        }
        if (this.state.show_comment) {
            this.setState({ post_edit: '', show_comment: false, msg: '' });
        }
    }

    edit = () => {
        this.setState({ show_post: true });
    }

    comment = () => {
        this.setState({ show_comment: true });
    }

    handleUpdate = () => {
        let name = this.state.show_post ? 'post' : 'comment';
        this.props.handlePost(this.state.post_edit, this.props.post.pid, name);
        this.setState({ update: true });
        this.handleClose();
    }

    updateComment = (text, commentId) => {
        this.props.handleComment(text, this.props.post.pid, commentId);
    }

    displayEdit = () => {
        return (
            <div>
                <Modal show={this.state.show_post || this.state.show_comment} onHide={this.handleClose}>
                    <span style={{ margin: "20px", display: this.state.show_comment ? 'block' : 'none' }}>Comment:</span>
                    <Modal.Body>
                        <textarea
                            className="form-control"
                            id="post_edit"
                            name='post_edit'
                            value={this.state.post_edit}
                            onChange={this.onChange}
                            placeholder={this.state.show_post ? this.props.post.text : ''}
                            rows="5"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleUpdate}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <div className='post'>
                <ListGroup>
                    {this.displayEdit()}
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="img" src={this.props.post.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={this.props.post.author}
                            secondary={new Date(this.props.post.date).toLocaleString()}
                        />
                    </ListItem>
                    <div className="post-info">
                        <div className="post-text" ref={this.props.post_text}>
                            <span>{this.props.post.text}</span>
                        </div>
                        <div className="post-img">
                            <Image className="images" src={this.props.post.images} style={{ display: this.props.post.images ? 'block' : 'none' }}></Image>
                        </div>
                    </div>
                    <br></br>
                    <Grid container spacing={3} className="post-info">
                        <Grid item xs={5}>
                            <Button id="btn-edit" type="submit" onClick={this.edit}>
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button id="btn-comment" type="submit" onClick={this.comment}>
                                Comment
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Commentlist
                                posts={this.props.post}
                                handleUpdate={this.updateComment}
                                {...this.props}
                            />
                        </Grid>
                        <Grid item xs={12} className='article-info'>
                            <span>{this.state.msg}</span>
                        </Grid>
                    </Grid>
                    <br></br>
                </ListGroup>
            </div>
        );
    }
}