import React, { useEffect, useState } from 'react';
import { Menu, Icon, Modal, Header, Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAllChannels, setCurruntChannel, setPrivateChannel } from '../../actions';
import firebase from '../../firebase';

const Channels = (props)=> {


    const formValues = {
        channelName : "",
        aboutChannel: ""
    }    

    const[channels,setChannels] = useState([]);
    const [modal,setModal] = useState(false);
    const [addChannleForm,setAddChannelForm] =  useState(formValues);
    const[Error,setError] = useState({});
    const [firstLoad, setFirstLoad] = useState(true);
    const [active, setActive] = useState({});
    const [notification,setNotification] = useState([]);
    const [channel,setChannel] = useState(null);
    const [messagesRef,setMessagesRef] = useState(firebase.database().ref('message'));


    const closeModal = ()=>{
        setModal(false);
    }
    const openModal = ()=>{
        setModal(true);
    }

    const handelChnage = (e)=>{
        const {name, value} = e.target;
        setAddChannelForm({...addChannleForm, [name]:value});   
    }


    const handelSubmit = (e)=>{
        e.preventDefault();
        setError(validate(addChannleForm));
        if(addChannleForm.channelName && addChannleForm.aboutChannel !== ""){
            addChannel();
            setModal(false);
        }
    }
    
    useEffect(()=>{
        // anything here when component mlunt
        addListner();
        
        return()=>{
        //    anythng here when componnt unmount
        // removeListner();
        }
            
    },[Error]);



    const validate = (value)=>{
        const errors = {};

        if(!value.channelName){
            errors.channelName = "This field is require";
        }
        if(!value.aboutChannel){
            errors.aboutChannel = "This field is require";
        }    
        return errors;
    }

    const addChannel = ()=>{        
        let userId = props.curruntUser.uid;
        let userName =    props.curruntUser.displayName;
        let userImg = props.curruntUser.photoURL;
        let channelName = addChannleForm.channelName;
        let addChannel =  addChannleForm.aboutChannel;


         const key =  firebase.database().ref('channels').push().key;

        const postData = {
            id:key,
            name: channelName,
            details: addChannel,
            createdBy: {
                name: userName,
                avatar: userImg
            }
          };

          firebase.database().ref('channels').child(key).update(postData).then(()=>{
              console.log("ok");
          })
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
        
      console.log(props.curruntUser);
    //   update(ref(db), updates);
    }

const addListner = async ()=>{

    let loadChannels  = [];
    const f = firebase.database().ref('channels');
    f.on('child_added', async (data) => {
    //   console.log(data.val());
        if(data.exists){
            await loadChannels.push(data.val()); 
        }
        
      props.getAllChannels(loadChannels);
      setChannels(loadChannels);
      
      setFirstChannel(loadChannels); 
        
      addNotificationListner(data.key);

    });   
       

}


const addNotificationListner = channelId =>{
    messagesRef.child(channelId).on('value', snap=>{
        console.log(snap.val());
        if(channel){
            // handleNotifications(channelId,channel.id,notification,snap);
        }
    })
}


// const handleNotifications = (channelId,curruntChannelId,notification,snap)=>{
//     let lastTotal = 0;
//     let index = notification.findIndex(notification => notification.id === channelId);
//     if(index !== -1){

//         if(channelId !== curruntChannelId){
//             lastTotal = notification[index].total;

//             if(snap.numChildern() - lastTotal > 0){
//                 notification[index].count = snap.numChildern() - lastTotal;

//             }
//         }

//         notification[index].lastKnownTotal = snap.numChildern();

//     }else{
//         notification.push({
//             id: channelId,
//             total: snap.numChildern(),
//             lastKnownTotal : snap.numChildern(),
//             count: 0
//         });
//     }

//     setNotification({notification}); 
// }
// console.log(notification);

const removeListner = ()=>{
    firebase.database().ref('channels').off();
}

const setFirstChannel = (channels)=>{
    const firstChannel = channels[0];
            // console.log(firstChannel);
    if(firstLoad && channels.length > 0){
    props.setCurruntChannel(firstChannel);
    props.setPrivateChannel(false);
    setActiveChannels(firstChannel);
    
}
 setFirstLoad(false);
}

const changeChannel = channel => {
    props.setCurruntChannel(channel);
    props.setPrivateChannel(false);
    setActiveChannels(channel);
    setChannel(channel);
    
}

const setActiveChannels = (channel)=>{
    setActive({activeCurruntChannel: channel.id})
}




const displayChannels = (channels) =>(
    channels.length > 0 ? channels.map(channel => (
        <Menu.Item
        key={channel.id}
        onClick={()=> changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === active.activeCurruntChannel}
        >
            # {channel.name}
        </Menu.Item>
    )) : (<Menu.Item active={true} >{"No Channels!"}</Menu.Item>)
)

    return (
        <React.Fragment>
        <Menu.Menu className='menu'>
            <Menu.Item>
                <span>
                    <Icon name="exchange" /> CHANNELS ({channels.length})
                </span>
                <Icon name="add" onClick={openModal} />
            </Menu.Item>
            
         {displayChannels(channels)}
        </Menu.Menu> 
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>
                Add Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={handelSubmit}>
                    <Form.Field>
                        <p>{Error.channelName}</p>
                        <Input  fluid label="Name Of Channel" name="channelName" onChange={handelChnage}/>
                    </Form.Field>
                    <Form.Field>
                        <p>{Error.aboutChannel}</p>
                        <Input  fluid label="About The Channel" name="aboutChannel" onChange={handelChnage}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' inverted onClick={handelSubmit} ><Icon name="checkmark"/> Add</Button>
                <Button color='red' inverted  onClick={closeModal} ><Icon name="remove"/> Cancel</Button>
            </Modal.Actions>
        </Modal>
        </React.Fragment>
        
        );
        
}


 

export default connect(null, {setCurruntChannel,getAllChannels,setPrivateChannel})(Channels);