/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import {FONT, SCREEN} from '../helper/Constant';
import {BLACK, RED, Silver, WHITE} from '../helper/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as userActions from '../redux/actions/user';

const CustomSidebarMenu = props => {
  const Clear = async () => {
    AsyncStorage.removeItem('ROLE');
    AsyncStorage.removeItem('TOKENSAVE');
    AsyncStorage.removeItem('USERDETAIL');
    // let data = await AsyncStorage.getAllKeys();
    // console.log(data);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'AccountStack', screen: 'Login'}],
      }),
    );
    return null;
  };
  const [userObject, setUserObject] = useState('');
  useEffect(() => {
    async function fetchData() {
      if (userObject === '') {
        const userDetail = await AsyncStorage.getItem('USERDETAIL');
        setUserObject(JSON.parse(userDetail));
        console.log(JSON.parse(userDetail));
      }
    }
    fetchData();
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: SCREEN.height / 3.5,
          width: '100%',
        }}>
        <SafeAreaView style={{width: '100%'}}>
          <Image
            style={{
              width: 103,
              height: 100,
              resizeMode: 'contain',
              marginTop: Platform.OS === 'android' ? 20 : 0,
              alignSelf: 'center',
            }}
            source={require('../assets/profile.png')}
          />
          <Text
            style={{
              fontSize: 18,
              color: BLACK.dark,
              marginTop: 10,
              textAlign: 'center',
            }}>
            {userObject && userObject.username}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
              color: BLACK.dark,
              textAlign: 'center',
            }}>
            {userObject && userObject.role}
          </Text>
        </SafeAreaView>
      </View>
      <View
        style={{
          backgroundColor: WHITE.dark,
        }}>
        <DrawerItemList {...props} />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => Clear()}
          style={{
            marginBottom: 20,
            alignSelf: 'center',
            height: 40,
            width: '40%',
            marginLeft: 20,
            borderRadius: 20,
            backgroundColor: RED.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, color: WHITE.dark, fontWeight: '600'}}>
            LogOut
          </Text>
        </TouchableOpacity>
        <Text
          style={{textAlign: 'center', marginBottom: 30, paddingHorizontal: 5}}>
          By continuing, you agree to Terms of Service and acknowledge Privacy
          Policy.
        </Text>
      </View>
    </View>
  );
};

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, access_token) =>
      dispatch(userActions.setUser({user, access_token})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSidebarMenu);
