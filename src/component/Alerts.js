import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

function Alert({children,color}) {
  return (
    <UncontrolledAlert color={color ? color : "info"}>
      {children}
    </UncontrolledAlert>
  );
}

export default Alert;