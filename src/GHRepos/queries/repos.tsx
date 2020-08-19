import { gql } from '@apollo/client';

import { RepositoryType } from '../types';

export const QUERY_GH_REPOS = gql`
  query($search: String!, $size: Int, $cursor: String) {
    search(query: $search, type: REPOSITORY, first: $size, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            url
            nameWithOwner
            description
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const emptyRepo: RepositoryType = {
  description: '',
  forks: { totalCount: 0 },
  nameWithOwner: '',
  stargazers: { totalCount: 0 },
  url: '',
};

const edgeToRepo = ({
  node: {
    description,
    forks: { totalCount: forkCount },
    nameWithOwner: name,
    stargazers: { totalCount: starCount },
    url,
  } = emptyRepo,
}) => ({ description, forkCount, name, starCount, url });

export const useQueryGHReposData = ({
  search: {
    edges = [],
    pageInfo: { endCursor = '', hasNextPage = false } = {},
  } = {},
} = {}) => ({
  cursor: endCursor,
  hasNext: hasNextPage,
  isEmpty: edges.length === 0,
  items: edges.map(edgeToRepo) || [],
});
