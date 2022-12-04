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
  Platform,
} from 'react-native';
import Loader from '../../Components/Loader';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {RED, WHITE} from '../../helper/Color';
import {isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import Server from '../../helper/Server';
import Validations from '../../helper/Validations';
import {AddProductData, EditProductApi} from '../../helper/api';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      product_Img: '',
      selectedItem: '',
      price: '0',
      product_Title: '',
      selectedLanguage: null,
      product_description: '',
      product_weight: '',
      ediableForData: false,
      editable: false,
      quantity: '0',
    };
  }
  PicMultiple() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let image_data = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };
      this.setState({
        product_Img: image_data,
        editable: false,
      });
    });
  }

  isFormFilled() {
    let check_price = Validations.check_only_digit(this.state.price);
    let check_quantity = Validations.check_only_digit(this.state.quantity);
    let check_title = Validations.checkrequired(this.state.product_Title);
    let check_Category =
      this.state.selectedItem === null || this.state.selectedItem.length === 0
        ? false
        : true;
    let check_Image = this.state.product_Img.length === 0 ? false : true;

    if (check_price && check_title && check_Category && check_quantity) {
      return true;
    }
    if (!check_price) {
      alert('Invalid Price');
    } else if (!check_Category) {
      alert('Invalid Category');
    } else if (!check_title) {
      alert('Invalid Title');
    } else if (!check_Image) {
      alert('Invalid Image');
    } else if (!check_quantity) {
      alert('Invalid Quantity');
    }
    return false;
  }

  componentDidMount() {
    const editableData = this.props.route.params;
    if (editableData)
      this.setState({
        editable: editableData.editable,
        ediableForData: editableData.editable,
      });
    const productInformation = this.props.route.params;

    if (productInformation) {
      this.setState({
        selectedItem: productInformation.ProductInfo.category,
        price: JSON.stringify(productInformation.ProductInfo.price),
        quantity: JSON.stringify(productInformation.ProductInfo.quantity),
        product_description: productInformation.ProductInfo.product_description,
        product_Title: productInformation.ProductInfo.title,
        product_Img: productInformation.ProductInfo.image,
      });
    }
  }
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  async AddProduct() {
    this.setState({loading: true});
    const token = this.props.userToken;

    const formData = new FormData();

    formData.append('image', this.state.product_Img);

    const data = {
      price: this.state.price,
      title: this.state.product_Title,
      category: this.state.selectedItem,
      product_description: this.state.product_description,
      quantity: this.state.quantity,
    };
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    console.log(formData);

    if (this.state.ediableForData) {
      await EditProductApi(
        this.props.route.params.ProductInfo.id,
        formData,
      ).then(response => {
        console.log(response);
        if (response && response.status === 200) {
          this.setState({loading: false});
          this.props.navigation.navigate('MainHome', {
            screen: 'Home',
          });
        } else {
          alert('Some thing Went Wrong');
          this.setState({loading: false});
        }
      });
    } else {
      await AddProductData(formData, token).then(response => {
        if (response && response.status === 200) {
          this.setState({loading: false});
          this.props.navigation.navigate('MainHome', {
            screen: 'Home',
          });
        } else {
          alert('Some thing Went Wrong');
          this.setState({loading: false});
        }
      });
    }

    this.setState({loading: false});
  }

  AddData() {
    if (this.isFormFilled()) {
      this.AddProduct();
    }
  }

  render() {
    return (
      <View style={styles.wrapperView}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MainHome')}>
            <Image
              style={{width: 14, height: 14}}
              source={require('../../assets/cross.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 24, fontWeight: '600', marginLeft: 20}}>
            Add details for product
          </Text>
        </View>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}} bounces={false}>
            {this.state.product_Img === '' ? (
              <TouchableOpacity
                onPress={() => this.PicMultiple()}
                style={styles.AddProductPic}>
                <View
                  style={{
                    width: 27,
                    height: 24,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: WHITE.dark,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 15, width: 13.5}}
                    source={require('../../assets/plus.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '400',
                    color: WHITE.dark,
                    marginLeft: 10,
                  }}>
                  Add images
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Image
                  style={{
                    width: SCREEN.width - 20,
                    height: SCREEN.height / 4,
                    alignSelf: 'center',
                    borderRadius: Platform.OS === 'android' ? 5 : 20,
                    marginTop: 20,
                    resizeMode: 'stretch',
                  }}
                  source={{
                    uri: this.state.editable
                      ? `${Server}${this.state.product_Img}`
                      : this.state.product_Img.uri,
                  }}
                />
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    position: 'absolute',
                    bottom: 10,
                    right: 20,
                  }}
                  onPress={() => {
                    this.PicMultiple();
                  }}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                    }}
                    source={require('../../assets/plusblack.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={{width: SCREEN.width - 40, alignSelf: 'center'}}>
              <Text style={{fontSize: 20, marginTop: 25}}>Price / KG</Text>
              <TextInput
                keyboardType="numeric"
                value={this.state.price}
                onChangeText={val => this.setState({price: val})}
                style={styles.TextInput}
              />
              <Text style={{fontSize: 20, marginTop: 25}}>
                Product Category
              </Text>
              {/* <RNPickerSelect

              useNativeAndroidPickerStyle={true}
                style={{
                  inputIOS: {
                    marginTop: 5,
                    borderWidth: 1,
                    height: 60,
                    borderColor: RED.dark,
                    paddingLeft: 20,
                  },
                  inputAndroid: {
                    marginTop: 5,
                    borderWidth: 1,
                    height: 60,
                    borderColor: RED.dark,
                    paddingLeft: 20,
                  },
                  placeholder: {
                    color: RED.dark,
                  },
                }}
                placeholder={{
                  label: 'Select Categories',
                }}
                selectedValue={this.state.selectedItem}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedItem: itemValue})
                }
                items={[
                  {label: 'Fruits', value: 'Fruits'},
                  {label: 'Vegetables', value: 'Vegetables'},
                ]}
              /> */}
              <View
                style={{
                  width: '100%',
                  marginTop: 5,
                  height: 50,
                  borderWidth: 1,
                  borderColor: RED.dark,
                  borderRadius: 5,
                }}>
                <Picker
                  selectedValue={this.state.selectedItem}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({selectedItem: itemValue})
                  }>
                  <Picker.Item label="Select Category" value="" />
                  <Picker.Item label="Fruits" value="Fruits" />
                  <Picker.Item label="Vegetables" value="Vegetables" />
                </Picker>
              </View>
              <Text style={{fontSize: 20, marginTop: 25}}>Product Title</Text>
              <TextInput
                value={this.state.product_Title}
                onChangeText={val => this.setState({product_Title: val})}
                style={styles.TextInput}
              />
              <Text style={{fontSize: 20, marginTop: 25}}>Quantity / KG</Text>
              <TextInput
                keyboardType="numeric"
                value={this.state.quantity}
                onChangeText={val => this.setState({quantity: val})}
                style={styles.TextInput}
              />

              <Text style={{fontSize: 20, marginTop: 25}}>
                Product description
              </Text>
              <TextInput
                value={this.state.product_description}
                placeholder="It is a long established fact that a reader will be dist"
                multiline={true}
                onChangeText={val => this.setState({product_description: val})}
                style={[
                  styles.TextInput,
                  {
                    height: 110,
                    paddingTop: 20,
                    paddingHorizontal: 10,
                    marginBottom: isIphoneXorAbove ? 0 : 30,
                  },
                ]}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.AddData()}
              style={{
                width: SCREEN.width - 60,
                height: 40,
                marginVertical: 20,
                alignSelf: 'center',
                borderRadius: 20,
                backgroundColor: RED.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: WHITE.dark, fontWeight: '700'}}>
                {this.state.ediableForData ? 'Edit Product' : 'ADD Product'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
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
  headerView: {
    width: SCREEN.width,
    height: isIphoneXorAbove ? 80 : 70,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  AddProductPic: {
    width: SCREEN.width - 40,
    height: SCREEN.height / 4,
    backgroundColor: RED.dark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  TextInput: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: RED.dark,
    marginTop: 5,
    paddingLeft: 15,
    fontSize: 18,
  },
  inputAndroid: {
    marginTop: 25,
    borderWidth: 1,
    width: SCREEN.width - 40,
    height: 60,
    borderColor: RED.dark,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
