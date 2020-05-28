import React from 'react'
/* ^^ we want to use the react for UI */
/* vv and we want to target the dom (web browsers) */
import ReactDom from 'react-dom'
import './index.css'

// Component
// State
// Lifecycle
// UI

class App extends React.Component {
    render() {
        return (
            <div>
                Hello World!
            </div>
        )
        // after babel, our jsx becomes:
        // return React.createElement("div", null, "Hello World!")
    }
}

ReactDom.render(
    // Takes
    // ...an React Element, and
    <App />,
    // ...Where to Render
    document.getElementById('app')
)