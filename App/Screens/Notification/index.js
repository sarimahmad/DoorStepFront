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
import React, { Component } from 'react'
import { BLACK, GREY, ORANGE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
export default class Notification extends Component {
  render() {
    return (
      <View style={styles.wrapperView}>
          <View style={styles.headerView}>
          <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
            <Image 
            style={{width: 25, height: 15, marginRight: 30, resizeMode:'contain'}}
            source={require('../../assets/back.png')}/>
            </TouchableOpacity>
            <Text style={{fontSize: 24, fontWeight: '600', color: WHITE.dark}}>Notification </Text>
          </View>

          <Text style={{fontSize: 20, fontWeight:'600', textAlign:'center'}}>Your Notification is Empty</Text>
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
      backgroundColor:'#C60404',
      flexDirection:'row',   
      paddingHorizontal: 20,
      paddingTop: 25,
      alignItems:"center",
      
  },
  itemView:{
      width:'100%',
      height: 125,
      backgroundColor:WHITE.dark,
      flexDirection:'row',
      padding: 15,
      marginBottom: 30,
      justifyContent:'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,  
      elevation: 5
  
      

  },
  watchListBtn:{
      height: 40,
      width: isIphoneXorAbove ? 120 : 130,
      backgroundColor: RED.dark,
      borderRadius: 20,
      alignItems:'center',
      justifyContent:"center",
  },
  CategorySelection:{
      flexDirection:'row',
      width: '100%',
      justifyContent:'space-between',

  },
  SelectText:{
      fontSize: isIphoneXorAbove ? 30 : 20, 
      color: BLACK.dark
  }

});
