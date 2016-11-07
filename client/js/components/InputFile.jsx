import React from 'react';

export default class InputFile extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  handleChange (e) {
    this.props.setFile(e.target.files[0]);
  }

  render () {
    return (
      <div className='col-xs-12'>
        <label className='col-xs-2' htmlFor='inputFile'>Upload Menu File</label>
        <input className='col-xs-3' type='file' id='inputFile' onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}
