import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    )
  }

}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;