import React from 'react';
import axios from 'axios';

import InputFile from './InputFile.jsx';
import OptionsPicker from './OptionsPicker.jsx';

export default class FormApp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      menu: {},
      options: [{
        id: 0
      }]
    };
  }

  setMenu (menu) {
    const reader = new FileReader();
    reader.readAsText(menu);
    reader.onload = (e) => {
      this.setState({
        menu: e.target.result
      });
    };
  }

  addOptions (optionId) {
    const newOptions = this.state.options.concat({id: optionId});
    this.setState({
      options: newOptions
    });
  }

  removeOptions (optionId) {
    const newOptions = this.state.options.reduce((newOptions, option) => {
      if (option.id !== optionId) newOptions.push(option);
      return newOptions;
    }, []);
    this.setState({
      options: newOptions
    });
  }

  updateOptions (type, id, value) {
    const newOptions = this.state.options.map((option) => {
      if (option.id === id) {
        option[type] = value;
      }
      return option;
    });
    this.setState({
      options: newOptions
    });
  }

  submit () {
    axios.post('/newsletter', this.state)
      .then((response) => {
        console.log('OK', response.data);
        window.location = window.location.origin + '/' + response.data.filePath;
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  render () {
    return (
      <form className='container'>
        <div className='jumbotron'>
          <h2>Newsletter Generator</h2>
          <p className='help-text'>Upload JSON menu file and choose options to generate HTML newsletters</p>
          <InputFile setFile={this.setMenu.bind(this)} />
        </div>
        <OptionsPicker updateOptions={this.updateOptions.bind(this)} addOptions={this.addOptions.bind(this)} removeOptions={this.removeOptions.bind(this)} />
        <br />
        <input className='btn btn-primary' type='submit' value='Submit' onClick={this.submit.bind(this)} />
      </form>
    );
  }
}
