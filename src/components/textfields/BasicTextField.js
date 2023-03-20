import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import color from "../../styles/_color.scss";

const BasicTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: color.primary,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: color.primary,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: color.primary,
    },
  },
});

export default BasicTextField;
