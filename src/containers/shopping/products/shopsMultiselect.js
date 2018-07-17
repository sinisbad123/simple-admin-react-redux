import React, { Component } from 'react';
import { connect } from 'react-redux';
import MultiSelect from '../../../components/FormInputs/MultiSelect';
import { fetchShops } from '../../../actions/shopping/shops';

class renderShopsMultiSelect extends Component {
    state = {
        shops: this.props.shops,
        input: this.props.input,
    };

    componentWillMount() {
        if (this.props.fetchShops) {
            this.props.fetchShops(1);
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            shops: nextProps.shops,
            input: nextProps.input,
        });
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
        const shops = this.state.shops;
        
        if (input && shops) {
            const value = input.value && Array.isArray(input.value) ? input.value : [];
            return (
                <div onBlur={this.onTouched}>
                    <MultiSelect {...input}
                    defaultValue={value}
                    data={shops}
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
    shops: state.shops.data ? state.shops.data : null,
})
    
const mapDispatchToProps = dispatch => ({
    fetchShops: (page) => dispatch(fetchShops(page)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(renderShopsMultiSelect)


