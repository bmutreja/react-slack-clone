import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar,Menu,Divider,Button } from 'semantic-ui-react';



ColorPanel.propTypes = {
    
};

function ColorPanel(props) {
    return (
        <Sidebar
         as={Menu}
         icon="labeled"
         inverted
         vertical
         visible
         width='very thin'   
        >
            <Divider/>
            <Button icon="add" color='blue' size='small'/>
            </Sidebar>
    );
}

export default ColorPanel;