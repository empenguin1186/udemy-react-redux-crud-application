import React from 'react';
import PropTypes from 'prop-types';

// function App() {
//   return (
//     <React.Fragment>
//       <label htmlFor="bar">bar</label>
//       <input type="text" onChange={() => { console.log("I am clicked!!") }} id="bar" />
//     </React.Fragment>
//   )
// }

const profiles = [
  { name: "Taro", age: 25 },
  { name: "Hanako", age: 10 },
  { name: "NoName" }
]

const App = () => {
  return (
    <div>
      {
        profiles.map((profile, index) => {
          return <User name={profile.name} age={profile.age} key={index} />
        })
      }
    </div>
  )
}

const User = (props) => {
  return <div>Hi! I am {props.name}!, and {props.age} years old.</div>
}
User.defaultProps = {
  age: 1
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}

export default App;
