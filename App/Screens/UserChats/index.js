import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {BLACK, GREY, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerSocket from '../../helper/Socket';
import {All_Chats} from '../../helper/api';
import Loader from '../../Components/Loader';

const colors = [
  '#994F14',
  '#DA291C',
  '#FFCD00',
  '#007A33',
  '#EB9CA8',
  '#7C878E',
  '#8A004F',
  '#000000',
  '#10069F',
  '#00a3e0',
  '#4CC1A1',
];

class UserChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  async Getchats() {
    this.setState({loading: true});
    await All_Chats(this.props.userToken).then(response => {
      if (response.status === 200) {
        let data = response.data.data.reverse();
        this.setState({data: data});
        this.setState({loading: false});
      } else {
        alert('Something Went Wrong');
        this.setState({loading: false});
      }
    });
    this.setState({loading: false});
  }

  async componentDidMount() {
    // this.focusListener = this.props.navigation.addListener('focus', () => {
    this.Getchats();
    // });
  }
  // componentWillUnmount() {
  //   // Remove the event listener
  //   this.focusListener();
  // }

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
                    room_id: item.room_id,
                    seller_name:
                      this.props.role === 'Seller'
                        ? item.person[0].username
                        : item.person[1].username,
                  },
                })
              }
              style={styles.itemView}>
              <Text style={styles.UserNameTxt}>
                {this.props.role === 'Seller'
                  ? item.person[1].username
                  : item.person[0].username}
              </Text>
              <Text style={[styles.UserNameTxt]}>
                {this.props.role === 'Seller'
                  ? item.person[0].username
                  : item.person[1].username}
              </Text>
            </TouchableOpacity>
          )}
          style={{marginTop: 20}}
        />
        {this.state.loading && <Loader loading={this.state.loading} />}
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
    height: isIphoneXorAbove ? 80 : 60,
    backgroundColor: '#C60404',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 25,
    alignItems: 'center',
  },
  itemView: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    height: 70,
    backgroundColor: GREY.numberColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  UserNameTxt: {
    fontWeight: '800',
    fontSize: 20,
    color: BLACK.dark,
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
