import React from 'react';
import { Link } from 'gatsby';
import { StaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import '../styles/index.sass';

class Layout extends React.Component {
  state = { isOpen: false };

  toggleSidebar = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className={this.state.isOpen ? 'container is-open' : 'container'}>
        <HelmetDatoCms
          favicon={this.props.data.datoCmsSite.faviconMetaTags}
          seo={this.props.data.datoCmsHome.seoMetaTags}
        >
          <title>Charousse</title>
        </HelmetDatoCms>
        <div className="container__sidebar">
          <div className="sidebar">
            <h6 className="sidebar__title">
              <Link to="/">{this.props.data.datoCmsSite.globalSeo.siteName}</Link>
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
                <Link to="/presentation">Vallée de Sye et Gervanne</Link>
              </li>
              <li>
                <Link to="/plan">Plan d'accès</Link>
              </li>
              <li>
                <Link to="/liens">Liens</Link>
              </li>
            </ul>
            <p className="sidebar__social">
              {this.props.data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                <a
                  key={profile.profileType}
                  href={profile.url}
                  target="blank"
                  className={`social social--${profile.profileType.toLowerCase()}`}>
                  {' '}
                </a>
              ))}
            </p>
            <div className="sidebar__copyright">{this.props.data.datoCmsHome.copyright}</div>
          </div>
        </div>
        <div className="container__body">
          <div className="container__mobile-header">
            <div className="mobile-header">
              <div className="mobile-header__menu" onClick={this.toggleSidebar}>
                <div></div>
              </div>
            </div>
          </div>
          <div className="charousse_header">CHAROUSSE</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default props => (
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
    render={data => <Layout data={data} {...props} />}
  />
);
