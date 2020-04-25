import React from 'react';
import table1 from '../mock-json-tables/table-1.json';
import table0 from '../mock-json-tables/table-0.json';

import './Table.scss';

interface Table0Props {
  backgroundColor: string;
  value: string;
}

interface Table0JSONProps {
  Name: string;
  value: string;
}

const Table0 = (props: Table0Props) => {
  const { backgroundColor, value } = props;
  return (
    <div style={{ backgroundColor }} className="span-1">
      {value}
    </div>
  );
};

export default () => {
  const title = table1.Name;

  const Parsing = () => {
    return <div>111</div>;
  };

  return (
    <>
      <h1>{title}</h1>
      <Parsing />
      <Table0 backgroundColor={table0.Children[0].Color} value={table0.Children[0].Value} />
    </>
  );
};
