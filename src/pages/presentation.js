import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

import BackgroundImage from 'gatsby-background-image';

function displayContent(block) {
  if (block.image !== undefined) {
    return (
      <div className="sheet__gallery">
        <Img fluid={block.image.fluid} />
      </div>
    );
  } else {
    return (
      <div
        className="sheet__body"
        dangerouslySetInnerHTML={{
          __html: block.paragrapheNode.childMarkdownRemark.html
        }}
      />
    );
  }
}

const PresentationPage = ({ data: { page, allDatoCmsBackground } }) => {
  const contentArray = page.edges[0].node.pageContent;
  return (
    <BackgroundImage
      Tag="section"
      className="bckgnd"
      fluid={allDatoCmsBackground.edges[0].node.source.fluid}
      backgroundColor={`#040e18`}
    >
      <Layout>
        <article className="sheet">
          <h1 className="sheet__title">Présentation</h1>
          <div className="sheet__inner">{contentArray.map(block => displayContent(block))}</div>
        </article>
      </Layout>
    </BackgroundImage>
  );
};

export default PresentationPage;

export const query = graphql`
  query presentationQuery {
    page: allDatoCmsPage(filter: { pageName: { eq: "Présentation" } }) {
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
