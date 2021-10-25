# Design

Rebuild app binary when linking android/IOS code.
`npx react-native run-ios`
`npx react-native run-android`

- All dimensions in React Native are **unitless**, and represent **density-independent pixels**.

```
Flexbox works the same way in React Native as it does in CSS on the web, with a few exceptions.
The defaults are different, with flexDirection defaulting to column instead of row, alignContent defaulting to flex-start instead of stretch, flexShrink defaulting to 0 instead of 1, the flex parameter only supporting a single number.
```

`<Image source={require('./my-icon.png')} />`

You can use the `@2x` and `@3x` suffixes to provide images for different **screen densities**. 
If you have the following file structure:

```
.
├── button.js
└── img
    ├── check.png
    ├── check@2x.png
    └── check@3x.png
```

1. Same system on Android and iOS.
2. Images live in the same folder as your JavaScript code. Components are self-contained.
3. No global namespace, i.e. you don't have to worry about name collisions.
4. Only the images that are actually used will be packaged into your app.
5. Adding and changing images doesn't require app recompilation, you can refresh the simulator as you normally do.
6. The bundler knows the image dimensions, no need to duplicate it in the code.
7. Images can be distributed via npm packages.

In order for this to work, the image name in require has to be known statically.

```
// GOOD
<Image source={require('./my-icon.png')} />;

// BAD
var icon = this.props.active
  ? 'my-icon-active'
  : 'my-icon-inactive';
<Image source={require('./' + icon + '.png')} />;

// GOOD
var icon = this.props.active
  ? require('./my-icon-active.png')
  : require('./my-icon-inactive.png');
<Image source={icon} />
```

Note that image sources required this way include size (width, height) info for the `Image`.
If you need to scale the image dynamically (i.e. via flex), you may need to manually set `{ width: undefined, height: undefined }` on the style attribute.

The `require` syntax described above can be used to statically include **audio**, **video** or **document** files in your project as well.
Most common file types are supported including `.mp3, .wav, .mp4, .mov, .html` and `.pdf`. 

A caveat is that videos must use **absolute positioning** instead of `flexGrow`, since **size info is not currently passed for non-image assets**.
This limitation doesn't occur for videos that are linked directly into `Xcode` or the `Assets folder for Android`.


## Common Asset Extensions

```
exports.assetExts = [
  // Image formats
  'bmp',
  'gif',
  'jpg',
  'jpeg',
  'png',
  'psd',
  'svg',
  'webp',
  // Video formats
  'm4v',
  'mov',
  'mp4',
  'mpeg',
  'mpg',
  'webm',
  // Audio formats
  'aac',
  'aiff',
  'caf',
  'm4a',
  'mp3',
  'wav',
  // Document formats
  'html',
  'pdf',
  'yaml',
  'yml',
  // Font formats
  'otf',
  'ttf',
  // Archives (virtual files)
  'zip',
];

```

## Network Images
Many of the images you will display in your app will not be available at compile time.
Unlike with static resources, **you will need to manually specify the dimensions of your image**.

### Network Requests for Images

If you would like to set such things as the `HTTP-Verb`, `Headers` or a `Body` along with the **image request**, you may do this by defining these properties on the source object:

```
<Image
  source={{
    uri: 'https://reactjs.org/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache'
    },
    body: 'Your Body goes here'
  }}
  style={{ width: 400, height: 400 }}
/>
```

### URI Data Images

Sometimes, you might be getting encoded image data from a REST API call.
You can use the `'data:'` uri scheme to use these images. Same as for network resources, **you will need to manually specify the dimensions of your image**.
(This is recommended for very small and dynamic images only, like icons in a list from a DB.)

```
<Image
  style={{
    width: 51,
    height: 51,
    resizeMode: 'contain'
  }}
  source={{
    uri:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
  }}
/>
```

Static images loaded from the app bundle via the `require('./my-icon.png') syntax` can be automatically sized because their **dimensions are available immediately at the time of mounting**.

In React Native, one interesting decision is that the `src` attribute is named `source` and doesn't take a string but an **object with a uri attribute**.
`<Image source={{ uri: 'something.jpg' }} />`

A common feature request from developers familiar with the web is `background-image`.
To handle this use case, you can use the `<ImageBackground>` component, which has the same props as `<Image>`, and add whatever children to it you would like to layer on top of it.

```
return (
  <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
);
```

### Off-thread Decoding

**Image decoding** can take more than a `frame-worth` of time.
This is one of the major sources of frame drops on the **web because decoding is done in the main thread**.
In React Native, **image decoding** is done in `a different thread`.
(In practice, you already need to handle the case when the image is not downloaded yet, so displaying the placeholder for a few more frames while it is decoding does not require any code change.)

### Color APIs

React Native has several color APIs designed to allow you to take full advantage of your platform's design and user preferences.

- **PlatformColor** lets you reference the platform's color system.
- **DynamicColorIOS** is iOS specific and allows you to specify which colors should be used in light or Dark Mode.
