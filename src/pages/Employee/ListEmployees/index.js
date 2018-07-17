import React from 'react';
import EmployeeListContainer from '../../../containers/employee/employeeList';

const EmployeeList = ({ match }) => (
    <EmployeeListContainer employeeId={match.params.id} />
)


export default EmployeeList;