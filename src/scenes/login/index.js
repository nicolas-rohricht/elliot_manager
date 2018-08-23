import React, { Component } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'apsl-react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

import Styles from './styles';
import AppStyles from '../../styles';
import { verticalScale } from '../../sizes';
import { Actions } from 'react-native-router-flux';

const topColor = '#edc968';
const bottomColor = '#fbfe73';

const emailTest = 'email@teste.com.br';
const passwordTest = 'senha';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    wrongEmailOrPasswordContainerOpacity: 0
  }
  
  _login() {
    this.setState({ loading: true });
    
    setTimeout(() => { 
      //Valida se email e senha estão corretos
      if ( this.state.email !== emailTest || this.state.password !== passwordTest ) {
        //Se não estiverem, informa o usuário sobre a validação
        this.setState({ wrongEmailOrPasswordContainerOpacity: 1 });
        this.wrongEmailOrPasswordLabel.fadeIn();
        
        //Configuração do timeout para esconder a view de login sem sucesso
        setTimeout(() => { this.wrongEmailOrPasswordLabel.fadeOut() }, 3000); 
      } else {
        //Se estiver, redireciona para a tela main
        Actions.main();
      }
      //Reseta a variável do loading do botão
      this.setState({ loading: false });
     }, 2000);
  }

  render(){
    return(
      <LinearGradient colors={[ topColor, bottomColor ]} style={ Styles.loginContainer }>
        <KeyboardAwareScrollView>
          <View style={ Styles.labelsContainer }>
            <Text style={ Styles.elliotLabel }>Elliot</Text>
            <View style={ Styles.managerLabelContainer }>
              <Text style={ Styles.managerLabel }>manager</Text>
            </View> 
          </View>
          <View style={ Styles.textInputContainer }>
            <TextInput  
              style={AppStyles.inputText}
              value={this.state.email}
              placeholder={'meu@email.com.br'}
              onChangeText={ (text) => this.setState({ email: text }) }
              underlineColorAndroid='transparent'
              autoCorrect={false}
              onSubmitEditing={() => this.refs.password.focus()}
              returnKeyType='next'
              ref={'email'}
              placeholderTextColor={'#cccccc'}
              keyboardType="email-address"
            />
            <TextInput  
              style={[ AppStyles.inputText, { marginTop: verticalScale(15) } ]}
              value={this.state.password}
              placeholder={'senha'}
              onChangeText={ (text) => this.setState({ password: text }) }
              underlineColorAndroid='transparent'
              autoCorrect={false}
              onSubmitEditing={() => this._login()}
              returnKeyType='done'
              ref={'password'}
              placeholderTextColor={'#cccccc'}
              secureTextEntry
            />
          </View>
          <View style={ Styles.loginButtonContainer }>
            <Button
              style={AppStyles.buttonContainer}
              textStyle={AppStyles.buttonText}
              isLoading={this.state.loading}
              onPress={() => this._login()}
              activityIndicatorColor="white"
            >
              ENTRAR
            </Button>
          </View>
          <Animatable.View ref={ ref => this.wrongEmailOrPasswordLabel = ref } style={[ AppStyles.adviseContainer, { opacity: this.state.wrongEmailOrPasswordContainerOpacity } ]}>
            <Text style={ AppStyles.adviseLabel }>Usuário ou senha inválidos</Text>
          </Animatable.View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    )
  }
}

export default Login;