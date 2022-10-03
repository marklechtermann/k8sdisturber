import React, { useState, useEffect } from "react";
import ApiResult from "../components/ApiResult";
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

  const handleSubmitDanger = (event: any) => {
    event.preventDefault();
    deleteApplication();
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

  const deleteApplication = async () => {
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
      <h1>ReadyZ and LiveZ</h1>
      <form onSubmit={handleSubmit}>
        <div>Here you can set the readyz and livez status temporary.</div>
        <div>
          <label>readyz=false duration (ms)</label>
          <div>
            <input
              autoComplete="nope"
              id="memory"
              name="memory"
              type="text"
              value={temporaryStatus.millisecondsIsReadyDuration}
              onChange={(e) => {
                let a = { ...temporaryStatus };
                a.millisecondsIsReadyDuration = parseInt(e.target.value);
                setTemporaryStatus(a);
              }}
            />
          </div>
        </div>
        <div>
          <label>livez=false duration (ms)</label>
          <div>
            <input
              autoComplete="nope"
              id="memory"
              name="memory"
              type="text"
              value={temporaryStatus.millisecondsIsAliveDuration}
              onChange={(e) => {
                let a = { ...temporaryStatus };
                a.millisecondsIsAliveDuration = parseInt(e.target.value);
                setTemporaryStatus(a);
              }}
            />
          </div>
        </div>

        <div>
          <div></div>
          <div>
            {" "}
            <button type="submit">Do it!</button>
          </div>
        </div>
      </form>

      <h1>Danger Zone</h1>
      <form onSubmit={handleSubmitDanger}>
        <div>
          <div></div>
          <div>
            {" "}
            <button type="submit">Kill Application!</button>
          </div>
        </div>
      </form>

      <h1>Api</h1>
      <div>
        <ApiResult link="/api/readyz" statusCode={readyzStatus}></ApiResult>
        <br />
        <ApiResult link="/api/livez" statusCode={livezStatus}></ApiResult>
      </div>
    </div>
  );
};

export default Health;
