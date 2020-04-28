/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import table1 from '../mock-json-tables/table-1.json';

import './Table.scss';
import { SPAN_WIDTH, SPAN_HEIGHT } from '../constantas';

const Tree = props => {
  const { items, level } = props;

  const [table, setTable] = useState(items);
  const [history, setHistory] = useState([]);
  const [stepNumb, setStepNumb] = useState(0);
  if (!items || typeof items !== 'object') return null;

  const handleChange = (e, numberOfCellToChange) => {
    const newTable = table.map(item => {
      if (item.numberOfCell === numberOfCellToChange) {
        return { ...item, Value: e.target.value };
      }
      return item;
    });
    setTable(newTable);
  };

  return (
    <>
      {table.map(item => {
        const { VerticalSpan, Color, Value, Children, numberOfCell } = item;
        const isChildrenExist = Children.length ? 1 : 0;

        const height = SPAN_HEIGHT * VerticalSpan;
        const width = isChildrenExist ? SPAN_WIDTH * Children.length : SPAN_WIDTH;

        return isChildrenExist ? (
          <div className="span__parent" key={Value}>
            <input
              className="span__child"
              style={{ backgroundColor: Color, height, width }}
              onChange={e => handleChange(e, numberOfCell)}
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

export default memo(Tree);
