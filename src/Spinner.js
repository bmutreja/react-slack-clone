import React from 'react';
import { Loader , Dimmer, Image} from 'semantic-ui-react';

function Spinner(props) {
    return (
        <Dimmer active>
    <Loader size="huge"  content={"Preparing Chat....."} /> 
   
    </Dimmer>       
    );
}

export default Spinner;