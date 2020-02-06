import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

import BackgroundImage from 'gatsby-background-image';

import SlideShow from '../components/SlideShow';

function displayContent(block, i) {
  if (block.image !== undefined) {
    return (
      <div key={i} className="sheet__gallery">
        <Img key={i} fluid={block.image.fluid} />
      </div>
    );
  } else if (block.images) { // SlideShow
    console.log(block)
    return (
      <div key={i} className="sheet__gallery">
        <SlideShow key={i} images={block.images} />
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

const ValleePage = ({ data: { page, allDatoCmsBackground } }) => {
  const contentArray = page.edges[0].node.pageContent;
  console.log(page)
  return (
    <BackgroundImage
      Tag="section"
      className="bckgnd"
      fluid={allDatoCmsBackground.edges[0].node.source.fluid}
      backgroundColor={`#040e18`}
    >
      <Layout>
        <article className="sheet">
          <h1 className="sheet__title">Vallée de Sye et Gervanne</h1>
          <div className="sheet__inner">{contentArray.map((block, i) => displayContent(block, i))}</div>
        </article>
      </Layout>
    </BackgroundImage>
  );
};

export default ValleePage;

export const query = graphql`
  query valleeQuery {
    page: allDatoCmsPage(filter: { pageName: { eq: "Vallée de Sye et Gervanne" } }) {
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
            ... on DatoCmsSlideshow {
              id
              images {
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
