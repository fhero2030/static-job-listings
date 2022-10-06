import React from "react";
import { Typography, Stack, Box, Paper } from "@mui/material";
import Image from "next/image";

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

type Props = {
  job: Job;
};

const JobCard = ({ job }: Props) => {
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: 1.7,

        rowGap: 2,
        p: { md: 4.5, xs: 4 },
        flexDirection: { md: "row", xs: "column" },
        alignItems: { md: "center" },

        ...(job.featured && {
          borderLeft: "solid 6px",
          borderColor: "primary.main",
        }),
      }}
    >
      <Stack direction="row">
        <Box sx={{ position: { md: "static", xs: "absolute" } }}>
          <Box
            sx={{
              mr: 3,
              maxHeight: "100px",
              borderRadius: "100%",
              position: { md: "static", xs: "relative" },
              top: { md: "none", xs: "-55px" },
              minWidth: { md: "100px", xs: "45px" },
            }}
          >
            <Image src={job.logo} alt={job.company} width="100" height="100" layout="responsive" />
          </Box>
        </Box>

        <Stack
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
              mb: { md: 0, xs: 1.2 },
            }}
          >
            <Typography color="primary.main" fontWeight="bold" fontSize={{ md: 16, xs: 14 }}>
              {job.company}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                "& 	.MuiTypography-root": {
                  px: 1,
                  py: 0.4,
                  fontSize: { md: 12, xs: 12 },
                  fontWeight: "bold",
                  borderRadius: 4,
                },
              }}
            >
              {job.new && (
                <Typography color="white" bgcolor="primary.main">
                  NEW!
                </Typography>
              )}
              {job.featured && (
                <Typography color="white" bgcolor="primary.dark">
                  FEATURED
                </Typography>
              )}
            </Stack>
          </Stack>
          <Typography
            fontWeight="bold"
            color="primary.dark"
            fontSize={{ md: 20, xs: 16 }}
            sx={{
              mb: { md: 0, xs: 1.2 },
            }}
          >
            {job.position}
          </Typography>
          <Stack
            spacing={1.5}
            direction="row"
            sx={{
              mb: { md: 0, xs: 1.2 },
              "& 	.MuiTypography-root": {
                fontWeight: "medium",
                fontSize: { md: 16, xs: 12 },
                color: "primary.light",
              },
            }}
          >
            <Typography>{job.postedAt}</Typography>
            <Typography>.</Typography>
            <Typography>{job.contract}</Typography>
            <Typography>.</Typography>
            <Typography>{job.location}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        rowGap={2}
        columnGap={2.5}
        sx={{
          flexWrap: "wrap",
          justifyContent: { md: "flex-end", xs: "flex-start" },
          flex: 1,
          "& 	.MuiTypography-root": {
            px: 1.25,
            py: 0.5,
            borderRadius: 2,
            fontWeight: "bold",
            fontSize: { md: 16, xs: 12 },
            color: "primary.main",
            bgcolor: "hsl(180, 31%, 95%)",
          },
        }}
      >
        {job.languages.map((language, i) => (
          <Typography key={i}>{language}</Typography>
        ))}
        {job.tools.map((tool, i) => (
          <Typography key={i}>{tool}</Typography>
        ))}
        {job.tools.map((tool, i) => (
          <Typography key={i}>{tool}</Typography>
        ))}
      </Stack>
    </Paper>
  );
};

export default JobCard;
