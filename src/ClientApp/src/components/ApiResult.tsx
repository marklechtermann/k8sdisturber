import React from "react";

type Props = {
  link: string;
  statusCode?: number;
  result?: string;
};

const ApiResult: React.FC<Props> = ({ link, statusCode, result }) => {
  return (
    <>
      <code>
        {window.location.protocol}
        {"//"}
        {window.location.host}
        {link}
        {statusCode && (
          <span style={{ color: "darkorchid" }}>
            &nbsp;HTTPStatus:{statusCode}
          </span>
        )}
        {result && <span style={{ color: "red" }}>&nbsp;{result}</span>}
      </code>
    </>
  );
};

export default ApiResult;
