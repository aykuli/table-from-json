/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import PropTypes, { array } from 'prop-types';

import table1 from '../mock-json-tables/table-1.json';
import table0 from '../mock-json-tables/table-0.json';

import './Table.scss';
import SPAN_WIDTH from '../constantas';

const Tree = props => {
  const { items } = props;

  if (!items || typeof items !== 'object') return null;

  return (
    <>
      {items.map(item => {
        const isChildrenExist = item.Children ? 1 : 0;
        const len = isChildrenExist ? item.Children.length * SPAN_WIDTH : SPAN_WIDTH;
        const display = isChildrenExist && item.Children.length > 1 ? 'block' : 'inline-block';

        return (
          <Fragment key={item.Value}>
            <span className="span-1" style={{ backgroundColor: item.Color, width: `${len}px`, display }}>
              {item.Value}
            </span>
            <Tree items={item.Children} />
          </Fragment>
        );
      })}
    </>
  );
};

Tree.defaultProps = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      Color: 'transparent',
      Value: '0',
      VerticalSpan: 1
    })
  )
};

Tree.propTypes = {
  items: PropTypes.any
};

export default () => {
  const title = table1.Name;
  return (
    <>
      <h1>{title}</h1>
      <Tree items={Array.from(table0.Children)} />
    </>
  );
};
