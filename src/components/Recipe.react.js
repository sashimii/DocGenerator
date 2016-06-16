import React from 'react';

import {Link} from 'react-router';

export default class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  _handleAccordion(event) {
    if(event.type === 'click') {
      this.setState({isOpen: !this.state.isOpen});
    }
  }

  _mapRecipeDataToList(data) {
    let unorderedList = [];
    if(typeof data === 'object') {
      Object.keys(data).forEach((field)=>{
        const dataItem = data;
        let dataField = field.replace('_', ' ')
        dataField = dataField.charAt(0).toUpperCase() + dataField.slice(1);
        const textToWrite = typeof dataItem[field] !== 'object' ?  dataField + ': ' + dataItem[field].toString() : dataField;
        if(typeof dataItem === 'object') {
          unorderedList.push(
            <li>
              <span>{textToWrite}</span>
              {this._mapRecipeDataToList(dataItem[field])}
            </li>
          );
        } else {

          unorderedList.push(<li><span>{textToWrite}</span> <span>{dataItem[field]} </span></li>)
        }
      });
      return <ul>{unorderedList}</ul>;
    }
    return null;
  }

  _renderRecipeInformation() {
    const recipeData = this.props.recipeData;
    let recipeInfo = this._mapRecipeDataToList(recipeData);

    return recipeInfo;
  }

  render() {
    const isOpen = this.state.isOpen;
    return (
      <div className="recipe-container small-12 left">
        <div>
          <div className="small-1 left"><button className="button button-action button-circle button-small adjust-recipe-button" onClick={this._handleAccordion.bind(this)}><i className="fa fa-plus"></i></button></div>
          <div className="small-10 left end adjust-recipe-title"> <h5 onClick={this._handleAccordion.bind(this)}>{this.props.recipeData.name || 'Setup Cost'}</h5></div>
        </div>
        <div className="small-12 columns">
        {
          isOpen ? <ul>{ this._renderRecipeInformation() }</ul> : null
        }
        </div>
      </div>
    );
  }


}
