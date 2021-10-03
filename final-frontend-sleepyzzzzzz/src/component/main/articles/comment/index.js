import React from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { Badge, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import { Comment } from './comment';

export class Commentlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleUpdate = () => {
        this.props.handleUpdate();
    }

    displayComments = () => {
        let comments = this.props.post.comments.map((comment, index) => {
            return (
                <Comment
                    key={index}
                    comment={comment}
                    handleUpdate={this.handleUpdate}
                    {...this.props}
                />
            );
        });
        return comments;
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.handleShow}>
                    <Badge badgeContent={this.props.post.comments.length} color="primary">
                        <CommentIcon />
                    </Badge>
                </IconButton>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <ListGroup>
                            {this.displayComments()}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}
