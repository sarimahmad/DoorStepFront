import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    Image,
    FlatList,
    Modal,
    TouchableOpacity,
  } from 'react-native';
import Loader from '../../Components/Loader';
import {Get_all_Orders, Get_Seller_Product, UpdateQuantityApi} from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          selectedCategory:0,
          loading: false,
          modalVisible:false,
          deliver:[],
          Order:[],
          outOfStock:[],
          amount:0,
          p_id:0,
        };
      }

    GivingDate(data){
      data = data.slice(-1)[0] 
      let date = data.created_at.split('T')
      date = date[0]
      return date

    }

   async componentDidMount(){
   
    this.setState({loading:true});
      const token = this.props.userToken;
      this._unsubscribe = this.props.navigation.addListener('focus', async () => {
        await Get_Seller_Product(token).then(response => {
          if(response && response.status === 200) {
            const outofStock = response.data.filter(val=>{
              return val.quantity === 0
            });
            this.setState({outOfStock:outofStock});
            this.setState({loading:false});
          } 
          else{
            alert("Some thing went wrong");
            this.setState({loading:false});
          }
        })

      Get_all_Orders(token).then(response => {
        
        if(response && response.status === 200) {
          console.log(response);
            const delivered = response.data.filter(val=>{
              return val.delivered === true
            });
            const orders = response.data.filter(val=>{
              return val.delivered === false
            });
            this.setState({deliver: delivered});
            this.setState({Order: orders});

          this.setState({loading:false});
        } 
        else{
          alert("Some thing went wrong")
          this.setState({loading:false});
        }
      });
    });

  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  async UpdateQuantity(){
    let data ={
      quantity: this.state.amount
    }
    if (this.state.amount < 0){
      alert('Amount Should be greater than 0')
    }else{
      await UpdateQuantityApi(this.state.p_id,data).then(response => {
        if(response && response.status === 200) {
          alert("Amount Has Been Updated");
          this.setState({modalVisible:false});
          this.props.navigation.navigate("MainHome");
        } 
        else{
          alert("Some thing went wrong");
          this.setState({loading:false});
        }
      });
    }
   
  }
  render() {
    return (
      <View style={styles.wrapperView}>
  
        <View style={styles.headerView}>
          <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
            <Image 
            style={{width: 25, height: 15, marginRight: 30, resizeMode:'contain'}}
            source={require('../../assets/drawerIcon.png')}/>
            </TouchableOpacity>
            <Text style={{fontSize: 24, fontWeight: '600', color: BLACK.dark}}>{this.state.selectedCategory === 0 ? "My orders" : this.state.selectedCategory === 1 ? "On Sale Products" :'Sold Products'} </Text>
          </View>
          <View style={{flex:1,width: SCREEN.width - 40, alignSelf:'center'}}>
             <SafeAreaView style={{flex:1}}>
            <View style={[styles.CategorySelection,{width: this.props.role ==="Seller" ? '100%' : '70%' ,}]}>
            <TouchableOpacity 
            onPress={()=> this.setState({selectedCategory: 0})}
            style={{borderBottomWidth: this.state.selectedCategory === 0 ? 5 : 0, borderBottomColor: RED.dark}}><Text style={styles.SelectText}>Delivered</Text></TouchableOpacity>
          
            <TouchableOpacity
              onPress={()=> this.setState({selectedCategory: 1})}
            style={{borderBottomWidth: this.state.selectedCategory === 1 ? 5 : 0, borderBottomColor: RED.dark}}><Text style={styles.SelectText}>Orders</Text></TouchableOpacity>
            {this.props.role ==="Seller" ?  <TouchableOpacity 
              onPress={()=> this.setState({selectedCategory: 2})}
            style={{borderBottomWidth: this.state.selectedCategory === 2 ? 5 : 0, borderBottomColor: RED.dark}}><Text style={styles.SelectText}>Out of Stock</Text></TouchableOpacity>: null}
            </View>
            <View style={{marginTop: 30}}>

       {this.state.selectedCategory !==2 &&      <FlatList
              data={this.state.selectedCategory === 0 ? this.state.deliver :this.state.Order}
              keyExtractor={(item,index)=> index.toString()}
              renderItem={({item})=>(
                  <TouchableOpacity 
                  onPress={()=> this.props.navigation.navigate("OrderDetails",{item})}
                  style={{marginBottom:30}}>
                  {item.product.map((val,index)=>(      
                    <View style={styles.itemView}>
                    <Image 
                    style={{width: SCREEN.width / 3.5, height: 100, resizeMode:'stretch'}}
                    source={{uri: `/Users/sarimahmad/Documents/DjangoWork/DoorStepFarmer${val.image}`}}/> 
                  <View style={{marginLeft: 23}}>
                  <Text style={{fontWeight:'700', fontSize: 22}}>{val.title }</Text>
                      <View style={{flexDirection:'row', width: '68%', justifyContent:"space-between", marginVertical:5}}>
                      <Text>Quantity : {item.quantity[index]}</Text>
                      </View>
                      <Text>{item.delivered ? "Item Delivered" :"Not Delivered Yet"}</Text>
                  </View>
                  </View>
                  ))}
                   
                    </TouchableOpacity>
          
              )}
              />}


       { this.state.selectedCategory===2 &&   <FlatList
              data={this.state.outOfStock}
              keyExtractor={(item,index)=> index.toString()}
              renderItem={({item})=>(
                  <TouchableOpacity 
                  onPress={()=> this.setState({modalVisible: true, p_id:item.id})}
                  style={[styles.itemView,{marginBottom: 10}]}>
                    <Image 
                    style={{width: SCREEN.width / 3.5, height: 100, resizeMode:'stretch'}}
                    source={{uri: `/Users/sarimahmad/Documents/DjangoWork/DoorStepFarmer${item.image}`}}/> 
                  <View style={{marginLeft: 23}}>
                  <Text style={{fontWeight:'700', fontSize: 22, marginBottom: 10}}>{item.title }</Text>    
                  <Text>Quantity : {item.quantity}</Text>
                  <Text style={{marginTop: 20}}>Click Me to Update Quantity</Text>
                  </View>
   
                </TouchableOpacity>
          
              )}
              />}
              </View>
           </SafeAreaView>

          <Modal transparent={true}
          visible={this.state.modalVisible}>
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
              <View style={{width: SCREEN.width / 1.5, height: SCREEN.height / 4, borderRadius: 10, backgroundColor:WHITE.dark}}>
              <Text style={{fontWeight:'700', fontSize: 22, marginBottom: 10, textAlign:"center", marginTop: 20}}>Update Quantity</Text> 
                <TextInput
                placeholder='Enter Amount'
                placeholderTextColor={BLACK.dark}
                onChangeText={(val)=> this.setState({amount:val})}
                style={{borderBottomWidth:1, width: '90%',marginTop: 20, alignSelf:'center', height: 40}}
                />   

              <TouchableOpacity
              onPress={()=> this.UpdateQuantity()}
              style={{width: '85%',height: 35, alignSelf:"center",marginTop:20 ,backgroundColor: RED.dark, borderRadius: 10,justifyContent:"center", alignItems:"center"}}>
              <Text style={{fontWeight:'700', fontSize: 16,color: WHITE.dark}}>Update Quantity</Text> 
              </TouchableOpacity>  
              </View> 
            </View>
          </Modal>

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
    headerView:{
        width: SCREEN.width,
        height: isIphoneXorAbove ? 80 : 70,
        // backgroundColor:'#C60404',
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
        justifyContent:'space-between',

    },
    SelectText:{
        fontSize: isIphoneXorAbove ? 25 : 20, 
        color: BLACK.dark
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);