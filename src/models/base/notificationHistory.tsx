import { Camera, convertResponseToCamera } from "./camera";
import { convertResponseToEmployee, Employee } from "./employee";
import { convertResponseToMetadata, Metadata } from "./metadata";
import { convertResponseToNotificationMethod, NotificationMethod } from "./notificationMethod";
import {
  AreaRestriction,
  convertResponseToAreaRestriction,
} from "../area-restriction/areaRestriction";
import { convertResponseToLocation } from "./location";

export interface NotificationHistory {
  id: number;
  type: string;
  time: string;
  camera: Camera | null;
  areaRestriction: AreaRestriction | null;
  employee: Employee | null;
  image: Metadata | null;
  status: string;
  notificationMethod: NotificationMethod | null;
  location: Location | null;
}

export const convertResponseToNotificationHistory = (response: any) => ({
  id: response.id,
  type: response.type,
  time: response.time,
  camera: response.camera ? convertResponseToCamera(response.camera) : null,
  areaRestriction: response.area_restriction
    ? convertResponseToAreaRestriction(response.area_restriction)
    : null,
  employee: response.employee ? convertResponseToEmployee(response.employee) : null,
  image: response.image ? convertResponseToMetadata(response.image) : null,
  status: response.status,
  notificationMethod: response.notification_method
    ? convertResponseToNotificationMethod(response.notification_method)
    : null,
  location: response.location ? convertResponseToLocation(response.location) : null,
});
