import React from 'react';
import { Skeleton } from 'antd';

interface RegardProps {}

const Regard: React.FC<RegardProps> = (props) => {
  return (
    <>
      <Skeleton active />
    </>
  );
};

export default Regard;
