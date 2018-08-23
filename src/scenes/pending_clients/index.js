import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import Styles from './styles';
import AppStyles from '../../styles';

import { moderateScale } from '../../sizes';

import {clients} from '../../database/db.js';

const colorOnline = '#33cc33';
const colorOfline = '#999999';

class PendingClients extends Component {
  state={
    localData: clients.filter((item) => item.pendingClient),
    refreshing: false
  }

  _findClient(textToFilter){
    //Filtra clientes pelo email ou nome
    if (textToFilter !== '') {
      let filteredClients = clients.filter((item) => ( (item.pendingClient) && ( item.email.includes(textToFilter) || item.name.includes(textToFilter) ) ) );
      this.setState({ localData: filteredClients });
    } else {
      //Se apagou o conteúdo do filtro, retoma o conteúdo padrão do array (clientes pendentes)
      this.setState({ localData: clients.filter((item) => item.pendingClient) });
    }
  }

  componentDidMount(){
    //Recria o backButton para evitar um bug de o botão desaparecer
    Actions.refresh({ renderBackButton: ()=>(
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name={"chevron-left"} style={{ color: 'white', fontSize: moderateScale(25) }}/> 
      </TouchableOpacity>
    )});
  }
  
  _fillTheList() {
    this.setState({ refreshing: true });
    this.setState({ localData: clients.filter((item) => item.pendingClient) });
    this.setState({ refreshing: false });
  }

  renderItem(item) {
    //Só renderiza clientes pendentes
    if (item.pendingClient) {
      return(
        <TouchableOpacity onPress={() => Actions.clientProfile({ caller: 'pendingClientScene', userInfo: item, transactions: '', isMyClient: false }) }>
          <View style={ AppStyles.renderItemContainer }>
            <View style={ AppStyles.clientImageContainer }>
              <View style={[ AppStyles.circle, AppStyles.clientOnlineStatus, item.online ? {  backgroundColor: colorOnline } : {  backgroundColor: colorOfline } ]}>
                <View style={[ AppStyles.circle, AppStyles.clientImage, { backgroundColor: 'white' } ]} >
                  <Image source={require('../../imgs/userBeingLoading.png')} //Renderiza uma imagem fixa enquanto a imagem do usuário não foi carregada. Evita ficar um circulo em branco
                    resizeMode='cover'
                    style={ AppStyles.clientImage }
                  >
                    <Image style={ AppStyles.clientImage } source={{uri: item.image}} />
                  </Image>
                </View>
              </View>
            </View>
            <View style={ AppStyles.userInfoContainer }>
              <View style={AppStyles.userInfoNameContainer }>
                <View style={ AppStyles.userInfoNameEmailContainer }>
                  <Text style={ AppStyles.userInfoName }>{item.name}</Text>
                  <Text style={ AppStyles.userInfoEmail }>{item.email}</Text>
                </View>
                <View style={ AppStyles.goToUserDetailIconContainer }>
                  <Icon name='angle-right' style={ AppStyles.goToUserDetailIcon } />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  _renderEmptyListComponent() {
    //Renderiza informação de lista vazia
    return(
      <View style={ AppStyles.emptyListContainer }>
        <Icon name="clock-o" style={ AppStyles.emptyListIcon }/>
        <Text style={ AppStyles.emptyListLabel }>Seus clientes pendentes irão aparecer aqui...</Text>
      </View>
    )
  }
  
  render() {
    return(
      <View style={ AppStyles.tabViewContainer }>
        <TextInput 
          placeholder='filtre por nome ou e-mail'
          placeholderTextColor={'#cccccc'}
          value={this.props.textToFilter}
          onChangeText={text =>  this._findClient(text) }
          style={ AppStyles.textInputStyle }
          underlineColorAndroid='transparent'
          keyboardType="email-address"
        />
        <FlatList
          key={'List'}
          keyExtractor={(item) => item.userId}
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

export default PendingClients;