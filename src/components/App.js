import { connect } from 'react-redux';
import { Grid, Message } from 'semantic-ui-react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import Messages from './Messages/Messages';
import MatelPanel from './MetalPanel/MatelPanel';
import SidePanel from './SidePanel/SidePanel';



function App({curruntUser,curruntChannel,allChannels,isPrivateChannel}) {


  return (
    <Grid columns="equal" className='app' style={{background: '#eee'}}>
      <ColorPanel/>
      <SidePanel curruntUser={curruntUser} key={curruntUser && curruntUser.uid}  />
      
      <Grid.Column style={{marginLeft: 320}}>
        <Messages curruntUser={curruntUser} curruntChannel={curruntChannel} 
        key={curruntChannel && curruntChannel.id} isPrivateChannel={isPrivateChannel} />
      </Grid.Column>
      
      <Grid.Column width={4}>
        <MatelPanel/>
      </Grid.Column>
      
    </Grid>
  );
}

 const myStateToProps = state =>({
   curruntUser: state.user.curruntUser,
   curruntChannel: state.channel.curruntChannel,
   allChannels: state.allChannels.allChannels,
   isPrivateChannel : state.channel.isPrivateChannel
 }) 



export default connect(myStateToProps)(App);
