import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

const MarkdownText = ({ children, ...rest }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkBreaks]} {...rest}>
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownText;
