import React from 'react';

import styles from './styles/foldItem.module.css';

type TProps = {
  activeBlock: string,
  block: any,
  onSectionClick: Function,
}

const FoldItem = ({
  activeBlock,
  block,
  onSectionClick,
}: TProps) => {
  if (activeBlock === block.title) {
    return (
      <div
        className={styles.block}
        key={block.title}
        onClick={() => onSectionClick(block)}
        role="button"
      >
        <h2>
          {block.title}
          {' '}
          <span>
            &#x25BC;
          </span>
        </h2>
        <div className={styles.content}>
          {block.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: block.content.childMarkdownRemark.html,
              }}
            />
          )
          }
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.block}
      key={block.title}
      onClick={() => onSectionClick(block)}
      role="button"
    >
      <h2>
        {block.title}
        {' '}
        <span>
          &#x25BA;
        </span>
      </h2>
    </div>
  );
};

export default FoldItem;
