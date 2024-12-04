import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Checkbox } from "@mui/material";
import { applyForApplication } from "../../../redux/applicationRelated/applicationHandle";
import TableTemplate from "../../../components/TableTemplate";

const AdminApplication = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const { applicationList, loading, error, response } = useSelector(
    (state) => state.application
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(applyForApplication(currentUser._id));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const applicationColumns = [
    { id: "user", label: "User", minWidth: 170 },
    { id: "Application", label: "Application", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const applicationRows =
    applicationList &&
    applicationList.length > 0 &&
    applicationList.map((application) => {
      const date = new Date(application.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        user: application.user.name,
        application: application.application,
        date: dateString,
        id: application._id,
      };
    });

  const ApplicationButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox {...label} />
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              No Application Right Now
            </Box>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(applicationList) && applicationList.length > 0 && (
                <TableTemplate
                  buttonHaver={ApplicationButtonHaver}
                  columns={applicationColumns}
                  rows={applicationRows}
                />
              )}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default AdminApplication;
