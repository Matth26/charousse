import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

import BackgroundImage from 'gatsby-background-image';
import SlideShow from '../components/SlideShow';

function displayContent(block, i) {
  console.log(block);
  if (block.image !== undefined) {
    return (
      <div key={i} className="sheet__gallery">
        <Img key={i} fluid={block.image.fluid} />
      </div>
    );
  } else if (block.paragrapheNode !== undefined) {
    return (
      <div
        key={i}
        className="sheet__body"
        dangerouslySetInnerHTML={{
          __html: block.paragrapheNode.childMarkdownRemark.html,
        }}
      />
    );
  } else if (block.images !== undefined) {
    // SlideShow
    return (
      <div className="sheet__gallery">
        <SlideShow images={block.images} />
      </div>
    );
  }
}

const PresentationPage = ({ data: { page, allDatoCmsBackground } }) => {
  const contentArray = page.edges[0].node.pageContent;
  console.log(contentArray);
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
          <div className="sheet__inner">
            {contentArray.map((block, i) => displayContent(block, i))}
          </div>
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
                fluid(
                  maxWidth: 530
                  imgixParams: { fm: "jpg", auto: "compress" }
                ) {
                  ...GatsbyDatoCmsSizes
                }
              }
            }
            ... on DatoCmsSlideshow {
              id
              images {
                fluid(
                  maxWidth: 530
                  imgixParams: { fm: "jpg", auto: "compress" }
                ) {
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
            fluid(
              maxWidth: 1000
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
