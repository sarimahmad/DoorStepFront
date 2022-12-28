/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import {connect} from 'react-redux';
import {BLACK, GREY, ORANGE, RED, WHITE} from '../../helper/Color';
import * as userActions from '../../redux/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.checkUSer();
      // AsyncStorage.clear();
    });
  }

  checkUSer = async () => {
    const userDetail = await AsyncStorage.getItem('USERDETAIL');
    const TOKEN = await AsyncStorage.getItem('TOKENSAVE');
    const ROLE = await AsyncStorage.getItem('ROLE');
    setTimeout(async () => {
      if (JSON.parse(TOKEN)) {
        this.props.callApi(
          JSON.parse(userDetail),
          JSON.parse(TOKEN),
          JSON.parse(ROLE),
        );
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    }, 1000);
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: RED.dark}}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: 'bold',
              color: WHITE.dark,
              textAlign: 'center',
            }}>
            Door Step Farmer
          </Text>
        </SafeAreaView>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, access_token, role) =>
      dispatch(userActions.setUser({user, access_token, role})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
