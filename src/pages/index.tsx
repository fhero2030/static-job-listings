import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import {
  Stack,
  Box,
  useMediaQuery,
  useTheme,
  TextField,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";

import JobCard from "../components/job-card";
import CloseIcon from "@mui/icons-material/Close";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const response = await res.json();
    const data = await JSON.parse(response);
    return data;
  });

type Job = {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

const Home: NextPage = () => {
  const { data, error } = useSWR<Job[], Error>("/api/jobs", fetcher);
  const [filter, setFilter] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);
  const [inputFilter, setInputFilter] = useState("");

  const theme = useTheme();
  const showFilter = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (filter.length > 0) {
      const filteredJobs = data?.filter((job: Job) => {
        let exactMatch = 0;

        for (let match of filter) {
          if (job.tools.some((j) => j.includes(match))) {
            exactMatch++;
            continue;
          }

          if (job.languages.some((j) => j.includes(match))) {
            exactMatch++;
            continue;
          }

          if (job.position === match) {
            exactMatch++;
            continue;
          }
          if (job.level === match) {
            exactMatch++;
            continue;
          }
        }

        return exactMatch === filter.length;
      });
      setJobs(filteredJobs);
    } else {
      setJobs(data);
    }
  }, [filter, data]);

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(e.target.value);
  };

  const onEnterFilter = () => {
    const trimInput = inputFilter.trim();
    if (filter.includes(trimInput)) return;

    setFilter((prevState) => [...prevState, trimInput]);
    setInputFilter("");
  };

  const onDeleteFilter = (job: string) => {
    const afterDelete = filter.filter((j) => job !== j);

    setFilter(afterDelete);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "primary.main",
          position: "relative",
          width: "100%",
          maxHeight: "156px",
          height: "20vh",
          backgroundImage: {
            md: "url(/images/bg-header-desktop.svg)",
            sm: "url(/images/bg-header-mobile.svg)",
            sx: "url(/images/bg-header-mobile.svg)",
          },
        }}
      ></Box>
      {!showFilter && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            margin: "0 auto",
            p: 3,
            width: "87%",
            transform: "translateY(-20px)",

            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          {filter.map((job) => (
            <Stack
              direction="row"
              key={job}
              sx={{
                alignItems: "center",
                bgcolor: "hsl(180, 31%, 95%)",
                color: "primary.main",
                fontWeight: "bold",
                borderRadius: "0 5px 5px 0",
                height: "30px",
              }}
            >
              <Typography mx={1} fontSize={14}>
                {job}
              </Typography>

              <IconButton
                aria-label="delete"
                disableRipple
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "0px 5px 5px 0",
                  height: "100%",
                  py: 1,
                  px: 0.5,
                }}
                onClick={() => {
                  onDeleteFilter(job);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          ))}
          <TextField
            variant="outlined"
            value={inputFilter}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter") {
                onEnterFilter();
              }
            }}
            onChange={handleFilterInput}
            sx={{
              flex: "1",
              minWidth: "100px",
            }}
            inputProps={{
              style: {
                padding: 0,
              },
            }}
          />
        </Paper>
      )}
      <Box
        maxWidth="xl"
        sx={{
          width: { md: "80%", xs: "95%" },
          bgcolor: "primary",
          height: "100%",
          m: "75px auto",
          px: 4,
        }}
      >
        <Stack rowGap={{ lg: 3, xs: 5 }}>
          {jobs
            ?.sort((a, b) => Number(b.new) - Number(a.new))
            .sort((a, b) => Number(b.featured) - Number(a.featured))
            .map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const res = await fetch("http://localhost:3000/api/jobs");
//   const data = await res.json();
//   return {
//     props: {
//       data: JSON.parse(data),
//     },
//   };
// };
