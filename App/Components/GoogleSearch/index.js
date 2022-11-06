/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BLACK, GREY, WHITE} from '../../helper/Color';
import {FONT} from '../../helper/Constant';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const ChooseLocation = ({fetchAddress}) => {
  const onPressAddress = (data, details) => {
    console.log('detail', details);
    console.log('data', data);
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const address = data.description;
    fetchAddress(lat, lng, address);
  };
  return (
    <GooglePlacesAutocomplete
      enableHighAccuracyLocation={true}
      enablePoweredByContainer={false}
      textInputProps={{
        placeholderTextColor: WHITE.dark,
      }}
      styles={{
        container: {
          width: '100%',
          alignSelf: 'center',
          opacity: 0.9,
          borderRadius: 5,
          height: '100%',
        },
        description: {
          fontWeight: 'bold',
          color: 'grey',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          opacity: 0.9,
        },
        textInputProps: {placeholderTextColor: WHITE.dark},
        textInputContainer: {
          height: 30,
          borderRadius: 5,
          width: '100%',
          backgroundColor: 'white',
          alignSelf: 'center',
        },
        textInput: {
          fontFamily: FONT.OpenSans.bold,
          width: '100%',
          height: 33,
          fontSize: 16,
          color: BLACK.dark,
          backgroundColor: GREY.placeHolderColor,
        },
      }}
      //   currentLocation={true}
      renderDescription={row => row.description}
      //   returnKeyType={'default'}
      fetchDetails={true}
      placeholder="Search Exact Location"
      // keepResultsAfterBlur={false}
      listViewDisplayed={'auto'}
      onPress={onPressAddress}
      query={{
        key: 'AIzaSyDa0VvaaapSFK8vRKAOPrcJVPkatFf8VMU',
        language: 'en',
      }}
    />
  );
};

export default ChooseLocation;
