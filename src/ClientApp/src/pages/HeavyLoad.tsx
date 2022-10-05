import { Box, Button, CircularProgress, Slider } from "@mui/material";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Bash from "../components/Bash";
import Title from "../components/Title";

const HeavyLoad: React.FC = () => {
  const [delay, setDelay] = useState(500);
  const [log, setLog] = useState([]);
  const [parallelRequests, setParallelRequests] = useState(10);
  const [requestRunning, setRequestRunning] = useState(false);
  const [durationAll, setDurationAll] = useState(0);

  const checkParallelRequest = () =>
    parallelRequests >= 1 && parallelRequests <= 20;
  const checkDelay = () => delay >= 0;

  const handleSubmit = async (e) => {
    setLog([]);
    e.preventDefault();
    calculate();
  };

  const calculate = async () => {
    setRequestRunning(true);
    let urls = [];
    for (let i = 1; i <= parallelRequests; i++) {
      urls.push(`/api/slow?delay=${delay}&uid=${uuidv4()}`);
    }

    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    const json = responses.map((response) => response.json());
    let data = await Promise.all(json);

    data = data.map((d) => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });

    const sortByStartFastesFirst = data.sort((a, b) => a.start - b.start);
    const sortByEndFastesFirst = data.sort((a, b) => a.end - b.end);
    const start = sortByStartFastesFirst[0].start;
    const end = sortByEndFastesFirst.at(-1).end;

    const overallDuration = end - start;
    const faktor = 100 / overallDuration;

    data = data.sort((a, b) => a.duration - b.duration);
    const p3 = overallDuration * faktor;

    setDurationAll(overallDuration);

    // setLog(
    //   data.map((info) => {
    //     const duration = info.end - info.start;

    //     const p1 = (info.start - start) * faktor;
    //     const p2 = (info.end - start) * faktor;

    //     return (
    //       <div key={uuidv4()}>
    //         <code>
    //           Response from{" "}
    //           <span style={{ divor: "yellow" }}>({info.instanceId})</span>{" "}
    //           <span style={{ divor: "yellow" }}>{info.hostname}</span>{" "}
    //         </code>

    //         <div>
    //           <div value={p1} />
    //           <div bar divor="primary" value={p2 - p1}>
    //             <div className="text-center">{duration} ms</div>
    //           </div>
    //           <div value={p3 - p2} />
    //         </div>
    //       </div>
    //     );
    //   })
    // );
    setRequestRunning(false);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <>
      <Title>Heavy Load</Title>

      <Box>
        Here you can simulate parallel request to the backend. <br />
        The request is processed sequentially by the backend. <br />
        If you increase the number of replicates, then more requests from the
        client can be executed in parallel.
        <p />
        <Bash>
          kubectl scale --replicas 10 --namespace k8sdisturber
          deploy/k8sdisturber
        </Bash>
      </Box>

      <Box paddingTop="2rem" maxWidth="500px">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Number of parallel request:</label>
            <Slider
              aria-label="Custom marks"
              defaultValue={2}
              getAriaValueText={valuetext}
              step={1}
              min={1}
              max={10}
              marks
              value={parallelRequests}
              valueLabelDisplay="auto"
              onChange={(e, value) => setParallelRequests(value as number)}
            />
          </div>
          <div>
            <label>Request delay (ms):</label>
            <div>
              <Slider
                aria-label="Custom marks"
                defaultValue={2}
                getAriaValueText={valuetext}
                step={100}
                min={0}
                max={1000}
                marks
                value={delay}
                valueLabelDisplay="auto"
                onChange={(e, value) => setDelay(value as number)}
              />
            </div>
          </div>
          <div>
            <div></div>
            <div>
              <Button
                size="large"
                variant="contained"
                disabled={
                  requestRunning || !checkParallelRequest() || !checkDelay()
                }
                type="submit"
              >
                {requestRunning ? (
                  <CircularProgress size="1.5rem" />
                ) : (
                  <>Do it!</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Box>

      <h1>Response:</h1>
      <div>
        <code>
          Duration <span>{durationAll} ms</span>
        </code>
      </div>
      <div>{log}</div>
    </>
  );
};

export default HeavyLoad;
