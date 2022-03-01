import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../../firebase';

function Login(props) {


    const formValues = {
        email: "",
        password: ""
      }
    
      const[LoginForm,setLoginForm] = useState(formValues);
      const[Error,setError] = useState({});
      const[isSubmit, setSubmit] = useState(false);  
      const[loading, setLoading] = useState(false);
      const[otherError,setOtherError] = useState("");
    
      const hendleChange = (e)=>{
        const {name, value} = e.target;
        setLoginForm({...LoginForm, [name]:value});
        // console.log(LoginForm);
    }
      
      const handleSubmit = (e)=>{
    
        e.preventDefault();
        
        setError(validate(LoginForm));
        setSubmit(true);
        setLoading(true);
        
        firebase.auth().signInWithEmailAndPassword(LoginForm.email , LoginForm.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // ...
        }).catch((error) => {
                const errorCode = error.code;
                setOtherError(errorCode);
                setLoading(false);
            });
        
      
      }

    
      useEffect(()=>{
        // console.log(Error);
        if(Object.keys(Error).length === 0 && isSubmit){
          console.log(LoginForm);
        }
      },[Error])
    
    
      const validate = (values)=>{
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        console.log(values);
    
        if(!values.email){
          errors.email = "Email Is Require";
        }
        if(!values.password){
          errors.password = "Password Is Require";
        }
       
        return errors;
      }

    return (
        <div>
            <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color='violet' textAlign='center' >
            <Icon name="code branch" color='violet' />
           Login
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
              <Segment stacked>
                <p>{otherError}</p>
                <p>{Error.username}</p>
               
                <p>{Error.email}</p>
                <Form.Input fluid name="email" icon="mail" iconPosition='left' 
                placeholder="Email" onChange={hendleChange} type='email' value={LoginForm.email} />

                <p>{Error.password}</p>
                <p>{Error.Minpassword}</p>
                <Form.Input fluid name="password" icon="lock" iconPosition='left' 
                placeholder="Password" onChange={hendleChange} type='password' value={LoginForm.password} />

                <Button disabled={loading} className={loading ? 'loading' : ''} color='violet'>Login</Button>
              </Segment>
          </Form>
      
          <Message>New Here? <Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
        </div>
    );
}

export default Login;
