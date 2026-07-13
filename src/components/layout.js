import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import '../styles/index.sass';

class Layout extends React.Component {
  state = { isOpen: false };

  toggleSidebar = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { data, seo, title, useHomeSeo } = this.props;
    const seoMetaTags =
      seo || (useHomeSeo ? data.datoCmsHome.seoMetaTags : null);
    const pageTitle = title || (useHomeSeo ? 'Charousse' : null);

    return (
      <div className={this.state.isOpen ? 'container is-open' : 'container'}>
        <HelmetDatoCms
          favicon={data.datoCmsSite.faviconMetaTags}
          seo={seoMetaTags || undefined}
        >
          {pageTitle ? <title>{pageTitle}</title> : null}
        </HelmetDatoCms>
        <div className="container__sidebar">
          <div className="sidebar" id="site-sidebar">
            <h6 className="sidebar__title">
              <Link to="/">
                {data.datoCmsSite.globalSeo.siteName}
              </Link>
            </h6>
            <ul className="sidebar__menu">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/presentation">Présentation</Link>
              </li>
              <li>
                <Link to="/calendrier">Calendrier</Link>
              </li>
              <li>
                <Link to="/tarifs">Tarifs</Link>
              </li>
              <li>
                <Link to="/adhesion">Adhésion</Link>
              </li>
              <li>
                <Link to="/vallee">Vallée de Sye et Gervanne</Link>
              </li>
              <li>
                <Link to="/rubrique">Rubrique Saisonnière</Link>
              </li>
              <li>
                <Link to="/plan">Plan d'accès</Link>
              </li>
              <li>
                <Link to="/liens">Liens</Link>
              </li>
            </ul>
            <p className="sidebar__social">
              {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                <a
                  key={profile.profileType}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.profileType}
                  className={`social social--${profile.profileType.toLowerCase()}`}
                >
                  <span className="sr-only">{profile.profileType}</span>
                </a>
              ))}
            </p>
            <div className="sidebar__copyright">
              {data.datoCmsHome.copyright}
            </div>
          </div>
        </div>
        <div className="container__body">
          <div className="container__mobile-header">
            <div className="mobile-header">
              <button
                type="button"
                className="mobile-header__menu"
                onClick={this.toggleSidebar}
                aria-label="Ouvrir le menu"
                aria-expanded={this.state.isOpen}
                aria-controls="site-sidebar"
              >
                <div></div>
              </button>
            </div>
          </div>
          <div className="charousse_header">CHAROUSSE</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.defaultProps = {
  seo: null,
  title: null,
  useHomeSeo: true,
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query Layout2Query {
        datoCmsSite {
          globalSeo {
            siteName
          }
          faviconMetaTags {
            ...GatsbyDatoCmsFaviconMetaTags
          }
        }
        datoCmsHome {
          seoMetaTags {
            ...GatsbyDatoCmsSeoMetaTags
          }
          introTextNode {
            childMarkdownRemark {
              html
            }
          }
          copyright
        }
        allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
          edges {
            node {
              profileType
              url
            }
          }
        }
      }
    `}
    render={(data) => <Layout data={data} {...props} />}
  />
);
