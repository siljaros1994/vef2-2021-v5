import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import fetch from 'node-fetch';
import { Link } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
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
  const [redirect, setRedirect] = useState(false);
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
    }, [category]);

    if (status) {
      return (
        <Route component={NotFound} />
      );
    }
    
    if (error) {
      return (<div>Villa kom upp!</div>);
    }

    if (loading) {
      return (<div>Hleð inn gögn...</div>);
    }

  const news = data || [];
  let link;
  if (allNews) {
    link = <Link to='/' className={s.news_link}>Til baka</Link>;
  } else {
    link = <Link to={`/${title}`} className={s.news_link}>Allar fréttir</Link>;
  }

  return (
    <div>
      <h2>Villa kom upp!</h2>
      <p>Gat ekki sótt gögn.</p>
    </div>
  );
}