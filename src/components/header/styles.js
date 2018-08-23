import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../sizes';

const styles = StyleSheet.create({
  headerContainer: {
    height: verticalScale(110),
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  closeButtonContainer: {
    marginTop: verticalScale(10),
    marginLeft: scale(10),
    justifyContent: 'flex-start'
  },
  closeButton: {
    fontSize: moderateScale(25)
  },
  labelTitle: {
    fontSize: moderateScale(35),
    fontWeight: 'bold',
    color: '#45454f'
  },
  labelTitleContainer: {
    justifyContent: 'flex-end',
    marginLeft: scale(10)
  }
})

export default styles;