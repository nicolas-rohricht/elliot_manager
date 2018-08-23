import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Styles from './styles';
import Header from '../../components/header';

class Menu extends Component {
  render() {
    return(
      <View style={ Styles.menuContainer }>
        <Header title={'Menu'} />
        <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
          <SettingsList.Item
            icon={
              <View style={Styles.iconContainer}>
                <Icon name="sign-out" style={Styles.iconLeft} />
              </View>
            }
            hasNavArrow={false}
            title='Logout'
            titleStyle={Styles.title}
            onPress={ () => Actions.loginScenes() }
          />
        </SettingsList>
      </View>
    )
  }
}

export default Menu;