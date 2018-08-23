import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale, height } from '../../sizes';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  balanceContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonMenuContainer: {
    marginVertical: verticalScale(10),
    marginLeft: scale(10)
  },
  balanceLabelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  balanceLabelData: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuCircle: {
    backgroundColor: '#3b2733', 
    height: 40, 
    width: 40
  },
  buttonMenuText: {
    fontSize: moderateScale(20),
    color: 'white',
    fontWeight: 'bold'
  },
  balanceLabelHeader: {
    fontSize: moderateScale(14),
    color: 'black'
  },
  balanceValueLabel: {
    fontSize: moderateScale(35),
    fontFamily: 'arquitecta_black',
    color: 'black'
  },
  balanceLabelEfficiency: {
    fontSize: moderateScale(18),
    color: 'black'
  },
  eyeIcon: {
    color: 'white',
    fontSize: moderateScale(25)
  },
  balanceEmojiStyle: {
    fontSize: moderateScale(40),
    opacity: 1,
    color:'white'
  },
  emojiContainer: {
    flexDirection: 'row'
  },
  balanceOrEmojiContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  eyeIconContainer: {
    flex: 1,
    marginTop: verticalScale(20)
  },
  summary: {
    height: verticalScale(150),
    backgroundColor: 'white',
    elevation: 15,
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15)
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  iconOfCoin: {
    fontSize: moderateScale(20),
    color: 'white'
  },
  iconOfCoinContainer: {
    backgroundColor: '#f69417', 
    height: 32, 
    width: 32,
    marginLeft: scale(5),
    transform: [{ rotate: '15deg' }]
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  nameOfCoin: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: 'black'
  },
  summaryBalanceContainer: {
    flexDirection: 'column',
    flex: 1
  },
  sumaryValueLabel: {
    fontSize: moderateScale(25),
    color: 'black',
    fontWeight: 'normal'
  },
  sumaryEmojiStyle: {
    fontSize: moderateScale(30),
    opacity: 1,
    color:'white'
  },
  sumaryLabel: {
    fontSize: moderateScale(15)
  },
  statusContainer: {
    //flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  numberOfClients: {
    fontSize: moderateScale(50),
    fontWeight: 'bold',
    color: 'white'
  },
  numberOfNewClientsContainer: {
    backgroundColor: '#33cc33',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(5)
  },
  numberOfWaitingClientsContainer: {
    backgroundColor: '#ff9900',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  managerGradeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  starsContainer: {
    flexDirection: 'row'
  },
  starIcon: {
    fontSize: moderateScale(30),
    color: '#e6e600'
  }
})

export default styles;