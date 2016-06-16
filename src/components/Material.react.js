import React from 'react';

import axios from 'axios';

export default class Material extends React.Component {


  constructor(props) {
    super(props);
  }

  _getImageId(materialName) {
    axios.get('data/materials.json')
      .then((res) => {
        console.log(res.data);
      });
  }

  render() {

    return (
      <div>

      </div>
    );

  }


}
