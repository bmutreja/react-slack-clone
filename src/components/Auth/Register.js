import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import firebase from '../../firebase';

// import { getAuth, createUserWithEmailAndPassword, updateProfile, updateCurrentUser } from "firebase/auth";



import md5 from 'md5';

function Register() {

  

  const formValues = {
    username: "",
    email: "",
    password: "",
    cnfpassword: ""
  }

  const[Regform,setRegForm] = useState(formValues);
  const[Error,setError] = useState({});
  const[isSubmit, setSubmit] = useState(false);  
  const[loading, setLoading] = useState(false);
  const[otherError,setOtherError] = useState("");

  const hendleChange = (e)=>{
    const {name, value} = e.target;
    setRegForm({...Regform, [name]:value});
    // console.log(Regform);
}
  
  const handleSubmit = (e)=>{

    e.preventDefault();
    
    setError(validate(Regform));
    
    setSubmit(true);
    
    setLoading(true);
    
    firebase.auth().createUserWithEmailAndPassword(Regform.email,Regform.password)
    .then((createdUser) => {
          
          setLoading(false);
          createdUser.user.updateProfile({
            displayName: Regform.username,
            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          }).then(()=>{
            console.log(createdUser);
            let usrid = createdUser.user.uid;
            let uname = createdUser.user.displayName;
            let uavatar = createdUser.user.photoURL;
            saveUser(usrid,uname,uavatar);
            setLoading(false);
          }).catch(err=>{
            console.log(err);
          })

        
   
  })
  .catch((error) => {
    setLoading(false);
    setOtherError(error.code);
    console.log(otherError);
  });

  
  }


  const saveUser = (usrid,uname,uavatar)=>{
    const user = firebase.database().ref('users');
    user.child(usrid).set({
      name: uname,
      avatar: uavatar
    })

  }

  useEffect(()=>{
    // console.log(Error);
    if(Object.keys(Error).length === 0 && isSubmit){
      console.log(Regform);
    }
  },[Error])


  const validate = (values)=>{
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    console.log(values);

    if(!values.username){
      errors.username = "Username Is Require";
    }
    if(!values.email){
      errors.email = "Email Is Require";
    }
    if(!values.password){
      errors.password = "Password Is Require";
    }
    if(values.password.length  < 6){
      errors.Minpassword = "Minimum 6 digit password require";
    }
    if(!values.cnfpassword){
      errors.cnfpassword = "Confirmpassword Is Require";
    }
    if(values.password !== values.cnfpassword){
      errors.passwordnotmatch = "Password Not Match";
    }

    return errors;
  }
  


  return (

      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color='orange' textAlign='center' >
            <Icon name="puzzle piece" color='orange' />
            Register For DevChat
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
              <Segment stacked>
                <p>{otherError}</p>
                <p>{Error.username}</p>
                <Form.Input fluid name="username" icon="user" iconPosition='left' 
                placeholder="Username" onChange={hendleChange} type='text' value={Regform.username} />

                <p>{Error.email}</p>
                <Form.Input fluid name="email" icon="mail" iconPosition='left' 
                placeholder="Email" onChange={hendleChange} type='email' value={Regform.email} />

                <p>{Error.password}</p>
                <p>{Error.Minpassword}</p>
                <Form.Input fluid name="password" icon="lock" iconPosition='left' 
                placeholder="Password" onChange={hendleChange} type='password' value={Regform.password} />

                <p>{Error.cnfpassword}</p>
                <p>{Error.passwordnotmatch}</p>
                <Form.Input fluid name="cnfpassword" icon="repeat" iconPosition='left' 
                placeholder="Confirm Password" onChange={hendleChange} type='password' value={Regform.cnfpassword} />

                <Button disabled={loading} className={loading ? 'loading' : ''} color='orange'>Register</Button>
              </Segment>
          </Form>
      
          <Message>Alrady a User? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>

  );
}

export default Register;

