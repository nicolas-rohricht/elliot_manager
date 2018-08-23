import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import Button from 'apsl-react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';

import AppStyles from '../../styles';
import Styles from './styles';

import { verticalScale, scale } from '../../sizes';
import { centralTickets } from '../../database/db.js';

class NewTicket extends Component {
  state={
    optionSelected: '',
    complement: '',
    loading: false,
    ticketCreatedContainerOpacity: 0,
    fillTheFieldsContainerOpacity: 0
  }

  //Formata a data
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

  //função para gerar um código individual para a FlatList
  _getGuId = () => {
    let retorno = '';
  
    const data = new Date();
    retorno = data.getUTCFullYear().toString() + 
              data.getUTCMonth().toString() + 
              data.getUTCDay().toString() + 
              data.getUTCHours().toString() + 
              data.getUTCMinutes().toString() + 
              data.getUTCSeconds().toString() + 
              data.getUTCMilliseconds().toString();
  
    return retorno;
  };

  //Cria o ticket para a central. O tipo e complemento devem estar preenchidos
  _createTicket(){
    if (this.state.optionSelected === '' || this.state.complement === '') {
      this.fillTheFields.fadeIn();
          
      setTimeout(() => { this.fillTheFields.fadeOut(), this.setState({ fillTheFieldsContainerOpacity: 0 }) }, 3000);
    } else {
      this.setState({ loading: true });
      setTimeout(() => { 
        centralTickets.push({
          idOfTicket: this._getGuId(),
          userId: this.props.userInfo.userId,
          name: this.props.userInfo.name,
          typeOfTicket: this.state.optionSelected,
          complementOfTicket: this.state.complement,
          dateOfTicket: this._formatDateTime(new Date)
        });

        this.ticketCreated.fadeIn();
            
        setTimeout(() => { this.ticketCreated.fadeOut(), this.setState({ ticketCreatedContainerOpacity: 0 }), Actions.pop() }, 2000);

        this.setState({ loading : false }) ;
      }, 2000);
    }
    console.log(centralTickets);
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
      <View style={[ AppStyles.tabViewContainer, { marginBottom: 0, marginHorizontal: scale(10) } ]}>
        <KeyboardAwareScrollView>
          <View style={ AppStyles.titleContainer }>
            <Text style={ AppStyles.title }>Qual problema seu cliente está tendo?</Text>
          </View>

          { this._renderSeparator({ marginTop: 10 }) }

          <RadioGroup
            onSelect = {(index, value) => this.setState({ optionSelected: value }) }
          >
            <RadioButton value={'cashoutIssue'} >
              <Text style={ Styles.radioItem }>Problema ao sacar</Text>
            </RadioButton>

            <RadioButton value={'depositIssue'}>
              <Text style={ Styles.radioItem }>Problema ao depositar</Text>
            </RadioButton>

            <RadioButton value={'other'}>
              <Text style={ Styles.radioItem }>Outros</Text>
            </RadioButton>
          </RadioGroup>

          <TextInput  
            style={ Styles.inputText }
            value={this.state.email}
            placeholder={'digite um complemento para o ticket'}
            onChangeText={ (text) => this.setState({ complement: text }) }
            underlineColorAndroid='transparent'
            autoCorrect={false}
            //onSubmitEditing={() => this.refs.password.focus()}
            returnKeyType='next'
            ref={'complement'}
            placeholderTextColor={'#cccccc'}
            multiline={true}
          />
          <View style={ Styles.buttonContainer }>
            <Button
              style={AppStyles.buttonContainer}
              textStyle={AppStyles.buttonText}
              isLoading={this.state.loading}
              onPress={() => { this._createTicket() } }
              activityIndicatorColor="white"
            >
              CRIAR TICKET
            </Button>
          </View>

          <Animatable.View ref={ ref => this.ticketCreated = ref } style={[ AppStyles.successContainer, { opacity: this.state.ticketCreatedContainerOpacity } ]}>
            <Text style={ AppStyles.adviseLabel }>Ticket criado com sucesso!</Text>
          </Animatable.View>
          <Animatable.View ref={ ref => this.fillTheFields = ref } style={[ AppStyles.adviseContainer, { opacity: this.state.fillTheFieldsContainerOpacity } ]}>
            <Text style={ AppStyles.adviseLabel }>Selecione uma opção e digite o complemento!</Text>
          </Animatable.View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default NewTicket;