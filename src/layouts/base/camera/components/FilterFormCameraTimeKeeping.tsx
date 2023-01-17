import { Autocomplete, Icon, Popper, TextField } from "@mui/material";
import MDBox from "components/bases/MDBox";
import MDButton from "components/bases/MDButton";
import FilterItem from "components/customizes/FilterItem";
import { updateFilterCamera, useCameraController } from "context/cameraContext";
import LocationAutocomplete from "layouts/base/location/components/LocationAutocomplete";
import { Location } from "models/base/location";
import React, { useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { CameraFilterType, initCameraFilter } from "../../../../types/filterType";
import {
  hideLoading,
  showLoading,
  useSnackbarController,
} from "../../../../context/snackbarContext";

export function FilterFormCameraTimeKeeping(pageSize: number, search: string) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locationChooses, setLocationChooses] = useState<Array<Location>>([]);
  const [locationConfirm, setLocationConfirm] = useState<Location | null>(null);
  const [cameraTypeChooses, setCameraTypeChooses] = useState<string | null>(null);
  const [cameraStatusChooses, setCameraStatusChooses] = useState<string | null>(null);

  // @ts-ignore
  const [cameraController, cameraDispatch] = useCameraController();
  const [cameraStatusConfirm, setCameraStatusConfirm] = useState<string | null>(
    cameraController.filter.status
  );
  const [cameraTypeConfirm, setCameraTypeConfirm] = useState<string | null>(
    cameraController.filter.type
  );
  // @ts-ignore
  const [, snackbarDispatch] = useSnackbarController();
  const handleCloseMenu = () => {
    setCameraStatusChooses(cameraStatusConfirm ? cameraStatusConfirm : null);
    setLocationChooses(locationConfirm ? [locationConfirm] : []);
    setCameraTypeChooses(cameraTypeConfirm ? cameraTypeConfirm : null);
    setAnchorEl(null);
  };
  const getOptionTypeStatus = () => ["Đang hoạt động", "Đã xóa"];
  const getOptionTypeCamera = () => ["Check in", "Check out"];

  const submitChange = (
    newLocationChooses: Array<Location | null>,
    statusChoosed: string | null,
    typeCameraChooses: string | null
  ) => {
    let filter: CameraFilterType = initCameraFilter;
    if (newLocationChooses.length > 0) {
      filter = {
        ...filter,
        location: newLocationChooses[0],
        pageSize,
        search,
      };
      setLocationConfirm(newLocationChooses[0]);
    } else {
      filter = { ...filter, location: null, pageSize, search };
      setLocationConfirm(null);
    }
    if (statusChoosed) {
      setCameraStatusConfirm(statusChoosed);
      filter = { ...filter, status: statusChoosed, pageSize, search };
    } else {
      setCameraStatusConfirm(null);
      filter = { ...filter, status: "", pageSize, search };
    }
    if (typeCameraChooses) {
      setCameraTypeConfirm(typeCameraChooses);
      filter = { ...filter, pageSize, search, type: typeCameraChooses };
    } else {
      setCameraTypeConfirm(null);
    }
    updateFilterCamera(cameraDispatch, filter);
    setAnchorEl(null);
  };

  // when remove result filter => text box filter remove
  useEffect(() => {
    if (cameraStatusConfirm === null) {
      setCameraStatusChooses(null);
    }
    if (locationConfirm === null) {
      setLocationChooses([]);
    }
    if (cameraTypeConfirm === null) {
      setCameraTypeChooses(null);
    }
  }, [cameraStatusConfirm, locationConfirm, cameraTypeConfirm]);

  useEffect(() => {
    if (cameraController.filter.status === null) {
      setCameraStatusConfirm("");
    } else {
      setCameraStatusConfirm(cameraController.filter.status);
    }
  }, [cameraStatusConfirm]);

  // Close popper when click outside
  const [isOpen, setIsOpen] = useState(true);
  const onFocusTrapDeactivate = () => {
    setIsOpen(false);
    setAnchorEl(null);
    setIsOpen(true);
  };

  const renderChangeLocationForm = (): React.ReactElement => (
    <Popper
      // @ts-ignore
      anchorEl={anchorEl}
      // @ts-ignore
      anchorReference={null}
      placement="bottom-start"
      open={Boolean(anchorEl)}
      style={{
        backgroundColor: "white",
        boxShadow: "0px 0px 12px 0px #000000",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      {/* @ts-ignore */}
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          clickOutsideDeactivates: true,
          onDeactivate: onFocusTrapDeactivate,
        }}
      >
        <MDBox display="block" style={{ marginTop: "16px" }}>
          <Autocomplete
            value={cameraTypeChooses}
            key="fields_type"
            onChange={(event, newOptions) => setCameraTypeChooses(newOptions)}
            disablePortal
            id="autocomplete_type"
            options={getOptionTypeCamera()}
            renderInput={(params) => <TextField {...params} label="Kiểu" />}
            ListboxProps={{ style: { maxHeight: "15rem" } }}
            onKeyDown={(event) => {
              if (event.code !== "Tab") {
                event.preventDefault();
              }
            }}
            filterOptions={(optionsFilter: any) => optionsFilter}
            sx={{ marginBottom: "16px" }}
          />
          <LocationAutocomplete
            type="autocomplete"
            label="Danh sách chi nhánh"
            handleChoose={(newLocationChooses) => {
              setLocationChooses(newLocationChooses);
            }}
            defaultData={locationChooses}
          />
          <Autocomplete
            value={cameraStatusChooses}
            key="fields_status"
            onChange={(event, newOptions) => setCameraStatusChooses(newOptions)}
            disablePortal
            id="autocomplete_status"
            options={getOptionTypeStatus()}
            renderInput={(params) => <TextField {...params} label="Trạng thái" />}
            ListboxProps={{ style: { maxHeight: "15rem" } }}
            onKeyDown={(event) => {
              if (event.code !== "Tab") {
                event.preventDefault();
              }
            }}
            filterOptions={(optionsFilter: any) => optionsFilter}
          />
          <MDBox mt={1} mb={1} display="flex">
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={(event: any) => {
                event.stopPropagation();
                showLoading(snackbarDispatch);
                submitChange(locationChooses, cameraStatusChooses, cameraTypeChooses);
                hideLoading(snackbarDispatch);
              }}
            >
              Xác nhận
            </MDButton>
            <MDBox sx={{ width: "30px" }} />
            <MDButton variant="gradient" color="error" fullWidth onClick={handleCloseMenu}>
              Hủy bỏ
            </MDButton>
          </MDBox>
        </MDBox>
      </FocusTrap>
    </Popper>
  );

  return (
    <MDBox display="flex" gap="10px" style={{ marginLeft: "10px", alignItems: "center" }}>
      {locationConfirm && (
        <FilterItem
          value={`${locationConfirm.code}-${locationConfirm.name}`}
          handleClose={() => {
            submitChange([], cameraStatusConfirm, cameraTypeConfirm);
          }}
        />
      )}
      {cameraStatusConfirm && (
        <FilterItem
          value={`${cameraStatusConfirm}`}
          handleClose={() => {
            submitChange(Array.of(locationConfirm), null, cameraTypeConfirm);
          }}
        />
      )}
      {cameraTypeConfirm && (
        <FilterItem
          value={`${cameraTypeConfirm}`}
          handleClose={() => {
            submitChange(Array.of(locationConfirm), cameraStatusConfirm, null);
          }}
        />
      )}
      <Icon
        fontSize="small"
        style={{ cursor: "pointer" }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          setLocationChooses(locationConfirm ? [locationConfirm] : []);
          setAnchorEl(anchorEl ? null : event.currentTarget);
        }}
      >
        filter_list
      </Icon>
      {renderChangeLocationForm()}
    </MDBox>
  );
}
