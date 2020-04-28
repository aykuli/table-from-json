import React from 'react';
import { connect } from 'react-redux';

import Table from './Table';

const App = () => {
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

const mapStateToProps = ({ history }) => ({ history });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
