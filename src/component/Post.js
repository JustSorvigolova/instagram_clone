import React from 'react';
import './Post.css'
import {Avatar} from "@mui/material";

const Post = ({username, imageUrl, caption}) => {
    return (
        <div className="post">
            <div className="div post_header">
                <Avatar className="post_avatar" alt="Remy Sharp" src="https://bigpicture.ru/wp-content/uploads/2015/11/nophotoshop29-800x532.jpg"/>

                <h3>{username}</h3>
             </div>
            <img alt="lol" className="post_image" src={imageUrl}/>
            <h4 className="post_text"><strong>{username}</strong> {caption} </h4>

        </div>
    );
};

export default Post;