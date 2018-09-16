import React from 'react';

import {
  Wrapper,
  ErrorCode,
  Content,
  Links,
} from 'styled-components';

import gamesData from '../games-data';

const NotFound = () => (
  <Wrapper>
    <ErrorCode>404</ErrorCode>
    <Content>
      <div>Oops! We can&apos;t find that! Try one of these:</div>
      <Links>
        {gamesData.map(g => <a href={`/${g.route}`}>{g.shortName}</a>)}
      </Links>
    </Content>
  </Wrapper>
);

export default NotFound;
