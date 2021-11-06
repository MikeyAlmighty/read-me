# Drawing board

### FlatList vs ScrollView

INPUT: Given a list of heroes:

``` javascript
const heroes = [
    { name: 'Dead Pool', id: 420 },
    { name: 'Bat Man', id: 69 },
    { name: 'Aqua Man', id: 101 },
    { name: 'Super Man', id: 123 },
    { name: 'Captain Marvel', id: 756 },
    { name: 'Hulk', id: 3476 },
    { name: 'Shrek', id: 564 },
  ]
```

#### ScrollView

Wrap "Manually" mapped items in a `ScrollView`:

``` javascript
        <ScrollView style={styles.listContainer}>
          {heroes.map(({ name, id }) => (
            <TouchableHighlight onPress={() => alert(name)}>
              <Text style={styles.hero} key={id}>{name}</Text>
            </ TouchableHighlight>
          ))}
        </ScrollView>
```

#### FlatList

``` javascript
<FlatList
  data={heroes}
  renderItem={renderItem}
/>
```

`RenderItem` is the "iteration" function (map).
``` javascript
  const renderItem = ({ item }) => {
    const { name, id }  = item
    return(
      <TouchableOpacity onPress={() => alert(name)}>
        <Text style={styles.hero} key={id}>{name}</Text>
      </TouchableOpacity>
  )}
```

To render **multiple columns**, use the `numColumns` prop.
Using this approach instead of a `flexWrap` layout can prevent conflicts with the **item height logic**.

A performant interface for rendering basic, flat lists, supporting the most **handy features**:

* Fully cross-platform.
* Optional horizontal mode.
* Configurable viewability callbacks.
* Header support.
* Footer support.
* Separator support.
* Pull to Refresh.
* Scroll loading.
* `ScrollToIndex` support.
* Multiple column support.

`keyExtractor` tells the list to use the `ids` for the react `keys` instead of the default `key` property.

This is a convenience wrapper around `<VirtualizedList>`, and thus **inherits** its `props` (as well as those of `<ScrollView>`) that aren't explicitly listed here, along with the following caveats:

Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.

This is a `PureComponent` which means that it will not re-render if `props` remain shallow-equal.
Make sure that everything your `renderItem` function depends on is passed as a `prop` (e.g. extraData) that is not === after updates, otherwise your UI may not update on changes.
This includes the data prop and parent component state.

In order to constrain memory and enable `smooth scrolling`, content is **rendered asynchronously offscreen**.
This means it's possible to scroll faster than the fill rate and momentarily see blank content.
This is a tradeoff that can be adjusted to suit the needs of each **application**.
