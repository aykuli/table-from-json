import React from 'react';

import Table from './Table';

export default () => {
  return (
    <>
      <button type="button" onClick={() => console.log('undo')}>
        Undo
      </button>
      <button type="button" onClick={() => console.log('redo')}>
        Redo
      </button>
      <Table />
    </>
  );
};
