import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, FlatList} from 'react-native'
import BookmarkListItem from './components/BookmarkListItem'

class Home extends Component {
  goToJobPrifile (job) {
    this.props.navigation.navigate('Job', {id: job.id})
  }

  render () {
    const {bookmark} = this.props
    return (
      <View>
        <FlatList
          data={bookmark}
          renderItem={({item}) => (
            <BookmarkListItem
              key={item.id}
              job={item}
              onSelectItem ={this.goToJobPrifile.bind(this)}
            />)}
          keyExtractor={job => job.id}/>
      </View>
    )
  }
}

function mapStateToProps ({bookmarkJobs}) {
  return {bookmark: bookmarkJobs.bookmark}
}

export default connect(mapStateToProps)(Home)
