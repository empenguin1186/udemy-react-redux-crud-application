import React from 'react';

function App() {
  return (
    <React.Fragment>
      <label htmlFor="bar">bar</label>
      <input type="text" onChange={() => { console.log("I am clicked!!") }} id="bar" />
    </React.Fragment>
  )
}

export default App;
