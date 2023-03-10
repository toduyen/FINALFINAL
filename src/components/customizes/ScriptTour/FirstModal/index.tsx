import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import MDBox from "../../../bases/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../../../bases/MDTypography";
import MDButton from "../../../bases/MDButton";
import { useTour } from "@reactour/tour";
import { Setter } from "../StateTour/Setter";
import { Getter } from "../StateTour/Getter";
import { getIdUser } from "../../../../utils/helpers";
import { useAuthenController } from "../../../../context/authenContext";

export default function FirstModal() {
  // @ts-ignore
  const [authController] = useAuthenController();
  // open modal
  const [open, setOpen] = useState(true);
  // @ts-ignore
  const { setIsOpen } = useTour();
  // set value default
  useEffect(() => {
    if (Getter()?.STATUS_DASHBOARD === false) {
      setOpen(false);
    }
  }, []);

  // close tour
  const handleClose = () => {
    setOpen((prevState) => !prevState);
    Setter(false, false, false, getIdUser(authController));
  };
  // start tour
  const handleStartTour = () => {
    setIsOpen((prevState) => !prevState);
    setOpen((prevState) => !prevState);
    Setter(true, true, true, getIdUser(authController));
  };

  return (
    <MDBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox px={1} width="100%" height="105vh" mx="auto">
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={12} md={10} lg={10} xl={3.5}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h5" fontWeight="medium" color="white">
                    H?????ng d???n s??? d???ng
                  </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <MDBox display="flex" justifyContent="center" color="white">
                      <MDTypography variant="p" fontWeight="medium" fontSize="14px">
                        H??y ???n n??t Ti???p t???c n???u b???n mu???n ???????c h?????ng ?????n s??? d???ng nhanh.
                      </MDTypography>
                    </MDBox>
                    <MDBox mt={4} mb={1} display="flex">
                      <MDButton
                        variant="gradient"
                        color="error"
                        fullWidth
                        onClick={() => handleClose()}
                      >
                        B??? qua
                      </MDButton>
                      <MDBox sx={{ width: "30px" }} />
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={() => handleStartTour()}
                      >
                        Ti???p t???c
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
