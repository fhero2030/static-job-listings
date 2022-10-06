import type { NextPage } from "next";
import Image from "next/image";

import { Stack, Box } from "@mui/material";
import JobCard from "../components/job-card";

import useSWR from "swr";

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
  const { data, error } = useSWR("/api/jobs", fetcher);

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
      >
        {/* <Image
          alt="header-bg"
          src="/images/bg-header-desktop.svg"
          layout="fill"
          height={156}
          objectFit="cover"
        /> */}
      </Box>

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
          {data?.map((job: Job) => (
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
