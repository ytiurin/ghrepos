import React, { FunctionComponent } from 'react';

import { RepoItemType } from '../types';
import RepoItem from './RepoItem';

type RepoListProps = {
  items: Array<RepoItemType>;
};

const RepoList: FunctionComponent<RepoListProps> = ({ items }) => (
  <div>
    {items.map(item => (
      <RepoItem {...item} key={item.name} />
    ))}
  </div>
);

export default RepoList;
