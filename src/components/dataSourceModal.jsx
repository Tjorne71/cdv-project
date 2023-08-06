import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

export default function DataSourceModel({open, onClose}) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Data source
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p>All data in this project was sourced from the dataset &quot;1.88 Million US Wildfires&quot;.</p>
          <br />
          <p>We have extracted our own dataset using using SQL which is used to generate the visualizations.</p>
          <br />
          <p>The datasets can be downloaded here in JSON:</p>
          <a className="text-blue-500" target="_blank" href="https://drive.google.com/file/d/1A81bOo2kZDV1A9HY4_Xo9opsrM6gnGju/view?usp=sharing">
            1. Monthly Fires Per County{" "}
          </a>
          - The sum of all fires in every county every single month from 1992-2015.
          <br />
          <a className="text-blue-500" target="_blank" href="https://drive.google.com/file/d/1nG-w1_LU-WmriZ84J-3xZT0womRlOALH/view?usp=sharing">
            2. Monthly Fires in the entire US{" "}
          </a>
          - The sum of all fires in the United Stats every single month from 1992-2015.
          <br />
          <br />
          <p>
            The entire dataset can be downloaded from{" "}
            <a className="text-blue-500" target="_blank" href="https://www.kaggle.com/datasets/rtatman/188-million-us-wildfires">
              Kaggle.
            </a>
          </p>
          <br />
          <h6 className="font-bold">Citation:</h6>
          <p>Short, Karen C. 2017. Spatial wildfire occurrence data for the United States, 1992-2015 [FPA_FOD_20170508]. 4th Edition. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2013-0009.4</p>
        </Typography>
      </Box>
    </Modal>
  );
}
