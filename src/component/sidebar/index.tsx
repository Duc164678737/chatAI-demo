import {
  HomeOutlined,
  MenuOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import Sider, { SiderProps } from "antd/es/layout/Sider";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ISideBarProps extends SiderProps {
  isToggleSideBar: boolean;
  onToggleSideBar: () => void;
  classNameButton?: string;
}
const SideBar = ({
  isToggleSideBar,
  onToggleSideBar,
  classNameButton,
  ...otherProps
}: ISideBarProps) => {
  const { t } = useTranslation();

  return (
    <Sider
      collapsible
      collapsed={isToggleSideBar}
      trigger={null}
      {...otherProps}
    >
      <div className="logo" />
      <Button
        className="toggle-button"
        onClick={onToggleSideBar}
        style={{ position: "absolute", bottom: 16, left: 16 }}
      >
        <MenuOutlined />
      </Button>
      <Menu
        theme="dark"
        style={{ height: "100vh" }}
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          {/* <Link to={ "/"}>Home</Link> */}
          {t("Home")}
        </Menu.Item>
        <Menu.Item key="2" icon={<MessageOutlined />}>
          {/* <Link to="/chat">Chat</Link> */}
          {t("Chat")}
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          {/* <Link to="/profile">Profile</Link> */}
          {t("Profile")}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
