import Card from "../Card/Card";
import Layout from "../Layout/Layout";
import styles from "./Spinner.module.scss";

const Spinner = () => <div className={styles.spinner} />;

export const SpinnerLayout = () => (
  <Layout>
    <SpinnerCard />
  </Layout>
);

export const SpinnerCard = () => (
  <Card>
    <Spinner />
  </Card>
);

export default Spinner;
