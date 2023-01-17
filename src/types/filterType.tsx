import { Employee } from "../models/base/employee";
import { Shift } from "../models/time-keeping/shift";
import { AreaRestriction } from "../models/area-restriction/areaRestriction";
import { User } from "../models/base/user";
import { Location } from "../models/base/location";

export type EmployeeFilterType = {
  status: string | null;
  manager: Employee | null;
  shifts?: Array<Shift> | null;
  pageSize: number;
  search: string;
  page: number;
};

export type CameraFilterType = {
  areaRestriction: AreaRestriction | null;
  location: Location | null;
  status: string | null;
  pageSize: number;
  search: string;
  page: number;
  type: string;
};

export type UserFilterType = {
  status: string | null;
  pageSize: number;
  search: string;
  page: number;
  roleName: string | null;
};

export type NotificationHistoryFilterType = {
  employee: Employee | null;
  areaRestriction: AreaRestriction | null;
  status: string | null;
  pageSize: number;
  page: number;
  valueTab: number;
};

export type InOutHistoryFilterType = {
  employeeChoosed: Employee | null;
  pageSize: number;
  page: number;
};

export type OrganizationFilterType = {
  pageSize: number;
  search: string;
  page: number;
};

export type LocationFilterType = {
  pageSize: number;
  search: string;
  page: number;
};

export type AreaRestrictionFilterType = {
  pageSize: number;
  search: string;
  page: number;
};

export type UserLogFilterType = {
  accountChoosed: User | null;
  pageSize: number;
  search: string;
  page: number;
};

export const initEmployeeFilter = {
  status: "Đang hoạt động",
  manager: null,
  shifts: null,
  pageSize: 10,
  search: "",
  page: 0,
};

export const initCameraFilter = {
  areaRestriction: null,
  location: null,
  pageSize: 10,
  search: "",
  status: "Đang hoạt động",
  page: 0,
  type: "",
};

export const initUserFilter = {
  status: "Đang hoạt động",
  pageSize: 10,
  search: "",
  page: 0,
  roleName: null,
};

export const initNotificationHistoryFilter = {
  employee: null,
  areaRestriction: null,
  status: "Chưa xử lý",
  pageSize: 10,
  page: 0,
  valueTab: 0,
};

export const initInOutHistoryFilter = {
  employeeChoosed: null,
  pageSize: 10,
  page: 0,
};

export const initOrganizationFilter = {
  pageSize: 10,
  search: "",
  page: 0,
};

export const initAreaRestrictionFilter = {
  pageSize: 10,
  search: "",
  page: 0,
};

export const initLocationFilter = {
  pageSize: 10,
  search: "",
  page: 0,
};

export const initUserLogFilter = {
  accountChoosed: null,
  pageSize: 10,
  search: "",
  page: 0,
};
