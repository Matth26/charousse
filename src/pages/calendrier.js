import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

import BackgroundImage from 'gatsby-background-image';

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

var years = ['2019', '2020', '2021', '2022'];

function replaceDate(date) {
  return date
  .replace('January', 'Janvier')
  .replace('February', 'Février')
  .replace('March', 'Mars')
  .replace('April', 'Avril')
  .replace('May', 'Mai')
  .replace('June', 'Juin')
  .replace('July', 'Juillet')
  .replace('August', 'Août')
  .replace('September', 'Septembre')
  .replace('October', 'Octobre')
  .replace('November', 'Novembre')
  .replace('December', 'Décembre')
  //================================
  .replace('Monday', 'Lundi')
  .replace('Tuesday', 'Mardi')
  .replace('Wednesday', 'Mercredi')
  .replace('Thursday', 'Jeudi')
  .replace('Friday', 'Vendredi')
  .replace('Saturday', 'Samedi')
  .replace('Sunday', 'Dimanche')
  //================================
  .replace('2019', '')
  .replace('2020', '')
  .replace('2021', '')
  .replace('2022', '')
  .replace('2023', '')
  .replace('2024', '')
  .replace('2025', '')
  .replace('2026', '')
  .replace('2027', '');
}

function displayDate(date) {
  return replaceDate(date);
}

function displayStageDate(debut, fin) {
  var d = replaceDate(debut).split(' ');
  var f = replaceDate(fin).split(' ');
  return (
    <span className="stage_date">
      Du {<span className="stage_week_day">{d[0]}</span>} {d[1]} {d[2]} au {<span className="stage_week_day">{f[0]}</span>} {f[1]} {f[2]}
    </span>);
}

function displayStage(stage) {
  return (
    <div key={stage.id}>
      <figure className="card">
        <figcaption className="card__caption">
          <h6 className="card__title">
            {displayStageDate(stage.debut, stage.fin)}
          </h6>
          <div className="card__description">
            <p>{stage.intitule}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

function displayMonth(stages, month) {
  const stagesMonth = stages.filter(({ node: stage }) => stage.debut.includes(month));
  return (
    <div className="month__body">
      {stagesMonth.length > 0 && (
        <div>
          <h2>
            {displayDate(month)} ({stagesMonth.length})
          </h2>
          {stagesMonth.map(({ node: stage }) => displayStage(stage))}
        </div>
      )}
    </div>
  );
}

function displayYear(stages, year) {
  const stagesYear = stages.filter(({ node: stage }) => stage.debut.includes(year));

  return (
    <div className="year__body">
      {stagesYear.length > 0 && (
        <div>
          <h2>{year}</h2>
          {months.map(month => displayMonth(stagesYear, month))}
        </div>
      )}
    </div>
  );
}

const CalendrierPage = ({ data: { allDatoCmsStage, allDatoCmsBackground } }) => (
  <BackgroundImage
  Tag="section"
  className="bckgnd"
  fluid={allDatoCmsBackground.edges[0].node.source.fluid}
  backgroundColor={`#040e18`}
  >
    <Layout>
      <article className="sheet">
        <h1 className="sheet__title">Calendrier</h1>
        <div className="sheet__inner">
        {years.map(year => displayYear(allDatoCmsStage.edges, year))}
        </div>
      </article>
    </Layout>
  </BackgroundImage>
);

export default CalendrierPage;

export const query = graphql`
  query StageQuery {
    allDatoCmsStage(sort: { fields: [debut], order: DESC }) {
      edges {
        node {
          id
          intitule
          debut(formatString: "dddd D MMMM YYYY")
          fin(formatString: "dddd D MMMM YYYY")
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
