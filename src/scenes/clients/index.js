import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import Styles from './styles';
import AppStyles from '../../styles';

import {myClients, transactions} from '../../database/db.js';

import { moderateScale } from '../../sizes';

const colorOnline = '#33cc33';
const colorOfline = '#999999';

class MyClients extends Component {
  
  state={
    localData: myClients
  };

  componentDidMount(){
    //Recria o backButton para evitar um bug de o botão desaparecer
    Actions.refresh({ renderBackButton: ()=>(
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name={"chevron-left"} style={{ color: 'white', fontSize: moderateScale(25) }}/> 
      </TouchableOpacity>
    )})
  }

  _clientProfile(userInfo){
    //Esse workaround foi criado pois passando o objeto de transactions inteiro para o component client_profile, estava perdendo performance na tela.
    //Decidi então fazer o filtro atravez de um array e passar a lista já pronta para tela
    let tmpArray = transactions.filter((item) => item.userId === userInfo.userId);;
    Actions.clientProfile({ userInfo, transactions: tmpArray, isMyClient: true });
  }

  _findClient(textToFilter){
    //Filtra por email e por nome
    if (textToFilter !== '') {
      let filteredClients = myClients.filter((item) => item.email.includes(textToFilter) || item.name.includes(textToFilter));
      this.setState({ localData: filteredClients });
    } else {
      //Se apagou o conteúdo do edit de filtro, reseta o array com todos os clientes
      this.setState({ localData: myClients });
    }
  }

  renderItem(item) {
    return(
      <TouchableOpacity onPress={() => this._clientProfile(item) }>
        <View style={ AppStyles.renderItemContainer }>
          <View style={ AppStyles.clientImageContainer }>
            <View style={[ AppStyles.circle, AppStyles.clientOnlineStatus, item.online ? {  backgroundColor: colorOnline } : {  backgroundColor: colorOfline } ]}>
              <View style={[ AppStyles.circle, AppStyles.clientImage, { backgroundColor: 'white' } ]} >
                <Image source={require('../../imgs/userBeingLoading.png')} 
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
            <View style={ AppStyles.userInfoBalanceContainer }>
              <View style={ AppStyles.userInfoBalanceMoneyContainer }>
                <Text style={ AppStyles.userInfoBalance }>{item.balanceOfMoney}</Text>
                <Text style={ AppStyles.userInfoBalanceText }>Saldo total R$</Text>
              </View>
              <View style={ AppStyles.userInfoBalanceBtcContainer }>
                <Text style={ AppStyles.userInfoBalance }>{item.balanceOfBtc}</Text>
                <Text style={ AppStyles.userInfoBalanceText }>Saldo total <Icon name='btc' style={ AppStyles.btcIcon }/></Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
          style={ Styles.flatListStyle }
        />
      </View>
    )
  }
}

export default MyClients;