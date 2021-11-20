import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Col, Row, Label, Input } from "reactstrap";

export default function Memory() {
  const [memorysize, setMemorysize] = useState({ allocatedMegaBytes: 0 });
  useEffect(() => fetchMemory(), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMemory();
  };

  const fetchMemory = async () => {
    const response = await fetch("/api/memory");
    const data = await response.json();
    console.log(data);
    setMemorysize(data);
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
      <h1>Memory Allocation</h1>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          Here you can allocate memory. Up to 2 Gbyte can be allocated.
        </div>
        <FormGroup row>
          <Label sm={4}>Memory (MByte)</Label>
          <Col sm={8} className="mb-3">
            <Input
              id="memory"
              name="memory"
              placeholder="with a placeholder"
              type="text"
              value={memorysize.allocatedMegaBytes}
              onChange={(e) =>
                setMemorysize({ allocatedMegaBytes: e.target.value })
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
    </div>
  );
}
