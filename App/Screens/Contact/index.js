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
import {All_Messages} from '../../helper/api';

const Contact = props => {
  const [Messages, setMessages] = useState([]);
  const [username, setuserName] = useState([]);

  const GetAllChats = async id => {
    await All_Messages(id).then(response => {
      if (response.status === 200) {
        setMessages(response.data.reverse());
      }
    });
  };

  useEffect(() => {
    const data = props.route.params.data;
    global.ws = new WebSocket(`${ServerSocket}/ws/chat/${data.room_id}/`);
    GetAllChats(data.room_id);
    setuserName(props.userDetail.username);

    ws.onopen = () => {
      console.log('we are connected');
    };

    ws.onmessage = function (data) {
      let messageInfo = JSON.parse(data.data);
      console.log('Receice', messageInfo);

      let obj = {
        _id: '1',
        text: messageInfo.message,
        createdAt: new Date(),
        user: {
          _id: messageInfo.user,
        },
      };

      messageInfo.message &&
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, obj),
        );
    };
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hell',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 21,
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'Hye',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 27,
    //     },
    //   },
    //   {
    //     _id: 3,
    //     text: 'Where are You',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 21,
    //     },
    //   },
    // ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    let data = {
      message: messages[0].text,
      user: props.userDetail.id,
      room_id: props.route.params.data.room_id,
    };
    ws.send(JSON.stringify(data));
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
