import React, { useEffect, useState } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import {connect} from 'react-redux';
import firebase from '../../firebase';
import { setCurruntChannel, setPrivateChannel } from '../../actions';


function DirectMessage(props) {
    const {curruntUser} = props;
    
    const [users,setUsers] = useState([]);
    const [user,setUser] = useState(curruntUser);
    const [userRef,setUserRef] = useState(firebase.database().ref('users'));
    const [connectedRef,setConnectedRef] = useState(firebase.database().ref('.info/connected'));
    const [presenceRef,setPresenceRef] = useState(firebase.database().ref('presence'));
    const [activeChannels,setActiveChannels] = useState([]);

    useEffect(()=>{
        if(user){
            addListener(user.uid);
        }
    },[]);


    const addListener = curruntUserId =>{
        let loadedUser = [];
        userRef.on('child_added', async snap => {
            if(curruntUserId !== snap.key){
                let user = snap.val();
                user['uid'] = snap.key;
                user['status'] = "offline";
                await loadedUser.push(user);
                await setUsers(loadedUser);
            }
        });

        connectedRef.on('value', snap=>{
            if(snap.val() ===  true){
                const ref  = presenceRef.child(curruntUserId);
                ref.set(true);
                ref.onDisconnect().remove(err => {
                    if(err !== null){
                        console.log(err);
                    }
                })
            }
        });

        presenceRef.on('child_added', snap =>{
            if(curruntUserId !== snap.key){
                // add status to user
                addStatusToUser(snap.key);
            }
        })

        presenceRef.on('child_removed', snap =>{
            if(curruntUserId !== snap.key){
                // add status to user
                addStatusToUser(snap.key,false);
            }
        })

        const addStatusToUser = (userId,connected = true) =>{
            const updatedUser = users.reduce((acc,user)=>{
                if(user.uid === userId){
                    user['status'] = `${connected ? "online" : "offline"}`;
                }
                return acc.concat(user)
            },[])
            setUser({users: updatedUser});
        }


    }

    const isUserOnline = user => user.status === 'online';

    console.log(users);


    const changeChannel = user =>{
       
        const channelId = getChannelId(user.uid);
        console.log(channelId);
        const channelData  = {
            id: channelId,
            name: user.name,

        };        
        props.setCurruntChannel(channelData);
        props.setPrivateChannel(true);
        setActiveChannel(user.uid);
    }

    const setActiveChannel = userId =>{
        setActiveChannels({activeChannel:  userId});
    }
 

    const getChannelId = userid =>{
        const curruntUserId = user.uid;
        return  userid < curruntUserId ? `${userid}/${curruntUserId}` : `${curruntUserId}/${userid}` ;
    }

    return (
        <>
            <Menu.Menu className='menu'>
                <Menu.Item>
                    <span>
                        <Icon name="mail"  /> Direct Messages
                    </span>{' '}
                    ({users.length})
                </Menu.Item>
                {
                users.map(ele => (
                    <Menu.Item
                        key={ele.uid}
                        onClick={()=>changeChannel(ele)}
                        style={{opacity: 0.7, fontSrtle: 'italic'}}
                        active={ele.uid === activeChannels.activeChannel}
                    >
                        <Icon name="circle" color={isUserOnline(ele) ?  'green' : 'red'} /> {ele.name}
                    </Menu.Item>
                ))
            }

            </Menu.Menu>
        </>
    );
}

export default connect(null,{setCurruntChannel,setPrivateChannel})(DirectMessage);