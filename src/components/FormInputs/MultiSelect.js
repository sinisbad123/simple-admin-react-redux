import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

let ValueInput = ({ item }) => {
    if (item && item.name) {
        return (
            <span>
                {item.name}
            </span>
        );
    }

    return (
        <span>
        </span>
    );
}

const renderMultiselect = ({ input, data, valueField, textField, onChange, defaultValue }) => {
    return (
        <Multiselect {...input}
        defaultValue={defaultValue}
        valueComponent={ValueInput}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={onChange} />
    );
}
    

export default renderMultiselect;
