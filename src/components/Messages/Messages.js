import React, { useEffect, useState } from 'react';
import { Segment,Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessagesForm from './MessagesForm';
import firebase from '../../firebase';
import Message from './Message';



const Messages =(props)=> {

    const {curruntUser} = props;
    const {curruntChannel} = props;
    const {isPrivateChannel} = props;

  
    const [channel, setChannel] = useState(curruntChannel);
    const[channelMessage, setChannelMessages] = useState({message:[]});
    const[messageLoading,setMessagesLoading] = useState(false);
    const[messageRef,setMessageRef] = useState(firebase.database().ref('message'));
    const[user,setUser]= useState(curruntUser);
    
    const[persentage,setpersentage] = useState({});
    const[uploadState,setuploadState] =  useState({}); 

    const [uniqueUsers,setuniqueUsers] = useState("");
    const[searchText,setSearchText] = useState({});
    const[searchLoading,setSerachLoading] = useState(false);
    const[searchResult,setSerachResult] = useState({message:[]});

    const [privateChannel,setPrivateChannel] = useState(isPrivateChannel);

    const [messagesRef,setMessagesRef] = useState(messageRef);
    const [privateMessages,setPrivateMessages] = useState(isPrivateChannel);
    const [privateMessageRef,setPrivateMessageRef] = useState(firebase.database().ref("privateMessages"));


    useEffect(()=>{
      
        if(user && channel ){
            addMessageListenr(channel.id);
        }
        
        return()=>{

        }

    },[]);


    const addMessageListenr = channelId =>{
        // console.log(channelId);
        const mydata = [];
        const ref  = getMessagesRef();
        ref.child(channelId).on('child_added', async(data) => {
            // console.log(data.val());
            await mydata.push(data.val());
            await setChannelMessages({message: mydata});

            setMessagesLoading(false);
            countUniqueUser(mydata.map((e)=>e));
        });

        
    }


    useEffect(()=>{
      
         
        const MessageData = [...channelMessage.message];
        const regex = new RegExp(searchText.serach);

        const Resut =  MessageData.reduce((acc,message)=>{
        //   console.log(message);
        if(message.content && message.content.match(regex)){
       
            // console.log(message);
            acc.push(message);
            
        }
        return acc;
        },[]);   
       
       
        setSerachResult({message: Resut});
        // console.log(searchResult.message.map);
        // console.log(channelMessage);
        // console.log(searchResult);
},[searchText])





    const countUniqueUser = message =>{
         const uniqueUser = message.reduce((acc,message)=>{
            // console.log(message.user.name);
              if(!acc.includes(message.user.name)){
               acc.push(message.user.name);
            
        }
         return acc;
        },[]);
       
        const numUniqueUser = `${uniqueUser.length} users`;
       
        setuniqueUsers(numUniqueUser);
    } 



    const displayMessage = mess => (
         mess.message.length >  0  ? mess.message.map((ele)=>(
             <Message 
             key={ele.timeStamp}
             message={ele}
             user={curruntUser}
             persentage={persentage}  
             uploadState={uploadState} 
            />     
         )) : ("NO Message Aviable")
    )
    

       const displayChannelName = channel => {
          return  channel ? `${privateChannel ? '@' : '#'}${channel.name}` : '';
       } 

       const searchMessage = (e)=>{
            setSearchText({serach: e.target.value});
            setSerachLoading(true);
       }

       
    const getMessagesRef = () =>{
        return privateMessages ? privateMessageRef : messagesRef; 
    }

    return (
        <>
            <MessagesHeader isPrivateChannel={privateChannel} searchMessage={searchMessage}  channelName={displayChannelName(channel)} uniqueUser={uniqueUsers} />
            <Segment>
                <Comment.Group className="messages">
                    {searchText.serach ? displayMessage(searchResult) : displayMessage(channelMessage)}
                    {/* {displaySearchMessage(searchResult)} */}
                </Comment.Group>
            </Segment>
            <MessagesForm isPrivateChannel={privateChannel} getMessagesRef={getMessagesRef}  messageRef={messageRef} curruntUser={curruntUser} curruntChannel={channel} />
        </>
    );
}

export default Messages;