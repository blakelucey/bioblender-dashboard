"use client";
import React, { useState } from "react";
import data from "../../../data.json";
import {
  Container,
  Stack,
  ThemeProvider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import muiTheme from "../../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function Administrator() {
  const [jsonData, setJsonData] = useState(data);

  console.log("jsonData: ", jsonData);

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth="lg"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton sx={{ bottom: 500, right: 500 }} href="/Dashboard">
          {" "}
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          sx={{ m: 10 }}
        >
          <Typography variant="h3">Admin</Typography>
          <Typography variant="h6">Welcome to the admin page</Typography>
          <Typography variant="h6">
            {
              "To edit, find the correct Bioblender and click the edit icon, don't forget to save!"
            }
          </Typography>
        </Stack>

        <Box
          sx={{
            direction: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            m: 10,
          }}
          style={{
            maxHeight: "800px",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {jsonData.map((section, sectionIndex) => (
            <Accordion key={section.Name}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{section.Name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  <Typography>Notes: {section.Notes}</Typography>
                  <Typography>IP Address: {section.IPAddress}</Typography>
                  <Typography>Port: {section.Port}</Typography>
                  <Typography>Email(s): {section.Emails}</Typography>
                  <Typography>Enabled: {section.Enabled}</Typography>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
