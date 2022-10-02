const HeavyLoad: React.FC = () => {
  return <>TODO</>;
};

export default HeavyLoad;

// import React from "react";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import Bash from "../components/Bash";

// export default function HeavyLoad() {
//   const [delay, setDelay] = useState(500);
//   const [log, setLog] = useState([]);
//   const [parallelRequests, setParallelRequests] = useState(10);
//   const [requestRunning, setRequestRunning] = useState(false);
//   const [durationAll, setDurationAll] = useState(0);

//   const checkParallelRequest = () =>
//     parallelRequests >= 1 && parallelRequests <= 20;
//   const checkDelay = () => parseInt(delay) >= 0;

//   const handleSubmit = async (e) => {
//     setLog([]);
//     e.preventDefault();
//     calculate();
//   };

//   const calculate = async () => {
//     setRequestRunning(true);
//     let urls = [];
//     for (let i = 1; i <= parallelRequests; i++) {
//       urls.push(`/api/slow?delay=${delay}&uid=${uuidv4()}`);
//     }

//     const requests = urls.map((url) => fetch(url));
//     const responses = await Promise.all(requests);
//     const json = responses.map((response) => response.json());
//     let data = await Promise.all(json);

//     data = data.map((d) => {
//       return {
//         ...d,
//         start: new Date(d.start),
//         end: new Date(d.end),
//       };
//     });

//     const sortByStartFastesFirst = data.sort((a, b) => a.start - b.start);
//     const sortByEndFastesFirst = data.sort((a, b) => a.end - b.end);
//     const start = sortByStartFastesFirst[0].start;
//     const end = sortByEndFastesFirst.at(-1).end;

//     const overallDuration = end - start;
//     const faktor = 100 / overallDuration;

//     data = data.sort((a, b) => a.duration - b.duration);
//     const p3 = overallDuration * faktor;

//     setDurationAll(overallDuration);

//     setLog(
//       data.map((info) => {
//         const duration = info.end - info.start;

//         const p1 = (info.start - start) * faktor;
//         const p2 = (info.end - start) * faktor;

//         return (
//           <div key={uuidv4()}>
//             <code>
//               Response from{" "}
//               <span style={{ divor: "yellow" }}>({info.instanceId})</span>{" "}
//               <span style={{ divor: "yellow" }}>{info.hostname}</span>{" "}
//             </code>

//             <div>
//               <div value={p1} />
//               <div bar divor="primary" value={p2 - p1}>
//                 <div className="text-center">{duration} ms</div>
//               </div>
//               <div value={p3 - p2} />
//             </div>
//           </div>
//         );
//       })
//     );
//     setRequestRunning(false);
//   };
//   return (
//     <>
//       <h1>Heavy Load</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           Here you can simulate parallel request to the backend. The request is
//           processed sequentially by the backend. If you increase the number of
//           replicates, then more requests from the client can be executed in
//           parallel.
//           <p />
//           <Bash>
//             kubectl scale --replicas 10 --namespace k8sdisturber
//             deploy/k8sdisturber
//           </Bash>
//         </div>
//         <label>Number of prallel requests:</label>
//         <div>
//           <input
//             autoComplete="nope"
//             id="memory"
//             name="memory"
//             type="text"
//             value={parallelRequests}
//             onChange={(e) => setParallelRequests(e.target.value)}
//           />
//           <div>Only numerical values between 0 and 10 are supported</div>
//         </div>
//         <div>
//           <label>Request delay (ms):</label>
//           <div>
//             <input
//               autoComplete="nope"
//               id="memory"
//               name="memory"
//               type="text"
//               value={delay}
//               onChange={(e) => setDelay(e.target.value)}
//             />
//             <div>Only numerical values greater than 0 are supported</div>
//           </div>
//         </div>
//         <div>
//           <div></div>
//           <div>
//             <button
//               disabled={
//                 requestRunning || !checkParallelRequest() || !checkDelay()
//               }
//               type="submit"
//               divor="primary"
//             >
//               Do it!
//               {requestRunning && (
//                 <span
//                   className="spinner-border spinner-border-sm"
//                   role="status"
//                   aria-hidden="true"
//                   style={{ marginLeft: "1rem" }}
//                 ></span>
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//       <h1>Response:</h1>
//       <div>
//         <code>
//           Duration <span style={{ divor: "yellow" }}>{durationAll} ms</span>
//         </code>
//       </div>
//       <div>{log}</div>
//     </>
//   );
// }
