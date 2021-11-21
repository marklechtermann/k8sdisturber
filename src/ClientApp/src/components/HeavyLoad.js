import React from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function HeavyLoad() {
  const [delay, setDelay] = useState(100);
  const [log, setLog] = useState([]);
  const [parallelRequests, setParallelRequests] = useState(5);
  const [requestRunning, setRequestRunning] = useState(false);

  const checkParallelRequest = () =>
    parallelRequests >= 1 && parallelRequests <= 10;
  const checkDelay = () => parseInt(delay) >= 0;

  const handleSubmit = async (e) => {
    setLog([]);
    e.preventDefault();
    x();
  };

  const x = async () => {
    setRequestRunning(true);
    let urls = [];
    for (let i = 1; i <= parallelRequests; i++) {
      urls.push(`/api/slow?delay=${delay}&uid=${uuidv4()}`);
    }

    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    const text = responses.map((response) => response.text());
    let data = await Promise.all(text);
    data = data.sort();
    data.forEach((data, i) => {
      setLog((p) => [
        ...p,
        <div style={{ color: "yellow" }} key={uuidv4()}>
          Response {i + 1} received after {data}
        </div>,
      ]);
    });
    setRequestRunning(false);
  };
  return (
    <>
      <h1>Heavy Load</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          Here you can simulate parallel request to the backend. The request is
          processed sequentially by the backend. If you increase the number of
          replicates, then more requests from the client can be executed in
          parallel.
        </div>
        <FormGroup row>
          <Label sm={4}>Number of prallel requests:</Label>
          <Col sm={8} className="mb-3">
            <Input
              autoComplete="nope"
              id="memory"
              name="memory"
              type="text"
              valid={checkParallelRequest()}
              invalid={!checkParallelRequest()}
              value={parallelRequests}
              onChange={(e) => setParallelRequests(e.target.value)}
            />
            <FormFeedback>
              Only numerical values between 0 and 10 are supported
            </FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Request delay (ms):</Label>
          <Col sm={8} className="mb-3">
            <Input
              autoComplete="nope"
              id="memory"
              name="memory"
              type="text"
              value={delay}
              valid={checkDelay()}
              invalid={!checkDelay()}
              onChange={(e) => setDelay(e.target.value)}
            />
            <FormFeedback>
              Only numerical values greater than 0 are supported
            </FormFeedback>
          </Col>
        </FormGroup>
        <Row className="mb-3">
          <Col sm={4}></Col>
          <Col sm={8}>
            <Button
              disabled={
                requestRunning || !checkParallelRequest() || !checkDelay()
              }
              type="submit"
              color="primary"
            >
              Do it!
              {requestRunning && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: "1rem" }}
                ></span>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      <h1>Response:</h1>
      <div>{log}</div>
    </>
  );
}
