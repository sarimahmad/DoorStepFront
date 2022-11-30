import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {RED} from '../../helper/Color';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';

class SignUpAs extends Component {
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={styles.wrapperView}>
          <Text style={styles.headerTxt}>Doorstep Farmer</Text>

          <View
            style={{
              flexDirection: 'row',
              width: SCREEN.width - 40,
              flex: 0.7,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SignUp', {id: 'Buyer'})
              }
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: SCREEN.width / 2.5,
                height: SCREEN.height / 6,
                borderWidth: 1,
                borderColor: RED.dark,
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/customer.png')}
              />
              <Text style={{marginTop: 10}}>Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SignUp', {id: 'Seller'})
              }
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: SCREEN.width / 2.5,
                height: SCREEN.height / 6,
                borderWidth: 1,
                borderColor: RED.dark,
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/business.png')}
              />
              <Text style={{marginTop: 10}}>Business</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
    height: 62,
    width: 159,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    borderRadius: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAs);
