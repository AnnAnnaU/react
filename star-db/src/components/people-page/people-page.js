import React, { Component } from 'react';


import ItemList from '../item-list/item-list';
import ItemDetails from '../person-details/person-details'
import ErrorIndicator from '../error-indicator/error-indicator';
import Row from '../row/row';

import SwapiService from '../services/swapi-service';

class ErrorBoundry extends Component {
    state = {
        hasError: false
    }
    componentDidCatch() {
        this.setState({ hasError: true })
    }
    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        return (
            this.props.children
        )
    }
}

export default class PeoplePage extends Component {
    swapiService = new SwapiService();
    state = {
        selectedPerson: 3
    }



    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson })
    }
    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`} />

        );
        const itemDetails = (<ErrorBoundry> <ItemDetails personId={this.state.selectedPerson} /> </ErrorBoundry>
        );

        return (

            <Row left={itemList} right={itemDetails} />


        )
    }
}