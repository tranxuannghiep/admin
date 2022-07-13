import { Tab, Tabs } from "@mui/material";
import { UserDetail } from "models/user";
import React from "react";
import AccountDetail from "../AccountDetail/AccountDetail";
import DetailUserForm from "../DetailUserForm/DetailUserForm";
import TabPanel from "../TabPanel/TabPanel";
import "./TabListDetail.scss";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export interface TabListDetailProps {
  userDetail: UserDetail;
  handleUpdateUser: Function;
}
export default function TabListDetail({
  handleUpdateUser,
  userDetail,
}: TabListDetailProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleUpdate = (values: any) => {
    if (handleUpdateUser) {
      handleUpdateUser(values);
    }
  };
  return (
    <div id="TabListDetail">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Account details" {...a11yProps(0)} />
        <Tab label="Address book" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AccountDetail userDetail={userDetail} />
        <div className="seperated-space"></div>
        <DetailUserForm handleUpdate={handleUpdate} userDetail={userDetail} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>hello 2</h1>
      </TabPanel>
    </div>
  );
}
