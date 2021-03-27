import React from "react";
import {Link} from 'react-router-dom'
import s from './NotFound.scss';

export function NotFound() {
  // TODO útfæra 404 síðu
  return (
    <div className={s.notfound}>
      <h1 className={s.notfound_title}>404: error</h1>
      <h2 className={s.notfound_text}>Síða fannst ekki</h2>
      <Link to="/">Til baka á forsíðu</Link>
    </div>
  );
}
