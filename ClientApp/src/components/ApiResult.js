import React from "react";

export default function ApiResult(props) {
  return (
    <>
      <code>
        {window.location.protocol}
        {"//"}
        {window.location.host}
        {props.link}
        {props.statusCode && (
          <span style={{ color: "yellow" }}>
            &nbsp;HTTPStatus:{props.statusCode}
          </span>
        )}
        {props.result && (
          <span style={{ color: "red" }}>&nbsp;{props.result}</span>
        )}
      </code>
    </>
  );
}
