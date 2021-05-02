import React from 'react';

// eslint-disable-next-line
const SvgrMock = React.forwardRef<any>((props, ref) => <span ref={ref} {...props} />);

export const ReactComponent = SvgrMock;
export default SvgrMock;
