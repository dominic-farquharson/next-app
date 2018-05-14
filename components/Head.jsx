import Head from 'next/head';
import PropTypes from 'prop-types';

const DocumentHead = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

DocumentHead.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DocumentHead;
