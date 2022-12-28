/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Loader from '../../Components/Loader';
import { Get_all_Review, AddReview, deleteProductapi } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { isIphoneXorAbove } from '../../helper/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Server from '../../helper/Server';
import { BLACK } from '../../helper/Color';
class ItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRefresh: false,
      email: '',
      password: '',
      loading: false,
      productData: '',
      reviews_Size: 3,
      all_Review: '',
      reviewText: '',
      value: '1',
      totalStart: 0,
      showReview: false,
    };
  }

  async componentDidMount() {
    const data = this.props.route.params.data;
    this.all_Review(data.id);
    this.setState({ productData: data });
  }

  startCalculator(data) {
    if (data.length !==0){
      let starArray = data.map(val => val.star);
      console.log(starArray)
      const sum = starArray.reduce((partialSum, a) => partialSum + a, 0);
      let itemstarValue = sum / starArray.length;
      itemstarValue = parseInt(itemstarValue);
      if (itemstarValue > 5) itemstarValue = 5;
      this.setState({ totalStart: itemstarValue });
    } else {
      this.setState({ totalStart: [] });
    }

  }

  async all_Review(data) {
    const token = this.props.userToken;
    this.setState({ loading: true });
    await Get_all_Review(data, token).then(response => {
      if (response && response.status === 200) {
        this.setState({ all_Review: response.data });
        this.startCalculator(response.data);
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        alert('Some thing went wrong');
      }
    });
    this.setState({ loading: false });
  }

  async AddCart(item) {
    let oldData = await AsyncStorage.getItem('Cart');
    if (oldData) {
      oldData = JSON.parse(oldData);
      let repeatVal = oldData.filter(val => {
        return item.id === val.id;
      });
      if (repeatVal.length > 0) {
        alert('Item Already Exits');
      } else {
        if (this.state.value === '0') {
          alert('Enter Number of Products');
        } else if (this.state.value < 1) {
          alert('Value should not be less than 1');
        } else if (this.state.productData.quantity < Number(this.state.value)) {
          alert('Amout is Greater than Available Product');
        } else {
          oldData.push({ ...item, NumberofProduct: this.state.value });
          AsyncStorage.setItem('Cart', JSON.stringify(oldData));
          alert('Item Added');
        }
      }
    } else {
      if (this.state.value === '0') {
        alert('Enter Number of Products');
      } else {
        let data = [];
        data.push({ ...item, NumberofProduct: this.state.value });
        AsyncStorage.setItem('Cart', JSON.stringify(data));
        alert('Item Added to Cart');
      }
    }
  }
  async CheckingQuantityForCart() {
    if (this.state.productData.quantity === 0) {
      alert('Out of Stock');
    } else {
      this.AddCart(this.state.productData);
    }
  }

  CheckQuantityProduct() {
    if (Number(this.state.value) < 1) {
      alert('Quantity Should not be less than 1');
    } else {
      if (this.state.productData.quantity === 0) {
        alert('Out of Stock');
      } else if (this.state.productData.quantity < Number(this.state.value)) {
        alert('Amount is Greater than Available Product');
      } else {
        this.props.navigation.navigate('PlaceOrder', {
          data: { ...this.state.productData, NumberofProduct: this.state.value },
        });
      }
    }
  }

  async AddChatList_Seller(item) {
    let chatData = await AsyncStorage.getItem('chatData');
    if (chatData) {
      chatData = JSON.parse(chatData);
      if (chatData.filter(e => e.id === item.id).length === 0) {
        chatData.push(item);
        AsyncStorage.setItem('chatData', JSON.stringify(chatData));
      }
    } else {
      let data = [item];
      AsyncStorage.setItem('chatData', JSON.stringify(data));
    }
  }
  async addReview() {
    const token = this.props.userToken;
    let data = {
      product: this.props.route.params.data.id,
      Review: this.state.reviewText,
    };
    await AddReview(data, token).then(response => {
      if (response && response.status === 200) {
        this.setState({ reviewText: '' });
        alert('Review Added Sucessfully');
        this.setState({ lastRefresh: true });
        this.all_Review(this.props.route.params.data.id);
      } else {
        alert('Some thing went wrong');
      }
    });
  }

  async DeleteProduct() {
    await deleteProductapi(this.state.productData.id).then(response => {
      if (response && response.status === 200) {
        this.props.navigation.goBack();
      } else {
        alert('Some thing went wrong');
      }
    });
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <View style={{ flex: 0.4 }}>
          <Image
            style={{
              width: '100%',
              height: '110%',
              resizeMode: 'stretch',
              position: 'absolute',
            }}
            source={{
              uri: `${Server}${this.state.productData.image}`,
            }}
          />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginTop: 30,
                marginLeft: 30,
                resizeMode: 'contain',
              }}
              source={require('../../assets/back.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ItemView}>
          <ScrollView style={{ flex: 1 }} bounces={false}>
            <View style={{ paddingHorizontal: 30 }}>
              <Text style={{ fontSize: 27, marginTop: 30, fontWeight: '700' }}>
                {this.state.productData.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{ fontSize: 22 }}>
                  PKR {this.state.productData.price} / KG
                </Text>
                <Text style={{ fontSize: 22 }}>5 / 5</Text>
              </View>
              {this.props.role === 'Buyer' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <View style={styles.btn}>
                    <Text
                      style={{ fontSize: 20 }}
                      onPress={() => {
                        let number = Number(this.state.value) - 1;
                        if (number < 1) {
                          alert('Quantity should not be less than 1');
                        } else {
                          this.setState({ value: JSON.stringify(number) });
                        }
                      }}>
                      -
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '60%',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        value={this.state.value}
                        keyboardType="numeric"
                        onChangeText={val => this.setState({ value: val })}
                        style={{
                          width: '50%',
                          height: 43,
                          marginRight: 5,
                          paddingLeft: 5,
                        }}
                      />
                      <Text>KG</Text>
                    </View>
                    <Text
                      style={{ fontSize: 20 }}
                      onPress={() => {
                        let number = Number(this.state.value) + 1;
                        this.setState({ value: JSON.stringify(number) });
                      }}>
                      +
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.CheckingQuantityForCart()}
                    style={[styles.btn, { backgroundColor: '#228B22' }]}>
                    <Image
                      style={{ width: 17, height: 20 }}
                      source={require('../../assets/whitecart.png')}
                    />
                    <Text style={{ color: 'white', fontSize: 12 }}>
                      ADD TO CART
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {this.props.role === 'Buyer' && (
                <TouchableOpacity
                  onPress={() => this.CheckQuantityProduct()}
                  style={{
                    width: '80%',
                    alignItems: 'center',
                    height: 40,
                    marginVertical: 20,
                    justifyContent: 'center',
                    backgroundColor: '#C60404',
                    alignSelf: 'center',
                    borderRadius: 20,
                  }}>
                  <Text style={{ color: 'white', fontWeight: '600' }}>
                    PLACE ORDER
                  </Text>
                </TouchableOpacity>
              )}

              <Text style={{ fontSize: 27, fontWeight: '700', marginTop: 10 }}>
                Description
              </Text>
              <Text style={{ fontSize: 22, marginVertical: 10 }}>
                {this.state.productData.product_description}
              </Text>

              <Text style={{ fontSize: 27, fontWeight: '700', marginTop: 10 }}>
                Reviews
              </Text>

              {this.state.totalStart.length !== 0 ? <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                {Array(this.state.totalStart).fill().map(val => (
                  <Image
                    style={styles.greyStar}
                    source={require('../../assets/redstart.png')}
                  />

                ))
                }
              </View> :   <Text style={{ fontSize: 22}}>
                   No Reviews
                  </Text>}
              {this.props.role === 'Seller' ? (
                <>
                  <Text style={{ fontSize: 27, fontWeight: '700' }}>
                    Quantity
                  </Text>
                  <Text style={{ fontSize: 22, marginVertical: 10 }}>
                    {this.state.productData.quantity}
                  </Text>
                </>
              ) : null}

              <TouchableOpacity
                onPress={() => {
                  this.AddChatList_Seller(this.state.productData.seller);
                  this.props.navigation.navigate('Contact', {
                    data: { ...this.state.productData },
                  });
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                {this.props.role === 'Buyer' && (
                  <Image
                    style={{ width: 26, height: 26, marginRight: 20 }}
                    source={require('../../assets/contact.png')}
                  />
                )}
                {this.props.role === 'Seller' ? (
                  <View>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate('AddProduct', {
                          editable: true,
                          ProductInfo: this.state.productData,
                        })
                      }
                      style={{
                        fontSize: 20,
                        fontWeight: '800',
                        color: '#C60404',
                      }}>
                      Edit Product
                    </Text>
                    <Text
                      onPress={() => this.DeleteProduct()}
                      style={{
                        fontSize: 20,
                        fontWeight: '800',
                        marginTop: 10,
                        color: '#C60404',
                      }}>
                      Delete Product
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{ fontSize: 20, fontWeight: '800', color: '#C60404' }}>
                    Contact Seller
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 5,
                paddingHorizontal: 0,
                borderBottomColor: 'lightgrey',
                marginVertical: 20,
              }}
            />

            <View style={{ paddingHorizontal: 35, marginBottom: 30 }}>
              <Text style={styles.BoldText}>Reccomended reviews</Text>
              {this.state.all_Review && this.state.all_Review.length !== 0 ? (
                this.state.all_Review
                  .slice(0, this.state.reviews_Size)
                  .map(val => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 12,
                          paddingTop: 12,
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: 31,
                            height: 34,
                            resizeMode: 'contain',
                            marginRight: 10,
                          }}
                          source={require('../../assets/profile.png')}
                        />
                        <Text style={[styles.BoldText, { fontWeight: '600' }]}>
                          {val.user.username}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '400',
                          color: 'rgba(0, 0, 0, 0.98)',
                          paddingLeft: 60,
                          paddingTop: 10,
                        }}>
                        {val.Review}
                      </Text>
                    </View>
                  ))
              ) : (
                <Text style={styles.BoldText}>No Reviews</Text>
              )}

              {this.state.all_Review.length !== this.state.reviews_Size && (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ reviews_Size: this.state.all_Review.length })
                  }
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: BLACK.dark,
                    borderRadius: 10,
                    height: 58,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <Text style={styles.BoldText}>Load More Reveiws</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
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

  ItemView: {
    flex: 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  btn: {
    width: '40%',
    height: 35,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 30,
  },
  LastBox: {
    width: '100%',
    height: 154,
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: isIphoneXorAbove ? 0 : 30,
  },
  greyStar: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  lastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 10,
    alignItems: 'center',
    marginBottom: isIphoneXorAbove ? 15 : 10,
  },
  BoldText: {
    fontSize: 18,
    fontWeight: '700',
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
    callApi: (user, access_token, role) =>
      dispatch(userActions.setUser({ user, access_token, role })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
