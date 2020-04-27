/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import './Excell.scss';

import { SETTINGS } from '../constantas';
import longTable from '../utils/generate-long-table';

const setInitialState = settings => {
  const { itemHeight, amount, tolerance, minIndex, maxIndex, startIndex } = settings;
  const viewportHeight = amount * itemHeight;
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const bufferHeight = viewportHeight + 2 * toleranceHeight;
  const bufferedItems = amount + 2 * tolerance;
  const itemsAbove = startIndex - tolerance - minIndex;
  const topPaddingHeight = itemsAbove * itemHeight + 60;
  const bottomPaddingHeight = totalHeight - topPaddingHeight;
  const initialPosition = topPaddingHeight + toleranceHeight;
  return {
    settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition
  };
};

const VirtualTable = props => {
  const [state, setState] = useState(setInitialState(SETTINGS));

  const [scrollVert, setScrollVert] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const viewportElement = createRef();
  const { itemHeight, minIndex, tolerance } = SETTINGS;

  const runScroller = ({ target }) => {
    const { toleranceHeight, bufferedItems } = state;
    const { scrollTop, scrollLeft } = target;
    setScrollLeftState(scrollLeft);

    if (scrollVert !== viewportElement.current.scrollTop) {
      const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
      const data = longTable;
      const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0) + 60;
      const totalHeight = data.length * itemHeight;
      const bottomPaddingHeight = Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0);
    }

    setScrollVert(viewportElement.current.scrollTop);
  };

  useEffect(() => {
    if (!state.initialPosition) {
      runScroller({ target: { scrollTop: 0 } });
    }
  }, []);

  const { topPaddingHeight, bottomPaddingHeight } = state;

  return (
    <div ref={viewportElement} onScroll={runScroller}>
      <div style={{ height: topPaddingHeight, border: '1px solid red' }} />
      {longTable.map((item, index) => (
        <input type="text" className="cell" key={`${item}-${index}`} />
      ))}
      <div style={{ height: bottomPaddingHeight, border: '1px solid green' }} />
    </div>
  );
};

export default VirtualTable;
