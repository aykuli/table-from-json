import React from 'react';

import Tree from './Tree';

import table1 from '../mock-json-tables/table-1.json';

import './Table.scss';
import { tableWithIds } from '../utils/table-cells-map';

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
