/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import table1 from '../mock-json-tables/table-1.json';
import tableLevelsMapping from '../utils/table-levels-map-1';

import './Table.scss';
import { SPAN_WIDTH, SPAN_HEIGHT } from '../constantas';

const tableLevelsMap = tableLevelsMapping(table1);
console.log(tableLevelsMap);

const Tree = props => {
  const { items, level } = props;

  if (!items || typeof items !== 'object') return null;

  return (
    <>
      {items.map(item => {
        const { VerticalSpan, Color, Value, Children } = item;
        const isChildrenExist = Children.length ? 1 : 0;

        const height = SPAN_WIDTH * VerticalSpan;

        return isChildrenExist ? (
          <div className="span__parent" key={Value}>
            <div className="span__child" style={{ backgroundColor: Color, border: '1px solid black', height }}>
              {Value}
            </div>
            <div className="span__child" style={{ flexGrow: 1 }}>
              <Tree items={Children} level={level + 1} />
            </div>
          </div>
        ) : (
          <div key={Value} style={{ backgroundColor: Color, width: SPAN_WIDTH }} className="span__last">
            {Value}
            {console.log('render last')}
          </div>
        );
      })}
    </>
  );
};

Tree.defaultProps = {
  items: [],
  level: 0
};

Tree.propTypes = {
  items: PropTypes.any,
  level: PropTypes.number
};

export default () => {
  const title = table1.Name;
  return (
    <>
      <h1>{title}</h1>
      <div className="table">
        <Tree items={Array.from(table1.Children)} level={0} />
      </div>
    </>
  );
};
