import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  Share,
} from 'react-native';
import Header from './components/Header';
import LottieView from 'lottie-react-native';
import Slider from './components/Slider';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import firestore from '@react-native-firebase/firestore';

const Player = props => {
  const [orientation, setOrientation] = useState('PORTRAIT');
  const[data, setdata]= useState()
  // console.log('player props', props.route.params.item)
  const dataprop = props.route.params.item;
  console.log('propdata', props.navigation)
  // console.log(dataprop);
  // console.log(dataprop.video);
  // useEffect(() => {
  //     getData()
  //     Dimensions.addEventListener('change', ({window:{width,height}})=>{
  //       if (width<height) {
  //         setOrientation("PORTRAIT")
  //       } else {
  //         setOrientation("LANDSCAPE")

  //       }
  //     })

  //   }, []);

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('isLoggedIn')
  //     if(value == 'false') {
  //       navigation.navigate('Login')
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  useEffect(() => {
    fetchData()
   // const interval = setInterval(() => {
   // fetchData()
   // }, 10000);
 
   // return () => clearInterval(interval); 
 }, [])
  

 const fetchData = async () => {
  try {
    let list = [];
    await firestore()
      .collection('MoviesData')
      .get()
      .then(querySnapshot => {
      
        querySnapshot.forEach(doc => {
          const {
            category,
            description,
            id,
            image,
            title,
            type,
            video,
            year,
          } = doc.data();
          list.push({
            title: title,
            category: category,
            year: year,
            Description: description,
            image: image,
            type: type,
            video: video,
            id: id,
          });
        });
      });

    console.log('list', list);
    setdata(list);
    JSON.stringify(data)
    // console.log('data', data);
    
  } catch (error) {
    console.log(error);
  }
};





  const onShare = async () => {
    try {
      console.log('share button pressed');
      const result = await Share.share({
        title: 'VIDSHOW APP',
        message: `To Watch ${dataprop.title} and Popular Shows and Movies.Please install VIDSHOW app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en`,
        url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      {/* {orientation=='LANDSCAPE' ? <View></View> : <Header navigation={props.navigation}/> } */}

      <View style={styles.PlayerView}>
        <VideoPlayer
          video={{uri: dataprop.video}}
          videoWidth={1600}
          videoHeight={860}
          rotateToFullScreen={true}
          onLoad={data => {
            console.log('ready');
          }}
          resizeMode="cover"
          //     onProgress={(progress)=>{
          //       console.log(progress)
          //     //   if(progress.currentTime<= 77.116 && progress.currentTime>= 70.116 )
          //     // {

          //     //   alert('time')
          //     // }
          //   }}
          fullScreenOnLongPress
          showDuration={true}
          thumbnail={{uri: dataprop.image}}
          // customStyles={{seekBarBackground:'white'}}
        />
      </View>
      <View style={{height: 90, display: 'flex', flexDirection: 'row'}}>
        <Text style={styles.about}>
          Title : {dataprop.title}
          {'\n'}
          Category: {dataprop.category}
          {'\n'}
          Year Of Release : {dataprop.year}
        </Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: 90,
            backgroundColor: 'red',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => onShare()}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <ScrollView style={styles.descView}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              margin: 10,
            }}>
            {' '}
            Description :{' '}
          </Text>
          <Text style={styles.descText} numberOfLines={8}>
            {dataprop.Description}
          </Text>
        </ScrollView>
        
        



        <View>
      <Text style={styles.scrollViewText} >Special For You</Text>
<ScrollView horizontal={true}>
{data === undefined ? <View style={{flex:1,alignItems:'center', justifyContent:'center'}}><LottieView source={require('../Images/loading.json')} autoPlay loop style={{height:80, width:80}} /></View> 
          : 
          data.filter((item) => item.type ==='special').map((item, index )=>(
  
  <View style={styles.scrollViewStyle} key={index}>
    <TouchableOpacity onPress={()=>props.navigation.navigate('Player',{item})}>
    
  <Image
          style={{height:'100%', width:'100%', borderRadius:10}}
          source={{
              uri: item.image,
            }}
        />
       </TouchableOpacity>
        {/* <Text style={{color:"white"}}>{item.type}</Text> */}
  </View>
    ))}



</ScrollView>
</View>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Special Movies')}>
      <Text style={styles.seemore}>See More</Text>
      </TouchableOpacity>
     
      <View>
      <Text style={styles.scrollViewText} >Trending Shows</Text>
<ScrollView horizontal={true}>
{data === undefined ? <View style={{flex:1,alignItems:'center', justifyContent:'center'}}><LottieView source={require('../Images/loading.json')} autoPlay loop style={{height:80, width:80}} /></View> 
          : 
          
    data.filter((item) => item.type === 'trending').map((item, index )=>
  
  <View style={styles.scrollViewStyle} key={index}>
    <TouchableOpacity onPress={()=>props.navigation.navigate('Player',{item})}>
    
  <Image
          style={{height:'100%', width:'100%', borderRadius:10}}
          source={{
              uri: item.image,
            }}
        />
       </TouchableOpacity>
        {/* <Text style={{color:"white"}}>{item.type}</Text> */}
  </View>
    )}



</ScrollView>
</View>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Trending Movies')}>
      <Text style={styles.seemore}>See More</Text>
      </TouchableOpacity>


        
        
      </ScrollView>
    </View>
  );
};

export default Player;
const styles = StyleSheet.create({
  PlayerView: {
    height: 190,
    backgroundColor: 'white',
  },
  descView: {
    height: '100%',
    backgroundColor: 'tomato',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 25,
  },
  about: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
  },
  descText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    margin: 10,
    lineHeight: 20,
  },
  scrollViewStyle: {
    height: 130,
    width: 120,
    margin: 10,
    backgroundColor: 'black',
  },
  scrollViewText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'tomato',
    margin: 10,
  },
  seemore: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    margin: 10,
    fontSize: 20,
  },
});
