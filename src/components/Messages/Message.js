import moment from 'moment';
import React, { useEffect } from 'react';
import { Comment, Image } from 'semantic-ui-react';
import ImageLoader from './ImageLoader';



const Message= (props)=> {

const {message,user,persentage,uploadState} = props;

const isOwnMessage = (message,user)=>{
    return message.user.id ===  user.uid ? 'message__self' : '';
}

const isImage = (message) =>{
    return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
}



useEffect(()=>{
  ;
},[message])





const timeForNow = timestemp => moment(timestemp).fromNow()

    return (
        <Comment>
            <Comment.Avatar src={message.user.photo} />
            <Comment.Content className={isOwnMessage(message,user)}>
                <Comment.Author as="a">{message.user.name}</Comment.Author>
                <Comment.Metadata>{timeForNow(message.timeStamp)}</Comment.Metadata>

                {isImage(message) ? <Image src={message.image} className="message__image" /> : <Comment.Text>{message.content}</Comment.Text>}
            </Comment.Content>
        </Comment>
    );
}

export default Message;