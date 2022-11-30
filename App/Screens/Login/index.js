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
  TextInput,
  Platform,
} from 'react-native';
import Loader from '../../Components/Loader';
import {LoginForm} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Validations from '../../helper/Validations';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  isFormFilled() {
    let check_email = Validations.checkEmail(this.state.email);
    let check_Password = Validations.checkrequired(this.state.password);

    if (check_email && check_Password) {
      return true;
    }
    if (!check_email) {
      alert('Invalid Email');
    } else if (!check_Password) {
      alert('Password Lenght should be Gretaer than 3');
    }
    return false;
  }

  async Login() {
    this.setState({loading: true});
    let dataToSend = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.isFormFilled()) {
      await LoginForm(dataToSend).then(response => {
        if (response && response.status === 200) {
          this.props.callApi(
            response.data.user,
            response.data.Token,
            response.data.user.role,
          );
          this.props.navigation.navigate('Home');
        } else {
          if (response.status === 400) {
            alert('Unable to login with Provide Credentials');
          } else {
            alert('User with this Email is Not exits');
          }
        }
      });
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView bounces={false} style={{flex: 1}}>
            <Text style={styles.headerTxt}>Doorstep Farmer</Text>
            <Image
              style={{
                width: 65,
                height: 54,
                alignSelf: 'center',
                marginBottom: 30,
              }}
              source={require('../../assets/logo.png')}
            />
            <TextInput
              onChangeText={val => this.setState({email: val})}
              placeholder="Email"
              style={styles.TextInput}
            />
            <TextInput
              secureTextEntry={true}
              onChangeText={val => this.setState({password: val})}
              placeholder="Password"
              style={styles.TextInput}
            />

            <TouchableOpacity
              onPress={() => this.Login()}
              style={styles.SignBtn}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Login
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={[styles.social, {marginTop: 50}]}>
              <Text style={{fontSize: isIphoneXorAbove ? 23 : 19}}>
                Continue with Google
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={[styles.social, {backgroundColor: '#1877F2'}]}>
              <Image
                style={{height: 40, width: 40, marginRight: 20}}
                source={require('../../assets/fb.png')}
              />
              <Text
                style={{fontSize: isIphoneXorAbove ? 23 : 19, color: 'white'}}>
                Continue with facebook
              </Text>
            </TouchableOpacity> */}

            <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
              Already have an account?{' '}
              <Text
                onPress={() => this.props.navigation.navigate('SignUpAs')}
                style={{color: '#1877F2', fontWeight: '600'}}>
                Sign Up
              </Text>
            </Text>
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
  },
  headerTxt: {
    textAlign: 'center',
    fontSize:
      Platform.OS === 'android'
        ? isIphoneXorAbove
          ? 40
          : 30
        : isIphoneXorAbove
        ? 48
        : 38,
    marginBottom: 30,
    marginTop: 30,
  },
  TextInput: {
    borderBottomWidth: 1,
    fontSize: 30,
    borderBottomColor: 'lightgrey',
    marginHorizontal: 20,
    paddingBottom: 5,
    marginBottom: 45,
  },
  SignBtn: {
    backgroundColor: 'red',
    height: 50,
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
  },
  social: {
    width: SCREEN.width - 40,
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
