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

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      data: '',
      selectedCategory: 0,
      loading: false,
      value: 0,
    };
  }
  componentDidMount() {
    const data = this.props.route.params.data;
    this.setState({data: data});
    console.log(data);
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
                marginRight: isIphoneXorAbove ? 90 : 60,
                resizeMode: 'contain',
              }}
              source={require('../../assets/backblack.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 24, fontWeight: '600', color: BLACK.dark}}>
            Add Card
          </Text>
        </View>
        <View style={{flex: 1, width: SCREEN.width - 40, alignSelf: 'center'}}>
          <SafeAreaView style={{flex: 1}}>
            <Text style={{fontSize: 22, marginTop: 20}}>Name</Text>
            <TextInput placeholder="Enter Name" style={styles.TextInput} />

            <Text style={{fontSize: 22}}>Card Number</Text>
            <TextInput placeholder="Card Number" style={styles.TextInput} />

            <Text style={{fontSize: 22}}>Expiry Date</Text>
            <TextInput placeholder="Expiray Date" style={styles.TextInput} />

            <Text style={{fontSize: 22}}>Security Code</Text>
            <TextInput placeholder="Security Code" style={styles.TextInput} />

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Information', {
                  data: this.state.data,
                })
              }
              style={styles.Btn}>
              <Text style={{color: WHITE.dark, fontSize: 20}}>Save</Text>
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
    height: isIphoneXorAbove ? 80 : 70,
    // backgroundColor:'#C60404',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
