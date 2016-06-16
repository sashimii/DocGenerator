import YAML from 'yamljs';

export default class Mapper {

  constructor(civYmlData) {
    this._ymlData = civYmlData;
    this._rawJson = YAML.parse(this._ymlData);
  }

  _mapFactoryNames() {
    const factories = this._rawJson.factories;
    let factoryList = {};
    Object.keys(factories).forEach((factory)=>{
      const factoryName = factories[factory].name;
      console.log(factoryName);

      factoryList.factories[factoryName] = {};
    })
    console.log(factoryList);
    return factoryList;
  }

  _mapFactoryBasicInfo() {

  }

  _mapFactoryRecipes() {

  }

  _mapChildFactories() {

  }

  _mapParentFactories(){

  }

  _mapRawDataToModel() {


  }

  getCleanData() {
    this._mapFactoryNames();
    return this._cleanData;
  }
}
