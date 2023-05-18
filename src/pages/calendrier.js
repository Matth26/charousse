import React, { useState } from 'react';
import { MdPhone, MdEmail, MdWeb } from 'react-icons/md';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { IconContext } from 'react-icons';

import BackgroundImage from 'gatsby-background-image';

var frToEnMonths = {
  Janvier: 'January',
  Février: 'February',
  Mars: 'March',
  Avril: 'April',
  Mai: 'May',
  Juin: 'June',
  Juillet: 'July',
  Août: 'August',
  Septembre: 'September',
  Octobre: 'October',
  Novembre: 'November',
  Décembre: 'December',
};

var mois = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

function replaceDate(date) {
  return (
    date
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
      .replace('2027', '')
  );
}

function displayDate(date) {
  return replaceDate(date);
}

function displayStageDate(debut, fin) {
  var d = replaceDate(debut).split(' ');
  var f = replaceDate(fin).split(' ');

  if (debut === fin) {
    return (
      <span className="stage_date">
        {<span className="stage_week_day">{d[0]}</span>} {d[1]} {d[2]}
      </span>
    );
  }

  return (
    <span className="stage_date">
      Du {<span className="stage_week_day">{d[0]}</span>} {d[1]} {d[2]} au{' '}
      {<span className="stage_week_day">{f[0]}</span>} {f[1]} {f[2]}
    </span>
  );
}

function displayStage(stage) {
  let infos = stage.orga[0];
  console.log(stage);
  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <div key={stage.id}>
        <figure className="card">
          <figcaption className="card__caption">
            <h6 className="card__title">
              {displayStageDate(stage.debut, stage.fin)}
            </h6>
            <div className="card__description">
              <h2 className="stage__intitule">{stage.intitule}</h2>
              {stage.description.split('\n').map((e) => (
                <p className="stage__description">{e}</p>
              ))}

              <div className="stage__contact">
                {infos.nom && (
                  <p>
                    Proposé par <b>{infos.nom}</b>
                  </p>
                )}
                <div className="stage__contact_infos">
                  {(infos.tel !== '') > 0 && (
                    <p>
                      <MdPhone /> {infos.tel}
                    </p>
                  )}
                  {(infos.email !== '') > 0 && (
                    <p>
                      <MdEmail /> {infos.email}
                    </p>
                  )}
                  {(infos.site !== '') > 0 && (
                    <p>
                      <MdWeb />{' '}
                      {
                        <a href={infos.site} target="_blank">
                          {infos.site}
                        </a>
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </IconContext.Provider>
  );
}

function displayMonth(stages, month, year) {
  console.log('displayMonth');

  const stagesYear = stages.filter(({ node: stage }) =>
    stage.debut.includes(year)
  );
  const stagesMonth = stagesYear.filter(({ node: stage }) =>
    stage.debut.includes(frToEnMonths[month])
  );
  console.log(stagesMonth);

  return (
    <div className="month__body">
      {stagesMonth.length > 0 && (
        <div>{stagesMonth.map(({ node: stage }) => displayStage(stage))}</div>
      )}
    </div>
  );
}

/*function displayYear(stages, year) {
  const [month, setMonth] = useState('Janvier');

  console.log('displayYear');
  console.log(stages);
  const stagesYear = stages.filter(({ node: stage }) => stage.debut.includes(year));

  return (
    <div>
      <div>
        {mois.map(mois => (
          <button onClick={mois => setMonth(mois)}>{mois.substring(0, 3) + '.'}</button>
        ))}
      </div>
      {displayMonth(stages, month)}
    </div>
  );
}*/

/*<div className="year__body">
      {stagesYear.length > 0 && (
        <div>
          <h2>{year}</h2>
          {months.map(month => displayMonth(stagesYear, month))}
        </div>
      )}
    </div>*/

function CalendrierPage({ data: { allDatoCmsStage, allDatoCmsBackground } }) {
  var d = new Date();
  let currentMonthIndex = d.getMonth();
  let currentYear = d.getFullYear();

  let monthsCurrentYear = mois.filter((m, i) => i >= currentMonthIndex);
  let monthsNextYear = mois.filter((m, i) => i < currentMonthIndex);

  var temp1 = monthsCurrentYear.map((m) => ({ m: m, y: currentYear }));
  var temp2 = monthsNextYear.map((m) => ({ m: m, y: currentYear + 1 }));
  var monthsAndYears = temp1.concat(temp2);

  const [month, setMonth] = useState(mois[currentMonthIndex]);
  const [year, setYear] = useState(currentYear);

  let stages = allDatoCmsStage.edges;
  console.log(stages[0]);

  return (
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
            <div>
              {monthsAndYears.map((time) => (
                <button
                  className="month__button"
                  onClick={() => {
                    setMonth(time.m);
                    setYear(time.y);
                  }}
                >
                  {time.m.substring(0, 3) + '.'}
                </button>
              ))}
            </div>
            <h2 className="month__date">
              {displayDate(month)} {year}
            </h2>
            {displayMonth(stages, month, year)}
          </div>
        </article>
      </Layout>
    </BackgroundImage>
  );
}

export default CalendrierPage;

export const query = graphql`
  query StageQuery {
    allDatoCmsStage(sort: { fields: [debut], order: ASC }) {
      edges {
        node {
          id
          intitule
          debut(formatString: "dddd D MMMM YYYY")
          fin(formatString: "dddd D MMMM YYYY")
          orga {
            email
            nom
            tel
            site
          }
          description
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
