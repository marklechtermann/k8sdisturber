import { Alert, Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import ApiResult from "../components/ApiResult";
import Title from "../components/Title";
import HealthService from "../services/HealthService";

const Health: React.FC = () => {
  const [temporaryStatus, setTemporaryStatus] = useState({
    isAlive: false,
    isReady: false,
    millisecondsIsAliveDuration: 0,
    millisecondsIsReadyDuration: 0,
  });

  const [readyzStatus, setReadyzStatus] = useState(404);
  const [livezStatus, setLivezStatus] = useState(404);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(() => {
      fetchStatus();

      HealthService.getReadyZ().then((e) => console.log(e));
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    postTemporaryStatus();
  };

  const handleDangerKlicked = (event: any) => {
    killApplication();
  };

  const postTemporaryStatus = async () => {
    const response = await fetch("/api/temporarystatus", {
      method: "POST",
      body: JSON.stringify(temporaryStatus),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTemporaryStatus(data);
  };

  const killApplication = async () => {
    const response = await fetch("/api", {
      method: "DELETE",
    });
    await response.json();
  };

  const fetchStatus = async () => {
    fetch("/api/readyz")
      .then((r) => setReadyzStatus(r.status))
      .catch((r) => {
        setReadyzStatus(r.status);
      });
    fetch("/api/livez")
      .then((r) => setLivezStatus(r.status))
      .catch((r) => {
        setLivezStatus(r.status);
      });
  };

  return (
    <div>
      <Title>ReadyZ and LiveZ</Title>
      <form onSubmit={handleSubmit}>
        <div>Here you can set the readyz and livez status temporary.</div>

        <Box component="div" sx={{ m: 4 }}>
          <TextField
            id="outlined-required"
            label="readyz=false duration (ms)"
            value={temporaryStatus.millisecondsIsReadyDuration}
            onChange={(e) => {
              let a = { ...temporaryStatus };
              a.millisecondsIsReadyDuration = parseInt(e.target.value);
              setTemporaryStatus(a);
            }}
          />
        </Box>

        <Box component="div" sx={{ m: 4 }}>
          <TextField
            id="outlined-required"
            label="livez=false duration (ms)"
            value={temporaryStatus.millisecondsIsAliveDuration}
            onChange={(e) => {
              let a = { ...temporaryStatus };
              a.millisecondsIsAliveDuration = parseInt(e.target.value);
              setTemporaryStatus(a);
            }}
          />
        </Box>
        <Box component="div" sx={{ m: 4 }}>
          <Button type="submit" variant="contained">
            Do It
          </Button>
        </Box>
      </form>

      <Title color="red">Danger Zone</Title>
      <Box component="div" sx={{ m: 4 }}>
        <Button variant="contained" onClick={handleDangerKlicked}>
          Kill Application!
        </Button>
      </Box>

      <Title>API</Title>
      <div>
        <ApiResult link="/api/readyz" statusCode={readyzStatus}></ApiResult>
        <br />
        <ApiResult link="/api/livez" statusCode={livezStatus}></ApiResult>
      </div>
    </div>
  );
};

export default Health;
