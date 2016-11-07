import React from 'react';

export default class OptionsPicker extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      options: [{id: 0}]
    };
  }

  add () {
    const newOptionId = this.state.options[this.state.options.length - 1].id + 1;
    const newOptions = this.state.options.concat({id: newOptionId});
    this.setState({
      options: newOptions
    });
    this.props.addOptions(newOptionId);
  }

  remove (optionId) {
    if (optionId === 0) return;
    const newOptions = this.state.options.reduce((newOptions, option) => {
      if (option.id !== optionId) newOptions.push(option);
      return newOptions;
    }, []);
    this.setState({
      options: newOptions
    });
    this.props.removeOptions(optionId);
  }

  update (type, id, e) {
    this.props.updateOptions(type, id, e.target.checked || e.target.value);
  }

  render () {
    return (
      <div>
        { this.state.options.map((option) => {
          return (<div key={option.id} className='panel panel-default'>
            <div className='panel-heading col-xs-12'>
              <div className='form-group form-inline'>
                <label className='col-xs-1' htmlFor={option.id + 'name'}>Template Name</label>
                <input className='col-xs-4 form-control' onChange={this.update.bind(this, 'name', option.id)} type='text' id={option.id + 'name'} />
                <a className={option.id ? 'btn btn-danger col-xs-offset-1' : 'hidden'} onClick={this.remove.bind(this, option.id)}>
                  <span className='glyphicon glyphicon-minus' />
                </a>
              </div>
            </div>
            <div className='panel-body'>
              <label className='form-inline col-xs-2' htmlFor={option.id + 'fromLX'}>
                <input onChange={this.update.bind(this, 'fromLX', option.id)} className='form-check-input' type='checkbox' id={option.id + 'fromLX'} /> From LX
              </label>
              <label className='form-inline col-xs-2' htmlFor={option.id + 'fromPT'}>
                <input onChange={this.update.bind(this, 'fromPT', option.id)} className='form-check-input' type='checkbox' id={option.id + 'fromPT'} /> From PT
              </label>
              <label className='form-inline col-xs-2' htmlFor={option.id + 'fromFriend'}>
                <input onChange={this.update.bind(this, 'fromFriend', option.id)} className='form-check-input' type='checkbox' id={option.id + 'fromFriend'} /> From Friend
              </label>
            </div>
          </div>);
        })
      }
        <a className='btn btn-success' onClick={this.add.bind(this)}>
          <span className='glyphicon glyphicon-plus' />
        </a>
      </div>
    );
  }
}
