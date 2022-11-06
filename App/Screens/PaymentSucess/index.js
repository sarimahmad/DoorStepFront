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

class PaymentSucess extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          loading: false,
          value:1,
        };
      }
  render() {
    return (
      <View style={styles.wrapperView}>
            <SafeAreaView style={{flex:1}}>
                <Text style={{fontSize:25, fontWeight:'700', textAlign:"center", color:RED.dark}}>Payment Successful</Text>
                <Text style={{textAlign:'center', marginTop: 20}}>TID: 1234567890</Text>
                <Text style={{textAlign:'center', marginTop: 20}}>TOn November 30, 2021 at 18:40</Text>
                <View style={{borderBottomWidth: 2, borderBottomColor:WHITE.dark, marginTop: 20}}/>
                <Text style={{fontSize:25, fontWeight:'700', textAlign:"center", color:RED.dark, marginTop: 20}}>Rs.  690.00</Text>
                <Text style={{textAlign:"center"}}>Amount Paid</Text>
                <View style={{borderBottomWidth: 2, borderBottomColor:WHITE.dark, marginTop: 20}}/>

                <View style={{paddingHorizontal:10 ,flexDirection:'row', justifyContent:'space-between', marginVertical:20}}>
                <Text>Free</Text>
                <Text>0.00</Text>
                </View>
                <View style={{borderBottomWidth: 2, borderBottomColor:WHITE.dark}}/>

                <View style={{paddingHorizontal:10 ,flexDirection:'row', justifyContent:'space-between', marginVertical:20}}>
                <Text>To</Text>
                <Text>Hassaan Ali</Text>
                </View>
                <View style={{borderBottomWidth: 2, borderBottomColor:WHITE.dark}}/>

                <View style={{paddingHorizontal:10 ,flexDirection:'row', justifyContent:'space-between', marginTop: 20}}>
                <Text>Departure</Text>
                <Text>Johar Town</Text>
                </View>
                <View style={{paddingHorizontal:10 ,flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Arrival</Text>
                <Text>Awan Town</Text>
                </View>
                <View style={{paddingHorizontal:10 ,flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Date</Text>
                <Text>30/11/2021</Text>
                </View>
                <View style={{paddingHorizontal:10 ,flexDirection:'row', justifyContent:'space-between'}}>
                <Text>Time</Text>
                <Text>06:00 PM</Text>
                </View>

                <TouchableOpacity
                onPress={()=> this.props.navigation.navigate("Home")}
                style={{alignSelf:'center'}}>
                        <Image style={{width: 70, height: 70}} source={require('../../assets/tick.png')}/>
                </TouchableOpacity>
            </SafeAreaView>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    wrapperView: {
      flex: 1,
      backgroundColor:'#F5E5E5',
      
      
    },
    ItemView:{
        flex: 0.6, 
        backgroundColor:'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
    },
    btn:{
        width: '40%',
        height: 35,
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal: 10,
        justifyContent:'space-between',
        borderRadius: 30
    },
    LastBox:{
        width: '100%',
        height: 154,
        borderWidth:1,
        borderRadius: 35,
        paddingHorizontal:20,
        marginTop: 20,
        marginBottom: isIphoneXorAbove ? 0 : 30  
    },
    lastItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderBottomColor:"grey",
        paddingBottom: 10,
        alignItems:'center',
        marginBottom:  isIphoneXorAbove ? 15 : 10

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentSucess);