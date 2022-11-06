import React, { Component, useState,useEffect } from 'react'
import { Modal, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SCREEN } from '../../helper/Constant'



const SelectRegion = (props) => {
    // const [Region, SetRegion] = useState({
    //     Country: 1,
    //     State: 1,
    //     City: 1,
    // })
    // const [countryId, setcountryId] = useState('');
    // const [stateId, setstateId] = useState(1);
    // const [cityId, setcityId] = useState(1);
    // const [modal, setModal] = useState(0);
    const [filterData, setFilterData] = useState([])
    const [masterData, setMasterdata] = useState([]);
    const [search, setSearch] = useState('');
    const visibilty=false

    useEffect(() => {
        setMasterdata(props.data);
        setFilterData(props.data);
        return () => {
            
        }
    }, [])



    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData);
            setSearch(text);
        }
        else {
            setFilterData(masterData);
            setSearch(text);
        }
    }

    const SelectCountry = (item) => {
        // setModal(0);
        // setcountryId(item.name)
        props.onSubmit(item, visibilty)
    }
    return (

        <View style={{ flex:1}}>
             <SafeAreaView style={{flex:1, paddingVertical: 20}}>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'grey', height: 50, width: SCREEN.width -70, alignSelf:'center', borderRadius:15,paddingLeft:20,marginBottom:20}}
                    value={search}
                    onChangeText={(value) => searchFilter(value)}
                    placeholder={"Seacrh Here"}
                />
              <View style={{width:SCREEN.width-70, alignSelf:'center',height:SCREEN.height/1.3}}>
                    <FlatList
                        data={filterData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            style={{marginBottom: 10}}
                                onPress={() => SelectCountry(item)} >
                                <Text style={{fontSize:16}}>{item.name.toUpperCase()}</Text>
                            </TouchableOpacity>
                        )}
                    />
               
                    </View>
                    <View style={{flex:1,justifyContent:'flex-end'}}>

                 
                    <TouchableOpacity onPress={()=> props.onSubmit('',visibilty)} style={{height: 50, width: SCREEN.width - 80, backgroundColor:'black', borderRadius:30, alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                    <Text style={{color:'white',fontSize:16}}>Cancel</Text>
                </TouchableOpacity>
                </View>
                      </SafeAreaView>
              
                
              
            </View>

    )
}


export default SelectRegion;