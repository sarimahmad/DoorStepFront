import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Validations from '../../helper/Validations';
import {PlaceBuyerOrder} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, RED, WHITE} from '../../helper/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Loader from '../../Components/Loader';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userDetail.username,
      number: '',
      email: this.props.userDetail.email,
      Address: '',
      Area: '',
      OrderNotes: '',
      loading: false,
      data: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const data = this.props.route.params.data;
      console.log('Arrived Data', data);
      this.setState({data: data});
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  isFormFilled() {
    let check_name = Validations.checkrequired(this.state.name);
    let check_number = Validations.check_Phone_Required(this.state.number);
    let check_email = Validations.checkEmail(this.state.email);

    let check_Address = Validations.checkrequired(this.state.Address);
    let check_Area = Validations.checkrequired(this.state.Area);

    if (
      check_name &&
      check_number &&
      check_email &&
      check_Address &&
      check_Area
    ) {
      return true;
    }
    if (!check_name) {
      alert('Invalid  Name');
    } else if (!check_number) {
      alert('Invalid Number');
    } else if (!check_email) {
      alert('Invalid Email');
    } else if (!check_Address) {
      alert('Invalid Address');
    } else if (!check_Area) {
      alert('Password Area');
    }
    return false;
  }

  async removeFromCart() {
    let CartData = await AsyncStorage.getItem('Cart');
    CartData = JSON.parse(CartData);
    if (CartData) {
      CartData = [];
      console.log(CartData);
      AsyncStorage.setItem('Cart', JSON.stringify(CartData));
    }
  }

  async placeBuyerOrder() {
    const token = this.props.userToken;
    const data = {
      seller: this.state.data.seller,
      product: Array.isArray(this.state.data.product)
        ? this.state.data.product
        : [this.state.data.product],
      quantity: Array.isArray(this.state.data.quantity)
        ? this.state.data.quantity
        : [Number(this.state.data.quantity)],
      name: this.state.name,
      amount: this.state.data.amount,
      paymentMethod: this.state.data.payment === 1 ? 'Cash' : 'Credit/Debit',
      phone: this.state.number,
      email: this.state.email,
      shipAddress: this.state.Address,
      shipArea: this.state.Area,
      orderNotes: this.state.OrderNotes,
    };
    console.log('OrderPlacing Data', data);
    this.setState({loading: true});
    if (this.isFormFilled()) {
      await PlaceBuyerOrder(data, token).then(response => {
        console.log(response);
        if (response && response.status === 200) {
          this.removeFromCart();
          this.setState({loading: false});
          this.props.navigation.navigate('MainHome');
          alert('Order has been Placed');
        } else {
          this.setState({loading: false});
          if (response && response.status === 404) {
            alert('Out of Stock');
            this.props.navigation.navigate('MainHome');
          } else {
            alert('Some thing Went Wrong');
          }
        }
      });
      this.setState({loading: false});
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
                marginRight: isIphoneXorAbove ? 60 : 50,
                resizeMode: 'contain',
              }}
              source={require('../../assets/backblack.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 24, fontWeight: '600', color: BLACK.dark}}>
            Profile Information
          </Text>
        </View>
        <View style={{flex: 1, width: SCREEN.width - 40, alignSelf: 'center'}}>
          <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}} bounces={false}>
              <Text style={{fontSize: 22, marginTop: 20}}>Enter your Name</Text>
              <TextInput
                value={this.state.name}
                onChangeText={val => this.setState({name: val})}
                placeholder="Enter Name"
                style={styles.TextInput}
              />
              <View>
                <Text style={{fontSize: 22}}>Enter Mobile Number</Text>
                <TextInput
                  onChangeText={val => this.setState({number: val})}
                  style={styles.TextInput}
                  keyboardType="number-pad"
                  placeholder="Enter Number"
                />
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    position: 'absolute',
                    bottom: 35,
                    left: 10,
                  }}
                  source={require('../../assets/phone.png')}
                />
              </View>

              <View>
                <Text style={{fontSize: 22}}>Email Address</Text>
                <TextInput
                  value={this.state.email}
                  placeholder="Email "
                  onChangeText={val => this.setState({email: val})}
                  style={styles.TextInput}
                />
                <Image
                  style={{
                    width: 25,
                    height: 18,
                    position: 'absolute',
                    bottom: 35,
                    left: 10,
                  }}
                  source={require('../../assets/mail.png')}
                />
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#4CAF50',
                  paddingBottom: 20,
                }}>
                <Text style={{fontSize: 22}}>Shipping address</Text>
              </View>
              <Text style={{fontSize: 22, marginTop: 20}}>
                Enter Your Address
              </Text>
              <TextInput
                placeholder="Address"
                onChangeText={val => this.setState({Address: val})}
                style={styles.TextInput}
              />
              <Text style={{fontSize: 22}}>Enter Area</Text>
              <TextInput
                onChangeText={val => this.setState({Area: val})}
                placeholder="Enter Area"
                style={styles.TextInput}
              />
              <Text style={{fontSize: 22}}>Order notes (Optional)</Text>
              <TextInput
                onChangeText={val => this.setState({OrderNotes: val})}
                placeholder="Order Notes"
                style={styles.TextInput}
              />

              <TouchableOpacity
                onPress={() => this.placeBuyerOrder()}
                style={styles.Btn}>
                <Text style={{color: WHITE.dark, fontSize: 20}}>Confirm</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
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

    paddingLeft: 40,
  },
  Btn: {
    width: '50%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(Information);
