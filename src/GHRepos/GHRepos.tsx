import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { INITIAL_SEARCH, INITIAL_STARS, PAGE_SIZE } from './config';
import { QUERY_GH_REPOS, useQueryGHReposData } from './queries';
import { BottomBar, Item, SearchBar } from './styled';

import RepoList from './components/RepoList';
import RepoSearch from './components/RepoSearch';

export const GHRepos = () => {
  const [search, setSearch] = useState(INITIAL_SEARCH);
  const [stars, setStars] = useState(INITIAL_STARS);

  const { loading, error, data, fetchMore } = useQuery(QUERY_GH_REPOS, {
    variables: { search: `${search} stars:>${stars}`, size: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  });

  const { cursor, isEmpty, hasNext, items } = useQueryGHReposData(data);

  return (
    <>
      <SearchBar>
        Search: <RepoSearch defaultValue={search} onChange={setSearch} /> with{' '}
        <RepoSearch
          defaultValue={stars}
          onChange={setStars}
          inputType="number"
        />{' '}
        stars
      </SearchBar>
      {error ? (
        <p>Query error :(</p>
      ) : (
        <>
          {isEmpty && !loading ? (
            <Item>No results</Item>
          ) : (
            <RepoList items={items} />
          )}
          <BottomBar>
            {loading
              ? 'Loading repos...'
              : hasNext && (
                  <button
                    onClick={() =>
                      fetchMore({
                        variables: {
                          cursor,
                        },
                      })
                    }
                  >
                    More
                  </button>
                )}
          </BottomBar>
        </>
      )}
    </>
  );
};
