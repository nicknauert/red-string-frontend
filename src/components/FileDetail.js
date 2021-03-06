import React from "react";
import { Link } from "react-router-dom";
import "../styles/CaseView.css";

const FileDetail = props => {
  const file = props.file;
  return (
    <div className="FileDetail">
      <div className="focus-heading-cont">
        <h2 className="focus-heading">{file.file_name}</h2>
        <Link to="/graph">
          <span className="oi graphIcon" data-glyph="pie-chart"></span>
        </Link>
      </div>
      <div className="focus-subheading">
        <p>{file.date_created}</p>
        <p>{file.file_description}</p>
      </div>
      {file.file_text ? <div>{file.file_text}</div> : null}
    </div>
  );
};

export default FileDetail;

// case_id
// date_created
// date_modified
// file_d3
// file_description
// file_id
// file_name
// file_text
