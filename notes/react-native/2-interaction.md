# Interaction

### Button

```
<Button 
  onPress={() => alert(You rebel you!')}
  color={'#534FF2'}
  title={`Don't press me`}
/>
```

### Touchables

The **"Touchable" components** provide the capability to `capture tapping gestures`, and can display feedback when a gesture is recognized.
These components **do not** provide any default styling, however, so you will need to do a bit of work to get them looking nicely in your app.

### Navigating between Screens

React Native doesn't have a built-in idea of a global history stack like a web browser does -- this is where `React Navigation` enters the story.

React Navigation's native `stack navigator` provides a way for your app to transition between screens and manage navigation history.
If your app uses only one `stack navigator` then it is conceptually similar to how a web browser handles navigation state - your app `pushes` and `pops` items from the **navigation stack** as users interact with it, and this results in the user seeing different screens.

#### Creating a native stack navigator​

`createNativeStackNavigator` is a function that returns an object containing 2 properties: `Screen` and `Navigator`. B
oth of them are **React components** used for configuring the `navigator`.
The `Navigator` should contain `Screen` elements as its **children** to define the configuration for routes.


``` javascript
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>Home Screen</Text>
    </View>
  );
}

const ProfileScreen = ({ navigation, route }) => <Text>This is {route.params.name}'s profile</Text>;

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Dashboard" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```


Each screen takes a `component` prop that is a **React component**. Those components receive a prop called `navigation` which has various methods to link to other screens: `navigation.navigate`.

[Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator/)

To specify screen-specific options, we can pass an `options` prop to `Stack.Screen`, and for **common options**, we can pass `screenOptions` to `Stack.Navigator`.
