import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as firebase from 'firebase';
import {
  Container,
  Content,
  Header,
  Label,
  Button,
  Form,
  Item,
  Input
} from 'native-base';

//initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWWCdi84BofstOgOLE7xKsRvDeQxcyLqY",
  authDomain: "testing-query.firebaseapp.com",
  databaseURL: "https://testing-query.firebaseio.com",
  projectId: "testing-query",
  storageBucket: "testing-query.appspot.com"
};
firebase.initializeApp(firebaseConfig);

export default class App extends Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = (email, password) =>{
    try{
      if (this.state.password.length < 6){
        alert("Please enter at least six characters")
        return
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
    }
  }

  logInUser = (email, password) =>{
    try{
      firebase.auth().signInWithEmailAndPassword(email, password)
    }

    catch(error){
      console.log(error.toString())
    }
  }
  render() {
    return (
      <Container style = {styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText = {(email)=> this.setState({email})}
            />
          </Item>
        </Form>

        <Form>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry = {true}
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText = {(password)=> this.setState({password})}
            />
          </Item>

          <Button style = {{marginTop: 10}}
            full
            rounded
            success
            onPress = {()=> this.logInUser(this.state.email, this.state.password)}
          >
          <Text style = {{color: 'white'}}>Login</Text>
          </Button>


          <Button style = {{marginTop: 10}}
            full
            rounded
            Primary
            onPress = {()=> this.signUpUser(this.state.email, this.state.password)}
          >
          <Text style = {{color: 'white'}}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  }
});
