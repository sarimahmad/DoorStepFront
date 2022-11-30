import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Loader from '../../Components/Loader';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, RED, WHITE} from '../../helper/Color';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Server from '../../helper/Server';

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      selectedCategory: 0,
      loading: false,
      value: '0',
      WishListData: [],
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.setState({value: '0'});
      let wishData = await AsyncStorage.getItem('WishList');
      wishData = JSON.parse(wishData);
      console.log('dara', wishData);
      this.setState({WishListData: wishData});
      this.setState({loading: false});
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  RemoveItemFromWishList(id) {
    let data = this.state.WishListData;
    console.log('data', data);
    console.log(id);
    data = data.filter(val => {
      return id !== val.id;
    });
    console.log(data);
    this.setState({WishListData: data});
    AsyncStorage.setItem('WishList', JSON.stringify(data));
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
        oldData.push({...item, NumberofProduct: this.state.value});
        AsyncStorage.setItem('Cart', JSON.stringify(oldData));
        alert('Item Added');
        console.log(item.id);
        this.RemoveItemFromWishList(item.id);
      }
    } else {
      let data = [];
      data.push({...item});
      AsyncStorage.setItem('Cart', JSON.stringify(data));
      alert('Item Added to Cart');
      console.log(item.id);
      this.RemoveItemFromWishList(item.id);
    }
  }

  async CheckingQuantityForCart(item) {
    if (item.quantity === 0) {
      alert('Out of Stock');
    } else if (this.state.value < 1) {
      alert('Value should not be less than 1');
    } else {
      this.AddCart(item);
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
                marginRight: isIphoneXorAbove ? 80 : 50,
                resizeMode: 'contain',
              }}
              source={require('../../assets/backblack.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 24, fontWeight: '600', color: BLACK.dark}}>
            My Wish List{' '}
          </Text>
        </View>
        <View style={{flex: 1, width: SCREEN.width - 40, alignSelf: 'center'}}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{marginBottom: 20}}>
              <FlatList
                data={this.state.WishListData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.itemView}>
                    <Image
                      style={{
                        width: isIphoneXorAbove
                          ? SCREEN.width / 2.5
                          : SCREEN.width / 3.5,
                        height: '100%',
                      }}
                      source={{
                        uri: `${Server}${item.image}`,
                      }}
                    />
                    <View style={{width: '50%', marginLeft: 10}}>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>Rs {item.price} / KG </Text>
                        <Text style={{fontWeight: '700', marginBottom: 10}}>
                          {item.title}
                        </Text>
                      </View>

                      {/* button */}

                      <View style={styles.btnCart}>
                        <Text
                          style={{fontSize: 20}}
                          onPress={() => {
                            let number = Number(this.state.value) - 1;
                            if (number < 1) {
                              alert('Quantity should not be less than 0');
                            } else {
                              this.setState({value: JSON.stringify(number)});
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
                            onChangeText={val => this.setState({value: val})}
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
                          style={{fontSize: 20}}
                          onPress={() => {
                            let number = Number(this.state.value) + 1;
                            this.setState({value: JSON.stringify(number)});
                          }}>
                          +
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => this.CheckingQuantityForCart(item)}
                          style={styles.watchListBtn}>
                          <Text
                            style={{
                              color: WHITE.dark,
                              fontSize: isIphoneXorAbove ? 14 : 12,
                            }}>
                            Add to Cart
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.RemoveItemFromWishList(item.id)}>
                          <Image
                            style={{
                              width: 20,
                              width: 20,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/bin.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
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
  itemView: {
    width: '100%',
    height:
      Platform.OS === 'android'
        ? isIphoneXorAbove
          ? SCREEN.height / 4.5
          : SCREEN.height / 4
        : isIphoneXorAbove
        ? SCREEN.height / 4.5
        : SCREEN.height / 5,
    backgroundColor: WHITE.dark,
    flexDirection: 'row',
    padding: isIphoneXorAbove ? 15 : 5,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  watchListBtn: {
    height: isIphoneXorAbove ? 35 : 25,
    width: isIphoneXorAbove ? 120 : 110,
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
  btnCart: {
    width: '90%',
    height: 35,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 30,
  },
  btn: {
    width: 100,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
