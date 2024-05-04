import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Container,
  MenuItem,
  Avatar,
  CircularProgress,
  Link,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState, useEffect, useCallback } from "react";
import { experience } from "../utils/data";

const ApplicationForm = () => {
  const [jobList, setJobList] = useState([]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchCompanyText, setSearchCompanyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(6);

  const fetchMoreData = useCallback(async () => {
    if (isLoading) return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 6,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
    };

    setIsLoading(true);
    const data = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    ).catch((error) => console.error(error));

    const jobListData = await data.json();
    const jobListArray = jobListData.jdList;
    setJobList((prevJobList) => [...prevJobList, ...jobListArray]);
    setFilteredJobList((prevJobList) => [...prevJobList, ...jobListArray]);
    setOffset((prevOffset) => prevOffset + 6);
    setIsLoading(false);
  }, [offset, isLoading]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      limit: 6,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
    };

    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      ).catch((error) => console.error(error));
      const jobListData = await data.json();
      setJobList(jobListData.jdList);
      setFilteredJobList(jobListData.jdList);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          margin: "20px",
          flexDirection: { lg: "row", xs: "column" },
          gap: "20px",
        }}
      >
        <TextField
          value={searchText}
          label="Search city"
          size="small"
          onChange={(e) => {
            setSearchText(e.target.value);
            const filteredJobListArray = jobList.filter((job) =>
              job.location.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredJobList(filteredJobListArray);
          }}
        />
        <TextField
          value={searchCompanyText}
          label="Search company"
          size="small"
          onChange={(e) => {
            setSearchCompanyText(e.target.value);
            const filteredJobListArray = jobList.filter((job) =>
              job.companyName
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            );
            setFilteredJobList(filteredJobListArray);
          }}
        />
        <TextField
          select
          label="Select Remote/Onsite"
          helperText="Please select Remote/OnSite"
          defaultValue="none"
          size="small"
          onChange={(e) => {
            const filteredJobListArray = jobList.filter(
              e.target.value == "none"
                ? (job) => job
                : e.target.value == "remote"
                ? (job) => job.location == "remote"
                : (job) => job.location != "remote"
            );
            setFilteredJobList(filteredJobListArray);
          }}
        >
          <MenuItem value={"none"}>--None--</MenuItem>
          <MenuItem value={"remote"}>Remote</MenuItem>
          <MenuItem value={"Onsite"}>Onsite</MenuItem>
        </TextField>
        <TextField
          select
          label="Select Min Experience"
          helperText="Please select Min Experience"
          defaultValue="--None--"
          size="small"
          onChange={(e) => {
            const filteredJobListArray = jobList.filter(
              e.target.value == "--None--"
                ? (job) => job
                : (job) => job.minExp == e.target.value
            );
            setFilteredJobList(filteredJobListArray);
          }}
        >
          {experience.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {filteredJobList != 0 ? (
          filteredJobList.map((job) => {
            return (
              <Card
                key={job.jdUid}
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
                    {job.salaryCurrencyCode == "USD" ? "K" : ""}-
                    {job.maxJdSalary}
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
                    <Link
                      href="https://weekday.works"
                      sx={{
                        position: "absolute",
                      }}
                    >
                      <Button
                        sx={{
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
                    </Link>
                  </Box>
                </CardContent>
                <Box sx={{ paddingLeft: "16px", paddingBottom: "8px" }}>
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
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                        marginTop: "8px",
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
                        {" "}
                        <Avatar
                          sx={{
                            width: 22,
                            height: 22,
                            bgcolor: deepOrange[500],
                          }}
                        >
                          <Typography fontSize="12px">P</Typography>
                        </Avatar>
                        <Avatar
                          sx={{
                            width: 22,
                            height: 22,
                            bgcolor: deepPurple[500],
                          }}
                        >
                          <Typography fontSize="12px">G</Typography>
                        </Avatar>
                        <Typography fontSize="13px">
                          Unlock Referral asks
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              marginLeft: "300px",
              marginTop: "100px",
            }}
          >
            <RemoveCircleOutlineIcon />
            <Typography>
              {"  "}
              No Jobs available for this category at the moment
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        {isLoading && <CircularProgress sx={{}} />}
      </Box>
    </Container>
  );
};

export default ApplicationForm;
