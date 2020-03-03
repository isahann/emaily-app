import React from 'react';

// SurveyField contains logic to render a single label and text input

// Input property comes from props
export default ({ input, label, meta: { error, touched } }) => {
  // console.log(meta);
  // console.log(meta.touched);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>

      {/*
      ...or
      {touched ? error : ''}
      */}
    </div>
  );
};
