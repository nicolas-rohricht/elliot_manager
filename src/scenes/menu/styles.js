import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../sizes';

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f6f5fb'
  },
  header: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    color: 'black',
    fontSize: moderateScale(20),
    borderWidth: 0,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  iconContainer: {
    marginLeft: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(28),
  },
  iconLeft: {
    fontSize: moderateScale(25),
    color: 'black',
  }
})

export default styles;