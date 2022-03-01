import {combineReducers } from 'redux';
import * as  actionTypes from '../actions/actionType';

const initialUserState = {
    curruntUser: null,
    isLoading: true
};

const user_reducer = (state = initialUserState, action) =>{
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                curruntUser: action.payload.curruntUser,
                isLoading: false
            }
            
        case actionTypes.CLEAR_USER:
            return{
                ...state,
                isLoading: false
            } 
            
        default:
            return state;
             
    }
};


const InitialChannelState = {
    curruntChannel : null,
    isPrivateChannel: false
} 

const channel_reducer = (state = InitialChannelState, action)=>{

    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
                return{
                    ...state,
                    curruntChannel: action.payload.curruntChannel 
                }

         case actionTypes.SET_PRIVATE_CHANNEL:
             return{
                 ...state,
                 isPrivateChannel: action.payload.isPrivateChannel
             }       
                
        default:
            return state;
    }

}

const InitialAllChannelState = {
    allChannels : null
}

const getall_channel_reducer = (state=InitialAllChannelState,action)=>{
    switch(action.type){
        case actionTypes.GET_ALL_CHANNELS:
            return{
                ...state,
                allChannels: action.payload.allChannel
            }
            default:
                return state;
    }
}






const rootReducer = combineReducers({

    user: user_reducer,
    channel: channel_reducer,
    allChannels: getall_channel_reducer
});

export default rootReducer;