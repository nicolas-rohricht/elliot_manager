import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ParallaxView from 'react-native-parallax-view';
import Emoji from 'react-native-emoji';
import Button from 'apsl-react-native-button';
import * as Animatable from 'react-native-animatable';

import { scale, verticalScale } from '../../sizes';
import Styles from './styles';
import AppStyles from '../../styles';

import {clients } from '../../database/db.js';

const colorOnline = '#33cc33';
const colorOfline = '#999999';
const credito = 1;
const debito = 0;
const colorGreen = '#33cc33';
const colorRed = '#ff3333';

const male = "male";
const female = "female"

class ClientProfile extends Component {
  state={
    userInfo: this.props.userInfo,
    sendingRequest: false,
    firstName: this.props.userInfo.name.indexOf(' ') === -1 ? this.props.userInfo.name : this.props.userInfo.name.substring(0, this.props.userInfo.name.indexOf(' '))
  }
  
  _renderHeader() {
    return(
      <View style={ Styles.header }>
        <View style={ Styles.headerButtons }>
          <View style={[ Styles.backIconContainer, { justifyContent: 'flex-start' } ]}>
            <TouchableOpacity onPress={() => Actions.pop() }>
              <Icon name='angle-left' style={ Styles.headerIcons }/>
            </TouchableOpacity>
          </View>
          
          { this._renderSupportButton() }
         
        </View>
        <View style={ Styles.clientImageContainer }>
          <View style={[ AppStyles.circle, Styles.clientOnlineStatus, this.state.userInfo.online ? {  backgroundColor: colorOnline } : {  backgroundColor: colorOfline } ]}>
            <View style={[ AppStyles.circle, Styles.clientImage, { backgroundColor: 'white' } ]} >
              <Image source={{uri: this.state.userInfo.image}}
                    resizeMode='cover'
                    style={ Styles.clientImage }/>
            </View>
          </View>
        </View>
        <View style={ Styles.nameContainer }>
          <Text numberOfLines={1} style={ Styles.name }>{this.state.userInfo.name}</Text>
        </View>
      </View>
    )
  }

  _renderSupportButton() {
    //Só renderiza o botão de suporte caso o usuário seja cliente do gerente
    if (this.props.isMyClient) {
      return(
        <View style={[ Styles.backIconContainer, { justifyContent: 'flex-end' } ]}>
          <TouchableOpacity style={ Styles.contactCentralContainer } onPress={() => Actions.contactSupport({ userInfo: this.props.userInfo, firstName: this.state.firstName }) }>
            <Text style={ Styles.supportLabel }>Suporte</Text>
          </TouchableOpacity>
        </View> 
      )
    }
  }

  _sendRequestToClient() {
    //Envia feedback ao usuário de que existe um processo em andamento. Loading do botão
    this.setState({sendingRequest: true});

    setTimeout(() => { 
      //Percorre a lista para encontrar o cliente a ser requisitado
      for (let index = 0; index < clients.length; index++) {
        const element = clients[index];
        
        //Quando encontrar...
        if (element.email === this.state.userInfo.email){
          element.pendingClient = true;
  
          //Seta como cliente requisitado
          this.setState({sendingRequest: false, userInfo: element});
          break;
        }
      } 
    }, 2000);
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

  _renderWhatsappNumber() {
    //Só vai mostrar o Whats do usuário caso seja cliente do gerente
    if (this.props.isMyClient) {
      return(
        <View style={ Styles.infoClientContainer }>
          <View style={[ Styles.iconContainer, { backgroundColor: '#009933' } ]}>
            <Icon name='whatsapp' style={ Styles.icon }/>
          </View>
          <View style={ Styles.userInfoContainer}>
            <Text style={ Styles.userInfo }>{this.state.userInfo.phone}</Text>
          </View>
        </View>
      )
    }
  }

  _renderSellBuyButtons() {
    //Só vai mostrar os botões de compra e venda pro gerente caso o usuário seja seu cliente
    if (this.props.isMyClient) {
      return(
        <View style={[ AppStyles.buttonContainer, { marginTop: verticalScale(20), marginHorizontal: scale(10), justifyContent: 'center', flexDirection: 'row' }]}>
          <TouchableOpacity style={ Styles.buySellButtonContainer } onPress={() => Alert.alert("Aqui seria a chamada para as ações de compra.") }>
            <Text style={ AppStyles.buttonText }>COMPRAR</Text>
          </TouchableOpacity>
          <View
            style={{
              borderLeftColor: 'white',
              borderLeftWidth: 1,
              marginVertical: verticalScale(10),
            }}
          />
          <TouchableOpacity style={ Styles.buySellButtonContainer } onPress={() => Alert.alert("Aqui seria a chamada para as ações de venda.") }>
            <Text style={ AppStyles.buttonText }>VENDER</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  _renderClientInfo() {
    return(
      <View style={[ Styles.infoContainer, { marginVertical: verticalScale(20) } ]}>
        <View style={ Styles.infoHeader }>
          <Text style={ Styles.infoHeaderLabel }>Dados do cliente</Text>
        </View>
        <View style={ Styles.clientInfoContainer }>
          <View style={ Styles.clientInfoContainerLeft }>
            { this._renderWhatsappNumber() }
            <View style={ Styles.infoClientContainer }>
              <View style={[ Styles.iconContainer, { backgroundColor: '#0073e6' } ]}>
                <Icon name='envelope-o' style={ Styles.icon }/>
              </View>
              <View style={ Styles.userInfoContainer}>
                <Text style={ Styles.userInfo }>{this.state.userInfo.email}</Text>
              </View>
            </  View>
            <View style={ Styles.infoClientContainer }>
              <View style={[ Styles.iconContainer, { backgroundColor: '#85adad' } ]}>
                <Icon name='map-marker' style={ Styles.icon }/>
              </View>
              <View style={ Styles.userInfoContainer}>
                <Text style={ Styles.userInfo }>{this.state.userInfo.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderItem(item){
    if (item.userId === this.state.userInfo.userId) {
      return(
        <View style={ Styles.renderTransactionContainer }>
          <View style={ Styles.iconOfTransactionContainer }>
            <Icon name={ item.typeOfTransaction === credito ? "arrow-up" : "arrow-down" }
                  style={[ Styles.iconOfTransaction, { color: item.typeOfTransaction === credito ? colorGreen : colorRed } ]}
            />
          </View>
          <View style={ Styles.transactionInfoContainer }>
            <View style={ Styles.transactionTitleContainer }>
              <Text style={ Styles.transactionTitle }>{item.descriptionOfTransaction}</Text>
            </View>
            <View style={ Styles.transactionValuesContainer }>
              <View style={ Styles.transactionValuesMoneyContainer }>
                <Text style={ Styles.transactionValues }>R$ {item.valueOfMoney}</Text>
              </View>
              <View style={ Styles.transactionValuesBtcContainer }>
                <Icon name="btc" style={ Styles.bitcoinIcon }/>
                <Text style={ Styles.transactionValues }> {item.valueOfBitcoin}</Text>
              </View>
            </View>
            <View style={ Styles.dateOfTransactionContainer }>
              <Text style={ Styles.dateOfTransaction}>{item.date}</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  _renderClientTransactions() {
    //Só vai renderizar as transações do usuário, bem como seu saldo e transações, caso o perfil seja cliente do gerente
    if (this.props.isMyClient) {
      return(
        <View style={[ Styles.infoContainer, { marginVertical: verticalScale(10) } ]}>
          <View style={ Styles.infoHeader }>
            <Text style={ Styles.infoHeaderLabel }>Saldo e transações</Text>
          </View>
          <View style={ Styles.clientInfoContainer }>
            <View style={ Styles.clientBalanceContainer }>
              <View style={ Styles.infoClientContainer }>
                <View style={[ Styles.iconContainer, { backgroundColor: '#999999' } ]}>
                  <Text style={ Styles.currencyLabel }>R$</Text>
                </View>
                <View style={[ Styles.userInfoContainer, { borderBottomWidth: 0 } ]}>
                  <Text style={ Styles.userInfo }>{this.state.userInfo.balanceOfMoney}</Text>
                </View>
              </View>
              <View style={ Styles.infoClientContainer }>
                <View style={[ Styles.iconContainer, { backgroundColor: '#f69417' } ]}>
                  <Icon name='btc' style={ Styles.icon }/>
                </View>
                <View style={[ Styles.userInfoContainer, { borderBottomWidth: 0 } ]}>
                  <Text style={ Styles.userInfo }>{this.state.userInfo.balanceOfBtc}</Text>
                </View>
              </View>
            </View>
            
            { this._renderSeparator({ marginTop: 25 }) }
            
            <View style={ Styles.clientTransactionContainer }>
              <FlatList
                key={'List'}
                keyExtractor={(item) => item.idOfTransaction}
                data={this.props.transactions}
                renderItem={(data) => (this.renderItem(data.item) )}
              />
            </View>
          </View>
        </View>
      )
    } else {
      //Se o status do cliente estiver como pendente, renderiza o container de status pendente
      if (this.state.userInfo.pendingClient) {
        return(
          <Animatable.View animation="bounceIn" style={ Styles.userIsNotClientContainer }>
            <Text style={ Styles.userIsNotClient }>{`Legal! Você já enviou o convite para gerenciar a carteira d${ this.state.userInfo.gender === female ? 'a' : 'o' } ${this.state.firstName}, mas el${ this.state.userInfo.gender === female ? 'a' : 'e' } ainda não respondeu. `}<Emoji name="slightly_smiling_face" style={ Styles.emoji }></Emoji></Text>
            { this.props.caller !== 'pendingClientScene' && <Text style={ Styles.hintLabel }>{`DICA: você pode consultar seus clientes pendentes na aba "Clientes Pendentes".`}</Text> }
          </Animatable.View>
        )
      } else {
        return(
          //Se não, renderiza o container de solicitação para administração da carteira
          <View style={ Styles.userIsNotClientContainer }>
            <Text style={ Styles.userIsNotClient }>{`Opa! ${this.state.firstName} ainda não é seu cliente `}<Emoji name="confused" style={ Styles.emoji } />.</Text>
            
            <Text style={ Styles.userIsNotClient }>{`Por que não envia uma solicitação para administrar a carteira del${ this.state.userInfo.gender === female ? 'a' : 'e' }? `}
            <Emoji name="smirk" style={ Styles.emoji } />
            </Text>
            { this.state.userInfo.online && <Text style={ Styles.userIsNotClient }>Aproveita que el{ this.state.userInfo.gender === female ? 'a' : 'e' } está <Text style={{ fontWeight: 'bold', color: colorOnline }}>online</Text>!</Text> }
          
            <Button 
              style={[ AppStyles.buttonContainer, { marginTop: verticalScale(10)} ]}
              textStyle={AppStyles.buttonText}
              isLoading={this.state.sendingRequest}
              onPress={() => this._sendRequestToClient()}
              activityIndicatorColor="white" 
            > 
              CLARO! QUERO ENVIAR!
            </Button>
          </View>
        )
      }
    }
   }
  
  render() {
    return(
      <ParallaxView
        backgroundSource={{uri: 'http://img.wirexapp.com/image/upload/v1497372911/blog/EN-GB/06-11-inner.png' }}
        windowHeight={200}
        header={( this._renderHeader() )}
        scrollableViewStyle={{ backgroundColor: 'white' }}
      >
        {this._renderSellBuyButtons()}
        {this._renderClientInfo()}
        {this._renderClientTransactions()}

      </ParallaxView>
    )
  }
}

export default ClientProfile;