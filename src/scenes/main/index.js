 import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Emoji from 'react-native-emoji';
import * as Animatable from 'react-native-animatable';

import Styles from './styles';
import AppStyles from '../../styles';

const topColor = '#edc968';
const bottomColor = '#fbfe73';

const balance = 'balance';
const summary = 'summary';

const balanceValue = 'R$ 8.109,47';

class Main extends Component {
  state={
    hideBalance: false,
    idOfEmojis: -1,
    idOfStatus: 0
  }

  componentDidMount() {
    //Inicia o timer das informações 
    this._startTimer();
  }

  componentWillUnmount(){
    //Pausa o timer das informações 
    this._stopTimers();
  }

  _startTimer() {
    //Troca o container da informação a cada 4 segundos
    this.intervalId = setInterval(() => { this._animateStatusView() }, 4000);
  }

  _stopTimers() {
    clearInterval(this.intervalId);
  }
  
  _animateStatusView(){
    //Se chegou no ultimo container de informação, vai pro primeiro
    if (this.state.idOfStatus >= 2) {
      this.setState({ idOfStatus: 0 });
    } else {
      //Se não vai para o proximo
      this.setState({ idOfStatus: this.state.idOfStatus + 1 });
    };

    //Anima a view de novos clientes
    if (this.state.idOfStatus === 0) {
      this.newClientsView.bounceInUp(400);
    };

    //Anima a view de clientes pendentes
    if (this.state.idOfStatus === 1) {
      this.waitingClientsView.bounceInUp(400);
    };

    //Anima a view de nota media do gerente
    if (this.state.idOfStatus === 2) {
      this.managerGrade.bounceInUp(400);
    };
  }

  _renderBalanceOrEmojis(caller) {
    //Se foi escolhido para mostrar o saldo somado de todos os clientes, exibe para o gerente
    if (!this.state.hideBalance) {
      if (caller === balance) {
        return(
          <View style={ Styles.balanceLabelData }>
            <Text style={ Styles.balanceLabelHeader }>Saldo e rendimentos dos meus clientes</Text>
            <Text style={ Styles.balanceValueLabel }>{balanceValue}</Text>
            <Text style={ Styles.balanceLabelEfficiency }>+R$ 2.521,75</Text>
          </View>
        )
      }

      if (caller === summary) {
        return(
            <Text style={ Styles.sumaryValueLabel }>{balanceValue}</Text>
        )
      }
    } else {
      return(
        //Se foi escolhido para esconder, renderiza emojis na tela
        <View style={caller === balance && Styles.balanceLabelData }>
          {this._getEmojis(caller)}
        </View>
      )
    }
  }

  _getEmojiStyle(caller){
    //Se a chamada está ocorrendo pela view principal...
    if (caller === balance) {
      //rendereiza emojis maiores
      return Styles.balanceEmojiStyle;
    } else {
      //Se está chamando do rodapé, renderiza emojis menores
      return Styles.sumaryEmojiStyle;
    }
  }

  _getEmojis(caller){
    //Rotina de renderização de emojis
    let retorno = '';
    switch (this.state.idOfEmojis) {
      case 0:
        retorno = <View style={ Styles.emojiContainer }> 
                    <Emoji name="grin" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="blush" style={ this._getEmojiStyle(caller)} />
                    <Emoji name="grin" style={ this._getEmojiStyle(caller) } />
                  </View>
        break;
      case 1:
        retorno = <View style={ Styles.emojiContainer }> 
                    <Emoji name="grimacing" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="wink" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="grimacing" style={ this._getEmojiStyle(caller) } />
                  </View>
        break;
      case 2:
        retorno = <View style={ Styles.emojiContainer }> 
                    <Emoji name="money_with_wings" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="dollar" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="moneybag" style={ this._getEmojiStyle(caller) } />
                  </View>
        break;
      case 3:
        retorno = <View style={ Styles.emojiContainer }>
                    <Emoji name="stuck_out_tongue_winking_eye" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="sunglasses" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="stuck_out_tongue_winking_eye" style={ this._getEmojiStyle(caller) } />
                  </View>
        break;
      case 4:
        retorno = <View style={ Styles.emojiContainer }> 
                    <Emoji name="euro" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="pound" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="euro" style={ this._getEmojiStyle(caller) } />
                  </View>
        break;
      case 5:
        retorno = <View style={ Styles.emojiContainer }> 
                    <Emoji name="grinning" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="smirk" style={ this._getEmojiStyle(caller) } />
                    <Emoji name="grinning" style={ this._getEmojiStyle(caller) } />
                  </View>
        break;
      default:
        break;
    }
    return retorno;
  }

  //Controla qual conjunto de emojis deve renderizar
  _showAndHideBalance() {
    if (!this.state.hideBalance) {
      this.setState({ idOfEmojis: this.state.idOfEmojis >= 5 ? 0 : this.state.idOfEmojis + 1 })
    };
    this.setState({ hideBalance: !this.state.hideBalance });
  }

  //controla qual container de informação deve ser renderizado
  _renderStatusOfAccount() {
    if (this.state.idOfStatus === 0) {
      return (
        <Animatable.View animation={'bounceInUp'} ref={ ref => this.newClientsView = ref }style={ Styles.statusContainer }>
          <View style={ Styles.numberOfNewClientsContainer }>
            <Text style={ Styles.numberOfClients }>3</Text>
          </View>
          <View style={ Styles.statusLabelContainer }>
            <Text style={ Styles.sumaryLabel }>Novos clientes hoje</Text>
          </View>
        </Animatable.View>
      )
    }

    if (this.state.idOfStatus === 1) {
      return (
        <Animatable.View animation={'bounceInUp'} ref={ ref => this.waitingClientsView = ref }style={ Styles.statusContainer }>
          <View style={ Styles.numberOfWaitingClientsContainer }>
            <Text style={ Styles.numberOfClients }>7</Text>
          </View>
          <View style={ Styles.statusLabelContainer }>
            <Text style={ Styles.sumaryLabel }>Clientes pendentes</Text>
          </View>
        </Animatable.View>
      )
    }

    if (this.state.idOfStatus === 2) {
      return (
        <Animatable.View animation={'bounceInUp'} ref={ ref => this.managerGrade = ref }style={ Styles.managerGradeContainer }>
          <View style={ Styles.starsContainer }>
            <Icon name={'star'} style={ Styles.starIcon } />
            <Icon name={'star'} style={ Styles.starIcon } />
            <Icon name={'star'} style={ Styles.starIcon } />
            <Icon name={'star'} style={ Styles.starIcon } />
            <Icon name={'star-half-o'} style={ Styles.starIcon } />
          </View>
          <View style={ Styles.statusLabelContainer }>
            <Text style={ Styles.sumaryLabel }>Sua nota média como gerente</Text>
          </View>
        </Animatable.View>
      )
    }
  }
  
  render() {
    return(
      <View style={ Styles.mainContainer }>
        <LinearGradient colors={[ topColor, bottomColor ]} style={ Styles.balanceContainer }>
          <View style={ Styles.buttonMenuContainer }>
            <TouchableOpacity onPress={() => Actions.menu()}>
              <View style={[ AppStyles.circle, Styles.menuCircle ]}>
                <Text style={ Styles.buttonMenuText }>U</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={ Styles.balanceLabelContainer }>
            <View style={ Styles.balanceOrEmojiContainer }>
              { this._renderBalanceOrEmojis(balance) }
            </View>
            <View style={ Styles.eyeIconContainer }>
              <TouchableOpacity onPress={() => this._showAndHideBalance() }>
                <Icon name={this.state.hideBalance ? 'eye-slash' : 'eye' } style={ Styles.eyeIcon } />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <TouchableOpacity onPress={() => { Actions.appScenes({  }) }}>
          <View style={ Styles.summary }>
            <View style={ Styles.leftContainer }>
              <View style={ Styles.coinContainer }>
                <View style={ Styles.nameOfCoinContainer }>
                  <Text style={ Styles.nameOfCoin }>Bitcoin</Text>
                </View>
                <View style={[ AppStyles.circle, Styles.iconOfCoinContainer ]}>
                  <Icon name="btc" style={ Styles.iconOfCoin }/>
                </View>
              </View>
              <View style={ Styles.summaryBalanceContainer }>
                { this._renderBalanceOrEmojis(summary) }
              </View>
              <Text style={ Styles.sumaryLabel }>Saldo</Text>
            </View>
            <View style={ Styles.rightContainer }>
              {this._renderStatusOfAccount()}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Main;