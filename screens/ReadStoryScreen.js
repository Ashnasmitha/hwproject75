import * as React from 'react';
import { StyleSheet, Text, View, Image,SafeAreaView ,FlatList} from 'react-native';
import db from '../config';
import {ScrollView} from 'react-native-gesture-handler';
import {SearchBar,Header} from 'react-native-elements';

export default class ReadStoryScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            search:'',
            allStories:[],
            dataSource:[]
        }
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    componentDidMount(){
        this.retrieveStories()
    }

    retrieveStories=async()=>{
        var allStories=[];
        var stories = db.collection("stories")
        .get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                allStories.push(doc.data())
            })
            this.setState({allStories})
        })
    }

    searchFilterFunction=async(text)=>{
        const newData = this.state.allStories.filter((item)=>{
            const itemData = item.title ?
            item.title.toUpperCase()
            : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
        this.setState({
            dataSource: newData,
            search:text
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Header
                    backgroundColor={'pink'}
                    centerComponent={{
                        text: 'STORY HUB',
                        style:{fontWeight:'bold',color:'black',fontSize:30}
                    }}
                />
              <View style={{height:20,width:'100%'}}>
                <SearchBar
                   placeholder='SEARCH HERE'
                   onChangeText={(text)=>{this.searchFilterFunction(text)}}
                   onClear={text => this.SearchFilterFunction('')}
                   value={this.state.search}
                   />
              </View>

              <FlatList
                data={this.state.search === '' ? this.state.allStories : this.state.dataSource}
                renderItem={({item})=>(
                    <View style={styles.itemContainer}>
                        <Text>Title : {item.title}</Text>
                        <Text>Author : {item.author}</Text>
                    </View>
                )}
              />
                
            </View>
        )
    }
}

const styles =StyleSheet.create({
    container:{
        backgroundColor:'#fff'
    },
    itemContainer:{
        height:80,
        width:'100%',
        borderWidth:2,
        borderColor:'pink',
        justifyContent:'center',
        alignSelf:'center'
    }
})