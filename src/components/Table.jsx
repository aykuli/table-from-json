/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import table1 from '../mock-json-tables/table-1.json';

import './Table.scss';
import { SPAN_WIDTH, SPAN_HEIGHT } from '../constantas';

const Tree = props => {
  const { items, level } = props;

  const [history, setHistory] = useState([]);
  const [stepNumb, setStepNumb] = useState(0);

  if (!items || typeof items !== 'object') return null;

  const handleChange = (e, color) => {
    console.log(color);
    console.log('clicked: ', e.target);
  };
  const handleFocus = () => {
    console.log('focused');
  };

  return (
    <>
      {items.map(item => {
        const { VerticalSpan, Color, Value, Children } = item;
        const isChildrenExist = Children.length ? 1 : 0;

        const height = SPAN_HEIGHT * VerticalSpan;
        const width = isChildrenExist ? SPAN_WIDTH * Children.length : SPAN_WIDTH;

        return isChildrenExist ? (
          <div className="span__parent" key={Value}>
            <input
              className="span__child"
              style={{ backgroundColor: Color, height, width }}
              onChange={e => handleChange(e, Color)}
              tabIndex={0}
              value={Value}
            />
            <div className="span__child" style={{ flexGrow: 1 }}>
              <Tree items={Children} level={level + 1} />
            </div>
          </div>
        ) : (
          <input
            key={Value}
            style={{ backgroundColor: Color, width: SPAN_WIDTH, minHeight: SPAN_HEIGHT }}
            className="span__last"
            value={Value}
            onChange={handleChange}
          />
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
