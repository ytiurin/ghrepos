import React, { FunctionComponent } from 'react';

import { RepoItemType } from '../types';
import { Col, FirstCol, Item } from '../styled';

const RepoItem: FunctionComponent<RepoItemType> = ({
  description,
  forkCount,
  name,
  starCount,
  url,
}) => (
  <Item>
    <FirstCol>
      <a
        title={description}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        @{name}
      </a>
    </FirstCol>
    <Col>
      <span role="img" aria-label="star">
        🌟
      </span>{' '}
      {starCount}
    </Col>
    <Col>
      <span role="img" aria-label="fork">
        🍴
      </span>{' '}
      {forkCount}
    </Col>
  </Item>
);

export default RepoItem;
