/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Text,View,FlatList, TouchableOpacity,TextInput,SafeAreaView,ActivityIndicator,Image} from 'react-native';
import { useState  } from 'react';
import Design from './Styles/Design';
import axios from 'axios';


 function Home () {

    const [data, setData] = useState([]);
    const [show, setShow] = useState('');
    const [Search, setSearch] = useState('');
    const [isLoading, setLoading] = useState(true);

    function Movies() {
        let axiosConfig = {
          headers:
          {
              'X-RapidAPI-key': '30a79d49e4msh60149164f98a8a5p16accdjsn3726a274f766',
              'x-RapidAPI-host' : 'imdb8.p.rapidapi.com',
          },
        };
        let Url = 'https://imdb8.p.rapidapi.com/auto-complete?q=' + Search;
        console.log(Url);
        try {
          axios.get( Url ,axiosConfig)
          .then(function (response) {
            const Response = response.data.d;
            console.log(Response);
            setData(response.data.d);
            setShow(response.status);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        finally {
            setLoading(false);
          }
      }
      console.log('data',data);
      console.log('llll',show);

      const render = ({item})=>{
        console.log("item",item?.i?.imageUrl);
          return (
        <View style ={Design.renderView1}>
          <View style = {Design.renderView2}>
            <Image style = {Design.imagee} source ={{uri:item?.i?.imageUrl}} />
          </View>
          <View style = {Design.renderView3}>
            <Text style ={Design.View3Text1}>{item.l}</Text>
            <Text style ={Design.View3Text2}>{item.s}</Text>
          </View>
        </View>
          );};

    return (
        <View style={Design.mainView}>
        <TextInput style = {Design.textinput}
            placeholder= "what you need ....?"
            onChangeText={(value)=>{setSearch(value);}}/>
        <TouchableOpacity style ={Design.searchTouch} onPress={Movies}>
            <Text style = {Design.searchText}>Search</Text>
        </TouchableOpacity>
            <SafeAreaView style = {Design.Safe}>
                {isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={render}
                    />
                )}
                {show === 200 ?
                <TouchableOpacity style = {Design.ShareTouch}>
                  <Text style ={Design.ShareText}>Share</Text>
                </TouchableOpacity> : (
                <SafeAreaView />
                )}
                </SafeAreaView>
    </View>
   );
 }

 export default Home;
