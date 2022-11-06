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
  import {Get_all_Review } from '../../helper/api';
  import { connect } from 'react-redux';
  import * as userActions from '../../redux/actions/user';
  import { BLACK, GREY, ORANGE, RED, WHITE } from '../../helper/Color';
  import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
  import AsyncStorage from '@react-native-async-storage/async-storage';
class ItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lastRefresh: false,
          email: '',
          password: '',
          loading: false,
          productData: '',
          all_Review:'',
          reviewText:'',
          value:"1",
          showReview:false,
        };

      }
 
   async componentDidMount(){
      const data = this.props.route.params.data;
      const token = this.props.userToken;
      console.log(data);
      console.log(data.id);
      this.setState({productData:data});
      await Get_all_Review(data.id,token).then(response => {
        if(response && response.status === 200) {
            this.setState({all_Review:response.data});
        } 
        else{
          alert("Some thing went wrong")
        }
      });
    }

    async AddCart(item){
      let oldData = await AsyncStorage.getItem('Cart')
      if (oldData){
        oldData =  JSON.parse(oldData)
        let repeatVal = oldData.filter(val=> {return item.id === val.id})
        console.log(repeatVal)
        if (repeatVal.length > 0) {
          alert("Item Already Exits")
        }
        else{
          if(this.state.value==='0'){
            alert("Enter Number of Products")
          }
          else{
            oldData.push({...item,NumberofProduct: this.state.value})
            AsyncStorage.setItem('Cart', JSON.stringify(oldData))
            alert("Item Added")
            console.log("Hello",oldData)
          }
       
        }

      }
      else{
        if(this.state.value==='0'){
          alert("Enter Number of Products")
        }
        else{
        let data = [] 
        data.push({...item,NumberofProduct: this.state.value})
        AsyncStorage.setItem('Cart', JSON.stringify(data))
        alert("Item Added to Cart")
      }
      }

    }



    async CheckingQuantityForCart(){

      if(this.state.productData.quantity ===0){
        alert("Out of Stock")
      }
      else{
        this.AddCart(this.state.productData);
      }
    }

     CheckQuantityProduct(){  
    
      if(this.state.productData.quantity ===0){
        alert("Out of Stock")
      }
      else if (this.state.productData.quantity < Number(this.state.value)){
        alert("Amout is Greater than Available Product")
      }
      else{
        this.props.navigation.navigate('PlaceOrder',{data:{...this.state.productData,NumberofProduct:this.state.value}})
      }
    }
  render() {
    return (
      <View style={styles.wrapperView}>

          <View style={{flex: 0.4}}>
          <Image
            style={{width: '100%', height: '110%', resizeMode:"stretch", position:'absolute'}}
            source={{uri:`/Users/sarimahmad/Documents/DjangoWork/DoorStepFarmer${this.state.productData.image}`}}
            />
            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
            <Image
            style={{height: 30, width: 30, marginTop: 30, marginLeft: 30, resizeMode:'contain'}}
            source={require('../../assets/back.png')}/>
            </TouchableOpacity>
          </View>
          
          <View style={styles.ItemView}>
          
            <ScrollView
            style={{flex:1}}
            bounces={false}>
            <View style={{paddingHorizontal: 30,}}>
            <Text style={{fontSize: 27, marginTop: 30, fontWeight:'700'}}>{this.state.productData.title}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}>
            <Text style={{fontSize: 22}}>PKR {this.state.productData.price} / KG</Text>
            <Text style={{fontSize: 22}}>5 / 5</Text>
            </View>
        { this.props.role ==="Buyer" && <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 20}}>
            <View style={styles.btn}>
                <Text
                style={{fontSize: 20}}
                onPress={()=> {
                  let number = Number(this.state.value)-1
                  if(number< 1){
                    alert("Can't")
                  }else{
                    this.setState({value: JSON.stringify(number)})
                  }
                  
                
                }}
                >-</Text>
                <View style={{flexDirection:"row", width:'60%' ,alignItems:"center"}}>
                <TextInput
                value={this.state.value}
                onChangeText={(val)=> this.setState({value : val})}
                style={{width: '50%', height: 43, marginRight: 5, paddingLeft: 5 }}
                />
                <Text>KG</Text>
                </View>
                <Text
                 style={{fontSize: 20}}
                  onPress={()=> {
                    let number = Number(this.state.value)+1
                    this.setState({value: JSON.stringify(number)})
                  
                  }}
                >+</Text>
            </View>
            <TouchableOpacity
            onPress={()=> this.CheckingQuantityForCart()}
            style={[styles.btn,{backgroundColor:'#228B22'}]}>
                <Image 
                style={{width: 17, height: 20,}}
                source={require('../../assets/whitecart.png')}/>
                <Text style={{color: 'white', fontSize: 12}}>ADD TO CART</Text>
            </TouchableOpacity>
            </View>}
          {this.props.role === "Buyer" &&  <TouchableOpacity 
            onPress={()=> this.CheckQuantityProduct()}
            style={{width: '80%', alignItems:"center", height: 40, marginVertical:20,justifyContent:"center", backgroundColor:'#C60404', alignSelf:'center',borderRadius: 20}}>
  
                <Text style={{color: 'white', fontWeight:"600"}}>PLACE ORDER</Text>
            </TouchableOpacity>}

            <Text style={{fontSize: 27,fontWeight:"700" ,marginTop:10}}>Description</Text>
            <Text
            style={{fontSize: 22, marginVertical: 10}}
            >{this.state.productData.product_description}</Text>
          
          <View style={{flexDirection:"row", alignItems:'center', alignSelf:"center"}}>

            <Image style={{width: 26, height: 26,marginRight: 20}} source={require('../../assets/contact.png')}/>
            <Text 
            onPress={()=> this.props.navigation.navigate("Contact",{data:{...this.state.productData}})}
            style={{fontSize: 20, fontWeight: '800', color:'#C60404'}}>{this.props.role === "Seller" ? "Message About Product":"Contact Seller"}</Text>
          </View>

            <View style={styles.LastBox}>
            <View style={[styles.lastItem,{marginTop: 15}]}>
              <Text>Reviews</Text>
              <TouchableOpacity onPress={()=> this.setState({showReview: !this.state.showReview})}>
              <Image
                style={{ width: 13, height: 6, resizeMode: "contain" }}
                source={require('../../assets/down.png')} /></TouchableOpacity>

            
            </View>

            {this.state.showReview && 
            <View style={{height: 80}}>
            
            <FlatList
            data={this.state.all_Review}
            refreshing={this.state.lastRefresh}
            keyExtractor={(item,index)=> index.toString()}
            renderItem={({item})=>(
              <View style={{width:'100%', marginBottom:10 ,borderWidth:1, padding: 5,borderRadius: 5}}>
                <Text style={{}}>Review : {item.Review}</Text>
                <Text>User : {item.user.username}</Text>
              </View>  
            )}
            />  
            </View>
            }
          {this.state.showReview === false &&  <View style={styles.lastItem}>
                <Text>Nutrition</Text>
                <Image 
                style={{width: 13, height: 6, resizeMode:"contain"}}
                source={require('../../assets/down.png')}/>
            </View>}
            { this.state.showReview === false && <View style={styles.lastItem}>
                <Text>products</Text>
                <Image 
                style={{width: 13, height: 6, resizeMode:"contain"}}
                source={require('../../assets/down.png')}/>
            </View>}
            </View>

            </View>
            
           <View style={{borderBottomWidth:5,paddingHorizontal:0,borderBottomColor:'lightgrey', marginVertical: 20}}/>


          </ScrollView>
          </View>

          {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
  )
  }
}
const styles = StyleSheet.create({
    wrapperView: {
      flex: 1,
      
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ItemView);