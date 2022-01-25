import * as React from 'react';
import {Text,StyleSheet,View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,Image} from 'react-native';
import * as firebase from 'firebase';
import dp from '../config';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:''
        }
    }

    login=async(email,password)=>{
        if(email && password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate('');
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert('USER DOES NOT EXIST');
                        console.log('user does not exist');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('INCORRECT EMAIL OR PASSWORD');
                        console.log('incorrect username or password');
                        break;
                        default:break;
                }
            }
        }
        else{
            Alert.alert('ENTER EMAIL OR PASSWORD');
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}}>
                <VIew>
                    <Image source={
                        require('../assets/readingbook.png')}
                        style={{width:200,height:200,borderWidth:15}}
                    />
                    <Text style={{textAlign:'center',fontSize:30}}>BEDTIME STORIES</Text>
                </VIew>
                <VIew>
                    <TextInput
                    placeholder='enter-email id'
                    keyboardTyp='email-address'
                    style={styles.loginBox}
                    onChangeText={(text)=>{this.setState({emailId:text})}}
                    />
                    <TextInput
                    placeholder='enter-password'
                    secureTextEntry={true}
                    style={styles.loginBox}
                    onChangeText={(text)=>{this.setState({password:text})}}
                    />
                </VIew>
                <View>
                    <TouchableOpacity style={styles.button}
                        onPress={()=>{
                            this.login(this.state.emailId,this.state.password);
                        }}>
                            <Text style={{textAlign:'center'}}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.75,
        fontSize:18,
        color:'lightpink',
        margin:10,
        paddingLeft:10
    },
    button:{
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7
    }
})