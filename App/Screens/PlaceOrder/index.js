import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Loader from '../../Components/Loader';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Server from '../../helper/Server';

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      paymentMethod: '',
      loading: false,
      value: '0',
    };
  }
  componentDidMount() {
    const data = this.props.route.params.data;
    this.setState({data: data});
    console.log(data);
    if (!data.NumberofProduct) {
      alert('Please Enter Quantity in KG');
    }
  }
  paymentSelection() {
    Alert.alert('Select Payment Method', '', [
      {
        text: 'Cash on Delivery',
        onPress: () => this.setState({paymentMethod: 1}),
      },
      {text: 'Card/Credit', onPress: () => this.setState({paymentMethod: 2})},
    ]);
  }

  PlaceBuyerOrder() {
    let cost = this.state.data.NumberofProduct
      ? this.state.data.NumberofProduct * this.state.data.price + 200
      : Number(this.state.value) * this.state.data.price + 200;
    let quantity = this.state.data.NumberofProduct
      ? this.state.data.NumberofProduct
      : Number(this.state.value);
    if (quantity === 0) {
      alert('Quantity Cannot Be 0');
      this.setState({loading: false});
    } else if (this.state.paymentMethod === '') {
      alert('Please Select Payment Method');
      this.setState({loading: false});
    } else {
      const data = {
        id: this.state.data.id,
        seller: this.state.data.seller,
        product: this.state.data.id,
        quantity: quantity,
        amount: cost,
        payment: this.state.paymentMethod,
      };
      if (this.state.paymentMethod === 1) {
        this.props.navigation.navigate('Information', {data});
      } else {
        this.props.navigation.navigate('AddCard', {data});
      }
    }
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                style={{
                  width: 25,
                  height: 15,
                  marginLeft: 20,
                  marginRight: isIphoneXorAbove ? 50 : 30,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/backblack.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: Platform.OS === 'android' ? 16 : 18,
                marginTop: Platform.OS === 'android' ? 10 : 0,
              }}>
              {this.state.data.NumberofProduct
                ? this.state.data.NumberofProduct * this.state.data.price + 200
                : Number(this.state.value) * this.state.data.price + 200}{' '}
              Rs away from free delivery
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Image
              style={{width: 148, height: 132, resizeMode: 'stretch'}}
              source={{
                uri: `${Server}${this.state.data.image}`,
              }}
            />

            <View style={{marginLeft: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '60%',
                  marginBottom: 30,
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '600'}}>{this.state.data.title}</Text>
                <Text>Rs {this.state.data.price} </Text>
              </View>
              <Text>{this.state.data.price} / KG </Text>

              {!this.state.data.NumberofProduct && (
                <View style={styles.btn}>
                  <Text
                    style={{fontSize: 20}}
                    onPress={() => {
                      let number = Number(this.state.value) - 1;
                      if (number < 0) {
                        alert("Can't be 0");
                      } else {
                        this.setState({value: JSON.stringify(number)});
                      }
                    }}>
                    -
                  </Text>

                  <TextInput
                    value={this.state.value}
                    onChangeText={val => this.setState({value: val})}
                    style={{
                      width: '50%',
                      height: 30,
                      marginRight: 5,
                      paddingLeft: 15,
                    }}
                  />
                  <Text
                    style={{fontSize: 20}}
                    onPress={() => {
                      let number = Number(this.state.value) + 1;
                      this.setState({value: JSON.stringify(number)});
                    }}>
                    +
                  </Text>
                </View>
              )}

              <Text
                style={{marginTop: this.state.data.NumberofProduct ? 30 : 10}}>
                You Want to Buy {this.state.data.NumberofProduct} KG
              </Text>
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                paddingHorizontal: 10,
                marginBottom: Platform.OS === 'android' ? 20 : 0,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 40,
                }}>
                <Text>Pakage Total</Text>
                <Text>
                  {this.state.data.NumberofProduct
                    ? this.state.data.NumberofProduct * this.state.data.price +
                      200
                    : Number(this.state.value) * this.state.data.price}{' '}
                  rs
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}>
                <Text>Packing Charges </Text>
                <Text>100 rs</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}>
                <Text>Delivery Charges</Text>
                <Text>100 rs</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 40,
                }}>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                  Payment Method
                </Text>
                <Text onPress={() => this.paymentSelection()}>
                  {this.state.paymentMethod === ''
                    ? 'Press Me to Select'
                    : this.state.paymentMethod === 1
                    ? 'Cash on Delivery'
                    : 'Credit / Debit'}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                  marginTop: 30,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}>
                <Text style={{fontWeight: '600'}}>Total</Text>
                <Text style={{fontWeight: '600'}}>
                  {this.state.data.NumberofProduct
                    ? this.state.data.NumberofProduct * this.state.data.price +
                      200
                    : Number(this.state.value) * this.state.data.price +
                      200}{' '}
                  rs
                </Text>
              </View>

              <TouchableOpacity
                // this.props.navigation.navigate("PaymentMethod")
                onPress={() => this.PlaceBuyerOrder()}
                style={styles.orderbtn}>
                <Image
                  style={{width: 17, height: 20}}
                  source={require('../../assets/whitecart.png')}
                />
                <Text
                  style={{color: 'white', fontWeight: '700', marginLeft: 20}}>
                  PLACE ORDER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  ItemView: {
    flex: 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
  },
  btn: {
    width: '40%',
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LastBox: {
    width: '100%',
    height: SCREEN.height / 5.5,
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  lastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  orderbtn: {
    width: '70%',
    flexDirection: 'row',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#C60404',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
