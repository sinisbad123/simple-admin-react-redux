import React, { Component } from 'react';
import { connect } from 'react-redux'
import CategoryTable from '../../../pages/Shopping/ManageCategories/categoryTable';
import DisplayCategoryForm from './displayCategoryForm';
import { fetchCategory, fetchCategories } from '../../../actions/shopping/categories';

class CategoryContainer extends Component {

  state = {
    categories: this.props.categories,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      categories: nextProps.categories,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <DisplayCategoryForm />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>Manage Categories</h4>
                <p>Edit or delete categories</p>
              </div>
              <div className="content">
                <CategoryTable
                  categories={this.state.categories}
                  fetchCategory={this.props.fetchCategory}
                  fetchCategories={this.props.fetchCategories} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: (page) => dispatch(fetchCategories(page)),
  fetchCategory: (categoryID) => dispatch(fetchCategory(categoryID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryContainer);