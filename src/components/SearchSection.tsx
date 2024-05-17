import React from 'react';
import styles from './SearchSection.module.css';

type SearchSeactionPart = {
  title: string;
  content: React.ReactNode;
};

export default function SearchSection({sectionTitle, searchSectionParts, startExpanded}: {sectionTitle: string, searchSectionParts: SearchSeactionPart[], startExpanded?: boolean}) {
  const [isExpanded, setIsExpanded] = React.useState(startExpanded || false);

  const SearchSectionParts = searchSectionParts.map((part, index) => {
    return (
      <div key={index} className={styles.searchSectionPart}>
        <span className={styles.searchSectionPartTitle}>{part.title}</span>
        <div className={styles.content}>
          {part.content}
        </div>
      </div>
    );
  });

  return (
    <section className={`${styles.searchSection} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.titleContainer} onClick={()=>setIsExpanded(!isExpanded)}>
        <span>{sectionTitle}</span>
        <span className={styles.toggleIcon}></span>
      </div>
      {isExpanded &&
        <div>
          {SearchSectionParts}
        </div>
      }
    </section>
  );
}