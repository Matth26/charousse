import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

import BackgroundImage from 'gatsby-background-image';
import sanitizeHtml from '../utils/sanitizeHtml';

function displayContent(block, i) {
  const key = block?.id ?? i;

  if (block.image !== undefined) {
    return (
      <div key={key} className="sheet__gallery">
        <Img fluid={block.image.fluid} />
      </div>
    );
  } else {
    return (
      <div
        key={key}
        className="sheet__body"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(block.paragrapheNode.childMarkdownRemark.html),
        }}
      />
    );
  }
}

const PlanPage = ({ data: { page, allDatoCmsBackground } }) => {
  const pageNode = page?.edges?.[0]?.node;
  const backgroundNode = allDatoCmsBackground?.edges?.[0]?.node;

  if (!pageNode || !backgroundNode) {
    return (
      <Layout>
        <article className="sheet">
          <h1 className="sheet__title">Plan d'accès</h1>
          <div className="sheet__inner">Contenu indisponible.</div>
        </article>
      </Layout>
    );
  }

  const contentArray = pageNode.pageContent ?? [];
  return (
    <BackgroundImage
      Tag="section"
      className="bckgnd"
      fluid={backgroundNode.source.fluid}
      backgroundColor={`#040e18`}
    >
      <Layout>
        <article className="sheet">
          <h1 className="sheet__title">Plan d'accès</h1>
          <div className="sheet__inner">{contentArray.map((block, i) => displayContent(block, i))}</div>
        </article>
      </Layout>
    </BackgroundImage>
  );
};

export default PlanPage;

export const query = graphql`
  query planQuery {
    page: allDatoCmsPage(filter: { pageName: { eq: "Plan d'accès" } }) {
      edges {
        node {
          id
          pageContent {
            ... on DatoCmsTextSection {
              id
              paragrapheNode {
                childMarkdownRemark {
                  html
                }
              }
            }
            ... on DatoCmsImage {
              id
              image {
                fluid(maxWidth: 530, imgixParams: { fm: "jpg", auto: "compress" }) {
                  ...GatsbyDatoCmsSizes
                }
              }
            }
          }
        }
      }
    }
    allDatoCmsBackground {
      edges {
        node {
          id
          title
          source {
            fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
