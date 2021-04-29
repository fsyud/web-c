import React from 'react';
import { Skeleton } from 'antd';

interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
  return (
    <>
      <Skeleton active />
    </>
  );
};

export default About;
