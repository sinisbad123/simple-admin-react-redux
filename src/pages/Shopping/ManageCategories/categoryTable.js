import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as humanize from 'humanize';

class CategoriesTable extends Component {

  state = {
    categories: this.props.categories,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      categories: nextProps.categories,
    });
  }

  componentWillMount() {
    if (this.props.fetchCategories) {
      this.props.fetchCategories(1);
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchCategory) {
        this.props.fetchCategory(row.id);
      }
    }
  }

  onRowSelectBgColor = (row, isSelect) => {
    if (isSelect) {
      return '#7777772b';
    }
    return null;
  }

  onPageChange = (page, sizePerPage) => {
    if (this.props.fetchProducts) {
      this.props.fetchCategories(page);
    }
  }

  render() {
    const categories = this.state.categories && this.state.categories.data ? this.state.categories.data : [];
    const count = this.state.categories && this.state.categories.total ? this.state.categories.total : 0;
    const page = this.state.categories && this.state.categories.page ? this.state.categories.page : 1;
    let categoryDataSet = [];
    for (let i = 0; i < count; i++) {
      categoryDataSet.push({});
    }

    const formattedCategories = categories.map(category => {
      return category;
    });

    categoryDataSet.splice((page * 13) - 13, formattedCategories.length, ...formattedCategories);

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      onPageChange: this.onPageChange
    };

    const selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      bgColor: this.onRowSelectBgColor,
      onSelect: this.onRowSelect,
    };

    return (
        <BootstrapTable
            selectRow={selectRowProp}
            data={categoryDataSet}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            isKey={true}
            dataField='id'
            width="0%"
            >
            ID
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='name'
            >
            Name
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='priority'
            >
            Priority
            </TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default CategoriesTable