import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Loader from '../../Components/Loader';
import {LoginForm} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      selectedCategory: 0,
      loading: false,
      value: 0,
    };
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <View style={styles.headerView}>
          <View>
            <Text style={{fontSize: 28, color: RED.dark}}>Product Review</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 25, height: 25, marginRight: 5}}
                source={require('../../assets/star.png')}
              />
              <Image
                style={{width: 25, height: 25, marginRight: 5}}
                source={require('../../assets/star.png')}
              />
              <Image
                style={{width: 25, height: 25, marginRight: 5}}
                source={require('../../assets/star.png')}
              />
              <Image
                style={{width: 25, height: 25, marginRight: 5}}
                source={require('../../assets/star.png')}
              />
              <Image
                style={{width: 25, height: 25, marginRight: 5}}
                source={require('../../assets/star.png')}
              />
            </View>
          </View>
          <Image
            style={{width: 25, height: 25, resizeMode: 'contain'}}
            source={require('../../assets/cross.png')}
          />
        </View>
        <View style={{flex: 1, width: SCREEN.width - 40, alignSelf: 'center'}}>
          <SafeAreaView style={{flex: 1}}>
            <TextInput
              multiline={true}
              placeholder="Write Your Reviews Here"
              style={{
                height: 100,
                width: SCREEN.width - 40,
                alignSelf: 'center',
                marginTop: 20,
              }}
            />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PaymentSucess')}
              style={styles.Btn}>
              <Text style={{color: WHITE.dark, fontSize: 20}}>Confirm</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
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
    height: isIphoneXorAbove ? 130 : 90,
    // backgroundColor:'#C60404',
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: RED.dark,
    marginTop: 5,
    marginBottom: 22,
    paddingLeft: 10,
  },
  Btn: {
    width: '50%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: RED.dark,
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);
