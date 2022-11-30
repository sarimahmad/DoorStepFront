import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {WHITE} from '../../helper/Color';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerSocket from '../../helper/Socket';

class UserChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        let chatData = await AsyncStorage.getItem('chatData');
        if (chatData) {
          console.log('Data', chatData);
          chatData = JSON.parse(chatData);
          this.setState({data: chatData});
        } else {
          AsyncStorage.setItem('chatData', '[]');
        }
      },
    );
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener();
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{
                width: 25,
                height: 15,
                marginRight: 30,
                resizeMode: 'contain',
              }}
              source={require('../../assets/back.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 24, fontWeight: '600', color: WHITE.dark}}>
            Your Chats
          </Text>
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Contact', {
                  data: {
                    seller: item,
                  },
                })
              }
              style={styles.itemView}>
              <Text>{item.username}</Text>
              <Text>{item.id}</Text>
            </TouchableOpacity>
          )}
          style={{marginTop: 20}}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  headerView: {
    width: SCREEN.width,
    height: isIphoneXorAbove ? 80 : 70,
    backgroundColor: '#C60404',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 25,
    alignItems: 'center',
  },
  itemView: {
    width: '100%',
    height: 70,
    backgroundColor: WHITE.dark,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
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
    callApi: user => dispatch(userActions.alterJustUser({user})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChats);
