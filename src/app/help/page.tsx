"use client"

import { useState } from 'react';
import JSONFormatter from 'json-formatter-js';

const JsonTextArea = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setJsonInput(input);

    try {
      const json = JSON.parse(input);
      const formatter = new JSONFormatter(json, 2);
      setFormattedJson(formatter.render().innerHTML);
    } catch (error) {
      setFormattedJson('Invalid JSON');
    }
  };

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder="Enter JSON data here"
        rows={10}
        cols={50}
      />
      <div dangerouslySetInnerHTML={{ __html: formattedJson }} />
    </div>
  );
};

export default JsonTextArea;
