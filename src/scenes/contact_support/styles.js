import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../sizes';

const styles = StyleSheet.create({
  radioItem: {
    fontSize: moderateScale(14),
    borderWidth: 0,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  inputText: {
    height: verticalScale(200),
    backgroundColor: 'white',
    color: 'gray',
    borderRadius: 8,
    fontSize: moderateScale(18),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b7b7b7',
    textAlignVertical:'top'
  },
  buttonContainer: {
    marginTop: verticalScale(10)
  },
  renderTicketContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  ticketInfoContainer: {
    flex:5,
    flexDirection:'column',
    marginRight: scale(15)
  },
  ticketTitleContainer: {
    flex: 1
  },
  ticketTitle: {
    fontSize: moderateScale(20),
    color: 'black'
  },
  ticketDescriptionContainer: {
    flex: 2,
    flexDirection: 'row',
    marginTop: verticalScale(15),
  },
  ticketDescription: {
    fontSize: moderateScale(17),
  },
  dateOfTicketContainer: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#b7b7b7',
    marginBottom: verticalScale(10)
  },
  dateOfTicket: {
    fontSize: moderateScale(12)
  },
  hintLabel: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginTop: verticalScale(15)
  }
})

export default styles;