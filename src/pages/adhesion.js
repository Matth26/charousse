import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import BackgroundImage from 'gatsby-background-image';

const AdhesionPage = ({ data: { allDatoCmsBackground } }) => {
  const redirectUrl =
    'https://www.payasso.fr/association-charousse-terre-davenir/adhesion';
  const backgroundNode = allDatoCmsBackground?.edges?.[0]?.node;

  const content = (
    <article className="sheet">
      <h1 className="sheet__title">Adhésion</h1>
      <div className="sheet__inner">
        <div className="sheet__body">
          <p>
            Depuis 2025, l&apos;association « Charousse Terre d&apos;Avenir » a pris
            le relais pour faire vivre ce lieu et assurer la continuité de cet
            espace de partage et d&apos;accueil précieux.
          </p>
          <p>
            En rejoignant l&apos;association, Charousse devient aussi un peu votre
            maison : un espace où faire germer vos projets et partager vos
            connaissances.
          </p>
          <p>
            En adhérant, vous soutenez les missions que nous nous sommes fixées
            (extrait des status):
          </p>
          <ul className="sheet__list--italic">
            <li>
              Mettre à disposition des chambres d&apos;hôtes et table d&apos;hôtes au
              sein du parc naturel régional du Vercors ;
            </li>
            <li>Accueillir des stages, événements et séminaires ;</li>
            <li>
              Créer, développer et soutenir les activités agricoles,
              artisanales, commerciales et non commerciales, en valorisant les
              ressources locales dans le respect du vivant et de son équilibre ;
            </li>
            <li>
              Créer du lien avec la nature à travers des actions éducatives et
              naturalistes ;
            </li>
            <li>
              Renforcer le dynamisme local en favorisant les transmissions du
              savoir, les initiatives solidaires et les collaborations.
            </li>
          </ul>
          <h2>Choisir votre formule</h2>
          <h3 className="sheet__subhead">L&apos;Adhésion Simple — 10 €</h3>
          <p>
            C&apos;est le geste de ceux qui passent, qui aiment le projet et
            souhaitent simplement dire « je soutiens Charousse ».
          </p>
          <p>
            <em>
              Note : L&apos;adhésion n&apos;est pas obligatoire pour séjourner à
              Charousse.
            </em>
          </p>
          <h3 className="sheet__subhead">L&apos;Adhésion de Soutien — 60 €</h3>
          <p>
            C&apos;est la formule qui donne à l&apos;association les moyens de prendre
            soin du lieu et de faire vivre durablement l&apos;esprit de Charousse.
            Elle constitue la base de notre partenariat avec nos amis fidèles et
            les organisateurs/trices de stages.
          </p>
          <p>
            En remerciement de cet engagement, l&apos;association vous offre chaque année une journée
            + nuitée en formule Yogi. Une invitation à vous poser au calme, en
            dehors des week-ends et des périodes d&apos;activités, pour profiter de
            la maison simplement pour vous-même, quand vous n&apos;êtes plus &quot;au
            travail&quot;.
          </p>
          <h2>Régler votre adhésion</h2>
          <p>
            Par carte bancaire via Payasso. Cliquez sur le bouton ci-dessous
            pour accéder au paiement.
          </p>
          <div>
            <a
              className="sheet__cta"
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Adhérer via Payasso
            </a>
          </div>
        </div>
      </div>
    </article>
  );

  if (!backgroundNode) {
    return <Layout>{content}</Layout>;
  }

  return (
    <BackgroundImage
      Tag="section"
      className="bckgnd"
      fluid={backgroundNode.source.fluid}
      backgroundColor={`#040e18`}
    >
      <Layout>{content}</Layout>
    </BackgroundImage>
  );
};

export default AdhesionPage;

export const query = graphql`
  query adhesionQuery {
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
