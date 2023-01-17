import { Autocomplete, Icon, Popper, TextField } from "@mui/material";
import MDBox from "components/bases/MDBox";
import MDButton from "components/bases/MDButton";
import FilterItem from "components/customizes/FilterItem";
import { hideLoading, showLoading, useSnackbarController } from "context/snackbarContext";
import { updateFilterUser, useUserController } from "context/userContext";
import React, { useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { Role } from "../../../../models/base/role";
import { useAuthenController } from "../../../../context/authenContext";
import { isSuperAdmin, isSuperAdminOrganization } from "../../../../utils/checkRoles";
import RoleAutoComplete from "../../role/components/RoleAutoComplete";
import convertEllipsisCharacter from "../../../../components/customizes/ConvertEllipsisCharacter";
import { PENDING_TYPE } from "../../../../constants/app";

export function FilterFormUser(pageSize: number, search: string) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userStatusChooses, setUserStatusChooses] = useState<string | null>(null);
  const [roleChooses, setRoleChooses] = useState<Array<Role>>([]);

  // @ts-ignore
  const [userController, userDispatch] = useUserController();
  const [userStatusConfirm, setUserStatusConfirm] = useState<string | null>(
    userController.filter.status
  );

  const [roleConfirm, setRoleConfirm] = useState<Array<Role> | null>(null);

  const getOptionTypeStatus = () => ["Đang hoạt động", "Đã xóa", "Đang chờ xác nhận"];

  // @ts-ignore
  const [, snackbarDispatch] = useSnackbarController();

  // @ts-ignore
  const [authController] = useAuthenController();
  const handleCloseMenu = () => {
    // reset default value when click cancel button, update value when click accept button
    setUserStatusChooses(userStatusConfirm ? userStatusConfirm : null);
    setRoleChooses(roleConfirm ? roleConfirm : []);
    setAnchorEl(null);
  };

  const submitChange = (statusChoosed: string | null, roleNameChoosed: Array<Role | null>) => {
    let filter: {
      status: string | null;
      pageSize: number;
      search: string;
      roleName: Role | null;
    } = {
      status: null,
      pageSize: 10,
      search: "",
      roleName: null,
    };
    if (statusChoosed) {
      setUserStatusConfirm(statusChoosed);
      filter = { ...filter, status: statusChoosed, pageSize, search };
    } else {
      setUserStatusConfirm(null);
      filter = { ...filter, status: "", pageSize, search };
    }
    if (roleNameChoosed !== null && roleNameChoosed.length > 0) {
      // @ts-ignore
      setRoleConfirm(roleNameChoosed);
      filter = {
        ...filter,
        // @ts-ignore
        roleName: roleNameChoosed
          ? `${roleNameChoosed.map((role) => `${role}`).join(",")}`
          : `${roleNameChoosed}`,
        pageSize,
        search,
      };
    } else {
      filter = {
        ...filter,
        // @ts-ignore
        roleName: null,
        pageSize,
        search,
      };
    }
    updateFilterUser(userDispatch, filter);

    setAnchorEl(null);
  };

  useEffect(() => {
    if (userStatusConfirm === null && userStatusChooses) {
      setUserStatusChooses(null);
    }
    if (roleConfirm === null) {
      setRoleChooses([]);
    }
  }, [userStatusConfirm, roleConfirm]);

  // handle add success show all account pending
  useEffect(() => {
    if (userController.filter.status === PENDING_TYPE) {
      setUserStatusChooses(PENDING_TYPE);
      setUserStatusConfirm(PENDING_TYPE);
    }
  }, [userController.filter.status]);

  // Close popper when click outside
  const [isOpen, setIsOpen] = useState(true);
  const onFocusTrapDeactivate = () => {
    setIsOpen(false);
    setAnchorEl(null);
    setIsOpen(true);
  };

  const renderChangeAreaRestrictionForm = (): React.ReactElement => (
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
        <MDBox display="block" style={{ marginTop: "16px", width: "32vh" }}>
          <Autocomplete
            value={userStatusChooses}
            key="fields_status"
            onChange={(event, newOptions) => setUserStatusChooses(newOptions)}
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
            sx={{ marginBottom: "16px" }}
          />
          {(isSuperAdmin(authController.currentUser) ||
            isSuperAdminOrganization(authController.currentUser)) && (
            <RoleAutoComplete
              type="autocomplete-multiple"
              label="Quyền"
              handleChoose={setRoleChooses}
              defaultData={roleChooses}
            />
          )}

          <MDBox mt={1} mb={1} display="flex">
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={(event: any) => {
                event.stopPropagation();
                showLoading(snackbarDispatch);
                submitChange(userStatusChooses, roleChooses);
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
      {userStatusConfirm && (
        <FilterItem
          value={`${userStatusConfirm}`}
          handleClose={() => {
            // @ts-ignore
            submitChange(null, roleConfirm);
          }}
        />
      )}
      {roleConfirm &&
        roleConfirm.map((item: any) => (
          <FilterItem
            // @ts-ignore
            value={convertEllipsisCharacter(item, 10)}
            handleClose={() => {
              submitChange(
                userStatusConfirm,
                roleConfirm?.filter((temp) => temp !== item)
              );
            }}
          />
        ))}
      <Icon
        fontSize="small"
        style={{ cursor: "pointer" }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          handleCloseMenu();
          setAnchorEl(anchorEl ? null : event.currentTarget);
        }}
      >
        filter_list
      </Icon>
      {renderChangeAreaRestrictionForm()}
    </MDBox>
  );
}
