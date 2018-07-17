import React, { Component } from 'react';
import { connect } from 'react-redux';
import MultiSelect from '../../../components/FormInputs/MultiSelect';
import { fetchCategories, relayBrands } from '../../../actions/shopping/categories';

class renderCategoriesMultiSelect extends Component {
    state = {
        categories: this.props.categories,
        input: this.props.input,
    };

    componentWillMount() {
        if (this.props.fetchCategories) {
            this.props.fetchCategories(1);
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            categories: nextProps.categories,
            input: nextProps.input,
        });
    }

    onSelectionChange = (input) => {
        let combinedBrands = [];
        input.map(category => {
            combinedBrands = combinedBrands.concat(category.brands);
            return null;
        });

        if (this.props.relayBrands) {
            this.props.relayBrands(combinedBrands);
        }

        if (this.state.input) {
            this.state.input.onChange(input);
        }
    }

    renderError = () => {
        const meta = this.props.meta;
        const input = this.state.input;

        if (meta.error && this.state.touched) {
            return (
                <label className="error" htmlFor={input.name}>{meta.error}</label>
            );
        }

        return null;
    }

    onTouched = () => {
        const currentState = this.state;
        currentState.touched = true;
        this.setState(currentState);
    }

    
    render () {
        const input = this.state.input;
        const categories = this.state.categories;
        
        if (input && categories) {
            const value = input.value && Array.isArray(input.value) ? input.value : [];
            const processedValue = value.map(value => {
                if (!value.id) {
                    value.id = value._id;
                }
                return value
            });

            return (
                <div onBlur={this.onTouched}>
                    <MultiSelect {...input}
                    defaultValue={processedValue}
                    data={categories}
                    valueField="id"
                    textField="name"
                    onChange={(input) => this.onSelectionChange(input)} />
                    {this.renderError()}
                </div>
            );
        }

        return null;
    }
}


const mapStateToProps = state => ({
    categories: state.categories.data ? state.categories.data : null,
})
    
const mapDispatchToProps = dispatch => ({
    fetchCategories: (page) => dispatch(fetchCategories(page)),
    relayBrands: (brands) => dispatch(relayBrands(brands))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(renderCategoriesMultiSelect)


