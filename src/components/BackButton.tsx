import React from "react";
import {Button, Icon} from "@mui/material";

const BackButton = ({onClick}: { onClick?: () => void }) => {
   return (
     <Button
       sx={{mb: 1}}
       onClick={onClick}
       color="success"
       variant="text"
       startIcon={<Icon>arrow_back_ios</Icon>}
     >
        <span style={{color: "#000", marginLeft: "-7px"}}>Back</span>
     </Button>
   );
};

export default BackButton;
