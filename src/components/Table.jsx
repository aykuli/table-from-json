import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tree from './Tree';

import './Table.scss';

const Table = props => {
  const { tableJSON } = props;
  const title = tableJSON.Name;
  return (
    <>
      <h1>{title}</h1>
      <div className="table">
        <Tree items={Array.from(tableJSON.Children)} level={0} />
      </div>
    </>
  );
};

Table.defaultProps = {
  tableJSON: {}
};

Table.propTypes = {
  tableJSON: PropTypes.shape({
    Name: PropTypes.string,
    Children: PropTypes.arrayOf(PropTypes.any)
  })
};

const mapStateToProps = ({ tableJSON }) => ({ tableJSON });

export default connect(mapStateToProps, null)(Table);
