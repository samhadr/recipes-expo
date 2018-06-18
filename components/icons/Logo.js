import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Svg } from 'expo';
const { Path } = Svg;

import globalStyles from '../../styles/GlobalStyles';

class Logo extends Component {
  static propTypes = {
    fill: PropTypes.string
  }

  render() {
    const { fill } = this.props;
    console.log('fill: ', fill);

    return (
      <Svg viewBox="0 0 32 32" style={globalStyles.svg}>
        <Path
          d="M7,0C3.7,0,1,3.1,1,7c0,3.3,2,6.1,4.6,6.8L4.6,30c-0.1,1.1,0.8,2,1.9,2h1c1.1,0,1.9-0.9,1.9-2l-1-16.2C11,13.1,13,10.3,13,7
          C13,3.1,10.3,0,7,0L7,0z M27.2,0l-1.7,10h-1.2L23.4,0h-0.8l-0.8,10h-1.2L18.8,0H18v13c0,0.6,0.4,1,1,1h2.6l-1,16
          c-0.1,1.1,0.8,2,1.9,2h1c1.1,0,1.9-0.9,1.9-2l-1-16H27c0.6,0,1-0.4,1-1V0H27.2L27.2,0z"
          fill={fill}
        />
      </Svg>
    )
  }
}

export default Logo;