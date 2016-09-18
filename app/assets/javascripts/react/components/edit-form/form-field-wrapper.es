import React, { Component } from 'react';

class FormFieldWrapper extends Component {

  render() {
    const { children, label, hint } = this.props;

    return (
      <div className="row">
        <div className="columns large-3">
          <label className="middle text-right">{label}</label>
        </div>
        <div className="columns large-9">
          <div className="columns large-6">
            {children}
          </div>
          <div className="columns large-6">
            <label className="hint middle">{hint}</label>
          </div>
        </div>
      </div>
    );
  }

}

export default FormFieldWrapper;
