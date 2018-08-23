import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale, height } from '../../sizes';

const styles = StyleSheet.create({
  searchClientSceneContainer: {
    marginHorizontal: scale(10),
    marginTop: verticalScale(10),
    //flex: 1  
  },
  geralTab: {
    flexDirection: 'column'
  },
  segmentedContainter: {
    backgroundColor: '#edc968',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    paddingVertical: scale(5),
    marginTop: verticalScale(-1)
  },
  buttonContainer: {
    marginTop: verticalScale(10)
  },
  infoContainer: {
    flexDirection: 'column',
    //flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    fontSize: moderateScale(19),
    textAlign: 'center'
  },
  radioGroupConfig: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  datePickersContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonByDaysContainer: {
    marginTop: verticalScale(10)
  },
  buttonByPeriodContainer: {
    marginTop: verticalScale(10)
  },
});

export default styles;