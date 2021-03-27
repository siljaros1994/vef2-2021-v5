import React from 'react';
import s from './Layout.scss';
// TODO sækja Sass

export function Layout({children}) {
  // TODO setja upp layout fyrir vef
  return (
    <div className={layout}>
      <h1>RÚV fréttir</h1>
      <main className={s.layout_main}>{children}</main>
      <footer>
        <p>Fréttir frá</p><a href="http://www.ruv.is">RÚV</a>
      </footer>
    </div>
  );
}
