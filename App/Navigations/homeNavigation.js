/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Screens/Home';
import Splash from '../Screens/Splash';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';
import Notifications from '../Screens/Notification';
import Cart from '../Screens/Cart';
import Account from '../Screens/Account';
import ItemView from '../Screens/ItemView';
import PlaceOrder from '../Screens/PlaceOrder';
import ViewMore from '../Screens/ViewMore';
import AddProduct from '../Screens/AddProduct';
import MyOrders from '../Screens/MyOrders';
import WishList from '../Screens/WishList';
import SignUpAs from '../Screens/SignUpAs';
import PaymentMethod from '../Screens/PaymentMethod';
import AddCard from '../Screens/AddCard';
import Information from '../Screens/Information';
import Review from '../Screens/Review';
import UserChats from '../Screens/UserChats';
import PaymentSucess from '../Screens/PaymentSucess';
import OrderDetails from '../Screens/OrderDetails';
import Contact from '../Screens/Contact';

import CustomSidebarMenu from './CustomSideBarMenu';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BLACK, ORANGE} from '../helper/Color';
import {connect} from 'react-redux';
import * as userActions from '../redux/actions/user';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator(props) {
  return (
    <BottomTab.Navigator
      initialRouteName="Home2"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: BLACK.dark,
        tabBarActiveTintColor: ORANGE.dark,
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <BottomTab.Screen
        name={'Home2'}
        component={MainHome}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 24, height: 24}}
                source={
                  focused
                    ? require('../assets/Home.png')
                    : require('../assets/Home.png')
                }
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../assets/Notification.png')
                    : require('../assets/Notification.png')
                }
              />
            );
          },
        }}
      />
      {role === 'Buyer' && (
        <BottomTab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={{width: 20, height: 20}}
                  source={
                    focused
                      ? require('../assets/Cart.png')
                      : require('../assets/Cart.png')
                  }
                />
              );
            },
          }}
        />
      )}

      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../assets/Account.png')
                    : require('../assets/Account.png')
                }
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

function CustomerDrawer(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        // borderTopEndRadius: isIphoneXorAbove ? 80 : 50,
        // borderBottomEndRadius: 50,
        width: 200,
      }}
      screenOptions={{
        headerShown: false,
      }}
      drawerPosition="left"
      drawerContentOptions={{
        activeBackgroundColor: ORANGE.DrawerDownColor,
        itemStyle: {marginVertical: 5},
        labelStyle: {
          color: 'white',
        },
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerIcon: ({focused, size}) =>
            focused ? (
              <View
                style={{
                  height: 41,
                  width: 41,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FCC60F',
                }}>
                <Image
                  style={{width: 33, height: 33, resizeMode: 'contain'}}
                  source={require('../assets/Account.png')}
                />
              </View>
            ) : (
              <Image
                style={{width: 33, height: 33, resizeMode: 'contain'}}
                source={require('../assets/Account.png')}
              />
            ),
          title: 'Home',
        }}
        component={BottomTabNavigator}
      />

      <Drawer.Screen
        name="MyOrders"
        options={{
          drawerIcon: ({focused, size}) =>
            focused ? (
              <View
                style={{
                  height: 41,
                  width: 41,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FCC60F',
                }}>
                <Image
                  style={{width: 33, height: 33, resizeMode: 'contain'}}
                  source={require('../assets/MyOrder.png')}
                />
              </View>
            ) : (
              <Image
                style={{width: 33, height: 33, resizeMode: 'contain'}}
                source={require('../assets/MyOrder.png')}
              />
            ),
          title: 'My Orders',
        }}
        component={MyOrders}
      />
          <Drawer.Screen
        name="MyChats"
        options={{
          drawerIcon: ({focused, size}) =>
            focused ? (
              <View
                style={{
                  height: 41,
                  width: 41,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FCC60F',
                }}>
                <Image
                  style={{width: 33, height: 33, resizeMode: 'contain'}}
                  source={require('../assets/MyOrder.png')}
                />
              </View>
            ) : (
              <Image
                style={{width: 33, height: 33, resizeMode: 'contain'}}
                source={require('../assets/MyOrder.png')}
              />
            ),
          title: 'My Chats',
        }}
        component={UserChats}
      />

      {role === 'Buyer' ? (
        <Drawer.Screen
          name="MyWishList"
          options={{
            drawerIcon: ({focused, size}) =>
              focused ? (
                <View
                  style={{
                    height: 41,
                    width: 41,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FCC60F',
                  }}>
                  <Image
                    style={{width: 33, height: 33, resizeMode: 'contain'}}
                    source={require('../assets/MyOrder.png')}
                  />
                </View>
              ) : (
                <Image
                  style={{width: 33, height: 33, resizeMode: 'contain'}}
                  source={require('../assets/MyOrder.png')}
                />
              ),
            title: 'My Wish List',
          }}
          component={WishList}
        />
      ) : null}

      {role === 'Seller' ? (
        <Drawer.Screen
          name="SellOnline"
          options={{
            drawerIcon: ({focused, size}) =>
              focused ? (
                <View
                  style={{
                    height: 41,
                    width: 41,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FCC60F',
                  }}>
                  <Image
                    style={{width: 33, height: 33}}
                    source={require('../assets/sellonline.png')}
                  />
                </View>
              ) : (
                <Image
                  style={{width: 33, height: 33}}
                  source={require('../assets/sellonline.png')}
                />
              ),
            title: 'Sell Online',
          }}
          component={AddProduct}
        />
      ) : null}
    </Drawer.Navigator>
  );
}

function AuthNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpAs" component={SignUpAs} />
    </Stack.Navigator>
  );
}

function MainHome(props) {
  return (
    <Stack.Navigator
      initialRouteName="MainHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainHome" component={Home} />
      <Stack.Screen name="ItemView" component={ItemView} />
      <Stack.Screen name="ViewMore" component={ViewMore} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
      <Stack.Screen name="Information" component={Information} />
    </Stack.Navigator>
  );
}

function MainNavigation(props) {
  global.role = props.role;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AccountStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AccountStack" component={AuthNavigator} />
        <Stack.Screen name="Home" component={CustomerDrawer} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="WishList" component={WishList} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="PaymentSucess" component={PaymentSucess} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
