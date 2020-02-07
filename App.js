import React from 'react';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';

import MainNavigator from './navigation/MainNavigator';


const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

lightTheme["color-primary-500"]="#ff0000";
const App = () => (
  <React.Fragment>
  <IconRegistry icons={EvaIconsPack} />
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <MainNavigator/>
  </ApplicationProvider>
  </React.Fragment>
);

export default App;
