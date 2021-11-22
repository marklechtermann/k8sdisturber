import React from "react";

export default function ApiResult({ link, statusCode, result }) {
  return (
    <>
      <code>
        {window.location.protocol}
        {"//"}
        {window.location.host}
        {link}
        {statusCode && (
          <span style={{ color: "yellow" }}>&nbsp;HTTPStatus:{statusCode}</span>
        )}
        {result && <span style={{ color: "red" }}>&nbsp;{result}</span>}
      </code>
    </>
  );
}
