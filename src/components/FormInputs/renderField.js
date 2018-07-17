import React from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Checkbox from './Checkbox';
import Radio from './Radio';

const renderField = (props) => (
  <div>
    { (props.type === 'email' ||
       props.type === 'password' ||
       props.type === 'text' ||
       props.type === 'number') &&
      <TextInput {...props} />
    }
    { props.type === 'textarea' && <TextArea {...props} /> }
    { props.type === 'checkbox' && <Checkbox {...props} /> }
    { props.type === 'radio' && <Radio {...props} /> }
  </div>
);

export default renderField;