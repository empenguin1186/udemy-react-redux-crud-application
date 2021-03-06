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

### action で関数を返すようにするには？
- src/index.js で thunk をミドルウェアとして apply することにより、action発火時に関数を返すようにできる

```js
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));
```

```js
export const readEvents = () => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/events${QUERY_STRING}`);
    console.log(response)
    dispatch({ type: READ_EVENTS, response })
}
```

# react-router-dom について

## 資料
- https://reactrouter.com/web/api

## Route
- パスとマッチしたComponentをrenderする。
```js
<Route exact path="/" component={EventsIndex}></Route>
```
- `exact`はパスが完全一致した場合に Component を render するという設定。

## Switch
- パスと最初にマッチしたRouteを返す
```js
<Switch>
  <Route exact path="/events/new" component={EventsNew}></Route>
  <Route exact path="/" component={EventsIndex}></Route>
</Switch>
```

## BrowserRouter
- サイト全体を定義するComponentのようだが、詳細は不明。

# その他 Tips

## javascript の オブジェクトから特定のフィールドの値を抜き出したい
```js
const object = {path: "/events/:id", url: "/events/10", isExact: true, params: {id: "10"}}

// object の id フィールドの値を変数 id に代入する
const { id } = object.params
```

## this.props.history.push
- 画面遷移を行う。前にいた画面を履歴に追加してブラウザの戻るボタンで戻れるようにする。

## redux-form による Form の初期値の設定
- redux-from を使用すると、Formの初期値を設定できる。mapStateProps の戻り値の initialValues フィールドに設定したい初期値の値を設定する。この場合、Component の nameと一致するフィールド名の値が初期値としてレンダリングされる。
```js
class  EventsShow extends Component {
  render() {
      const { handleSubmit, pristine, submitting } = this.props;

      return (
          <form onSubmit={handleSubmit(this.onSubmit)}>
              // titleには Let's have an event 4! が表示
              <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>

              // bodyには This is the body for event 4. が表示
              <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

              <div>
                  <input type="submit" value="Submit" disabled={pristine || submitting} />
                  <Link to="/">Cansel</Link>
                  <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
              </div>
          </form>
      )
  }
}
...

const mapStateToProps = (state, ownProps) => {
    const event = {id: 4, title: "Let's have an event 4!", body: "This is the body for event 4."}
    console.log(event);
    return { initialValues: event, event }
}
```
- https://redux-form.com/8.3.0/examples/initializefromstate/


## default export と 名前付き export の違い

- 名前付きは同じファイルで複数の値を export することができるが、import する場合は同じ名前を使用する必要がある。一方 default export は同じファイルで export することができるオブジェクトは一つだけだが、import する場合は任意の名前を使用することが可能。

### 資料
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export