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
import React, {Component} from 'react';
import {BLACK, GREY, ORANGE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import {connect} from 'react-redux';
import {UpdateProfileApi, ChangePasswordApi} from '../../helper/api';
import Validations from '../../helper/Validations';
import * as userActions from '../../redux/actions/user';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      editProfile: false,
      email: '',
      username: '',
      old_password: '',
      new_password: '',
      changePassword: false,
    };
  }

  async UpdateProfile() {
    let data = {
      email: this.state.email,
      username: this.state.username,
    };
    if (
      Validations.checkEmail(this.state.email) &&
      this.state.username.length !== 0
    ) {
      await UpdateProfileApi(data, this.props.userDetail.id).then(response => {
        console.log(response);
        if (response && response.status === 200) {
          this.props.callApi(response.data.data);
          this.setState({editProfile: false});
          alert('Profile has been changed');
        } else {
          alert('Some thing went wrong');
          this.setState({editProfile: false});
        }
      });
    } else {
      alert('Enter Valid Data');
    }
  }

  async ChangePassword() {
    let data = {
      old_password: this.state.old_password,
      new_password: this.state.new_password,
    };
    if (
      this.state.new_password.length !== 0 &&
      this.state.old_password.length !== 0
    ) {
      await ChangePasswordApi(data, this.props.userDetail.id).then(response => {
        console.log(response);
        if (response && response.status === 200) {
          this.setState({changePassword: false});
          alert('Password has been changed');
        } else if (response.status === 422) {
          alert('old Password is not Correct');
        } else {
          alert('Something Went Wrong');
          this.setState({changePassword: false});
        }
      });
    } else {
      alert('Enter Valid data');
    }
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
            Your Account{' '}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              width: 103,
              height: 100,
              marginTop: 20,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../../assets/profile.png')}
          />
        </View>
        {!this.state.editProfile && (
          <View style={{marginLeft: 40, marginTop: 10}}>
            <Text style={{marginTop: 20, fontSize: 18, fontWeight: '600'}}>
              Username : {this.props.userDetail.username}
            </Text>
            <Text style={{marginTop: 20, fontSize: 18, fontWeight: '600'}}>
              Role : {this.props.role}
            </Text>
            <Text style={{marginTop: 20, fontSize: 18, fontWeight: '600'}}>
              email : {this.props.userDetail.email}
            </Text>
          </View>
        )}

        {this.state.editProfile && (
          <View>
            <TextInput
              placeholder="Enter Email"
              onChangeText={val => this.setState({email: val})}
              placeholderTextColor={BLACK.dark}
              style={styles.Input}
            />
            <TextInput
              placeholder="Enter Username"
              onChangeText={val => this.setState({username: val})}
              placeholderTextColor={BLACK.dark}
              style={styles.Input}
            />
          </View>
        )}

        {this.state.editProfile && (
          <TouchableOpacity
            style={{
              width: '80%',
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPress={() => this.UpdateProfile()}>
            <Text style={{color: WHITE.dark}}>Save</Text>
          </TouchableOpacity>
        )}

        {!this.state.editProfile && (
          <TouchableOpacity
            style={{
              width: '80%',
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPress={() => this.setState({editProfile: true})}>
            <Text style={{color: WHITE.dark}}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        {this.state.changePassword && (
          <View>
            <TextInput
              placeholder="old Password"
              onChangeText={val => this.setState({old_password: val})}
              placeholderTextColor={BLACK.dark}
              style={styles.Input}
            />
            <TextInput
              placeholder="new Password"
              onChangeText={val => this.setState({new_password: val})}
              placeholderTextColor={BLACK.dark}
              style={styles.Input}
            />
          </View>
        )}

        {!this.state.editProfile && !this.state.changePassword && (
          <TouchableOpacity
            style={{
              width: '80%',
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPress={() => this.setState({changePassword: true})}>
            <Text style={{color: WHITE.dark}}>Change Password</Text>
          </TouchableOpacity>
        )}

        {this.state.changePassword && (
          <TouchableOpacity
            style={{
              width: '80%',
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPress={() => this.ChangePassword()}>
            <Text style={{color: WHITE.dark}}>Save</Text>
          </TouchableOpacity>
        )}

        {(this.state.editProfile || this.state.changePassword) && (
          <TouchableOpacity
            style={{
              width: '80%',
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              alignSelf: 'center',
              marginTop: 20,
            }}
            onPress={() =>
              this.setState({editProfile: false, changePassword: false})
            }>
            <Text style={{color: WHITE.dark}}>Cancel</Text>
          </TouchableOpacity>
        )}

        <Text
          style={{fontSize: 20, fontWeight: '600', textAlign: 'center'}}></Text>
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
    height: 125,
    backgroundColor: WHITE.dark,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 30,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  Input: {
    borderWidth: 1,
    height: 40,
    width: '80%',
    paddingLeft: 10,
    color: BLACK.dark,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  watchListBtn: {
    height: 40,
    width: isIphoneXorAbove ? 120 : 130,
    backgroundColor: RED.dark,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CategorySelection: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  SelectText: {
    fontSize: isIphoneXorAbove ? 30 : 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
