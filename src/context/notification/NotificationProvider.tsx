import { createContext, useContext, useEffect, FC, useState } from "react";
import { NotificationContext, NotificationProps } from "./types";
import { Toast } from "../../components";

const notificationContext = createContext<NotificationContext>({
  updateNotification: () => null,
});

const NotificationProvider: FC<NotificationProps> = ({ children }) => {
  const [notification, setNotification] = useState<string>();
  const [classes, setClasses] = useState<string>();
  const updateNotification = (type: string, value:string) => {
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "succes":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value)
    setTimeout(() => {
        setNotification('')
    }, 3000)
  };

  return (
    <notificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && <Toast notification={notification} classes={classes} />}
    </notificationContext.Provider>
  );
};

export const NotificationState = () => {
  return useContext(notificationContext);
};

export default NotificationProvider;
