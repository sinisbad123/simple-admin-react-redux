import React from 'react';
import EmployeeDetailsContainer from '../../../containers/employee/employeeDetails';

const EmployeeList = ({ match }) => (
    <EmployeeDetailsContainer employeeId={match.params.id} />
)


export default EmployeeList;