import React, { useState, useEffect } from "react";
import ApiResult from "../components/ApiResult";

export default function Health() {
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
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    postTemporaryStatus();
  };

  const handleSubmitDanger = (event) => {
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
                a.millisecondsIsReadyDuration = e.target.value;
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
                a.millisecondsIsAliveDuration = e.target.value;
                setTemporaryStatus(a);
              }}
            />
          </div>
        </div>

        <div>
          <div></div>
          <div>
            {" "}
            <button type="submit" divor="primary">
              Do it!
            </button>
          </div>
        </div>
      </form>

      <h1>Danger Zone</h1>
      <form onSubmit={handleSubmitDanger}>
        <div>
          <div></div>
          <div>
            {" "}
            <button type="submit" divor="danger">
              Kill Application!
            </button>
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
}
