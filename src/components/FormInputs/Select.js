import React from 'react';

export const SelectField = ({
                              input,
                              label,
                              meta: {touched, error},
                              children
                            }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <div className={
        'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
      }>
        <select {...input} >
          {children}
        </select>
        {touched && (error && <p className="help is-danger">{error}</p>)}
      </div>
    </div>
  </div>
);

export default SelectField;