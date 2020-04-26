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
        const isChildrenExist = item.Children.length ? 1 : 0;
        const len = isChildrenExist ? item.Children.length * SPAN_WIDTH : SPAN_WIDTH;
        const display = isChildrenExist && item.Children.length > 1 ? 'block' : 'inline-block';
        const childClass = isChildrenExist ? 'span__parent span__child' : 'span__child';

        return (
          <div className={childClass} key={item.Value}>
            <div className="span__child">{item.Value}</div>
            <div className={childClass} style={{ backgroundColor: item.Color, width: `${len}px` }}>
              <Tree items={item.Children} />
            </div>
          </div>
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
      <div style={{ display: 'inline-flex', border: '1px solid #000', flexGrow: 0 }}>
        <Tree items={Array.from(table1.Children)} />
      </div>
    </>
  );
};
