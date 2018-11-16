import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconBookmark from 'react-native-vector-icons/MaterialCommunityIcons'
import {unBookmarkJob} from '../../../services/bookmark/actions'

class JobPinListItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pin: null
    }
  }

  render () {
    const { job } = this.props
    const date = new Date(job.createdDate)

    return (
      <View style={styles.container}>
        <View style={styles.jobData}>
          <TouchableOpacity onPress={() => this.props.onSelectItem(job)}>
            <Text style={styles.jobName}>{job.title}</Text>
            <View style={styles.jobActionsContainer}>
              <View style={styles.jobDataContainer}>
                <Icon name="calendar" size={18}/>
                <Text style={styles.jobDate}>
                  {moment(date).format('DD/MM/YYYY')}
                </Text>
              </View>
              <Text style={styles.jobPrice}>{`R$ ${job.price.toFixed(2)}`}</Text>
            </View>
            <Text
              numberOfLines={4}
              ellipsizeMode={'tail'}
              style={styles.jobDesc}>{job.description}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.unBookmarkJob(job)}>
            <IconBookmark name="bookmark-remove" size={30} color="#2f414f"/>
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

export default connect(null, {unBookmarkJob})(JobPinListItem)
