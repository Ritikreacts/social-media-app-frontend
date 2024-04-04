import * as React from 'react';

import Posts from './../../component/Posts';
import { useFetchAllPostsQuery } from '../../api/action-apis/postApi';

export default function Feed() {
  const { data, isLoading } = useFetchAllPostsQuery();
  console.log({ isLoading, data });
  if (isLoading) {
    <div className="feed-box">
      <h1>Loading...</h1>
    </div>;
  }

  return <Posts allPostsProp={data?.data?.data} />;
}
