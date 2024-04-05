import * as React from 'react';

import Posts from './../../component/Posts';
import { useFetchAllPostsQuery } from '../../api/action-apis/postApi';

export default function Feed() {
  const { data, isLoading } = useFetchAllPostsQuery();
  console.log({ isLoading, data });
  window.scrollTo(0, 0);

  return <Posts allPostsProp={data?.data?.data} />;
}
