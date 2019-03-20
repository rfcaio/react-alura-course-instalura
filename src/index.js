import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/Header'
import Timeline from './components/Timeline'

const App = () => (
  <main>
    <Header />
    <Timeline />
  </main>
)

ReactDOM.render(<App />, document.getElementById('root'))
