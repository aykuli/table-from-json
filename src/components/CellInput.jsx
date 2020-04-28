/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import table1 from '../mock-json-tables/table-1.json';

import './Table.scss';
import { SPAN_WIDTH, SPAN_HEIGHT } from '../constantas';

const CellInput = ({ className, backgroundColor, width, height, value, numberOfCell, handleChange }) => (
  <>
    <input
      key={numberOfCell}
      className={className}
      style={{ backgroundColor, height, width, minHeight: SPAN_HEIGHT }}
      onChange={e => handleChange(e, numberOfCell)}
      tabIndex={0}
      value={value}
    />
  </>
);

CellInput.defaultProps = {
  className: '',
  backgroundColor: 'transparent',
  width: SPAN_WIDTH,
  height: `${SPAN_HEIGHT}px`,
  value: '',
  numberOfCell: 0,
  handleChange: () => {}
};

CellInput.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.string,
  value: PropTypes.string,
  numberOfCell: PropTypes.number,
  handleChange: PropTypes.func
};

export default memo(CellInput);
