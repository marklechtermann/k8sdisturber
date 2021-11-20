import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Col, Row, Label, Input } from "reactstrap";

export default function Health() {
  const [memorysize, setMemorysize] = useState({
    isAlive: true,
    isReady: true,
    millisecondsIsAliveDuration: 0,
    millisecondsIsReadyDuration: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setMemory();
  };

  const setMemory = async () => {
    const response = await fetch("/api/memory", {
      method: "PUT",
      body: JSON.stringify(memorysize),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMemorysize(data);
  };

  return (
    <div>
      <h1>Health Status</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          Here you can allocate memory. Up to 2 Gbyte can be allocated.
        </div>
        <FormGroup row>
          <Label sm={4}>readyz=false duration (ms)</Label>
          <Col sm={8} className="mb-3">
            <Input
              id="memory"
              name="memory"
              placeholder="with a placeholder"
              type="text"
              value={memorysize.millisecondsIsAliveDuration}
              onChange={(e) =>
                setMemorysize({ millisecondsIsAliveDuration: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>readyz=false duration (ms)</Label>
          <Col sm={8} className="mb-3">
            <Input
              id="memory"
              name="memory"
              placeholder="with a placeholder"
              type="text"
              value={memorysize.millisecondsIsAliveDuration}
              onChange={(e) =>
                setMemorysize({ millisecondsIsAliveDuration: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        <Row className="mb-3">
          <Col sm={4}></Col>
          <Col sm={8}>
            {" "}
            <Button type="submit" color="primary">
              Do it!
            </Button>
          </Col>
        </Row>
      </Form>
      <h1>Api</h1>
      <div>
        <code>http://localhost:8080/h</code>
      </div>
    </div>
  );
}
