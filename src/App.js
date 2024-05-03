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
import "./App.css";

function App() {
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
              <Box
                sx={{
                  marginLeft: "16px",
                  border: "0.5px solid grey",
                  width: "110px",
                  borderRadius: "10px",
                  boxShadow: "1px 1px 2px grey",
                }}
              >
                <Typography sx={{ fontSize: "10px" }}>
                  ⏳Posted 10 days ago{" "}
                </Typography>
              </Box>
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
                subheader={
                  <Typography fontSize="12px">{job.location}</Typography>
                }
                sx={{
                  ".MuiCardHeader-avatar": {
                    marginRight: "10px",
                  },
                  alignItems: "flex-start",
                }}
              />
              <Box
                sx={{
                  marginLeft: "16px",
                }}
              >
                <Typography sx={{ fontSize: "13px" }}>
                  Estimated salary:{" "}
                  {job.salaryCurrencyCode == "USD" ? "$" : "₹"}
                  {job.minJdSalary ? job.minJdSalary : "00"}
                  {job.salaryCurrencyCode == "USD" ? "K" : ""}-{job.maxJdSalary}
                  {job.salaryCurrencyCode == "USD" ? "K" : ""}{" "}
                  {job.salaryCurrencyCode == "USD" ? "USD" : "LPA"}
                </Typography>
              </Box>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography>About Company:</Typography>
                  <Typography fontSize="13px" fontWeight="700">
                    About us
                  </Typography>
                  <Typography
                    sx={{
                      maxHeight: "170px",
                      overflow: "hidden",
                      position: "relative",
                      fontSize: "13px",
                    }}
                  >
                    {job.jobDetailsFromCompany}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      marginTop: "190px",
                      width: "248px",
                      backgroundImage:
                        "linear-gradient(to bottom, transparent, white)",
                      "&.MuiButton-root": {
                        textTransform: "unset",
                      },
                    }}
                  >
                    <Typography fontSize="14px">View job</Typography>
                  </Button>
                </Box>
              </CardContent>
              <CardActionArea>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "8px",
                  }}
                >
                  <Typography fontSize="12px">Minimum Experience</Typography>
                  <Typography variant="h7">
                    {job.minExp ? job.minExp : "0"} years
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
                    <Button
                      sx={{
                        width: "248px",
                        background: "blue",
                        color: "white",
                        "&.MuiButton-root": {
                          textTransform: "unset",
                        },
                      }}
                    >
                      <Typography fontSize="13px">
                        Unlock Referral asks
                      </Typography>
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
