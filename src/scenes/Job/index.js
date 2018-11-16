import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconBookmark from 'react-native-vector-icons/FontAwesome'
import {requestJobData} from '../../services/job'
import {bookmarkJob, unBookmarkJob} from '../../services/bookmark/actions'

class JobProfile extends Component {
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

  componentDidMount () {
    const jobId = this.props.navigation.getParam('id', null)
    requestJobData(jobId)
      .then((job) => this.setState({...this.state, job}))
  }

  render () {
    const { job } = this.state

    if (!job) return <ActivityIndicator/>

    job.createdDate = '2018-10-28T22:51:21.7218158'
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.jobData}>
            <View style={styles.jobActionsContainerHeader}>
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
              <TouchableOpacity style={styles.btnApply} onPress={
                () => alert('We just send your profile for analysis. Good lock!') // eslint-disable-line
              }>
                <Text style={styles.btnApplyTxt}>Apply</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.jobName}>{job.title}</Text>
            <View style={styles.photoContainer}>
              <Image
                style={styles.photo}
                source={{uri: job.imageUrl}}/>
            </View>
            <Text style={styles.jobDesc}>{job.description}</Text>
            <View style={styles.jobDataContainer}>
              <Text style={styles.jobPrice}>{`R$ ${job.price.toFixed(2)}`}</Text>
            </View>
            <View style={styles.jobDataContainer}>
              <Icon name="calendar" size={18}/>
              <Text style={styles.jobDate}>
                {moment(new Date(job.createdDate)).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.jobDataContainer}>
              <Text style={styles.jobPrice}>{`${job.street}, ${job.number} - ${job.cityName}, ${job.state} ${job.countryName}`}</Text>
            </View>
          </View>
        </ScrollView>
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
    marginTop: 10,
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
    marginTop: 10,
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
  jobActionsContainerHeader: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  jobActionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'space-between'
  },
  jobPin: {
    alignSelf: 'baseline'
  },
  btnApply: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#2f414f',
    marginHorizontal: 10,
    padding: 6
  },
  btnApplyTxt: {
    color: '#FFFF',
    fontSize: 24,
    fontWeight: '600',
    marginHorizontal: 15
  }
}

export default connect(null, {bookmarkJob, unBookmarkJob})(JobProfile)
