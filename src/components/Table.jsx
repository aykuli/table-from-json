/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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
        const childClass = isChildrenExist ? 'span__parent' : 'span__child';

        console.log('\nValue: ', item.Value);
        console.log('color: ', item.Color);
        console.log('children: ', item.Children);
        console.log('isChildrenExist: ', isChildrenExist);
        return isChildrenExist ? (
          <div className="span__parent" key={item.Value}>
            <div className="span__child" style={{ backgroundColor: item.Color, border: '1px solid black' }}>
              {item.Value}
            </div>
            <div className="span__child">
              <Tree items={item.Children} />
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: item.Color, width: SPAN_WIDTH, border: '1px solid black' }}>{item.Value}</div>
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
      <div className="table">
        <Tree items={Array.from(table1.Children)} />
      </div>
    </>
  );
};
