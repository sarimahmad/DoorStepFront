/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View, TouchableOpacity,Text , SafeAreaView, Platform} from 'react-native';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import { BLACK, WHITE } from '../../helper/Color';
function HeaderWithLogoandText({ leftPress, leftIcon, rightPress, centerText, centerIcon, boldtext, rightIcon, righText, borderBottom, borderLeftRadius, borderRightRadius}) {
  return (
   <View style={{width: SCREEN.width,  height:Platform.OS=="ios" ? (isIphoneXorAbove ?  100 : 80)  : 60  ,backgroundColor:'#282461'}}>
     <SafeAreaView style={{width:'100%', height:'100%'}}>


      <TouchableOpacity
      onPress={leftPress}
      style={{flexDirection:'row', alignItems:'center',marginTop: isIphoneXorAbove ? 20: 20, }}>
      <Image style={{width: 7, height: 13, marginLeft: 20, marginRight: 8}} source={require('../../assets/backwhite.png')}/>
      <Text style={{color:'white', fontSize: 14, fontWeight:'bold'}}>Back</Text>
      </TouchableOpacity>
     
     </SafeAreaView>
    
   </View>
  );
}

export default HeaderWithLogoandText;
