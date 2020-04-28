/* eslint-disable react/forbid-prop-types */
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

import CellInput from './CellInput';

import './Table.scss';
import { SPAN_WIDTH, SPAN_HEIGHT, SPAN_PADDING } from '../constantas';

const Tree = props => {
  const { items, level } = props;

  const [table, setTable] = useState(items);
  // const [history, setHistory] = useState([]);
  // const [stepNumb, setStepNumb] = useState(0);
  if (!items || typeof items !== 'object') return null;

  const handleChange = (e, numberOfCellToChange) => {
    const newTable = table.map(item => {
      if (item.numberOfCell === numberOfCellToChange) {
        return { ...item, Value: e.target.value };
      }
      return item;
    });
    setTable(newTable);
    // проверка нажата ли кнопка ентер
  };

  const handleBlur = (e, numberOfCell) => {
    console.log('blur: ', numberOfCell);

    console.log(e.target.value);
  };

  return (
    <>
      {table.map(item => {
        console.log('redraw');
        const { VerticalSpan, Color, Value, Children, numberOfCell } = item;
        const isChildrenExist = Children.length ? 1 : 0;

        const height = SPAN_HEIGHT * VerticalSpan;
        const width = isChildrenExist ? SPAN_WIDTH * Children.length : SPAN_WIDTH;

        return isChildrenExist ? (
          <div className="span__parent" key={numberOfCell}>
            <CellInput
              className="span__child"
              backgroundColor={Color}
              height={`${height}px`}
              width={width - SPAN_PADDING * 2}
              value={Value}
              numberOfCell={numberOfCell}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <div className="span__child" style={{ flexGrow: 1 }}>
              <Tree items={Children} level={level + 1} />
            </div>
          </div>
        ) : (
          <CellInput
            key={numberOfCell}
            className="span__last"
            backgroundColor={Color}
            height="100%"
            width={SPAN_WIDTH - SPAN_PADDING * 2}
            value={Value}
            numberOfCell={numberOfCell}
            handleChange={handleChange}
            handleBlur={handleBlur}
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
