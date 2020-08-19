import React, { FunctionComponent, useCallback } from 'react';
import { debounce } from 'ts-debounce';

type RepoSearchProps = {
  defaultValue?: string;
  inputType?: string;
  onChange?(value: string): void;
};

const RepoSearch: FunctionComponent<RepoSearchProps> = ({
  defaultValue,
  inputType,
  onChange,
}) => {
  const onChangeDebounced = useCallback(
    debounce(value => onChange && onChange(value), 200),
    []
  );

  return (
    <input
      defaultValue={defaultValue}
      onChange={event => {
        onChangeDebounced(event.currentTarget.value);
      }}
      type={inputType}
    />
  );
};

export default RepoSearch;
