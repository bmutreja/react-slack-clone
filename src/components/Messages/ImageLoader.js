import React from 'react';
import { Loader, Segment ,Image} from 'semantic-ui-react';

const ImageLoader=(props)=> {

    const{persentage,uploadState } = props;

    console.log(persentage);
    console.log(uploadState);


    return (
        <Segment>
            <Loader  />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
    );
}

export default ImageLoader;