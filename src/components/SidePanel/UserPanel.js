import React, { useEffect, useState } from 'react';
import { Dropdown, Grid,Header, Icon ,Image} from 'semantic-ui-react';
import firebase from '../../firebase';

const UserPanel=(props)=> {

     
    const {curruntUser} = props;    

    const dropdownOptions = ()=>[
        {
            key: "user",
            text: <span>Signed in as <strong>{curruntUser.displayName}</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={handelSignout}>Sign Out</span>
        }
    ]


    const handelSignout = ()=>{
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("Sing out successfully");
            }).catch((error) => {
            // An error happened.
            });

    }

    return (
       <Grid style={{background: '#4c3c4c'}}>
           <Grid.Column>
               <Grid.Row style={{padding: '1.2em', margin: 0}}>
                    {/* App Header */}
                    <Header inverted floated='left' as="h2">
                        <Icon name='code'/>
                        <Header.Content>Dev Chat</Header.Content>
                    </Header>


                        {/* User drop down */}

            <Header style={{padding: '0.25rem'}} as="h4" inverted>
                <Dropdown trigger={
                    <span><Image src={curruntUser.photoURL} spaced="right" avatar />
                    {curruntUser.displayName}</span>
                } options={dropdownOptions()} />
            </Header>

               </Grid.Row>

        

           </Grid.Column>
       </Grid>
    );
}

export default UserPanel;