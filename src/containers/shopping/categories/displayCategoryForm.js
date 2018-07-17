import React, { Component } from 'react';
import { connect } from 'react-redux'
import UpdateCategoryForm from  './updateCategoryForm';
import AddCategoryForm from  './addCategoryForm';
import Alert from 'sweetalert-react';
import { removeCategory } from '../../../actions/shopping/categories';

class DisplayCategoryForm extends Component {

  state = {
    selectedCategory: this.props.selectedCategory,
    isEditing: false,
    showError: false,
    isAdding: false,
    errorMessage: '',
    page: this.props.page
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedCategory: nextProps.selectedCategory,
      isEditing: false,
      showError: nextProps.fetchError.trim() !== '',
      errorMessage: nextProps.fetchError,
      page: nextProps.page,
      isAdding: false,
    });
  }

  onBackButtonClick = () => {
    const currentState = this.state;
    currentState.selectedCategory = null;
    this.setState(currentState);
  }

  onAddButtonClick = () => {
    const currentState = this.state;
    currentState.isAdding = true;
    this.setState(currentState);
  }

  onEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = true;
    this.setState(currentState);
  }

  onDeleteButtonClick = () => {
    if (this.props.removeCategory && this.state.selectedCategory && this.state.page) {
      const categoryId = this.state.selectedCategory.id;
      const page = this.state.page;
      this.props.removeCategory(categoryId, page);
    }
  }

  onCancelAddButtonClick = () => {
    const currentState = this.state;
    currentState.isAdding = false;
    this.setState(currentState);
  }

  onCancelEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = false;
    this.setState(currentState);
  }

  renderNoSelectedDisplay = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <Alert
                title=""
                show={this.state.showError}
                text={this.state.errorMessage}
                onConfirm={() => this.setState({ showError: false })} />

                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <p className="text-center">
                      <button
                        type="button"
                        onClick={() => this.onAddButtonClick()}
                        className="btn btn-wd btn-sm btn-success">
                        <span className="btn-label">
                          <i className="fa fa-plus"></i>
                        </span> Add Category
                      </button>
                    </p>

                    <p className="text-center">
                      To update a category, please select from the table below
                    </p>
                  </div>
                  <div className="col-md-4"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNormalDisplay = (category) => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-wd btn-sm btn-default"
                    onClick={() => this.onBackButtonClick()}>
                    <span className="btn-label">
                      <i className="fa fa-angle-left"></i>
                    </span> Back
                  </button>
                  <h4>Update Category</h4>
                  <p>Edit or delete selected category</p>
                </div>
                <div className="col-md-4">
                  <Alert
                    title=""
                    show={this.state.showError}
                    text={this.state.errorMessage}
                    onConfirm={() => this.setState({ showError: false })} />
                </div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-info"
                      onClick={() => this.onEditButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-edit"></i>
                      </span> Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onDeleteButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> Delete Category
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-6">
                  <div className="typo-line">
                    <h5>
                      <p className="category">Category name:</p>
                      {category.name}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Priority:</p>
                      {category.priority}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUpdateFormDisplay = (category) => {
    category.page = this.state.page;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Category</h4>
                  <p>Edit or delete selected category</p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelEditButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> I don't want to edit anymore
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                <Alert
                    title=""
                    show={this.state.showError}
                    text={this.state.errorMessage}
                    onConfirm={() => this.setState({ showError: false })} />
              </div>
            </div>
            
            <UpdateCategoryForm
              initialValues={category}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  renderAddFormDisplay = (page) => {
    const initialValues = {
      page
    };
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Add New Category</h4>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelAddButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> I don't want to add anymore
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                <Alert
                    title=""
                    show={this.state.showError}
                    text={this.state.errorMessage}
                    onConfirm={() => this.setState({ showError: false })} />
              </div>
            </div>
            
            <AddCategoryForm
              initialValues={initialValues}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const selectedCategory = this.state.selectedCategory;
    const page = this.state.page;

    if (this.state.isAdding) {
      return this.renderAddFormDisplay(page);
    }

    if (selectedCategory) {
      if (this.state.isEditing) {
        return this.renderUpdateFormDisplay(selectedCategory);
      }

      return this.renderNormalDisplay(selectedCategory);
    }

    return this.renderNoSelectedDisplay();
  }
}

const mapStateToProps = state => ({
  selectedCategory: state.categories.selectedCategory,
  page: state.categories.page,
  fetchError: state.categories.error && state.categories.error.message
    ? state.categories.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  removeCategory: (categoryId, page) => dispatch(removeCategory(categoryId, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCategoryForm)