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

const HomeScreen = ({ navigation }) => {
  // navigation.navigate('Details')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const DetailsScreen = ({ navigation }) => {
  // navigation.navigate('Home')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Each screen takes a `component` prop that is a **React component**. Those components receive a prop called `navigation` which has various methods to link to other screens: `navigation.navigate`.

[Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator/)

To specify screen-specific options, we can pass an `options` prop to `Stack.Screen`, and for **common options**, we can pass `screenOptions` to `Stack.Navigator`.

#### Passing parameters to routes

1. Pass params to a route by putting them in an `object` as a second parameter to the `navigation.navigate` function: `navigation.navigate('RouteName', { /* params go here */ })`
2. Read the params in your screen component: `route.params`.

``` javascript
const HomeScreen = ({ navigation }) => {
  // navigation.navigate('Details')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
    </View>
  );
}

const DetailsScreen = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params
  /* 2. Get the param */
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
```

`navigate` and `push` accept an optional second argument to let you pass **parameters** to the route you are navigating to.
For example: `navigation.navigate('RouteName', { paramName: 'value' })`.
You can **read the params** through `route.params` inside a screen
You can update the screen's params with `navigation.setParams`
**Initial params** can be passed via the `initialParams` prop on Screen
**Params** should contain the minimal data required to show a screen, nothing more. (Like a URL, clients/:clientId)

`NavigationContainer` is a component which manages our navigation tree and contains the navigation state. This component must **wrap all navigators structure**.
Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.

`navigation.navigate('RouteName')` pushes a new route to the native stack navigator if it's not already in the stack, otherwise it jumps to that screen.

We can call `navigation.push('RouteName')` as many times as we like and it will continue pushing routes.
The header bar will automatically show a back button, but you can programmatically go back by calling navigation.goBack(). On Android, the hardware back button just works as expected.
You can go back to an existing screen in the stack with navigation.navigate('RouteName'), and you can go back to the first screen in the stack with navigation.popToTop().
The navigation prop is available to all screen components (components defined as screens in route configuration and rendered by React Navigation as a route).



### Animations

Animations are very important to create a **great user experience**.
Stationary objects must overcome inertia as they start moving. Objects in motion have **momentum** and rarely come to a stop immediately.
Animations allow you to convey physically believable motion in your interface.


React Native provides us with an Animation API, `Animated` which runs on a seperate UI thread. (vs using translations which runs on the Main JS thread).

#### Animatable components

Only animatable components can be animated.
These unique components do the magic of binding the animated values to the properties, and do targeted native updates to avoid the cost of the React render and reconciliation process on every frame.

- They also handle cleanup on unmount so they are safe by default.

`createAnimatedComponent()` can be used to **make a component animatable**.
Animated exports the following animatable components using the above wrapper:

1. `Animated.Image`
2. `Animated.ScrollView`
3. `Animated.Text`
4. `Animated.View`
5. `Animated.FlatList`
6. `Animated.SectionList`


`const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value: 0`

#### Gesture Responder System
The **gesture responder system** manages the lifecycle of gestures in your app.
A touch can go through several phases as the app determines what the user's intention is.
For example, the app needs to determine if the touch is **scrolling**, **sliding on a widget**, or **tapping**.
This can even change during the duration of a touch. There can also be multiple simultaneous touches.

The touch responder system is needed to allow components to negotiate these touch interactions without any additional knowledge about their `parent` or child `components`.

##### Best Practices

To make your app feel great, every action should have the following attributes:

`Feedback/highlighting` - show the user what is handling their touch, and what will happen when they release the gesture.
`Cancel-ability` - when making an action, the user should be able to abort it mid-touch by dragging their finger away

These features make users more comfortable while using an app, because it allows people to experiment and interact without fear of making mistakes.


### Gestures

Lifecycle: Start, move, release

### Responder Lifecycle

A view can become the touch responder by implementing the correct negotiation methods. There are two methods to ask the view if it wants to become responder:

`View.props.onStartShouldSetResponder: (evt) => true`, - Does this view want to become responder on the start of a **touch**?
`View.props.onMoveShouldSetResponder: (evt) => true`, - Called for every touch move on the View when it is not the responder: does this view want to "claim" touch responsiveness?

If the view is responding, the following handlers can be called:

`View.props.onResponderMove: (evt) => {}` - The user is moving their finger
`View.props.onResponderRelease: (evt) => {}` - Fired at the end of the touch, ie "touchUp"
`View.props.onResponderTerminationRequest: (evt) => true` - Something else wants to become responder. Should this view release the responder? Returning true allows release
`View.props.onResponderTerminate: (evt) => {}` - The responder has been taken from the View. Might be taken by other views after a call to onResponderTerminationRequest, or might be taken by the OS without asking (happens with control center/ notification center on iOS)

`evt` is a synthetic touch event with the following form:

`nativeEvent`
- `changedTouches` - Array of all touch events that have changed since the last event
- `identifier` - The ID of the touch
- `locationX` - The X position of the touch, relative to the element
- `locationY` - The Y position of the touch, relative to the element
- `pageX` - The X position of the touch, relative to the root element
- `pageY` - The Y position of the touch, relative to the root element
- `target` - The node id of the element receiving the touch event
- `timestamp` - A time identifier for the touch, useful for velocity calculation
- `touches` - Array of all current touches on the screen
