import React from 'react';
import { Header,Segment,Input,Icon } from 'semantic-ui-react';


function MessagesHeader(props) {

    const {channelName} = props;
    const {uniqueUser} =props;
    const {searchMessage} =props;
    const {isPrivateChannel} = props;

    const prural = Object.keys(uniqueUser).langth > 1 || Object.keys(uniqueUser).langth === 0;
    
    return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated='left' style={{marginBottom: 0}}>
               <span>
                {channelName}
                {!isPrivateChannel && <Icon name={"star outline"} color="black" />}
                </span>
                <Header.Subheader>
                    {/* 2 Users */} {uniqueUser}
                </Header.Subheader>
                {/* channel search input */}
            </Header>
            <Header floated='right'>
                    <Input
                        size="mini"
                        icon="search"
                        name="searchTerm"
                        placeholder="Search Messages"
                        onChange={searchMessage}
                    />
                </Header>
        </Segment>
    );
}

export default MessagesHeader;