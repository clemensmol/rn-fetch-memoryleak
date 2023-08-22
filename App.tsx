import React, {useCallback, useRef, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';

function App(): JSX.Element {
  const timer = useRef<any>();
  const [isRunning, setIsRunning] = useState(false);

  const doRequest = useCallback(() => {
    return new Promise<void>(resolve => {
      const url =
        'https://microsoftedge.github.io/Demos/json-dummy-data/256KB-min.json';
      return fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(() => {
        resolve();
      });
    });
  }, []);

  const startRepeatDoRequest = useCallback(() => {
    timer.current = setInterval(doRequest, 500);
    setIsRunning(true);
  }, [doRequest]);

  const stopRepeatDoRequest = useCallback(() => {
    clearInterval(timer.current);
    setIsRunning(false);
  }, []);

  return (
    <View style={styles.container}>
      {!isRunning && <Button title="Start" onPress={startRepeatDoRequest} />}
      {isRunning && <Button title="Stop" onPress={stopRepeatDoRequest} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
  },
});

export default App;
