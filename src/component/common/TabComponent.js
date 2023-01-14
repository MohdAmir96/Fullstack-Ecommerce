import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserSignin from "../../pages/authentication/UserSignin";
import AdminSignin from "../../pages/authentication/AdminSignin";
import AdminSignup from "../../pages/authentication/AdminSignup";
import UserSignup from "../../pages/authentication/UserSignup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [adminSignIn, setAdminSignIn] = React.useState(true);
  const [userSignIn, setUserSignIn] = React.useState(true);
  return (
    <Box sx={{ width: "100%", padding: "0px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "0px" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ width: "50%" }} label="User Signin" {...a11yProps(0)} />
          <Tab sx={{ width: "50%" }} label="Admin Signin" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {userSignIn ? (
          <UserSignin userSignIn={userSignIn} setuserSignIn={setUserSignIn} />
        ) : (
          <UserSignup />
        )}
      </TabPanel>

      <TabPanel value={value} index={1} sx={{ padding: "0px" }}>
        <AdminSignin />
      </TabPanel>
    </Box>
  );
}
