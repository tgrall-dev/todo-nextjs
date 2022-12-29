import React, { ReactNode } from 'react';
import Header from './Header';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <Container maxWidth="lg">
    <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      <Header />
      <div className="layout">{props.children}</div>
      </Box>
  </Container>
);

export default Layout;