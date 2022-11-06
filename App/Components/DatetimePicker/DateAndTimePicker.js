/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
console.disableYellowBox = true;
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';

import Icon from 'react-native-vector-icons/AntDesign'
import {SCREEN} from '../../helper/Constant';
import ButtonResetPassaword from '../ButtonResetPassword/index';
import { BLUE, RED, WHITE } from '../../helper/Color';

export default class DateAndTimePicker extends Component {
  state = {
    clearGoogleSearch: true,
    show: false,
    platform: true,
    dateTime: this.props.value,
  };
  // platform true === android
  // platform false === ios
  componentDidMount = () => {
    if (Platform.OS === 'ios') {
      this.setState({platform: false});
    }
    this.setState({dateTime: this.props.value}); 
  };

  componentDidUpdate() {
    if (this.state.dateTime !== this.props.value) {
      this.setState({dateTime: this.props.value});
    }
  }
  show = () => this.setState({show: true});
  OnChange = (event, selectedValue) => {
    console.log('event', event);
    if (event.type !== 'dismissed') {
      this.setState({dateTime: selectedValue, show: false});
      this.props.setDateAndTime(selectedValue);
    } else {
      this.setState({show: false});
    }
  };
  
  OnChangeIos = (event, selectedValue) => {
    console.log('event', event);
    if (event.type !== 'dismissed') {
      this.setState({dateTime: new Date(event.nativeEvent.timestamp)})
        this.props.setDateAndTime(event.nativeEvent.timestamp);
      
    } else {
      this.setState({show: false});
    }
  };
  _onConfirm = () => {
    this.setState({show: false});
    this.props.setDateAndTime(this.state.time);
  };

  datePicker = () => {
    if (this.state.platform) {
      if (this.state.show) {
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.props.value}
            mode={this.props.mode}
            is24Hour={false}
            display="spinner"
            onChange={this.OnChange}
            onTouchCancel={value => {
              console.log('touch cancel', value);
              this.setState({show: false});
            }}
          />
        );
      }
    } else {
      
        return (
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.show}>
            <View>
              <View style={{height: SCREEN.height / 2, marginTop: 200}}>
                <DateTimePicker
                style={{backgroundColor:'white'}}
                  testID="dateTimePicker"
                  value={this.state.dateTime}
                  mode={this.props.mode}
                  is24Hour={false}
                  display="spinner"
                  onChange={this.OnChangeIos}
                />
              </View>
              <ButtonResetPassaword
                validate={true}
                btnLabel={'Add'}
                data={() => this.setState({show: false})}
              />
            </View>
          </Modal>
        );
      
    }
  };

  render() {
    return (
      <View style={styles.content}>
        <View>
          <TouchableOpacity
            style={styles.inputRight}
            onPress={() => {
              this.setState({show: true});
            }}>
      

            <Image
              source={require('../../assets/calender.png')}
              width={15.37}
              height={20}
              style={{marginRight: 10, marginBottom: 5, marginTop: 5}}
            />
            {this.state.dateTime != null ? (
              <Moment
                style={this.props.datebutton}
                element={Text}
                format={this.props.format}>
                {this.state.dateTime}
              </Moment>
            ) : (
              <View style={this.props.datebutton}>
                <Text style={{color: "white"}}>{this.props.value}</Text>
              </View>
            )}

            <Icon name="caretdown"
                  color={WHITE.btntxtColor}
                  size={10}/>
          </TouchableOpacity>
        </View>

        {this.datePicker()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
  },
  firstSlot: {
    borderColor: 'rgba(0, 0, 0, 0.247487)',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 0,
    fontSize: 17,
    height: 53,
    width: '80%',
  },
  iosPicker: {
    marginTop: '50%',
  },
  buttonContainer: {
    margin: 25,
  },
  input: {
    borderColor: 'rgba(0, 0, 0, 0.247487)',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 0,
    fontSize: 17,
    height: 53,
  },
  inputRight: {
    width: SCREEN.width * 0.41,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: BLUE.kilogramBtn,
    padding: 0,
    height: 45,
    paddingHorizontal: 15,
    marginLeft: 3,
  },
});
