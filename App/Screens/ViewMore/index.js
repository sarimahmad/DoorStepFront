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
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';

class ViewMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          loading: false,
          categpry:'',
          data:[]
        };
      }

      componentDidMount(){
        const data = this.props.route.params;
        this.setState({data:data.data});
        this.setState({categpry:data.cat});
      }


      async AddWish(item){
        let oldData = await AsyncStorage.getItem('WishList')
        if (oldData){
          oldData =  JSON.parse(oldData)
          let repeatVal = oldData.filter(val=> {return item.id === val.id})
          console.log(repeatVal)
          if (repeatVal.length > 0) {
            alert("Item Already Exits")
          }
          else{
              oldData.push({...item})
              AsyncStorage.setItem('WishList', JSON.stringify(oldData))
              alert("Item Added to Wish List")
              console.log("Hello",oldData)         
          }
  
        }
        else{
        
          let data = [] 
          data.push({...item})
          AsyncStorage.setItem('WishList', JSON.stringify(data))
          alert("Item Added to Wish List")
        }
  
      }

      
  render() {
    return (
      <View style={styles.wrapperView}>
  
        <View style={styles.headerView}>
          <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
            <Image 
            style={{width: 20, height: 20, marginRight: 30}}
            source={require('../../assets/back.png')}/>
            </TouchableOpacity>
            <Text style={{color: WHITE.dark, fontSize: 24}}>{this.state.categpry=== "fruits" ? "Fresh Fruits" : "Fresh Vegatables" }</Text>
          </View>
          <View style={{flex:1}}>
             <SafeAreaView style={{flex:1}}>
            <View style={{marginBottom: 20}}>
              <FlatList
              data={this.state.data}
              keyExtractor={(item,index)=> index.toString()}
              renderItem={({item})=>(
                  <View style={styles.itemView}>
                      <Image 
                      style={{width: SCREEN.width / 3, height: 130}}
                      source={{uri:`/Users/sarimahmad/Documents/DjangoWork/DoorStepFarmer${item.image}`}}/>
                    <View style={{justifyContent:'space-between'}}>
                        <View>
                        <Text style={{fontWeight:'700'}}>{item.title}</Text>
                        <Text>{item.quantity} / KG</Text>
                        <Text>Get online at home</Text>
                        </View>
                      { this.props.role ==="Buyer" && <TouchableOpacity 
                        onPress={()=> this.AddWish(item)}
                        style={styles.watchListBtn}>
                        <Text style={{color:WHITE.dark}}>Add to wish list</Text>
                        </TouchableOpacity>}
                    </View>
                    <Text>Rs {item.price} </Text>
                    </View>
          
              )}
              />
           </View>
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
        backgroundColor:'#C60404',
        flexDirection:'row',   
        paddingHorizontal: 20,
        paddingTop: 25,
        alignItems:"center",
        
    },
    itemView:{
        width: SCREEN.width -40,
        alignSelf:'center',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingVertical: 30,
        justifyContent:'space-between'
    
        

    },
    watchListBtn:{
        height: 40,
        width: isIphoneXorAbove ? 120 : 130,
        backgroundColor: RED.dark,
        borderRadius: 20,
        alignItems:'center',
        justifyContent:"center",

        
        
        
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewMore);