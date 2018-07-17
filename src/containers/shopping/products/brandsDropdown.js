import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropdownList from '../../../components/FormInputs/Dropdown';
import { fetchBrandsWithCategory } from '../../../actions/shopping/brands';

class renderBrandDropdown extends Component {
    state = {
        brands: this.props.brands,
        input: this.props.input,
    };

    componentWillMount() {
        if (this.props.fetchBrandsWithCategory && !this.props.forAdding) {
            this.props.fetchBrandsWithCategory(1);
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            brands: nextProps.brands,
            input: nextProps.input,
        });
    }

    filter_array = (test_array) => {
        var index = -1,
            arr_length = test_array ? test_array.length : 0,
            resIndex = -1,
            result = [];
    
        while (++index < arr_length) {
            var value = test_array[index];
    
            if (value) {
                result[++resIndex] = value;
            }
        }
    
        return result;
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

        if (input && this.state.brands && !this.props.forAdding) {
            let data = [];
            if (this.state.brands) {
                const brands = this.state.brands;
                Object.keys(brands).map(key => {
                    const category = brands[key];
                    if (Array.isArray(category)) {
                        const hasBrand = category.find(x => x._id === input.value._id);
                        if (hasBrand) {
                            data = category;
                        }
                    }
                });
            }

            if (data.length > 0) {
                data = data.map(brand => {
                    if (brand.code !== 'all') {
                        return brand;
                    }
                });

                data = this.filter_array(data);
            }

            return (
                <div onBlur={this.onTouched}>
                    <DropdownList {...input}
                    defaultValue={input.value._id}
                    data={data}
                    valueField="_id"
                    textField="name"
                    onChange={input.onChange} />
                    {this.renderError()}
                </div>
            );
        }

        if (input && this.state.brands && this.props.forAdding) {
            return (
                <div onBlur={this.onTouched}>
                    <DropdownList {...input}
                defaultValue={input.value._id}
                data={this.state.brands}
                valueField="_id"
                textField="name"
                onChange={input.onChange} />
                {this.renderError()}
                </div>
            );
        }

        return null;
    }
}


const mapStateToProps = state => ({
    brands: state.brands.data ? state.brands.data : null,
})
    
const mapDispatchToProps = dispatch => ({
    fetchBrandsWithCategory: (page) => dispatch(fetchBrandsWithCategory(page)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(renderBrandDropdown)


