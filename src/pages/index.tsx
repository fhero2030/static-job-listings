import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Image from "next/image";

import { Typography, Stack, Box, Paper } from "@mui/material";
import JobCard from "../components/job-card";

import { useState } from "react";

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

const Home: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [jobs, setJobs] = useState<Job[] | undefined>(data);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxHeight: "170px",
          bgcolor: "primary.main",
        }}
      >
        <Image
          alt="header-bg"
          src="/images/bg-header-desktop.svg"
          width="1580"
          height="170"
          layout="responsive"
        />
      </Box>
      <Box
        maxWidth="xl"
        sx={{
          width: "80%",
          bgcolor: "primary",
          height: "100%",
          m: "75px auto",
          px: 4,
        }}
      >
        <Stack rowGap={{ lg: 3, xs: 5 }}>
          {jobs?.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/jobs");
  const data = await res.json();
  return {
    props: {
      data: JSON.parse(data),
    },
  };
};
