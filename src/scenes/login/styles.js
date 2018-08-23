import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../sizes';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  elliotLabel: {
    fontSize: moderateScale(55),
    fontFamily: 'montserrat',
    fontWeight: 'bold',
    color: '#052645'
  },
  managerLabel: {
    fontSize: moderateScale(25),
    fontFamily: 'montserrat',
    fontWeight: 'bold',
    color: '#052645'
  },
  labelsContainer: {
    alignItems: 'center',
    marginTop: verticalScale(60)
  },
  managerLabelContainer: {
    marginTop: verticalScale(-20),
    marginLeft: scale(80)
  },
  loginButtonContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(15),
    flexDirection: 'column'
  },
  textInputContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(15),
  },
})

export default styles;