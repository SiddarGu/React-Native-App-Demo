import React, {useState} from 'react';
import {View, Image, ScrollView, Dimensions, StyleSheet, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import 'moment/locale/zh-cn'
import { useStores} from '../../stores'

import { Text } from 'react-native-paper';


const { width } = Dimensions.get("window");

export default function DetailScreen( {route, navigation} ){
  
  const {userStore} = useStores();
  const [active, setActive] = useState(0)
  const [post, setPost] = useState(null)
  const [height, setHeight] = useState(0)
 
  const fetchPost = async () => {//cause re-render two times
    var res = await firestore().collection("Posts").doc(route.params.postId).get()
    setPost(res.data())
    var user = await firestore().collection("Users").doc(res.data().userId).get()
    var profile = await firestore().collection("Profiles").doc(res.data().userId).get()
    firestore().collection("Posts").doc(route.params.postId).update( {views: res.data().views+1} )
    var date = new Date().toLocaleDateString();
    var res = await firestore().collection("Users").doc(userStore.userId).collection("browsing").where("date",'==',new Date(date)).where("postId",'==',route.params.postId).get()
    if( res.empty ){
      firestore().collection("Users").doc(userStore.userId).collection("browsing").add({postId: route.params.postId, date: new Date(date)})
    }
    navigation.setParams({displayName: profile.data().displayName, lastUpdated: moment(user.data().lastUpdated.toDate()).fromNow(), photoURL: profile.data().photoURL})
  }

  //If post not loaded
  if( post === null){
    fetchPost()
    return (
      <Text>Loading</Text>
    )
  }

  //post is loaded
  const change = ({nativeEvent}) => {//each slide cause one re-render
    const slide = Math.ceil(nativeEvent.contentOffset.x / width)
    if( slide !== active )
      setActive(slide)
  }

  if( height === 0 ){//cause re-render 1 time
    Image.getSize(post.imagesURL[0], (w, h) => {
      var ht = width*h/w
      ht = Math.min(ht, width*1.2)   
      setHeight( Math.max(width*0.5, ht))
      //console.log(ht)
    })
  }

  //console.log(post.followers)
  //console.log( post.followers.includes(userStore.userId))

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{height: '93%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        <ScrollView 
          pagingEnabled
          horizontal
          onScroll={change}
          showsHorizontalScrollIndicator={false }
        >
        {
          post.imagesURL.map((image, index) => (
            <Image
              key={index}
              source = {{uri: image}}
              style={{width, height, resizeMode: 'contain'}}
            />
          ))
        }

        </ScrollView>
      </View>
      <View style={style.pagination}>
          {
            post.imagesURL.map((i,k) => (
              <Text key={k} style={ k===active ? style.pagingActiveText : style.pagingText}>⬤</Text>
            ))
          }
      </View>

      <Text style={{fontSize: 20,  fontWeight: 'bold', marginTop: 10, marginLeft: 20, marginRight: 20}}>{post.title}</Text>
      <Text style={{fontSize: 18, marginTop: 10, marginLeft: 20, marginRight: 20}}>
        ${post.price} · {post.condition}
      </Text>
      <Text style={{marginTop: 5, marginLeft: 20, marginRight: 20, color: "grey"}}>
        <Icon name="bookmark" size={13} color="grey" /> followed by {post.followers.length} other users {"\n"} 
        <Icon name="clock" size={13} color="grey" /> last updated {moment(post.lastUpdated.toDate()).fromNow()} {"\n"}
        <Icon name="rss" size={13} color="grey" /> total views {post.views}
      </Text>
      


      <Text style={{marginTop: 10, marginLeft: 20, marginRight: 20}}>{post.description}</Text>

      </ScrollView>
      </View>
        {/* footer */}
        <View style={{flexDirection: 'row', marginLeft: 30}}>
          <View style={{}}>
            <Icon2 name="comment-o" size={25} color='grey' />
            <Text style={{fontSize: 12}}>留言</Text>
          </View>
          <View style={{marginLeft: 30,}}>
            { 
              (post.followers.includes(userStore.userId))?
                <Icon2 name="star" size={25}  color='red' onPress={() => {
                  firestore().collection("Posts").doc(route.params.postId).update( {followers: post.followers.filter((userId) => userId !== userStore.userId)} )
                  setPost( (prevPost) => ({...prevPost, followers: prevPost.followers.filter((userId) => userId !== userStore.userId) }))
                }}/>:
                <Icon2 name="star-o" size={25}  color='grey' onPress={ () => {
                  firestore().collection("Posts").doc(route.params.postId).update( {followers: [...post.followers, userStore.userId]} )
                  setPost( (prevPost) => ({ ...prevPost, followers: [...prevPost.followers, userStore.userId]} ))
                }}/>
            }
            <Text style={{fontSize: 12}}>收藏</Text>
          </View>
         

          { post.userId === userStore.userId &&
            <View style={{marginLeft: 'auto', marginRight: 30}}>
              <Icon2 name="cube" size={25}  color='grey'/>
              <Text style={{fontSize: 12}}>管理</Text>
            </View> 
          }
          
        </View>
      
    </View>
    
    


  )
}

const style = StyleSheet.create({
  //container: {marginTop: 50},
  //scroll: {width, height},
  pagination: {flexDirection: 'row', alignSelf:'center'},
  pagingText: { fontSize: (width/30), color: '#888', margin: 3, fontSize: 7},
  pagingActiveText: { fontSize: (width/30), color:'red', margin: 3, fontSize: 7}
})