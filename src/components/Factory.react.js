import React from 'react';



import Recipe from './Recipe.react';

export default class Factory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isBasicContraption: false,
      isOpen: false,
    }

  }

  componentDidMount() {
    if(this.props.factoryObject.setupcost) {
      this.setState({isBasicContraption: true});
    }
  }

  _renderRecipes() {
    const recipeList = [];
    const factory = this.props.factoryObject;
    const recipeData = this.props.recipes;

    if(this.state.isBasicContraption) {
      recipeList.push(<Recipe recipeData={factory.setupcost}/>);
      if(factory.recipes) {
        factory.recipes.map((recipe)=>{
          recipeList.push(<Recipe recipeData={recipeData[recipe]}/>);
        })
      }
      return recipeList;
    } else {
      if(factory.recipes) {
        factory.recipes.map((recipe)=>{
          recipeList.push(<Recipe recipeData={recipeData[recipe]}/>);
        })
      }
      return recipeList;
    }
  }

  _handleAccordion(event) {
    if(event.type === 'click') {
      this.setState({isOpen: !this.state.isOpen});
    }
  }

  render() {
    const buttonIcon = isOpen ? 'fa fa-minus' : 'fa fa-plus';
    const factory = this.props.factoryObject;
    const isOpen = this.state.isOpen;
    return (
      <div className="factory-container small-12 large-12 left ">
        <div className="small-12 large-8">
          <div className="small-12 columns">
            <div className="small-1 left"><button className="button button-action button-circle adjust-button" onClick={this._handleAccordion.bind(this)}><i className={buttonIcon}></i></button></div>
            <div className="small-11 left end adjust-factory-title"><h4 className="point" id={factory.name.replace(' ', '_')} ><strong>{factory.name}</strong></h4></div>
          </div>
          {
            isOpen ? <div className="small-12 columns">{ this._renderRecipes() }</div> : null
          }
        </div>
      </div>
    );
  }


}
