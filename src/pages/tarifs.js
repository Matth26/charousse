import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

import BackgroundImage from 'gatsby-background-image';

function displayContent(block, i) {
  if (block.image !== undefined) {
    return (
      <div key={i} className="sheet__gallery">
        <Img key={i} fluid={block.image.fluid} />
      </div>
    );
  } else {
    return (
      <div
        key={i}
        className="sheet__body"
        dangerouslySetInnerHTML={{
          __html: block.paragrapheNode.childMarkdownRemark.html
        }}
      />
    );
  }
}

const TarifsPage = ({ data: { tarifsPage, allDatoCmsBackground } }) => {
  const contentArray = tarifsPage.edges[0].node.pageContent;
  return (
    <BackgroundImage
      Tag="section"
      className="bckgnd"
      fluid={allDatoCmsBackground.edges[0].node.source.fluid}
      backgroundColor={`#040e18`}
    >
      <Layout>
        <article className="sheet">
          <h1 className="sheet__title">Tarifs</h1>
          <div className="sheet__inner">{contentArray.map((block, i) => displayContent(block, i))}</div>
        </article>
      </Layout>
    </BackgroundImage>
  );
};

export default TarifsPage;

export const query = graphql`
  query QueryTarifs {
    tarifsPage: allDatoCmsPage(filter: { pageName: { eq: "Tarifs" } }) {
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
