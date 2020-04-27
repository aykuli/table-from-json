/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import table1 from '../mock-json-tables/table-wrong-0.json';
import table1 from '../mock-json-tables/table-1.json';
// import table0 from '../mock-json-tables/table-0.json';
import tableLevelsMapping from '../utils/table-levels-map-1';

import './Table.scss';
import SPAN_WIDTH from '../constantas';

const tableLevelsMap = tableLevelsMapping(table1);
console.log(tableLevelsMap);

const Tree = props => {
  const { items, level } = props;

  if (!items || typeof items !== 'object') return null;

  return (
    <>
      {items.map((item, index) => {
        const { Color, Value, Children } = item;
        const isChildrenExist = Children.length ? 1 : 0;

        const nextColor = Children.length ? Children[0].Color : null;

        const height =
          nextColor && tableLevelsMap.get(nextColor) !== tableLevelsMap.get(Color) + 1
            ? `${SPAN_WIDTH * 2}px`
            : `${SPAN_WIDTH}px`;

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
