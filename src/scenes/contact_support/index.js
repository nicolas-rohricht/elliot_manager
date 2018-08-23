import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppStyles from '../../styles';
import Styles from './styles';

import { centralTickets } from '../../database/db.js';

import { verticalScale, scale, moderateScale } from '../../sizes';

class SupportTickets extends Component {
  state={
    refreshing: false,
    localData: centralTickets.filter((item) => item.userId === this.props.userInfo.userId)
  }

  componentDidMount(){
    //Cria o botão de adição de noto ticket
    Actions.refresh({ renderRightButton: ()=>(
      <TouchableOpacity onPress={() => Actions.newTicket({ userInfo: this.props.userInfo }) }>
        <Icon name={"plus"} style={{ color: 'white', fontSize: moderateScale(25) }}/> 
      </TouchableOpacity>
    )});
  }

  _fillTheList() {
    //Preenche a lista de ticket apenas com os tickets do cliente em questão
    this.setState({ localData: centralTickets.filter((item) => item.userId === this.props.userInfo.userId) });
  }

  _renderSeparator(props) {
    return(
      <View
        style={{
          borderBottomColor: '#b7b7b7',
          borderBottomWidth: 1,
          marginTop: verticalScale(props.marginTop)
        }}
      />
    )
  }

  _getTitleOfTicket(type){
    //Colocado esse switch para renderizar o tipo do ticket no header do item na flatList. 
    //Porém, num app real... esse tipo de informação a principio ja viria na propria API
    switch (type) {
      case 'cashoutIssue':
        return 'Problema ao sacar';
        break;
      
      case 'depositIssue':
        return 'Problema ao depositar';
        break;
      
      case 'other':
        return 'Outros';
        break;

      default:
        break;
    }
  }

  renderItem(item){
    return(
      <View style={ Styles.renderTicketContainer }>
        <View style={ Styles.ticketInfoContainer }>
          <View style={ Styles.ticketTitleContainer }>
            <Text style={ Styles.ticketTitle }>{this._getTitleOfTicket(item.typeOfTicket)}</Text>
          </View>
          <View style={ Styles.ticketDescriptionContainer }>
            <Text style={ Styles.ticketDescription }>Complemento: {item.complementOfTicket}</Text>
          </View>
          <View style={ Styles.dateOfTicketContainer }>
            <Text style={ Styles.dateOfTicket}>{item.dateOfTicket}</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderEmptyListComponent() {
    return(
      <View style={ AppStyles.emptyListContainer }>
        <Icon name="question-circle" style={ AppStyles.emptyListIcon }/>
        <Text style={ AppStyles.emptyListLabel }>Os Tickets de suporte irão aparecer aqui...</Text>
        <Text style={ Styles.hintLabel }>DICA: você pode puxar para baixo para atualizar a lista :)</Text>
      </View>
    )
  }
  
  render() {
    return(
      <View style={[ AppStyles.tabViewContainer, { marginBottom: 0, marginHorizontal: scale(10) } ]}>
        <View style={ AppStyles.titleContainer }>
          <Text style={ AppStyles.title }>{`Lista de Tickets abertos para ${this.props.firstName}`}</Text>
        </View>

        { this._renderSeparator({ marginTop: 10 }) }

        <FlatList
          key={'List'}
          keyExtractor={(item) => item.idOfTicket}
          data={this.state.localData}
          renderItem={(data) => this.renderItem(data.item)}
          style={ AppStyles.flatListStyle }
          ListEmptyComponent={ this._renderEmptyListComponent() }
          refreshing={this.state.refreshing}
          onRefresh={() => this._fillTheList()}
        />
        
      </View>
    )
  }
}

export default SupportTickets;