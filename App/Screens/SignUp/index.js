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
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Loader from '../../Components/Loader';
import {SignUpform} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Validations from '../../helper/Validations';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      color: true,
      phonenumber: '',
      address: '',
      city: '',
      loading: false,
      user: '',
    };
  }

  isFormFilled() {
    let check_email = Validations.checkEmail(this.state.email);
    let check_username = Validations.check_Notonly_Digit(this.state.username);
    let check_Password = Validations.checkPassword(this.state.password);
    let check_number = Validations.check_Phone_Required(this.state.phonenumber);
    let check_address = Validations.checkrequired(this.state.address);
    let check_city = Validations.check_only_letters(this.state.city);

    if (
      check_email &&
      check_Password &&
      !check_username &&
      check_number &&
      check_address &&
      check_city
    ) {
      return true;
    }
    if (!check_email) {
      alert('Invalid Email');
    } else if (check_username) {
      alert('Invalid Username');
    } else if (!check_Password) {
      alert('Password Length should be Greater than or Equal to 5');
    } else if (!check_number) {
      alert('Number length should be 11 or 13');
    } else if (!check_address) {
      alert('Invalid Address');
    } else if (!check_city) {
      alert('Invalid City');
    }
    return false;
  }

  async SignUp() {
    this.setState({loading: true});

    let dataToSend = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      city: this.state.city,
      phone_number: this.state.phonenumber,
      role: this.state.user,
    };
    console.log(dataToSend);
    if (this.isFormFilled()) {
      await SignUpform(dataToSend).then(response => {
        if (response.status === 200) {
          this.setState({loading: false});
          this.props.callApi(
            response.data.user,
            response.data.Token,
            response.data.user.role,
          );
          this.props.navigation.navigate('Home');
        } else {
          if (response.status === 422) {
            alert('This Username or Email or Number Already Exits');
          }
          this.setState({loading: false});
        }
        this.setState({loading: false});
      });
    }
    this.setState({loading: false});
  }

  componentDidMount() {
    const user = this.props.route.params.id;
    this.setState({user: user});
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}} bounces={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    resizeMode: 'contain',
                    marginRight: 20,
                    marginLeft: 10,
                  }}
                  source={require('../../assets/backblack.png')}
                />
              </TouchableOpacity>
              <Text style={styles.headerTxt}>Doorstep Farmer</Text>
            </View>

            <Image
              style={{
                width: 65,
                height: 54,
                alignSelf: 'center',
                marginBottom: 20,
              }}
              source={require('../../assets/logo.png')}
            />

            <TextInput
              onChangeText={val => this.setState({username: val})}
              placeholder={
                this.state.user === 'Seller' ? 'Business Name' : 'Name'
              }
              style={styles.TextInput}
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

            <>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={val => this.setState({phonenumber: val})}
                placeholder="Phone Number"
                style={styles.TextInput}
              />
              <TextInput
                onChangeText={val => this.setState({address: val})}
                placeholder="Address"
                style={styles.TextInput}
              />
              <TextInput
                onChangeText={val => this.setState({city: val})}
                placeholder="City"
                style={styles.TextInput}
              />
            </>

            <TouchableOpacity
              onPress={() => this.SignUp()}
              style={styles.SignBtn}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Sign Up
              </Text>
            </TouchableOpacity>

            <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10}}>
              Already have an account?{' '}
              <Text
                onPress={() => this.props.navigation.navigate('Login')}
                style={{color: '#1877F2', fontWeight: '600'}}>
                login
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
    backgroundColor: 'white',
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
