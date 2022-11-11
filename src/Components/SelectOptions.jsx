import * as React from "react";
import uuid from "react-uuid";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

let SelectOptions = ({
  renderIcon,
  values,
  belongingURLFilter,
  addToURLFilter,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [btnName, setBtnName] = React.useState("Select Filter");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event, item) => {
    addToURLFilter(belongingURLFilter, item);
    setBtnName(event.currentTarget.textContent || "Select Filter");
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ListItemIcon style={{ minWidth: "0px", marginRight: "10px" }}>
          {renderIcon}
        </ListItemIcon>
        <ListItemText
          style={{ color: "black", paddingTop: "3px", fontSize: "0.8rem" }}
          primary={btnName}
        />
        {open ? (
          <ExpandLess style={{ color: "black" }} />
        ) : (
          <ExpandMore style={{ color: "black" }} />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClose(e, "")}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {values.map((item) => (
          <MenuItem key={uuid()} onClick={(e) => handleClose(e, item)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SelectOptions;
