
import React from 'react'
import TopLayout from './src/components/TopLayout'

export const wrapRootElement = ({ element }) => {
    return (<TopLayout>{element}</TopLayout>);
  };
  
//export const wrapPageElement = wrapRootElement