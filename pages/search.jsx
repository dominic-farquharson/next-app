import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import Router from 'next/router';
import Head from '../components/Head';

const renderResults = ({ name, height, gender }, isPresent) => {
  if (!isPresent) return 'nothing to see here';
  return (
    <section>
      <p>Name: {name}</p>
      <p>Age: {height}</p>
      <p>Gender: {gender}</p>
    </section>
  );
};

renderResults.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
};

const Search = ({ data, isPresent }) => (
  <div>
    <Head title={data.name ? data.name : 'Search'} />
    <h1>Search page</h1>
    <button
      onClick={() => {
        const rand = Math.floor(Math.random() * 50);
        Router.push(`/search?id=${rand}`);
      }}
    >
      View Random Person
    </button>

    <div>{renderResults(data, isPresent)}</div>
  </div>
);

// asynchronously fetch data
Search.getInitialProps = async ({ query }) => {
  const { id } = query;

  if (id) {
    const url = `https://swapi.co/api/people/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.status !== 200) return;
    return {
      data,
      isPresent: true,
    };
  }
};

Search.defaultProps = {
  isPresent: false,
  data: {},
};

Search.propTypes = {
  data: PropTypes.object,
  isPresent: PropTypes.bool.isRequired,
};

export default Search;
