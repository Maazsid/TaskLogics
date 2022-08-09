import React, { useEffect, useState } from 'react';
import Header from './Header';

const MainLayout = (props: any) => {
  return (
    <>
      <Header />
      <div>{props.children}</div>
    </>
  );
};

export default MainLayout;
