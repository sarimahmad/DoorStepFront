/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disableno-alert */
import React, { Component } from 'react';
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
import {Get_All_Product, Get_Seller_Product} from '../../helper/api';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, RED, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';
import Server from '../../helper/Server';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      data:[],
      // seller_product:{},
      all_data:'',
      loading: false,
      searchText:'',
      SearchedData:'',

    };
  }

  async componentDidMount(){
    const token = this.props.userToken;
    this.setState({loading:true});
    let seller_data = {All:[],Fruits:[],vegetables:[]}
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.props.role==="Buyer" ? (
        await Get_All_Product(token).then(response => {
          if(response && response.status === 200) {
            this.setState({all_data: response.data, SearchedData:response.data.All});
            this.setState({loading:false})
          } 
          else{
            alert("Some thing went wrong")
          }
        })
      ):(
       
        await Get_Seller_Product(token).then(response => {
          console.log(response)
          if(response && response.status === 200) {
            seller_data.All=response.data
            seller_data.Fruits = response.data.filter(val=>{ return val.category==='Fruits' });
            seller_data.vegetables = response.data.filter(val=>{ return val.category==='Vegetables' });
            this.setState({all_data:seller_data,SearchedData:seller_data.All});
            this.setState({loading:false})
          } 
          else{
            alert("Some thing went wrong")
          }
        })
    
      )
     
    });

  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  handleSearchInput(e) {
    let text = e.toLowerCase();
    let fullList = this.state.all_data.All;
    let filteredList = fullList.filter(item => {
      if (item.title.toLowerCase().match(text)) return item;
    });
    if (!text || text === '') {
      console.log(fullList)
      this.setState({
        SearchedData: fullList,
      });
    } else if (!filteredList.length) {
      console.log(fullList)
      this.setState({
        SearchedData: fullList,
      });
    } else if (Array.isArray(filteredList)) {
      console.log(fullList)
      this.setState({
        SearchedData: filteredList,
      });
    }
  }
  render() {
    return (
      <View

        style={styles.wrapperView}>
        <Image
          style={{ width: SCREEN.width, height: SCREEN.height / 2.5, resizeMode: 'stretch' }}
          source={require('../../assets/HeaderImg.png')} />
      

          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 40 , left: 15}}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={{ width: 30, height: 25 }}
              source={require('../../assets/drawerIcon.png')} />
              </TouchableOpacity>
            <TextInput
              onChangeText={(val)=> this.handleSearchInput(val)}
              placeholder='Search'
              placeholderTextColor={"black"}
              style={styles.SearchBar}
            />
            <Image
              style={{ width: 16, height: 16, position: "absolute", left: 60 }}
              source={require('../../assets/search.png')} />

          </View>
        

        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{flex:1}}>
        <View style={{ width: SCREEN.width - 20, flex: 1, alignSelf: "center"}}>
        <Text style={styles.itemHead}>{this.props.role === "Seller"  ? "Your All Product" : "Featured"}</Text>
        <FlatList
        horizontal={true}
        data={this.state.SearchedData}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item})=>(
          <TouchableOpacity
          onPress={()=> this.props.navigation.navigate("ItemView",{data:item})}
          style={styles.itemView}>
          <Image 
          style={{height: '77%', width: '100%', resizeMode:'stretch'}}
          source={{uri:`${Server}${item.image}`}}
          />
        <View style={{height: '20%', width: '100%', paddingHorizontal:5 ,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text>{item.title}</Text>
          <Text>{item.price} {"/kg"}</Text>
        </View>  
        </TouchableOpacity> 

        )}
        />
        <View style={{flexDirection:'row', justifyContent:"space-between",alignItems:"center" ,marginBottom: 15}}>
        <Text style={[styles.itemHead]}>Fresh Fruits</Text>

        <TouchableOpacity 
        onPress={()=> this.props.navigation.navigate("ViewMore",{data:this.state.all_data.Fruits, cat:'fruits'})}
        style={styles.ViewBTn}>
        <Text style={{color:"white"}}>View More</Text>
        </TouchableOpacity>
        </View>
        <FlatList
        horizontal={true}
        data={this.state.all_data.Fruits}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item})=>(
          <TouchableOpacity
          onPress={()=> this.props.navigation.navigate("ItemView",{data:item})}
          style={styles.itemView}>
          <Image 
          style={{height: '77%', width: '100%', resizeMode:'stretch'}}
          source={{uri:`${Server}${item.image}`}}
          />
        <View style={{height: '20%', width: '100%', paddingHorizontal:5 ,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text>{item.title}</Text>
          <Text>{item.price} {"/kg"}</Text>
        </View>  
        </TouchableOpacity> 

        )}
        />
        <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:"center",marginBottom: 15}}>
        <Text style={[styles.itemHead]}>Fresh Vegetables </Text>

        <TouchableOpacity
        onPress={()=> this.props.navigation.navigate("ViewMore",{data:this.state.all_data.vegetables,cat:'veg'})}
        style={styles.ViewBTn}>
            <Text style={{color:"white"}}>View More</Text>
        </TouchableOpacity>
        </View>
        <FlatList
        horizontal={true}
        data={this.state.all_data.vegetables}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item})=>(
          <TouchableOpacity
          onPress={()=> this.props.navigation.navigate("ItemView",{data:item})}
          style={styles.itemView}>
          <Image 
          style={{height: '77%', width: '100%', resizeMode:'stretch'}}
          source={{uri:`${Server}${item.image}`}}
          />
        <View style={{height: '20%', width: '100%', paddingHorizontal:5 ,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text>{item.title}</Text>
          <Text>{item.price} {"/kg"}</Text>
        </View>  
        </TouchableOpacity> 

        )}
        />

        </View>
        </ScrollView>
        </SafeAreaView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },

  itemTxt: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#282461'
  },
  Btn: {
    width: SCREEN.width / 2.4,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#282461',
    borderRadius: 10,
  },
  SearchBar: {
    width: SCREEN.width / 1.3,
    height: 45,
    borderRadius: 20,
    backgroundColor: "white",
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 40
  },
  itemHead:{
    fontSize: 27,
    fontWeight: '400',
    marginVertical: 10,
    
  },
  itemView:{
    backgroundColor:'white',
    marginBottom:10,
    borderRadius: 10,
    marginRight: 10, 
    height: 120, 
    width: SCREEN.width / 2.5,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ViewBTn:{
    width: 100,
    height: 25,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'red',
    borderRadius: 15
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
