import React from 'react';


const ReportDetails = ({ report }) => {
  return (
    <div>
      <h2>{report.reportName}</h2>
      <p>Posts Live: {report.postsLive}</p>
      <p>Reach: {report.reach}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ReportDetails;
