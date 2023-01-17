// @ts-ignore
import Audio from "assets/audios/canh_bao.mp3";
// @ts-ignore
import VideoTourStep3 from "assets/video/VideoStep4HD.mp4";

const SUCCESS_TYPE = "success";
const ERROR_TYPE = "error";
const INFO_TYPE = "info";
const CREATE_LABEL = "Thêm";
const UPDATE_LABEL = "Cập nhật";
const SIGN_IN_LABEL = "Đăng nhập";
const CHANGE_PASSWORD_LABEL = "Thay đổi mật khẩu";

const ROLE_SUPER_ADMIN = "Super Admin";
const ROLE_SUPER_ADMIN_ORGANIZATION = "Super Admin Organization";

const ROLE_TIME_KEEPING_ADMIN = "Admin Quản lý chấm công";
const ROLE_TIME_KEEPING_USER = "Cán bộ Quản lý chấm công";
const ROLE_AREA_RESTRICTION_ADMIN = "Admin Kiểm soát khu vực hạn chế";
const ROLE_AREA_RESTRICTION_USER = "Cán bộ Kiểm soát khu vực hạn chế";
const ROLE_BEHAVIOR_ADMIN = "Admin Kiểm soát hành vi";
const ROLE_BEHAVIOR_USER = "Cán bộ Kiểm soát hành vi";

const DELETE_CONFIRM_TITLE = "Xác nhận xóa";
const DELETE_CONFIRM_CONTENT = "Bạn có chắc chắn muốn xóa không?";
const DELETE_SUCCESS = "Xóa thành công";
const DELETE_ERROR = "Xóa thất bại";

const ADD_SUCCESS = "Thêm thành công";

const UPDATE_SUCCESS = "Cập nhật thành công";
const UPDATE_ERROR = "Cập nhật thất bại";

const EDIT_TYPE = "edit";
const DELETE_TYPE = "delete";
const VIEW_TYPE = "view";
const SETTING_TYPE = "setting";
const USER_ATTENDANCE_TYPE = "view user attendance";
const RE_SEND_CODE_TYPE = "resend code";
const VIEW_IMAGE_TYPE = "view_image";

const SERVER_ERROR = "Có lỗi xảy ra, vui lòng thực hiện lại sau!";
const CHANGE_PASSWORD_SUCCESS = "Thay đổi mật khẩu thành công";
const LOGIN_SUCCESS = "Đăng nhập thành công";

const CAMERA_ORDER_CONFIG_LOCAL_STORAGE = "cameraOrderConfig";
const CAMERA_STARTED_LOCAL_STORAGE = "cameraStartedConfig";
const CAMERA_STREAM_LIST_LOCAL_STORAGE = "cameraStreamList";

const MAX_NUMBER_CAM_SHOW = process.env.REACT_APP_MAX_NUMBER_CAM_SHOW || "6";
const RING_URL = process.env.REACT_APP_RING_URL || Audio;

const MODULE_TIME_KEEPING_TYPE = "time_keeping";
const MODULE_AREA_RESTRICTION_TYPE = "area_restriction";
const MODULE_BEHAVIOR_TYPE = "behavior";

const MODULE_TIME_KEEPING_NAME = "Quản lý chấm công";
const MODULE_AREA_RESTRICTION_NAME = "Kiểm soát khu vực hạn chế";
const MODULE_BEHAVIOR_NAME = "Kiểm soát hành vi";

const QR_CODE_IMAGE_URL = process.env.REACT_APP_QR_CODE_IMAGE_URL || "";
const FORCE_UPDATE_EMPLOYEE_TITLE = "Xác nhận cập nhật";
const FORCE_UPDATE_EMPLOYEE_CONTENT = "Mã nhân viên đã tồn tại, bạn có muốn cập nhật thông tin?";

const DELETED_TYPE = "Đã xóa";
const ACTIVE_TYPE = "Đang hoạt động";
const PENDING_TYPE = "Đang chờ xác nhận";

const SET_EXPIRY_LOCAL_STORAGE = 1000 * 60 * 60 * 24 * 7;

const NUMBER_CAMERA_SHOW_DEFAULT = process.env.REACT_APP_NUMBER_CAMERA_SHOW_DEFAULT || "0";

const DASHBOARD_STATUS_TOUR = "isTour";

const RTC_CONFIGURATION = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const VIDEO_TOUR_STEP_3 = VideoTourStep3;

const CAMERA_LIST_ID_LOCAL_STORAGE = "cameraListId";

const CAMERA_LIST_AFTER_SCROLL_LOCAL_STORAGE = "cameraListAfterScroll";

const OLD_PASSWORD_NOT_CORRECT = "Mật khẩu cũ không chính xác";

const USER_NAME_OR_PASSWORD_NOT_CORRECT = "Tên đăng nhập hoặc mật khẩu không đúng";

// title table
const CAMERA_TABLE_TITLE = "Danh sách camera";
const EMPLOYEE_TABLE_TITLE = "Danh sách nhân sự";
const AREA_RESTRICTION_TABLE_TITLE = "Danh sách KVHC";
const IN_OUT_HISTORY_TABLE_TITLE = "Lịch sử vào ra";
const ORGANIZATION_TABLE_TITLE = "Danh sách tổ chức";
const USER_TABLE_TITLE = "Danh sách người dùng";
const FEATURE_TABLE_TITLE = "Danh sách tính năng";
const NOTIFICATION_HISTORIES_TABLE_TITLE = "Lịch sử cảnh báo";
const LOG_TABLE_TITLE = "Danh sách log";
const LOCATIONS_TABLE_TITLE = "Danh sách chi nhánh";
const IN_OUT_TABLE_TITLE = "Danh sách chấm công";

// message error
const SEND_CODE_SUCCESS = "Đã gửi lại mã, vào mail để kiểm tra.";

// convert ellipsis character
const STRING_MAX_LENGTH = 30;
const STRING_LONG_LENGTH = 25;
const STRING_SHORT_LENGTH = 13;
const STRING_LONG_LENGTH_FOR_CAMERA = 24;
// convert ellipsis character for filter
const STRING_LONG_LENGTH_FILTER = 25;
const STRING_SHORT_LENGTH_FILTER = 8;
// convert ellipsis character for Autocomplete
const STRING_SHORT_LENGTH_AUTOCOMPLETE = 25;
// convert ellipsis character for my profile
const STRING_LONG_LENGTH_MY_PROFILE = 40;
// info organization
const STRING_LONG_INFO_ORGANIZATION = 35;
const STRING_LONG_INFO_USER = 40;
const STRING_LONG_LENGTH_LOCATION = 40;
const STRING_LONG_LENGTH_AREA_RESTRICTION = 40;
const STRING_LONG_LENGTH_EMPLOYEES = 40;

const STRING_LONG_LENGTH_CAMERA = 40;
// convert ellipsis character for employee
const STRING_LONG_LENGTH_EMPLOYEE = 10;
const INVALID_TIME = "INVALID_TIME";
const EMPTY_TIME = "EMPTY_TIME";
const MAX_LENGTH_NUMBER = 2147483647;
const MAX_LENGTH_STRING = 255;
const MAX_LENGTH_STRING_FOR_DESCRIPTION = 500;

export {
  SUCCESS_TYPE,
  ERROR_TYPE,
  INFO_TYPE,
  CREATE_LABEL,
  UPDATE_LABEL,
  SIGN_IN_LABEL,
  CHANGE_PASSWORD_LABEL,
  ROLE_SUPER_ADMIN,
  ROLE_TIME_KEEPING_ADMIN,
  ROLE_TIME_KEEPING_USER,
  ROLE_AREA_RESTRICTION_ADMIN,
  ROLE_AREA_RESTRICTION_USER,
  ROLE_BEHAVIOR_ADMIN,
  ROLE_BEHAVIOR_USER,
  DELETE_CONFIRM_TITLE,
  DELETE_CONFIRM_CONTENT,
  DELETE_SUCCESS,
  DELETE_ERROR,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  EDIT_TYPE,
  DELETE_TYPE,
  VIEW_TYPE,
  SERVER_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  LOGIN_SUCCESS,
  ROLE_SUPER_ADMIN_ORGANIZATION,
  CAMERA_ORDER_CONFIG_LOCAL_STORAGE,
  SETTING_TYPE,
  CAMERA_STARTED_LOCAL_STORAGE,
  MAX_NUMBER_CAM_SHOW,
  ADD_SUCCESS,
  MODULE_AREA_RESTRICTION_TYPE,
  MODULE_TIME_KEEPING_TYPE,
  MODULE_BEHAVIOR_TYPE,
  USER_ATTENDANCE_TYPE,
  RING_URL,
  QR_CODE_IMAGE_URL,
  FORCE_UPDATE_EMPLOYEE_CONTENT,
  FORCE_UPDATE_EMPLOYEE_TITLE,
  ACTIVE_TYPE,
  PENDING_TYPE,
  DELETED_TYPE,
  RE_SEND_CODE_TYPE,
  SET_EXPIRY_LOCAL_STORAGE,
  NUMBER_CAMERA_SHOW_DEFAULT,
  VIEW_IMAGE_TYPE,
  RTC_CONFIGURATION,
  DASHBOARD_STATUS_TOUR,
  CAMERA_STREAM_LIST_LOCAL_STORAGE,
  VIDEO_TOUR_STEP_3,
  CAMERA_LIST_ID_LOCAL_STORAGE,
  CAMERA_LIST_AFTER_SCROLL_LOCAL_STORAGE,
  OLD_PASSWORD_NOT_CORRECT,
  CAMERA_TABLE_TITLE,
  EMPLOYEE_TABLE_TITLE,
  AREA_RESTRICTION_TABLE_TITLE,
  IN_OUT_HISTORY_TABLE_TITLE,
  ORGANIZATION_TABLE_TITLE,
  USER_TABLE_TITLE,
  FEATURE_TABLE_TITLE,
  NOTIFICATION_HISTORIES_TABLE_TITLE,
  LOG_TABLE_TITLE,
  LOCATIONS_TABLE_TITLE,
  SEND_CODE_SUCCESS,
  MODULE_TIME_KEEPING_NAME,
  MODULE_AREA_RESTRICTION_NAME,
  MODULE_BEHAVIOR_NAME,
  STRING_MAX_LENGTH,
  STRING_LONG_LENGTH,
  STRING_SHORT_LENGTH,
  STRING_LONG_LENGTH_FILTER,
  STRING_SHORT_LENGTH_FILTER,
  STRING_SHORT_LENGTH_AUTOCOMPLETE,
  USER_NAME_OR_PASSWORD_NOT_CORRECT,
  INVALID_TIME,
  EMPTY_TIME,
  STRING_LONG_LENGTH_MY_PROFILE,
  STRING_LONG_LENGTH_EMPLOYEE,
  MAX_LENGTH_NUMBER,
  MAX_LENGTH_STRING,
  MAX_LENGTH_STRING_FOR_DESCRIPTION,
  STRING_LONG_INFO_ORGANIZATION,
  STRING_LONG_INFO_USER,
  STRING_LONG_LENGTH_LOCATION,
  STRING_LONG_LENGTH_AREA_RESTRICTION,
  STRING_LONG_LENGTH_EMPLOYEES,
  STRING_LONG_LENGTH_CAMERA,
  STRING_LONG_LENGTH_FOR_CAMERA,
  IN_OUT_TABLE_TITLE,
};