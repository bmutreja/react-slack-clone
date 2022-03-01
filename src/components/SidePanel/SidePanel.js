import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessage from './DirectMessage';


function SidePanel(props) {

    const {curruntUser} = props;
    const {allChannels} = props;

    return (
        <Menu size='large' inverted fixed='left' vertical style={{background: '#4c3c4c', fontSize: '1.2rem'}}>
            <UserPanel curruntUser={curruntUser}/>
            <Channels curruntUser={curruntUser} allChannels={allChannels}/>
            <DirectMessage curruntUser={curruntUser} />    
        
        </Menu>
    );
}

export default SidePanel;