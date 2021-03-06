import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

function LangNav({ selected, updateLang}) {
  const languages = ['all', 'js', 'ruby', 'java', 'css', 'python', 'rust', 'haskell', 'elm'];
  
  return (
    <ul className="flex-center" >
        {
          languages.map((l) => (
            <li key={l}>
                {/*
                    we pass an anonymous function here instead of just `this.updateLang(l)
                    because, otherwise, the expression immediately gets rendered upon eval
                  */}
                <button className="btn-clear nav-link"
                        style={ l === selected ? { color: 'rgb(187, 46, 31)' } : null }
                        onClick={ () => updateLang(l) }>
                    { l }
                </button>
            </li>
          ))
        }
    </ul>
  );
}

LangNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateLang: PropTypes.func.isRequired
};

function ReposGrid ({ repos }) {
  return (
    <ul className="grid space-around">
        {repos.map((repo, index) => {
          const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
          const { login, avatar_url } = owner;
          return (
            <li key={ html_url }>
                <Card header={`#${index + 1}`}
                      avatar={ avatar_url }
                      href={ html_url }
                      name={ login }
                >
                    <ul className="card-list">
                        <li>
                            <Tooltip text="github username">
                                <FaUser color="rgb(255, 191, 116)" size={ 22 } />
                                <a href={ `http://github.com${login}` }>
                                    {login}
                                </a>
                            </Tooltip>
                        </li>
                        <li>
                            <FaStar color="rgb(255, 215, 0)" size={ 22 } />
                            { stargazers_count.toLocaleString() } stars
                        </li>
                        <li>
                            <FaCodeBranch color="rgb(129, 195, 245)" size={ 22 } />
                            { forks.toLocaleString() } forks
                        </li>
                        <li>
                            <FaExclamationTriangle color="rgb(241, 138, 147)" size={ 22 } />
                            { open_issues.toLocaleString() } open issues
                        </li>
                    </ul>
                </Card>
            </li>
          );
        })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'all',
      repos: {},
      error: null,
    };
    this.updateLang = this.updateLang.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }
  componentDidMount() {
    this.updateLang(this.state.selected);
  }
  updateLang(selected) {
    this.setState({
      selected,
      error: null,
    });

    // if the selected lang doesn't already have an entry, add it to cache
    if (!this.state.repos[selected]) {
      fetchPopularRepos(selected)
        .then((data) => {
          this.setState(({ repos }) =>({
            repos: {
              ...repos,
              [selected]: data
            }
          }));
        })
        .catch(() => {
          console.warn('Error fetching repos: ', error);
          this.setState({
            error: `There was an error fetching the repos`
          });
        });  
    }
  }
  isLoading () {
    const { selected, repos, error } = this.state;

    return !repos[selected] && error === null;
  }
  render() {
    const { selected, repos, error } = this.state;
    return (
      <React.Fragment>
          <LangNav selected={ selected }
                   updateLang={ this.updateLang }>
          </LangNav>

          { this.isLoading() && <Loading text="fetching repos"/> }
          { error  && <p className="error center-text">{ error }</p> }
          { repos[selected]  && <ReposGrid repos={ repos[selected] } />}

      </React.Fragment>
    );
  }
}

