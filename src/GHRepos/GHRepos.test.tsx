import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { GHRepos } from './GHRepos';
import { QUERY_GH_REPOS } from './queries';
import { INITIAL_SEARCH, INITIAL_STARS, PAGE_SIZE } from './config';

const mockRequest = {
  query: QUERY_GH_REPOS,
  variables: {
    search: `${INITIAL_SEARCH} stars:>${INITIAL_STARS}`,
    size: PAGE_SIZE,
  },
};

const mockResult = {
  data: {
    search: {
      edges: [
        {
          node: {
            description: '',
            forks: { totalCount: 0 },
            nameWithOwner: 'OWNER/NAME',
            stargazers: { totalCount: 0 },
            url: '',
          },
        },
      ],
      pageInfo: {
        endCursor: '',
        hasNextPage: false,
      },
    },
  },
};

it('should render repos', async () => {
  const { getByText } = render(
    <MockedProvider
      mocks={[
        {
          request: mockRequest,
          result: mockResult,
        },
      ]}
      addTypename={false}
    >
      <GHRepos />
    </MockedProvider>
  );

  await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

  const linkElement = getByText(/OWNER\/NAME/i);
  expect(linkElement).toBeInTheDocument();
});
