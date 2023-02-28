import React from 'react';
import { BsArrowDownLeft } from 'react-icons/bs';
import { BsArrowDownRight } from 'react-icons/bs';

const BinaryComponent = () => {
   return (
      <div className='leaf'>
         <span>0</span>
         <BsArrowDownLeft className='arrowLeft'/>
         <BsArrowDownRight/>
      </div>
   );
};

export default BinaryComponent;