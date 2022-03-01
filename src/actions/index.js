import * as actionType from './actionType';

export const setUser = user => {
    return ({
        type: actionType.SET_USER,
        payload: {
            curruntUser: user
        }
    });
}

export const clearUser= ()=>{
    return{
        type: actionType.CLEAR_USER,

    }
}

// chaanels action 
export const setCurruntChannel = channel =>{
    return {
        type: actionType.SET_CURRENT_CHANNEL,
        payload: {
            curruntChannel: channel
        }
    }
}


export const getAllChannels = allchannel =>{

    return{
        type:actionType.GET_ALL_CHANNELS,
        payload:{
            allChannel: allchannel
        }
        
    }
    
}


export const setPrivateChannel = isPrivateChannel => {
 
        return {
            type: actionType.SET_PRIVATE_CHANNEL,
            payload:{
                isPrivateChannel
            }
        }

}