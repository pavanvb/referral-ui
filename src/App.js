import "./App.css";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

function App() {
  const [isLoaded, setLoad] = useState("none");
  const [shimmer, setShimmer] = useState("block");
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
    };

    const fetchData = async () => {
      const data = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      ).catch((error) => console.error(error));
      const jobListData = await data.json();
      setJobList(jobListData.jdList);
    };

    fetchData();
  }, []);
  console.log(jobList);

  return (
    <div className="App">
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {jobList.map((job) => {
          return (
            <Card
              sx={{
                margin: { lg: "20px", xs: "20px" },
                padding: { lg: "10px", xs: "10px" },
                width: "280px",
                borderRadius: "20px",
              }}
            >
              <CardHeader
                avatar={
                  <img
                    src={job.logoUrl}
                    style={{ height: "40px", width: "40px" }}
                  ></img>
                }
                title={
                  <Box>
                    <Typography sx={{ fontSize: "12px" }}>
                      {job.companyName}
                    </Typography>
                    <Typography>{job.jobRole}</Typography>
                  </Box>
                }
                subheader={job.location}
                sx={{
                  ".MuiCardHeader-avatar": {
                    marginRight: "10px",
                  },
                  alignItems: "flex-start",
                }}
              />
              <CardContent>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      maxHeight: "210px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {job.jobDetailsFromCompany}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      marginTop: "180px",
                      width: "248px",
                      backgroundImage:
                        "linear-gradient(to bottom, transparent, white)",
                    }}
                  >
                    View job
                  </Button>
                </Box>
              </CardContent>
              <CardActionArea>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h10">Minimum Experience</Typography>
                  <Typography variant="h7">
                    {job.minExp ? job.minExp : "-"} years
                  </Typography>
                </Box>
                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                    }}
                  >
                    <Button sx={{ width: "248px", background: "aquamarine" }}>
                      ⚡Easy Apply
                    </Button>
                    <Button sx={{ width: "248px", background: "aquamarine" }}>
                      <Typography>Unlock Referral asks</Typography>
                    </Button>
                  </Box>
                </CardActions>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}

export default App;
