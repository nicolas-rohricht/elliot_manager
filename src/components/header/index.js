import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import Styles from './styles';
import { Actions } from 'react-native-router-flux';

const topColor = '#edc968';
const bottomColor = '#fbfe73';

class Header extends Component {
  render() {
    return(
      <LinearGradient colors={[ topColor, bottomColor ]} style={ Styles.headerContainer }>
        <View style={ Styles.closeButtonContainer }>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon
              name='times'
              style={ Styles.closeButton }
            />
          </TouchableOpacity>
        </View>
        <View style={ Styles.labelTitleContainer }>
          <Text style={ Styles.labelTitle }>{this.props.title}</Text>
        </View>
      </LinearGradient>
    )
  }
}

export default Header;