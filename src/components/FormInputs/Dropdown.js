import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
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

const renderDropdownList = ({ input, data, valueField, textField, onChange, defaultValue }) => 
    <DropdownList {...input}
        defaultValue={defaultValue}
        valueComponent={ValueInput}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={onChange} />

export default renderDropdownList;
