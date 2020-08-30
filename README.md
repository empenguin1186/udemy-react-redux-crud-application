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