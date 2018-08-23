import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import DatePicker from 'react-native-datepicker';

import { Actions } from 'react-native-router-flux';

import Styles from './styles';
import AppStyles from '../../styles';

import { moderateScale, verticalScale, scale } from '../../sizes';

import { clients } from '../../database/db.js';

const colorOnline = '#33cc33';
const colorOfline = '#999999';

class SearchClients extends Component {
  state = {
    selectedtab: 0,
    emailOfClient: '',
    selectedFilterIndex: -1,
    localData : [],
    localPendingDeposits: clients.filter((item) => item.clientHasPendingDeposit),
    loading: false,
    userNotFoundContainerOpacity: 0,
    refreshingPendingDeposits: false,
    optionSelected: '',
    startDate: '',
    endDate: '',
    loadingByDays: false,
    loadingByPeriod: false,
    localNoOperatingClients: []
  }

  componentDidMount(){
    //Recria o backButton para evitar um bug de o botão desaparecer
    Actions.refresh({ renderBackButton: ()=>(
      <TouchableOpacity onPress={() => Actions.pop()}>
        <Icon name={"chevron-left"} style={{ color: 'white', fontSize: moderateScale(25) }}/> 
      </TouchableOpacity>
    )})
  }

  _filterPendingDepositsList(emailToFilter) {
    //Filtra os clientes com depositos pendentes por e-mail
    if (emailToFilter !== '') {
      let filteredClients = clients.filter((item) => item.email.includes(emailToFilter) && item.clientHasPendingDeposit );
      this.setState({ localPendingDeposits: filteredClients });
    } else {
      //Se apagou o campo de filtro, reseta a lista para o array padrão
      this._fillThePendingDepositsList();
    }
  }

  _fillThePendingDepositsList() {
    //Reseta a lista para o array padrão
    this.setState({ localPendingDeposits: clients.filter((item) => item.clientHasPendingDeposit) });
  }

  _searchClientsByPeriod() {
    this.setState({ loadingByPeriod: true });

    setTimeout(() => { 
      //Converte as datas para formato data
      let dateBase1 = new Date(this.state.startDate);
      let dateBase2 = new Date(this.state.endDate);
      
      let startDate = dateBase1.setDate(dateBase1.getDate());
      let endDate = dateBase2.setDate(dateBase2.getDate());
      
      //Captura apenas os clientes que não estão operando
      let tmpArray = clients.filter((item) => item.clientIsNotOperating);
      let filteredArray = [];

      for (let index = 0; index < tmpArray.length; index++) {
        const element = tmpArray[index];
        
        //Para cada cliente, valida se a ultima transação está dentro do período
        if (element.lastTransaction < startDate || element.lastTransaction > endDate) {
          filteredArray.push(element);
        }
      }

      //Depois de percorrer o array de clientes, atualiza o array filtrado na variável da flatList
      this.setState({ localNoOperatingClients: filteredArray });

        this.setState({ loadingByPeriod: false });
      }, 2000);
  }

  _searchClientsByDays(){
    //Sinaliza o filtro em andamento
    this.setState({ loadingByDays: true, localNoOperatingClients: [] });
    
    setTimeout(() => { 
      //Reserva as datas
      let date = new Date();
      let days7 =  date.setDate(date.getDate()-7);
      let days15 = date.setDate(date.getDate()-15);
      let days30 = date.setDate(date.getDate()-30);
      
      //Verifica qual o filtro selecionado pelo gerente
      if (this.state.optionSelected === '7days') {
        this.setState({ localNoOperatingClients: clients.filter((item) => (( item.clientIsNotOperating ) && ( item.lastTransaction > days7 )) ) });
      }

      if (this.state.optionSelected === '15days') {
        this.setState({ localNoOperatingClients: clients.filter((item) => (( item.clientIsNotOperating ) && ( item.lastTransaction > days15 )) ) });
      }

      if (this.state.optionSelected === '30days') {
        this.setState({ localNoOperatingClients: clients.filter((item) => (( item.clientIsNotOperating ) && ( item.lastTransaction > days30 )) ) });
      }

      this.setState({ loadingByDays: false });
    }, 2000);
  }

  //Busca clientes
  _searchClients() {
    this.setState({ loading: true });
    
    if ( this.state.emailOfClient !== '' ){
      setTimeout(() => { 
        let filteredClients = clients.filter((item) => item.email === this.state.emailOfClient );
        
        if (filteredClients.length <= 0) {
          //Se não encontrou usuário, informa o gerente sobre a validação
          this.setState({ userNotFoundContainerOpacity: 1, localData: [] });
          this.userNotFound.fadeIn();
          
          setTimeout(() => { this.userNotFound.fadeOut(), this.setState({ userNotFoundContainerOpacity: 0 }) }, 3000);
        } else {
          this.setState({ localData: filteredClients });
        }
        
        this.setState({ loading: false });
      }, 1000);
    } else {
      this.setState({ localData: [], loading: false });
      this.email.focus();
    }
  }

  renderItem(item, caller) {
    console.log(item);
    return(
      <TouchableOpacity onPress={() => Actions.clientProfile({ caller, userInfo: item, transactions: '', isMyClient: false }) }>
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
                {caller === 'pendingDeposits' && <Text style={ AppStyles.userInfoEmail }>Depósito solicitado em: {item.dateOfDeposit}</Text> }
                {caller === 'noOperatingClients' && <Text style={ AppStyles.userInfoEmail }>Ultima transação em: {this._formatDateTime(item.lastTransaction)}</Text> }
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
  
  //Formata a data para exibição ao gerente
  _formatDateTime = (datetime) => {
    let retorno = new Date(datetime);
  
    const day = retorno.getDate();
    const month = retorno.getMonth();
    const year = retorno.getFullYear();
  
    const hours = retorno.getHours();
    const minutes = retorno.getMinutes();
    const seconds = retorno.getSeconds();
  
    retorno = `${this._zeroPad(day, 2)}/${this._zeroPad(month + 1, 2)}/${year} ${this._zeroPad(hours, 2)}:${this._zeroPad(minutes, 2)}:${this._zeroPad(seconds, 2)}`;
  
    return retorno;
  } 
  
  _zeroPad = (num, places) => {
    let retorno = '';
  
    if (num >= 0) {
      const zero = (places - num.toString().length) + 1;
  
      retorno = Array(+(zero > 0 && zero)).join('0') + num;
    }
  
    return retorno;
  };

  renderTab() {
    //Função que irá decidir qual aba do SegmentedControlTab deve renderizar 
    if (this.state.selectedtab === 0){
      return(
        <View style={ Styles.geralTab }>
          <TextInput 
            placeholder='pesquise por e-mail'
            placeholderTextColor={'#cccccc'}
            value={this.props.emailOfClient}
            onChangeText={text => this.setState({ emailOfClient: text }) }
            style={ AppStyles.textInputStyle }
            underlineColorAndroid='transparent'
            onSubmitEditing={() => this._searchClients() }
            keyboardType="email-address"
            ref={ ref => this.email = ref }
          />
          <View style={ Styles.buttonContainer }>
            <Button
              style={AppStyles.buttonContainer}
              textStyle={AppStyles.buttonText}
              isLoading={this.state.loading}
              onPress={() => this._searchClients()}
              activityIndicatorColor="white"
              
            >
              PESQUISAR
            </Button>
          </View>
          <FlatList
            key={'List'}
            keyExtractor={(item) => item.userId}
            data={this.state.localData}
            renderItem={(data) => this.renderItem(data.item, 'search')}
            style={ Styles.flatListStyle }
          />
          <Animatable.View ref={ ref => this.userNotFound = ref } style={[ AppStyles.adviseContainer, { opacity: this.state.userNotFoundContainerOpacity } ]}>
            <Text style={ AppStyles.adviseLabel }>Usuário não encontrado</Text>
          </Animatable.View>
        </View>
      )
    }

    if (this.state.selectedtab === 1){
      return(
        <View style={ Styles.geralTab }>
          <View style={ Styles.infoContainer }>
            <Text style={ Styles.infoText }>Clientes com Depósitos Pendentes</Text>
          </View>
          <TextInput 
            placeholder='filtre por e-mail'
            placeholderTextColor={'#cccccc'}
            value={this.props.textToFilter}
            onChangeText={text =>  this._filterPendingDepositsList(text) }
            style={ AppStyles.textInputStyle }
            underlineColorAndroid='transparent'
            keyboardType="email-address"
          />
          <FlatList
            key={'List'}
            keyExtractor={(item) => item.userId}
            data={this.state.localPendingDeposits}
            renderItem={(data) => this.renderItem(data.item, 'pendingDeposits')}
            style={ AppStyles.flatListStyle }
            refreshing={this.state.refreshingPendingDeposits}
            onRefresh={() => this._fillThePendingDepositsList()}
          />
        </View>
      )
    }

    if (this.state.selectedtab === 2){
      return(
        <ScrollView style={[ Styles.geralTab, { marginBottom: verticalScale(55) } ]}>
        
          <View style={ AppStyles.titleContainer }>
            <Text style={ AppStyles.title }>Clientes sem operar por até...</Text>
          </View>

          <RadioGroup
            onSelect = {(index, value) => this.setState({ optionSelected: value }) }
            style={ Styles.radioGroupConfig }
          >
            <RadioButton value={'7days'} >
              <Text style={ Styles.radioItem }>7 dias</Text>
            </RadioButton>

            <RadioButton value={'15days'}>
              <Text style={ Styles.radioItem }>15 dias</Text>
            </RadioButton>

            <RadioButton value={'30days'}>
              <Text style={ Styles.radioItem }>30 dias</Text>
            </RadioButton>
          </RadioGroup>

          <View style={ Styles.buttonByDaysContainer }>
            <Button
              style={AppStyles.buttonContainer}
              textStyle={AppStyles.buttonText}
              isLoading={this.state.loadingByDays}
              onPress={() => this._searchClientsByDays()}
              activityIndicatorColor="white"
            >
              PESQUISAR
            </Button>
          </View>

          { this._renderSeparator({ marginTop: 10 }) }

          <View style={[ AppStyles.titleContainer, { marginTop: verticalScale(10) } ]}>
            <Text style={ AppStyles.title }>Ou selecione por período...</Text>
          </View>

          <View style={ Styles.datePickersContainer }>
            <DatePicker
              style={{width: 150}}
              date={this.state.startDate}
              mode="date"
              placeholder="Data inicial"
              format="YYYY-MM-DD"
              minDate="2010-01-01"
              maxDate="2099-31-12"
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              showIcon={false}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 8
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({startDate: date})}}
            />

            <DatePicker
              style={{marginRight: scale(50), width: 150}}
              date={this.state.endDate}
              mode="date"
              placeholder="Data final"
              format="YYYY-MM-DD"
              minDate="2010-01-01"
              maxDate="2099-31-12"
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              showIcon={false}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 8
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({endDate: date})}}
            />
          </View>

          <View style={ Styles.buttonByPeriodContainer }>
            <Button
              style={AppStyles.buttonContainer}
              textStyle={AppStyles.buttonText}
              isLoading={this.state.loadingByPeriod}
              onPress={() => this._searchClientsByPeriod()}
              activityIndicatorColor="white"
            >
              PESQUISAR
            </Button>
          </View>

          { this._renderSeparator({ marginTop: 10 }) }

          <FlatList
            key={'List'}
            keyExtractor={(item) => item.userId}
            data={this.state.localNoOperatingClients}
            renderItem={(data) => this.renderItem(data.item, 'noOperatingClients')}
            style={ AppStyles.flatListStyle }
            refreshing={this.state.refreshingPendingDeposits}
            onRefresh={() => this._fillTheNoOperatingClientsList()}
          />
        </ScrollView>
      )
    }
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

  render() {
    return(
      <View style={ AppStyles.tabViewContainer }>
        <View style={ Styles.segmentedContainter }>
          <SegmentedControlTab
            values={['Geral', 'Depós. Pendentes', 'Sem operar']}
            selectedIndex={this.state.selectedtab}
            tabStyle={AppStyles.tabStyle}
            tabTextStyle={AppStyles.tabTextStyle}
            onTabPress={(idx) => {this.setState({ selectedtab: idx }) }}
            activeTabStyle={AppStyles.activeTabStyle}
            activeTabTextStyle={AppStyles.activeTabTextStyle}
          />
        </View>
        <View style={ Styles.searchClientSceneContainer }>
          {this.renderTab()}
        </View>
      </View>
    )
  }
}

export default SearchClients;