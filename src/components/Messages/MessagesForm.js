import React, { useEffect, useState } from 'react';
import { Segment,Button, Input} from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import firebase from '../../firebase';
import FileModal from './FileModal';

 



const  MessagesForm=(props)=> {

    const {curruntUser} = props;
    const {curruntChannel}= props;
    const {messageRef} = props;
    const {isPrivateChannel} = props;
    // const {getMessagesRef} = props;

    console.log(isPrivateChannel);
    const formfields = {
        messages: ""
    }

    const [ctop,setctop]=useState(false);

    const [formValues,setFormValues] = useState(formfields);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({});
    // const [fileError,setFileError] = useEffect({});
    const [channel,setChannel] = useState(curruntChannel);
    const [modal,setModal] = useState(false);
    const [uploadState,setUploadState] = useState("");
    const [uploadTask,setUploadTask] = useState(null);
    const [storageRef,setStoragRef] = useState(firebase.storage().ref())



    const openModal = ()=>{
        setModal(true);
    }

    const closeModal= ()=>{
        setModal(false);
    }

    useEffect(()=>{
     
    },[error]);

    // const pathToUpload = console.log(channel.id);
    // const ref = messageRef;
    
    useEffect(()=>{
        console.log(uploadTask);
        if(uploadTask !== null){
         const ref = props.getMessagesRef();
        const pathToUpload = channel.id;

         uploadTask.on('state_changed',snapshot => {
            var pers = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        
        },(error) => {
            console.log(error);
            // setFileError(error);
            setUploadState("error");
            setUploadState(null);
          },()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // console.log('File available at', downloadURL);
                sendFileMessage(downloadURL,ref,pathToUpload);
              });
          } )
    }
    },[uploadTask]);

    const handelChange = (e)=>{
        setFormValues({[e.target.name]:e.target.value });
        setError(formValues);
        // console.log(formValues);
    }
 

    

    const setmessageData = (fileUrl = null)=>{
        const postData = {
            // content : formValues.messages,
            timeStamp:  new Date().getTime(),
            user:{
                id: curruntUser.uid,
                name: curruntUser.displayName,
                photo: curruntUser.photoURL
            }
        };

        if(fileUrl !== null){
            postData['image'] = fileUrl; 
        }else{
            postData['content'] = formValues.messages;
        }

        return postData;
    }

    const sendMessage= (e)=> {
        const {getMessagesRef} = props;
        if(formValues.messages){
                setLoading(true);   
                getMessagesRef()
                .child(channel.id).push().set(setmessageData()).then(()=>{
                    setFormValues({messages: ""});
                    setLoading(false);
                })
        }else{
            setError({errorMessage: "This field is require"});
        }   

    }


    const getPath =()=>{
        if(isPrivateChannel){
            return `chat/private-${channel.id}`;
        }else{
            return `chat/public`;
        }
    }


    const uploadFile = (file,metadata)=>{

        const filepath = `${getPath()}/${uuid()}.jpg`;
        setUploadState("uploading");
        setUploadTask(storageRef.child(filepath).put(file.file,metadata));
    }   


    const sendFileMessage = (downloadURL,ref,pathToUpload)=>{
            console.log(downloadURL,ref,pathToUpload);
            // ref.child(pathToUpload).push().set(setImageData(downloadURL)).then(()=>{
            //     setUploadState("done");
            // });
            ref.child(pathToUpload).push().set(setmessageData(downloadURL)).then(()=>{
                setUploadState("done");
            });
            
    }


    

    return (
            <Segment className='message__form'>
                   <p>{error.errorMessage}</p>
                    <Input
                        fluid
                        name="message"
                        style={{marginBottom: '0.7em'}}
                        label={<Button icon="add"/>}
                        labelPosition="left"
                        placeholder="Weite your message "
                        onChange={handelChange}
                        name="messages"
                        value={formValues.messages}
                    />
                    <Button.Group icon widths="2">
                        <Button color="orange" content="Add Reply" labelPosition='left' icon="edit" onClick={sendMessage} />
                        <Button color='teal' content="Upload Media" labelPosition='right' icon="cloud upload" onClick={openModal}
                        disabled={uploadState === "uploading"}
                        />
                        <FileModal   
                            modal={modal}
                            closeModal={closeModal}
                            uploadFile={uploadFile}
                        />
                    </Button.Group>
                    
                   {/* <Button onClick={()=>props.ctop(persentage,uploadState)}>kk</Button> */}


            </Segment>
        );
}

export default MessagesForm;