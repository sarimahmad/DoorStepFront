import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {Component} from 'react';
import {BLACK, RED, WHITE} from '../../helper/Color';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader';
import Server from '../../helper/Server';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      amount: 0,
      paymentMethod: '',
    };
  }
  async componentDidMount() {
    this.setState({loading: true});
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      let CartData = await AsyncStorage.getItem('Cart');
      CartData = JSON.parse(CartData);
      if (CartData == null) {
        CartData = [];
      }
      this.setState({data: CartData});
      this.setState({loading: false});
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
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
  RemoveItemFromCart(id) {
    let data = this.state.data;
    data = data.filter(val => {
      return id !== val.id;
    });
    this.setState({data: data});
    AsyncStorage.setItem('Cart', JSON.stringify(data));
  }

  CalculatePrice() {
    let price = 0;
    if (this.state.data) {
      this.state.data.forEach(e => {
        let data = e.price * Number(e.NumberofProduct) + 100;
        price = price + data;
      });
      return price;
    }
    return 0;
  }

  PlaceOrder() {
    let product_id = [];
    let quantity = [];
    let seller = [];
    this.state.data.forEach(val => {
      product_id.push(val.id);
      quantity.push(Number(val.NumberofProduct));
      seller.push(val.seller.id);
    });

    let data = {
      seller: seller,
      amount: this.CalculatePrice(),
      product: product_id,
      payment: this.state.paymentMethod,
      quantity: quantity,
    };
    console.log(data);
    if (this.state.paymentMethod == '') {
      alert('Select Payment Method');
    } else {
      this.props.navigation.navigate('Information', {data});
    }
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <View style={styles.headerView}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: WHITE.dark,
              marginLeft: 20,
            }}>
            Cart{' '}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              height:
                Platform.OS === 'ios'
                  ? SCREEN.height / 1.7
                  : SCREEN.height / 1.9,
            }}>
            {this.state.data && this.state.data.length !== 0 ? (
              <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.itemView}>
                    <Image
                      style={{
                        height: '100%',
                        width: '35%',
                        backgroundColor: 'red',
                        resizeMode: 'stretch',
                      }}
                      source={{
                        uri: `${Server}${item.image}`,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: 23,
                        flexDirection: 'row',
                        height: '100%',
                        width: '55%',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={{fontWeight: '700'}}>{item.title}</Text>
                        <Text style={{marginTop: 5}}>
                          {item.NumberofProduct} KG
                        </Text>
                        <Text style={{marginTop: 5}}>RS {item.price}</Text>
                        <Text style={{marginTop: 5}}>
                          Quantity {item.NumberofProduct}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => this.RemoveItemFromCart(item.id)}>
                        <Image
                          style={{width: 30, width: 30, resizeMode: 'contain'}}
                          source={require('../../assets/bin.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text
                style={{fontSize: 20, fontWeight: '600', textAlign: 'center'}}>
                Your Cart is Empty
              </Text>
            )}
          </View>

          {this.state.data.length !== 0 ? (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  paddingHorizontal: 10,
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
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                  marginBottom: 10,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}>
                <Text>Total Amount</Text>
                <Text>{this.CalculatePrice()} RS</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.PlaceOrder()}
                style={styles.Btn}>
                <Text
                  style={{color: WHITE.dark, fontSize: 18, fontWeight: '600'}}>
                  PlaceOrder
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
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
    backgroundColor: '#C60404',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 25,
    alignItems: 'center',
  },
  itemView: {
    width: '90%',
    height: 125,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: WHITE.dark,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 20,
  },
  Btn: {
    height: 40,
    width: SCREEN.width - 64,
    backgroundColor: RED.dark,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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
