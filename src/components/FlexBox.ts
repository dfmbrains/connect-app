import {Box, styled} from "@mui/material";

const FlexBox = styled(Box)(() => ({display: "flex"}));

const FlexGap10 = styled(Box)(() => ({
   display: "flex",
   alignItems: "center",
   columnGap: "10px",
}));

const FlexBetween = styled(Box)(() => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
}));

const FlexAllCenter = styled(Box)(() => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
}));

const FlexAlignCenter = styled(Box)(() => ({
   display: "flex",
   alignItems: "center",
}));

const FlexVerticalGap10 = styled(Box)(() => ({
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
   rowGap: "10px",
}));

export {
   FlexBox,
   FlexGap10,
   FlexBetween,
   FlexAllCenter,
   FlexAlignCenter,
   FlexVerticalGap10,
};
