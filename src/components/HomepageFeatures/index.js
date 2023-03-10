import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Box, Text } from "@chakra-ui/react";

const FeatureList = [
  {
    title: "Write tests faster",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Dev Tools adds new features to your framework like{" "}
        <code>findByAi()</code> which let you skip building old school locators
        & selectors.
      </>
    ),
  },
  {
    title: "Add AI to your automation",
    Svg: require("@site/static/img/weight.svg").default,
    description: (
      <>
        Dev Tools wraps your existing tests in <b>2 lines of code</b>. It learns
        from your tests, so when the dom changes, they still find the right
        elements.
      </>
    ),
  },
  {
    title: "Reduce Test Maintenance",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Dev Tools reduces the time you spend maintaining your tests, by using
        visual AI, so you can focus on new features!
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>

      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
