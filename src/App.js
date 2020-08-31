import React, { Component } from 'react'
import './App.css'
import marked from 'marked'
import { sampleText } from './sampleText'

class App extends Component {
  state = {
    text: sampleText
  }

  componentDidMount () {
    const text = localStorage.getItem('text')

    if ( text) {
      this.setState({ text })
    } else {
      this.setState({ text : sampleText})
    }
    
  }

  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text )
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true})
    return { __html }
  }

  render() {
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 header">
            <h1> Editeur markdown </h1>
            <p> Saississez le texte que vous souhaitez en respectant la syntaxe markdown</p>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
              <textarea 
              onChange={this.handleChange}
              className='form-control'
              value={this.state.text}
              rows="35">
              </textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 soustitre">
            <p> Les modifications sont enregistrées en local. <br/> Si vous souhaitez reprendre à zéro, effacez tout le texte.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
