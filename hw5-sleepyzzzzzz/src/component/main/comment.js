import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { ListItem, ListItemText, Badge, IconButton, Avatar, ListItemAvatar, Typography } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

export default function Commentlist(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const length = props.posts.comments.length;

    const comments = props.posts.comments.map(comment => {
        return (
            <ListItem key={comment.timestamp}>
                <ListItemAvatar>
                    <Avatar src={comment.author_avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={comment.author}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                {comment.body}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <span id="comment-time" className="text-muted">{comment.timestamp}</span>
            </ListItem>
        );
    });

    return (
        <div>
            <IconButton onClick={handleShow}>
                <Badge badgeContent={length} color="primary">
                    <CommentIcon />
                </Badge>
            </IconButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <ListGroup>
                        {comments}
                        {/* <ListItem>
                            <span>Kulas Light</span>
                        </ListItem> */}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
