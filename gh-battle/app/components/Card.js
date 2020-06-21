import React from 'react';
import PropTypes from 'prop-types';

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default class Card extends React.Component ({header, subheader, avatar, href, name }) {
  render() {
    return (
      <div className="card bg-light">
          <h4 className="header-lg center-text">
              { header }
          </h4>
          <img alt={`avatar for ${name}`}
               src={ avatar }
               className="avatar" />
          {subheader && (
            <h4 className="center-text">
                { subheader }
            </h4>
          )}
          <h2 className="center-text">
              <a href={ href } className="link">
                  { name }
              </a>
          </h2>          
      </div>
    );
  }
}