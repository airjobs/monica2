import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconBookmark from 'react-native-vector-icons/FontAwesome'
import {bookmarkJob, unBookmarkJob} from '../../../services/bookmark/actions'

class JobListItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookmarked: null
    }
  }

  renderIconBookmark () {
    if (this.state.bookmarked === true) { return <IconBookmark name="bookmark" size={30} color="#2f414f"/> }

    return <IconBookmark name="bookmark-o" size={35}/>
  }

  render () {
    const { job } = this.props
    const date = new Date(job.createdDate)

    return (
      <View style={styles.container}>
        <View style={styles.jobData}>
          <TouchableOpacity onPress={() => this.props.onSelectItem(job)}>
            <Text style={styles.jobName}>{job.title}</Text>
            <Text style={styles.jobPrice}>{`R$ ${job.price.toFixed(2)}`}</Text>
          </TouchableOpacity>
          <View style={styles.photoContainer}>
            <Image
              style={styles.photo}
              source={{uri: job.imageUrl}}/>
          </View>
          <View style={styles.jobActionsContainer}>
            <View style={styles.jobDataContainer}>
              <Icon name="calendar" size={18}/>
              <Text style={styles.jobDate}>
                {moment(date).format('DD/MM/YYYY')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (this.state.bookmarked === true) {
                  this.setState({bookmarked: false})
                  this.props.unBookmarkJob(job)
                } else {
                  this.setState({bookmarked: true})
                  this.props.bookmarkJob(job)
                }
              }}
              style={styles.jobPin}>
              {this.renderIconBookmark()}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.props.onSelectItem(job)}>
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={styles.jobDesc}>{job.description}</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = {
  container: {
    marginHorizontal: 5,
    marginTop: 10
  },
  jobData: {
    flex: 1,
    marginLeft: 16,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  jobName: {
    fontSize: 26,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5
  },
  jobPrice: {
    fontSize: 22,
    fontWeight: '300',
    color: '#000000',
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  jobDesc: {
    fontSize: 18,
    fontWeight: '300',
    color: '#292929',
    marginBottom: 10
  },
  jobDate: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 5
  },
  photo: {
    width: 370,
    height: 320,
    borderRadius: 6
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center'
  },
  jobDataContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  jobActionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'space-between'
  },
  jobPin: {
    alignSelf: 'baseline'
  }
}

export default connect(null, {bookmarkJob, unBookmarkJob})(JobListItem)
