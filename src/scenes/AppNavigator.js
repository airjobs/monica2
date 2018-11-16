import React from 'react'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Search from './Search'
import Job from './Job'
import Bookmark from './Bookmark'
import Scheduling from './Scheduling'
import Evaluation from './Evaluation'

const serachNav = createStackNavigator({Search, Job}, {headerMode: 'none', cardStyle: {backgroundColor: '#FFFF'}})
const bookmarkNav = createStackNavigator({Bookmark, Job}, {headerMode: 'none', cardStyle: {backgroundColor: '#FFFF'}})
const schedulingNav = createStackNavigator({Scheduling, Job}, {headerMode: 'none', cardStyle: {backgroundColor: '#FFFF'}})

const drawerNavigator = createDrawerNavigator({
  serachNav: {
    navigationOptions: {
      title: 'Search...',
      drawerIcon: ({ tintColor }) => (<SimpleLineIcons name="magnifier" size={25} color={tintColor}/>)
    },
    screen: serachNav
  },
  Bookmark: {
    screen: bookmarkNav,
    navigationOptions: {
      title: 'Bookmarks',
      drawerIcon: ({ tintColor }) => (<Ionicons name="md-bookmarks" size={25} color={tintColor}/>)
    }
  },
  Scheduling: {
    screen: schedulingNav,
    navigationOptions: {
      title: 'My scheduling',
      drawerIcon: ({ tintColor }) => (<MaterialIcons name="schedule" size={25} color={tintColor}/>)
    }
  },
  Evaluation: {
    screen: Evaluation,
    navigationOptions: {
      title: 'My evaluation',
      drawerIcon: ({ tintColor }) => (<MaterialIcons name="star" size={25} color={tintColor}/>)
    }
  },
  Logout: {
    screen: schedulingNav,
    navigationOptions: {
      title: 'Log-out',
      drawerIcon: ({ tintColor }) => (<Ionicons name="ios-log-out" size={25} color={tintColor}/>)
    }
  }
})

const Navigator = createStackNavigator({
  App: {
    screen: drawerNavigator,
    navigationOptions: ({ navigation }) => ({
      title: `AirJobs`
    })
  }
})

export default Navigator
