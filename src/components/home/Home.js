import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {

  return (
    <section>
      <div>Home</div>
      <NavLink to="/contact">Contact</NavLink>
    </section>
  );
}

export default Home;
