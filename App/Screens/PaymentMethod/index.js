import React, { Component } from 'react'
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
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          selectedCategory:0,
          loading: false,
          value:0,
          purchase:[{id:1, image:require('../../assets/Tomatto.png')},
          {id:2, image:require('../../assets/carrots.png')},
          {id:3, image:require('../../assets/Banana.png')},
          {id:4, image:require('../../assets/potato.png')},
          {id:5, image:require('../../assets/Tomatto.png')},
          {id:6, image:require('../../assets/Tomatto.png')},
          {id:7, image:require('../../assets/Tomatto.png')},
          {id:8, image:require('../../assets/Tomatto.png')},
          {id:9, image:require('../../assets/Tomatto.png')},
          {id:10, image:require('../../assets/Tomatto.png')},
          {id:11, image:require('../../assets/Tomatto.png')},],
          onSale:[{id:1, image:require('../../assets/Tomatto.png')},
          {id:2, image:require('../../assets/carrots.png')},
          {id:3, image:require('../../assets/Banana.png')},
          {id:4, image:require('../../assets/potato.png')},
          {id:5, image:require('../../assets/Tomatto.png')},],
          Sold:[{id:1, image:require('../../assets/Tomatto.png')},
          {id:2, image:require('../../assets/carrots.png')},
          {id:3, image:require('../../assets/Banana.png')   },
          {id:4, image:require('../../assets/potato.png')},
          ]
        };
      }
  render() {
    return (
      <View style={styles.wrapperView}>
  
        <View style={styles.headerView}>
            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
            <Image 
            style={{width: 25, height: 15, marginRight: isIphoneXorAbove ? 60 : 30, resizeMode:'contain'}}
            source={require('../../assets/backblack.png')}/>
            </TouchableOpacity>
            <Text style={{fontSize: 24, fontWeight: '600', color: BLACK.dark}}>Select Payment Method</Text>
          </View>
          <View style={{flex:1,width: SCREEN.width - 40, alignSelf:'center'}}>
            <SafeAreaView style={{flex:1}}>
                <TouchableOpacity 
                onPress={()=> this.props.navigation.navigate("AddCard")}
                style={styles.Box}>
                    <Image style={{width: 20, height: 30, resizeMode:'contain'}} source={require('../../assets/jassCash.png')}/>
                    <Text style={{fontSize:22, marginLeft: 20}}>Jazz Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=> this.props.navigation.navigate("AddCard")}
                style={styles.Box}>
                    <Image style={{width: 20, height: 30, resizeMode:'contain'}} source={require('../../assets/Card.png')}/>
                    <Text style={{fontSize:22, marginLeft: 20}}>Debit/Credit Card</Text>
                </TouchableOpacity>
           </SafeAreaView>
          </View>
    
      </View>
    )
  }
}
const styles = StyleSheet.create({
    wrapperView: {
      flex: 1,
      
      
    },
    headerView:{
        width: SCREEN.width,
        height: isIphoneXorAbove ? 80 : 70,
        // backgroundColor:'#C60404',
        flexDirection:'row',   
        paddingHorizontal: 20,
        paddingTop: 25,
        alignItems:"center",
        borderBottomWidth:1,  
    },
    Box:{
        width: SCREEN.width -40,
        height: 78,
        alignSelf:"center",
        alignItems:"center",
        flexDirection:"row",
        borderWidth: 1,
        borderColor: RED.dark,
        marginTop: 28,
        paddingLeft: 20
    }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);