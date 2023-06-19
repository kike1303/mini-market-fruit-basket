import React from 'react';
import styles from './title.module.css';


type TitleProps = {
    title?: string;
};

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.line} />
    </div>
  );
};

export default Title;
