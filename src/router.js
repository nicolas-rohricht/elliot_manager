import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Login from './scenes/login';
import Main from './scenes/main';
import Menu from './scenes/menu';
import MyClients from './scenes/clients';
import SearchClient from './scenes/search_clients';
import PendingClients from './scenes/pending_clients';
import ContactSupport from './scenes/contact_support';
import NewTicket from './scenes/contact_support/newTicket.js'

import AppStyles from './styles';
import ClientProfile from './scenes/client_profile';

const TabMyClients = ({ selected }) => (
  <View style={AppStyles.containerTab}>
    <Icon name="users" size={22} color={selected ? 'black' : 'gray'} />
    <Text style={[AppStyles.textTitleTab, { color: selected ? 'black' : 'gray' }]}>
      {'Meus Clientes'}
    </Text>
  </View>
);

const TabSearchClients = ({ selected }) => (
  <View style={AppStyles.containerTab}>
    <Icon name="search" size={22} color={selected ? 'black' : 'gray'} />
    <Text style={[AppStyles.textTitleTab, { color: selected ? 'black' : 'gray' }]}>
      {'Pesquisar Clientes'}
    </Text>
  </View>
);

const TabPendingClients = ({ selected }) => (
  <View style={AppStyles.containerTab}>
    <Icon name="clock-o" size={22} color={selected ? 'black' : 'gray'} />
    <Text style={[AppStyles.textTitleTab, { color: selected ? 'black' : 'gray' }]}>
      {'Clientes Pendentes'}
    </Text>
  </View>
);

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="loginScenes"
            type="reset"
          >
            <Scene
              key='login'
              component={Login}
              hideNavBar
              schema='modal'
            />
          </Scene>
          <Scene
            key="main"
            title="Main"
            component={Main}
            direction='horizontal'
            backTitle='Cancelar'

            hideNavBar
            panHandlers={null}
          />
          <Scene
            key="menu"
            title="Menu"
            component={Menu}
            direction='vertical'
          />

          <Scene
            key="clientProfile"
            title="Perfil"
            component={ClientProfile}
            direction='horizontal'
          />

          <Scene
            key="contactSupport"
            title="SUPORTE"
            component={ContactSupport}
            direction='horizontal'
            navigationBarStyle={AppStyles.navigatorBar}
            tabBarStyle={AppStyles.tabBarStyle}
            titleStyle={AppStyles.navigatorTitle}
            backButtonTextStyle={AppStyles.navigatorButton}
            leftButtonIconStyle={AppStyles.navigatorIcon}
            hideNavBar={false}
            /*rightButtonIconStyle={AppStyles.navigatorIcon}
            onRight={() => Actions.newTicket()}
            rightTitle={'Novo'}
            rightButtonTextStyle={AppStyles.navigatorButton}*/
          />

          <Scene
            key="newTicket"
            title="INCLUIR"
            component={NewTicket}
            direction='horizontal'
            navigationBarStyle={AppStyles.navigatorBar}
            tabBarStyle={AppStyles.tabBarStyle}
            titleStyle={AppStyles.navigatorTitle}
            backButtonTextStyle={AppStyles.navigatorButton}
            leftButtonIconStyle={AppStyles.navigatorIcon}
            hideNavBar={false}
            
          />

          <Scene 
            key="appScenes"
            tabs
            tabBarStyle={AppStyles.tabBarStyle}
          >
            <Scene
              key="myClients"
              title="MEUS CLIENTES"
              icon={TabMyClients}
              component={MyClients}
              navigationBarStyle={AppStyles.navigatorBar}
              tabBarStyle={AppStyles.tabBarStyle}
              titleStyle={AppStyles.navigatorTitle}
              backButtonTextStyle={AppStyles.navigatorButton}
              leftButtonIconStyle={AppStyles.navigatorIcon}
            />

            <Scene
              key="searchClients"
              title="PESQUISAR CLIENTES"
              icon={TabSearchClients}
              component={SearchClient}
              navigationBarStyle={AppStyles.navigatorBar}
              tabBarStyle={AppStyles.tabBarStyle}
              titleStyle={AppStyles.navigatorTitle}
              backButtonTextStyle={AppStyles.navigatorButton}
              leftButtonIconStyle={AppStyles.navigatorIcon}
            />

            <Scene
              key="pendingClients"
              title="CLIENTES PENDENTES"
              icon={TabPendingClients}
              component={PendingClients}
              navigationBarStyle={AppStyles.navigatorBar}
              tabBarStyle={AppStyles.tabBarStyle}
              titleStyle={AppStyles.navigatorTitle}
              backButtonTextStyle={AppStyles.navigatorButton}
              leftButtonIconStyle={AppStyles.navigatorIcon}
            />
          </Scene>

          
        </Scene>
      </Router>
    )
  }
}

export default RouterComponent;