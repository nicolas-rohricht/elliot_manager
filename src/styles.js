import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from './sizes';

const styles = StyleSheet.create({
  inputText: {
    height: verticalScale(50),
    backgroundColor: 'white',
    color: 'gray',
    paddingHorizontal: scale(10),
    borderRadius: 8,
    fontSize: moderateScale(18)
  },
  buttonContainer: {
    backgroundColor: '#ee2e5d',
    borderWidth: 0,
    height: verticalScale(50),
    borderRadius: 30
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '700'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100/2
  },
  tabBarStyle: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#b7b7b7',
    backgroundColor: '#f8f8f8'
  },
  containerTab: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitleTab: {
    paddingTop: verticalScale(2),
    color: 'gray',
    fontSize: moderateScale(12)
  },
  navigatorBar: {
    borderBottomWidth: 0,
    backgroundColor: '#edc968',
    padding: 0,
  },
  navigatorTitle: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: moderateScale(15),
    fontWeight: 'bold'
  },
  navigatorButton: {
    color: 'white',
  },
  navigatorIcon: {
    tintColor: 'white',
  },
  tabViewContainer: {
    flexDirection: 'column',
    flex: 1,
    marginTop: verticalScale(63),
    marginBottom: verticalScale(55)
  },
  clientOnlineStatus: {
    width: 75,
    height: 75
  },
  tabStyle: {
    borderColor: 'white',
    backgroundColor: '#edc968',
    marginTop: verticalScale(1)
  },
  tabTextStyle: {
    color: 'white',
    fontSize: moderateScale(13)
  },
  activeTabStyle: {
    backgroundColor: 'white',
  },
  activeTabTextStyle: {
    color: '#edc968',
    fontSize: moderateScale(15)
  },
  textInputStyle: {
    marginHorizontal: scale(5), 
    fontSize: moderateScale(18),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#b7b7b7'
  },
  renderItemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: verticalScale(10),
    marginRight: scale(10)
  },
  clientImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clientOnlineStatus: {
    width: 75,
    height: 75
  },
  clientImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  userInfoContainer: {
    flex: 3,
    flexDirection: 'column',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#b7b7b7'
  },
  userInfoNameContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  userInfoNameEmailContainer: {
    flexDirection: 'column'
  },
  userInfoName: {
    fontSize: moderateScale(25),
    color: 'black'
  },
  userInfoEmail: {
    fontSize: moderateScale(14),
    marginLeft: scale(1)
  },
  goToUserDetailIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  userInfoBalanceContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(10)
  },
  userInfoBalanceMoneyContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  userInfoBalance: {
    fontSize: moderateScale(18)
  },
  userInfoBalanceText: {
    fontSize: moderateScale(12)
  },
  userInfoBalanceBtcContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  btcIcon: {
    fontSize: moderateScale(12)
  },
  goToUserDetailIcon: {
    fontSize: moderateScale(25)
  },
  adviseContainer: {
    backgroundColor: '#323112',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    marginHorizontal: scale(45),
    borderRadius: 4
  },
  successContainer: {
    backgroundColor: '#00b33c',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    marginHorizontal: scale(45),
    borderRadius: 4
  },
  adviseLabel: {
    fontSize: moderateScale(17),
    color:'#ffffe0',
    textAlign: 'center'
  },
  flatListStyle: {
    marginTop: verticalScale(5),
    //flex: 1
  },
  emptyListLabel: {
    fontSize: moderateScale(25),
    textAlign: 'center'
  },
  emptyListContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.5,
    marginTop: verticalScale(180)
  },
  emptyListIcon: {
    fontSize: moderateScale(60)
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: moderateScale(19),
    textAlign: 'center',
    color: 'black',
  },
});

export default styles;