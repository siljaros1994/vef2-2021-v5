import React, { useEffect, useState } from 'react';
import { News } from "../news/News";
import fetch from 'node-fetch';
import s from "./NewsList.scss";

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  // TODO sækja yfirlit fréttaflokka
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
        try {
          const result = await fetch(apiUrl);
        
          if(!result.ok) {
            throw new Error('Ekki tókst að sækja gögn');
          }
    
          json = await result.json();
        } catch (e) {
          setError('Gat ekki sótt gögn');
        } finally {
          setLoading(false);
        }

        setData(json); 
      }
      fetchData();
  }, []);

  if (error) {
    return (<div>Villa kom upp! {error}</div>);
  }

  if (loading) {
    return (<div>Hleð inn gögn...</div>);
  }

  const newslist = Array.from(data);
  console.log(newslist);

  return (
    <div className={s.newslist_news1}>
      {newslist.map((item) => {
        return (
          <div className={s.newslist_news2}>
            <News category={item.id} quantity={5} expandable={true} />
          </div>
        )
      })}
    </div>
  );
}
