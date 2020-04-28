/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import Tree from './Tree';

import table1 from '../mock-json-tables/table-1.json';

import './Table.scss';
import { SPAN_WIDTH, SPAN_HEIGHT } from '../constantas';
import { cellsMapping, tableWithIds } from '../utils/table-cells-map';

console.log('cellsMapping: ', cellsMapping(table1));
const tableToDraw = tableWithIds(table1);

export default () => {
  const title = tableToDraw.Name;
  return (
    <>
      <h1>{title}</h1>
      <div className="table">
        <Tree items={Array.from(tableToDraw.Children)} level={0} />
      </div>
    </>
  );
};
