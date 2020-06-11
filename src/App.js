import React, { Component } from 'react';
import './App.css';

var Tesseract = window.Tesseract;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uploads: [],
      textResult: '',
    };
  }

  handleChange = (event) => {
    if (event.target.files[0]) {
      var uploads = []
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key]
        uploads.push(URL.createObjectURL(upload))
      }
      this.setState({
        uploads: uploads
      })
    } else {
      this.setState({
        uploads: []
      })
    }
  }

  generateText = () => {
    let uploads = this.state.uploads
  
    for(var i = 0; i < uploads.length; i++) {
      Tesseract.recognize(
        uploads[i], 
        'eng',
        { logger: m => console.log(m) }
      )
      .catch(err => {
        console.error(err)
      })
      .then(result => { 
        // Update state
        this.setState({ 
          textResult: result.text
        })
        console.log(result.text);
      })
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>BrunchFace OCR App</h1>
        </header>

        { /* File uploader */ }
        <section className="hero">
          <label className="fileUploaderContainer">
            Click here to upload documents
            <input type="file" id="fileUploader" onChange={this.handleChange} multiple />
          </label>

          <div>
            { this.state.uploads.map((value, index) => {
              return <img key={index} src={value} width="100px" />
            }) }
          </div>

          <button className="button" onClick={this.generateText}>Generate</button>
        </section>

        { /* Results */ }
        <section className="results">
            <p>
              {this.state.textResult}
            </p>
        </section>
      </div>
    )
  }

}

export default App;