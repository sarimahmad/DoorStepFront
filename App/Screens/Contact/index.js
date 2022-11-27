/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disableno-alert */

import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ServerSocket from '../../helper/Socket';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {RED, WHITE} from '../../helper/Color';
import {GiftedChat} from 'react-native-gifted-chat';

const Contact = props => {
  const [Messages, setMessages] = useState([]);
  const [username, setuserName] = useState([]);

  useEffect(() => {
    const data = props.route.params.data;
    setuserName(props.userDetail.username);
    let id = JSON.stringify(data.seller);
    console.log(id);
    global.ws = new WebSocket(`${ServerSocket}/ws/chat/${id}/`);
    ws.onopen = () => {
      console.log('we are connected');
    };
    let val = 4;

    ws.onmessage = function (data) {
      let messageInfo = JSON.parse(data.data);
      console.log('Receice', messageInfo);

      let obj = {
        _id: val++,
        text: messageInfo.message,
        createdAt: new Date(),
        user: {
          _id: messageInfo.username,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      messageInfo.message &&
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, obj),
        );
    };
    setMessages([
      {
        _id: 1,
        text: 'Hell',
        createdAt: new Date(),
        user: {
          _id: 22,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hye',
        createdAt: new Date(),
        user: {
          _id: 27,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Where are You',
        createdAt: new Date(),
        user: {
          _id: 22,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];

    let data = {
      message: messages[0].text,
      username: props.userDetail.id,
      value: 'sender',
    };
    ws.send(JSON.stringify(data));
    // console.log("SendBy",props.userDetail.id)
    // console.log("SendTo",props.route.params.data.seller)

    // console.log("Sent Message",msg)
  }, []);

  return (
    <View style={styles.wrapperView}>
      <View
        style={{
          width: '100%',
          height: Platform.OS === 'android' ? 70 : 90,
          paddingTop: Platform.OS === 'android' ? 20 : 0,
          backgroundColor: RED.dark,
        }}>
        <SafeAreaView
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  marginRight: 20,
                }}
                source={require('../../assets/back.png')}
              />
            </TouchableOpacity>

            <Text style={{fontSize: 20, color: WHITE.dark}}>{props.role}</Text>
          </View>
          <Image
            style={{
              width: 20,
              height: 25,
              resizeMode: 'contain',
              marginRight: 20,
            }}
            source={require('../../assets/phone2.png')}
          />
        </SafeAreaView>
      </View>
      <GiftedChat
        messages={Messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: props.userDetail.id,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  InputView: {
    width: '100%',
    backgroundColor: RED.dark,
    height: 90,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 20,
    color: WHITE.dark,
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
