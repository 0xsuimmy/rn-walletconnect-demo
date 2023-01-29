import './shim';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const connector = useWalletConnect();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!connector.connected ? (
        <Button title="Connect" onPress={() => connector.connect()} />
      ) : (
        <>
          <Button
            title="Kill Session"
            onPress={() => connector.killSession()}
          />
          <Text>{connector.accounts[0]}</Text>
          <Button
            title="sign"
            onPress={() => {
              connector.signMessage(['Hello ReactNative']);
            }}
          />
        </>
      )}
    </View>
  );
}

export default withWalletConnect(App, {
  redirectUrl: 'yourappscheme://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
