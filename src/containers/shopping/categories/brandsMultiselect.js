import React, { Component } from 'react';
import { connect } from 'react-redux';
import MultiSelect from '../../../components/FormInputs/MultiSelect';
import { fetchAllBrands } from '../../../actions/shopping/brands';

class renderBrandsMultiSelect extends Component {
    state = {
        shops: this.props.shops,
        input: this.props.input
    };

    componentWillMount() {
        if (this.props.fetchAllBrands) {
            this.props.fetchAllBrands();
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            brands: nextProps.brands,
            input: nextProps.input,
        });
    }

    removeDuplicates( arr, prop ) {
        let obj = {};
        for ( let i = 0, len = arr.length; i < len; i++ ){
            if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
        }
        let newArr = [];
        for ( let key in obj ) newArr.push(obj[key]);
        return newArr;
    }

    arrangeByName(a,b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    renderError = () => {
        const meta = this.props.meta;
        const input = this.state.input;

        if (meta.error) {
            return (
                <label className="error" htmlFor={input.name}>{meta.error}</label>
            );
        }

        return null;
    }
    
    render () {
        const input = this.state.input;
        
        if (input && this.state.brands) {
            const value = input.value && Array.isArray(input.value) ? input.value : [];
            let data = [];
            if (this.state.brands) {
                const brands = this.state.brands;
                data = brands.map(brand => {
                    brand._id = brand.id;
                    return brand;
                });
            }
            return (
                <div>
                    <MultiSelect {...input}
                    defaultValue={value}
                    data={data}
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
    fetchAllBrands: () => dispatch(fetchAllBrands()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(renderBrandsMultiSelect)


