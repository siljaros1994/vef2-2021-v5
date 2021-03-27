import React from 'react';
import { useParams } from 'react-router-dom';
import { News } from '../components/news/News';

export function NewsPage() {
  // TODO útfæra fréttasíðu
  let id = useParams();
  this.fetchData(id);
  return (
    <News category={id}/>
  );
}