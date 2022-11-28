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
import Loader from '../../Components/Loader';
import {ChangeStatus, deleteOrderapi, AddReview} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Server from '../../helper/Server';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetails: '',
      lastRefresh: false,
      email: '',
      selectedCategory: 0,
      loading: false,
      statues: [],
      value: 0,
      reviewText: '',
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const data = this.props.route.params.item;
      this.setState({orderDetails: data});
      this.setState({statues: data.Product_Status});
    });
  }
  async ChanegStatus() {
    let status = this.state.statues.slice(-1).pop();
    if (!status) {
      status = 1;
    } else {
      status = status.status + 1;
    }
    if (status == 4) {
      alert('Your Pakage on its Way');
    } else {
      this.setState({loading: true});
      let status_id = status;
      const data = {
        order: this.state.orderDetails.id,
        status: status_id,
      };
      await ChangeStatus(data).then(response => {
        console.log(response);
        if (response && response.status === 200) {
          this.setState({loading: false});
          this.props.navigation.goBack();
          alert('Your Status is Updated');
        } else {
          this.setState({loading: false});
          alert('Something went Wrong try Again !');
        }
      });
      this.setState({loading: false});
    }
  }

  async deleteOrder() {
    let status = this.state.orderDetails.Product_Status;
    let id = this.state.orderDetails.id;
    let data = {
      quantity: this.state.orderDetails.quantity,
    };
    if (status.length == 0) {
      await deleteOrderapi(id, data).then(response => {
        console.log(response);
        if (response && response.status === 200) {
          this.setState({loading: false});
          this.props.navigation.goBack();
          alert('Order Deleted');
        } else {
          this.setState({loading: false});
          alert('Something went Wrong try Again !');
        }
      });
    }
  }

  async addReview() {
    const token = this.props.userToken;

    let data = {
      product: this.state.orderDetails && this.state.orderDetails.product[0].id,
      Review: this.state.reviewText,
    };
    console.log(data);

    await AddReview(data, token).then(response => {
      console.log(response);
      if (response && response.status === 200) {
        alert('review Added');
        this.setState({lastRefresh: true});
      } else {
        alert('Some thing went wrong');
      }
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <View style={styles.headerView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                style={{
                  width: 24,
                  height: 16,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
                source={require('../../assets/backblack.png')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 28}}>Delivery Detail</Text>
          </View>
          <Image
            style={{width: 25, height: 25, resizeMode: 'contain'}}
            source={require('../../assets/cross.png')}
          />
        </View>
        <View style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 40,
                  marginTop: 30,
                  marginBottom: 20,
                }}>
                <View>
                  <Text style={{marginBottom: 20}}>
                    Reciever: {this.state.orderDetails.name}
                  </Text>
                  <Text style={{marginBottom: 20}}>
                    Number: {this.state.orderDetails.phone}
                  </Text>
                  <Text style={{marginBottom: 20}}>
                    Address: {this.state.orderDetails.shipAddress}
                  </Text>
                  <Text style={{marginBottom: 20}}>
                    Totall Amount: {this.state.orderDetails.amount}
                  </Text>
                </View>
                {this.state.orderDetails.Product_Status &&
                this.props.role === 'Buyer' &&
                this.state.orderDetails.Product_Status.length === 0 ? (
                  <TouchableOpacity
                    style={{
                      width: 150,
                      height: 30,
                      marginRight: 10,
                      borderRadius: 20,
                      backgroundColor: RED.dark,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.deleteOrder()}>
                    <Text style={{color: WHITE.dark}}>Delete</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View
                style={{borderBottomWidth: 2, borderBottomColor: 'lightgrey'}}
              />

              {this.props.role === 'Seller' &&
                this.state.orderDetails.Product_Status &&
                this.state.orderDetails.Product_Status.length !== 3 && (
                  <TouchableOpacity
                    style={{
                      width: '50%',
                      height: 40,
                      backgroundColor: RED.dark,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                    onPress={() => this.ChanegStatus()}>
                    <Text style={{color: WHITE.dark, fontSize: 16}}>
                      Update Status
                    </Text>
                  </TouchableOpacity>
                )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                  marginTop: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={[
                      styles.Line,
                      {
                        backgroundColor: this.state.statues[0]
                          ? '#1877F2'
                          : 'lightgrey',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: this.state.statues[0]
                          ? '#1877F2'
                          : 'lightgrey',
                      },
                    ]}
                  />
                </View>
                <View style={{marginTop: 60, marginLeft: 10}}>
                  <Text style={{marginBottom: 10}}>
                    Package Processing Prepared
                  </Text>
                  <Text>Your package is bieng prepared</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={[
                      styles.Line,
                      {
                        backgroundColor: this.state.statues[1]
                          ? '#1877F2'
                          : 'lightgrey',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: this.state.statues[1]
                          ? '#1877F2'
                          : 'lightgrey',
                      },
                    ]}
                  />
                </View>

                <Text style={{width: '85%', marginTop: 90, marginLeft: 10}}>
                  Package being Prepared
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={[
                      styles.Line,
                      {
                        backgroundColor: this.state.statues[2]
                          ? '#1877F2'
                          : 'lightgrey',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: this.state.statues[2]
                          ? '#1877F2'
                          : 'lightgrey',
                      },
                    ]}
                  />
                </View>
                <View style={{marginTop: 60, marginLeft: 10}}>
                  <Text>Your package has arrived at warehouse</Text>
                  <Text style={{marginTop: 10}}>Pickup in Progress</Text>
                </View>
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '700',
                  marginTop: 20,
                }}>
                {this.state.statues.slice(-1).pop()
                  ? this.state.statues.slice(-1).pop().status === 1
                    ? 'Preparing'
                    : this.state.statues.slice(-1).pop().status === 2
                    ? 'Prepared'
                    : 'Picking Up Pakage'
                  : 'Not Started Yet'}
              </Text>
              <View style={{alignItems: 'center'}}>
                <Text style={{marginVertical: 10}}>
                  Order ID # {this.state.orderDetails.id}
                </Text>
                {this.state.orderDetails.product &&
                  this.state.orderDetails.product.map((val, index) => (
                    <View style={styles.itemView}>
                      <Image
                        style={{
                          width: SCREEN.width / 3.5,
                          height: 100,
                          resizeMode: 'stretch',
                        }}
                        source={{uri: `${Server}${val.image}`}}
                      />
                      <View style={{marginLeft: 23}}>
                        <Text style={{fontWeight: '700', fontSize: 22}}>
                          {val.product && val.product.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '68%',
                            justifyContent: 'space-between',
                            marginVertical: 5,
                          }}>
                          <Text>
                            Quantity : {this.state.orderDetails.quantity[index]}
                          </Text>
                        </View>
                        <Text>
                          {this.state.orderDetails.delivered
                            ? 'Item Delivered'
                            : 'Not Delivered Yet'}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{paddingHorizontal: 30, marginTop: 20}}>
                {this.props.role === 'Buyer' &&
                  this.state.orderDetails.delivered && (
                    <View>
                      <Text style={{fontSize: 20, fontWeight: '700'}}>
                        Add Review
                      </Text>

                      <TextInput
                        onChangeText={val => this.setState({reviewText: val})}
                        style={styles.addReview}
                        placeholder="Add Review"
                      />

                      <TouchableOpacity
                        style={{position: 'absolute', right: 20, top: 50}}
                        onPress={() => this.addReview()}>
                        <Image
                          style={{width: 30, height: 30, resizeMode: 'contain'}}
                          source={require('../../assets/goo.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemView: {
    width: SCREEN.width - 60,
    height: 125,
    backgroundColor: WHITE.dark,
    flexDirection: 'row',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  addReview: {
    width: '100%',
    height: 50,
    paddingBottom: 10,
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: GREY.light,
    fontSize: 17,
    fontWeight: '700',
  },
  Line: {
    width: 4,
    height: 90,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
