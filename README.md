# udemy-react-redux-crud-application

## JSX の利点
- HTML ベースで記述できるので、直感的なコーディングが可能となる点。

## 戻り値について
- return する要素は必ず一個の要素でなければならない。これを避けるために、`<React.Fragment>`を使用する。

## トランスパイラ
- トランスパイラには babel を使用している

## モジュールバンドラー
- モジュールバンドラーには webpack が使用されている
  - https://webpack.js.org/

## Component
- Component を定義することで、HTML要素の部品を使用することが可能。

## Props
- Component に渡すことができる引数みたいなもの。`<Component>.defaultProps`でデフォルトの値を設定することが可能。
- map などのイテレーションを回す処理を実装する場合は、react Component に key を付与して一意性を担保することが必要。

## PropTypes
- Propsには型を指定することが可能。以下のように記述する。

```js
import PropTypes from 'prop-types';

const User = ...

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}
```

## State
- `setState()` が呼ばれると、ReactComponent　の render メソッドが呼ばれる。Stateを変更したい場合は必ず `setState()` を使用する。

# redux に関して

## Action, Reducer, State, Component, Store について

### Action
- Action は文字通りユーザが何かしらのアクションを行なった時に返すデータを定義する。この Action をトリガーとして Reducer の処理を実装する。
```js
export const decrement = () => ({
    type: DECREMENT
});
```

### Reducer
- 受け取った Action に応じて State を変更する役割を担う。実装は以下のようなイメージ。

```js
import { INCREMENT, DECREMENT } from '../actions'

const initialState = { value: 0 }

export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { value: state.value + 1 };
        case DECREMENT:
            return { value: state.value - 1 };
        default:
            return state;
    }
}
```

- またアプリケーションで使用する Reducer を宣言する必要があり、以下のように `combineReducers` 関数を使用する。
```js
import { combineReducers } from 'redux'
import count from './count'
import dummy from './dummy'

export default combineReducers({ count, dummy })
```

### Store
- Reducer を Store に登録することでアプリケーションでいつでも Reducer を使用することが可能となる。Provider に Store を登録することでアプリケーションで扱えるようになる。

```js
...
import { createStore } from 'redux';
import { Provider } from 'react-redux';
...

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

- 使用する側は以下のように実装することとなる。
```js
import { increment, decrement } from '../actions';

class App extends Component {

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <div>value: {props.value}</div>
        <button onClick={props.increment}>+</button>
        <button onClick={props.decrement}>-</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ value: state.count.value });
const mapDispatchToProps = ({ increment, decrement })
export default connect(mapStateToProps, mapDispatchToProps)(App)
```
- `increment` が呼ばれると、`{type: 'INCREMENT'}` という Action が発生し、それに応じて count reducer が state を変更する。この場合 `value` の値が1増えるように実装されているので、画面では `value` の項目に 1 が表示されることとなる。