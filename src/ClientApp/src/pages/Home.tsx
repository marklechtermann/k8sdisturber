import {
  Box,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import IKubernetesInfo from "../models/IKubernetesInfo";
import KubernetesService from "../services/KubernetesService";
import useServerInfo from "../hooks/useServerInfo";

const Home: React.FC = () => {
  const { info } = useServerInfo();
  const [kubernetesInfo, setKubernetesInfo] = useState<IKubernetesInfo>({});
  const [replicas, setReplicas] = useState<number>(1);

  useEffect(() => {
    const intervalID = setInterval(() => {
      fetchInfo();
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    fetchInfo();
    KubernetesService.getReplicas().then((v) => {
      return setReplicas(v.replicas);
    });
  }, []);

  const fetchInfo = async () => {
    setKubernetesInfo(await KubernetesService.getInfo());
  };

  return (
    <>
      <Box component="div" paddingBottom="1rem">
        <Title>Replicas</Title>
        <Box
          component={Paper}
          maxWidth="15rem"
          marginBottom="1rem"
          marginTop="2rem"
          padding="1rem"
        >
          <Slider
            valueLabelDisplay="on"
            step={1}
            min={1}
            max={20}
            marks
            value={replicas}
            onChange={(_e, value) => setReplicas(value as number)}
            onChangeCommitted={() => {
              KubernetesService.setReplicas(replicas);
            }}
          />
        </Box>
        <Title>Pods</Title>
        <TableContainer component={Paper}>
          <Table size="small">
            <colgroup>
              <col style={{ width: "15rem" }} />
              <col style={{ width: "10rem" }} />
              <col />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold" }}>Pod name</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold" }}>Pod IP</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Pod Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kubernetesInfo.podInfos &&
                kubernetesInfo.podInfos.map((p) => (
                  <TableRow key={p.name}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.ip}</TableCell>
                    <TableCell>{p.phase}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box component="div">
        <Title>App Info</Title>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Application Version</TableCell>
                <TableCell>{info?.version}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Instance ID</TableCell>
                <TableCell>{info?.instanceId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hostname</TableCell>
                <TableCell>{info?.hostname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>{info?.userName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>{info?.userId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>OS version</TableCell>
                <TableCell>{info?.osVersion}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Processor count</TableCell>
                <TableCell>{info?.processorCount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Process ID</TableCell>
                <TableCell>{info?.processId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IP adresses</TableCell>
                <TableCell>
                  {info &&
                    info.ipAdresses &&
                    info.ipAdresses.map((ip) => <div key={ip}>{ip}</div>)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Home;
