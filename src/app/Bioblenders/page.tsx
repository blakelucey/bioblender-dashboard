"use client";
import React, { useState, useEffect } from "react";
import data from "../../../data.json";
import {
  Container,
  Stack,
  ThemeProvider,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import muiTheme from "../../../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";

type JsonData = {
  [category: string]: any[]; // Replace `any` with the specific type of your items
};

export default function Administrator() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [jsonData, setJsonData] = useState<JsonData>(data);

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    Object.values(jsonData).forEach((items: any) => {
      items.forEach((item: any) => {
        fetchData(item.IPAddress, item.Port);
      });
    });
  }, []);

  const fetchData = (ipAddress: string, port: number) => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `http://${ipAddress}:${port}/`
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const html = data.contents;
        const iframe = document.getElementById(
          `${ipAddress}:${port}`
        ) as HTMLIFrameElement;
        if (iframe) {
          iframe.srcdoc = html;
          iframe.onload = () => {
            automateLogin(ipAddress, port);
          };
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        const iframe = document.getElementById(
          `${ipAddress}:${port}`
        ) as HTMLIFrameElement;
        if (iframe) {
          iframe.style.display = "none";
        }
      });
  };
  
  const automateLogin = (ipAddress: string, port: number) => {
    const iframe = document.getElementById(
      `${ipAddress}:${port}`
    ) as HTMLIFrameElement;
    const iframeContent = iframe.contentDocument;
  
    // Check if the iframe content is accessible
    if (iframeContent) {
      // Perform login automation
      const usernameInput = iframeContent.getElementById("reticulating") as HTMLInputElement;
      const passwordInput = iframeContent.getElementById("splines") as HTMLInputElement;
      const submitButton = iframeContent.getElementById("submit") as HTMLInputElement;
  
      if (usernameInput && passwordInput && submitButton) {
        // Set the values of the login form fields
        usernameInput.value = "all-line";
        passwordInput.value = "2236144";
  
        // Trigger the click event on the submit button to submit the form
        submitButton.click();
  
        // Once logged in, you can retrieve and display the desired information from the logged-in website within the iframe
        // Access and manipulate the content of the iframe using the iframeContent object
        // For example:
        // const loggedInData = iframeContent.getElementById("dataElementId").textContent;
        // console.log(loggedInData);
      }
    }
  };
  
  

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
        <Grid container spacing={2} sx={{mt: 420}}>
          {Object.entries(jsonData).map(([category, items]) => (
            <Grid item xs={12} key={category}>
              <Box mb={4}>
                <Typography variant="h6" gutterBottom>
                  {category}
                </Typography>
                <Grid container spacing={2}>
                  {items?.map((item: any, index: number) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <Box display="flex" flexDirection="column">
                        <Typography>
                          {item.Name}
                          <br></br>
                          {item.IPAddress}:{item.Port}
                        </Typography>
                        <Box
                          width="100%"
                          height="400px"
                          overflow="hidden"
                          borderRadius={4}
                          boxShadow={1}
                        >
                        <iframe
                          id={`${item.IPAddress}:${item.Port}`}
                          title={`${item.Name}`}
                          width="100%"
                          height="400"
                          frameBorder="0"
                          style={{ width: '100%', height: '400px', overflowY: 'auto'}}
                        />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
