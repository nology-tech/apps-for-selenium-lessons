import styles from "./CategoryTag.module.scss";
import React from "react";

const CategoryTag = ({ category }) => {
    return <span className={styles.category}>{category.name}</span>;
};

export default CategoryTag;
