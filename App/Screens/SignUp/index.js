/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disableno-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Loader from '../../Components/Loader';
import {SignUpform} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, PURPLE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import Validations from '../../helper/Validations'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username:'',
      color: true,
      loading: false,
      user:'',
    };
  }

  isFormFilled() {
    let check_email = Validations.checkEmail(this.state.email);
    let check_username = Validations.checkrequired(this.state.username);
    let check_Password = Validations.checkrequired(this.state.password);
  

    if (
      check_email &&
      check_Password &&
      check_username
    ) {
      return true;
    }
    if (!check_email) {
      alert('Invalid Email');
    }
    else if (!check_username) {
      alert('Invalid Username');
     }
     else if (!check_Password) {
      alert('Password Lenght should be Gretaer than 3');
     }
    return false;
  }

  async SignUp() {
    this.setState({loading: true});

    let dataToSend = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role:this.state.user

  
    };
    console.log(dataToSend)
    if (this.isFormFilled()) {
      await SignUpform(dataToSend).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({loading: false});
          this.props.callApi(response.data.user,
             response.data.Token, 
             response.data.user.role);
          this.props.navigation.navigate("Home")
        } 
        else{
          if (response.status === 422){
            alert("Your Username or Email is Same")
          }
          this.setState({loading: false});
          
          
        }
        this.setState({loading: false});
      });
    }
    this.setState({loading: false});
  }

  componentDidMount(){
    const user = this.props.route.params.id;
    this.setState({user: user});
  }
  
  render() {
    return (
      <View
        style={styles.wrapperView}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex:1}}
          bounces={false}
          >
        <View style={{flexDirection:"row", alignItems:"center"}}>
         <TouchableOpacity onPress={()=> this.props.navigation.goBack(  )}><Image style={{height:30, width:30,resizeMode:"contain", marginRight: 20}} source={require('../../assets/backblack.png')}/></TouchableOpacity> 
        <Text style={styles.headerTxt}>Doorstep Farmer</Text>
        </View>
       
        <Image 
        style={{width: 65, height: 54, alignSelf:'center'}}
        source={require('../../assets/logo.png')}/>
   { this.state.user === 'Buyer' ?     <TextInput
        onChangeText={(val)=> this.setState({username: val})}
        placeholder='Name'
        style={styles.TextInput}
        />:(null)}
        <TextInput
        onChangeText={(val)=> this.setState({email: val})}
        placeholder='Email'
        style={styles.TextInput}
        />
        <TextInput
        secureTextEntry={true}
        onChangeText={(val)=> this.setState({password: val})}
        placeholder='Password'
        style={styles.TextInput}
        />
      { this.state.user === 'Seller' ?  <><TextInput
              onChangeText={(val) => this.setState({ username: val })}
              placeholder='Business Name'
              style={styles.TextInput} /><TextInput
                placeholder='Phone Number'
                style={styles.TextInput} /><TextInput
                placeholder='Address'
                style={styles.TextInput} /><TextInput
                placeholder='City'
                style={styles.TextInput} /></> :(null)}


        <TouchableOpacity 
        onPress={()=> this.SignUp()}
        style={styles.SignBtn}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.social,{marginTop: 50}]}>

        <Text style={{fontSize: isIphoneXorAbove ? 23 : 19,}}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.social,{backgroundColor:'#1877F2'}]}>
        <Image 
        style={{height: 40, width: 40, marginRight:20}}
        source={require('../../assets/fb.png')}/>
        <Text style={{fontSize: isIphoneXorAbove ? 23 : 19, color:"white"}}>Continue with facebook</Text>
        </TouchableOpacity>

        <Text style={{textAlign:'center', fontSize:18, marginBottom: 10}}>Already have an account? <Text 
        onPress={()=> this.props.navigation.navigate('Login')}
        style={{color:'#1877F2', fontWeight:'600'}}>login</Text></Text>
        </ScrollView>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor:'white'
  },
  headerTxt:{
    textAlign:'center',
    fontSize: isIphoneXorAbove ? 40 : 32,

  },
  TextInput:{
    borderBottomWidth:1,
    fontSize: 30,
    borderBottomColor:'lightgrey',
    marginHorizontal: 20,
    paddingBottom: 5,
    marginBottom: 45
    },
    SignBtn:{
      backgroundColor:"red",
      height: 62,
      width: 159,
      alignItems:'center',
      justifyContent:'center',
      alignSelf:"flex-end",
      marginRight: 20,
      borderRadius: 10
    },
    social:{
      width: SCREEN.width - 40,
      height: 66,
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal: 10,
      borderWidth: 1, 
      alignSelf:'center',
      marginBottom: 10,
      borderRadius: 10
    }
});
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
    role: state.user.role,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, access_token, role) =>
      dispatch(userActions.setUser({user, access_token, role})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
