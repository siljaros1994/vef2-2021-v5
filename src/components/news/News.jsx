import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import fetch from 'node-fetch';
import { Link } from 'react-router-dom';
import s from './News.scss';

News.propTypes = {
  category: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  expandable: PropTypes.bool,
};

export function News({ category, quantity, expandable }) {
  // TODO sækja fréttir fyrir flokk
  const routes = {
    "Allar fréttir": "allar",
    Innlent: "innlent",
    "Erlendar fréttir": "erlent",
    Íþróttir: "íþróttir",
    Menning: "menning",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [ ,setRedirect] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      try {
        const result = await fetch(`${apiUrl}${category}`);
        if (!result.ok) {
          if (result.status === 404) {
            setError('404');
            setRedirect(true);
            return;
          }
          throw new Error('Ekki tókst að sækja gögn');
        }
        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn.');
        return;
      } finally {
        setLoading(false);
      }
      setData(json);
    }
    fetchData();
    }, [apiUrl, category]);
    
    if (error) {
      return (<div>Villa kom upp!</div>);
    }

    if (loading) {
      return (<div>Hleð inn gögn...</div>);
    }

    if (data) {
      const nextPath = expandable ? `/${routes[data.title]}` : "/";
      let headline = data.items;
      if (quantity) {
        headline = headline.slice(0, quantity);
      }
  
      return (
        <div className={s.news}>
          <h2>{data.title}</h2>
          <ul className={s.news_list}>
            {headline.map((item) => {
              return (
                <li className={s.news_item}><a className={s.news_link} href={item.link}>{item.title}</a></li>
              );
            })}
          </ul>
            <Link
              className={s.news__routeref} to={{
                pathname: nextPath,
              }}
            >
              {expandable ? "Allar fréttir" : "Til baka"}
            </Link>
        </div>
      );
    }

  return (
    <div>
      <h2>Villa kom upp!</h2>
      <p>Gat ekki sótt gögn.</p>
    </div>
  );
}