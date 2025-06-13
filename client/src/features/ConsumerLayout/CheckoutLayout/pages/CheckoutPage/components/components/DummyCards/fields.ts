import {
  FaCcMastercard,
  FaCcVisa,
  FaCircle,
  FaLock,
  FaRegCalendarTimes,
} from "react-icons/fa";
import { MdError, MdMoneyOff } from "react-icons/md";
import { v4 } from "uuid";

export const dummyCards = [
  {
    label: "Visa",
    icon: FaCcVisa,
    txt: "4242 4242 4242 4242",
    customStyleParent: "text-green-600",
  },
  {
    label: "Mastercard",
    icon: FaCcMastercard,
    txt: "5555 5555 5555 4444",
    customStyleParent: "text-green-600",
  },
  {
    label: "Wrong CVC",
    icon: MdError,
    txt: "4000 0000 0000 0127",
    customStyleParent: "text-red-600",
  },
  {
    label: "Insufficient funds",
    icon: MdMoneyOff,
    txt: "4000 0000 0000 9995",
    customStyleParent: "text-red-600",
  },
  {
    label: "Expired card",
    icon: FaRegCalendarTimes,
    txt: "4000 0000 0000 0069",
    customStyleParent: "text-red-600",
  },
  {
    label: "Stolen card",
    icon: FaLock,
    txt: "4000 0000 0000 9979",
    customStyleParent: "text-red-600",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));

export const legend = [
  {
    spanInfo: {
      icon: FaCircle,
      label: "Success operation",
    },
    customStyleIcon: "text-green-600",
  },
  {
    spanInfo: {
      icon: FaCircle,
      label: "Fail operation",
    },
    customStyleIcon: "text-red-600",
  },
].map((el) => ({ ...el, id: v4() }));
