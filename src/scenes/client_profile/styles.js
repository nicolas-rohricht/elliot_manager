import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale, height } from '../../sizes';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column'
  },
  headerIcons: {
    fontSize: moderateScale(35),
    color: 'white'
  },
  backIconContainer: {
    marginTop: verticalScale(10),
    marginHorizontal: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  clientOnlineStatus: {
    width: 110,
    height: 110
  },
  clientImage: {
    width: 105,
    height: 105,
    borderRadius: 52.5
  },
  clientImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(-30)
  },
  nameContainer: {
    marginHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: moderateScale(40),
    color: 'white'
  },
  infoContainer: {
    borderRadius: 8,
    flexDirection: 'column',
    marginHorizontal: scale(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b7b7b7',
    paddingBottom: verticalScale(10)
  },
  infoHeader: {
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#edc968',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  infoHeaderLabel:{
    fontSize: moderateScale(25),
    color: 'black'
  },
  clientInfoContainer: {
    flex: 1,
    marginHorizontal: scale(10),
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  clientBalanceContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  clientInfoContainerRight: {
    flex: 1
  },
  infoClientContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(10)
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 40,
    width: 40
  },
  icon: {
    fontSize: moderateScale(25),
    color: 'white'
  },
  userInfoContainer: {
    marginLeft: scale(10),
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#b7b7b7',
    flex: 1
  },
  userInfo: {
    fontSize: moderateScale(18)
  },
  currencyLabel: {
    fontSize: moderateScale(20),
    color: 'white',
    fontWeight: 'bold'
  },
  clientTransactionContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: verticalScale(25)
  },
  tabTextStyle: {
    color: 'white',
    fontSize: moderateScale(17)
  },
  tabStyle: {
    borderColor: 'transparent',
    backgroundColor: '#d9d9d9',
    marginTop: verticalScale(1)
  },
  activeTabTextStyle: {
    color: 'black',
  },
  activeTabStyle: {
    backgroundColor: '#edc968',
  },
  renderTransactionContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  iconOfTransactionContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: verticalScale(3)
  },
  iconOfTransaction: {
    fontSize: moderateScale(25)
  },
  transactionInfoContainer: {
    flex:5,
    flexDirection:'column',
    marginRight: scale(15)
  },
  transactionTitleContainer: {
    flex: 1
  },
  transactionTitle: {
    fontSize: moderateScale(20),
    color: 'black'
  },
  transactionValuesContainer: {
    flex: 2,
    flexDirection: 'row',
    marginTop: verticalScale(15),
  },
  transactionValuesMoneyContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  transactionValuesBtcContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  transactionValues: {
    fontSize: moderateScale(17),
  },
  bitcoinIcon: {
    fontSize: moderateScale(20),
    marginBottom: verticalScale(3),
    fontWeight: 'normal'
  },
  userIsNotClientContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(10)
  },
  userIsNotClient: {
    fontSize: moderateScale(25),
    textAlign: 'center'
  },
  emoji: {
    color: 'white'
  },
  dateOfTransactionContainer: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#b7b7b7',
    marginBottom: verticalScale(10)
  },
  buySellButtonContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hintLabel: {
    fontSize: moderateScale(18),
    textAlign: 'center'
  },
  dateOfTransaction: {
    fontSize: moderateScale(12)
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  supportLabel: {
    fontSize: moderateScale(18),
    color: 'white',
    //fontWeight: 'bold'
  },
  contactCentralContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    borderRadius: 8,
    backgroundColor: '#0a7068',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;