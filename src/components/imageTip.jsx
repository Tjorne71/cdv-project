import React from "react";
import PhotoIcon from '@mui/icons-material/Photo';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

export default function ImageTip({ imageUrl, sentence}) {
  return (
    <Tooltip
      title={
        <div className="flex flex-col items-center">
          <p>{sentence.toUpperCase()}</p>
          <div className="flex flex-col m-auto items-center mx-auto">
            <Image src={imageUrl} width={500} height={500} alt="Picture of the author" />
          </div>
        </div>
      }
    >
      <IconButton>
        <PhotoIcon sx={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
}
