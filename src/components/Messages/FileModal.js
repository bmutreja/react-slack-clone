import React, { useState } from 'react';
import { Button, Icon, Input, Modal } from 'semantic-ui-react';
// import mime from 'mime-types';
// import mime from 'mime-types';




function FileModal(props) {

    const {modal,closeModal,uploadFile} = props;
    const[file,setFile] = useState(null);


        
    const sendFile=()=>{
       
        if(file !== null){
            
                  uploadFile(file,file.file.type); 
                  closeModal();
                  clearFile(); 
                  console.log(file); 

        }

    }

    const clearFile =()=>{
        setFile({file:null});
    }
    
    const addFile = (e)=>{
        const file = e.target.files[0];
        if(file){
            setFile({file});
        }
    } 

    return (
        <>
          <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Select an Image File </Modal.Header>
            <Modal.Content>
                <Input
                    fluid
                    label="File"
                    name="file"
                    type="file"
                    onChange={addFile}    
                    accept="image/*"
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' inverted  onClick={sendFile}>
                    <Icon name="checkmark" /> Send 
                </Button>
                <Button color='red' inverted onClick={closeModal}>
                    <Icon name="remove" /> Cancel 
                </Button>
            </Modal.Actions>
        </Modal>
        </>
    );
}

export default FileModal;