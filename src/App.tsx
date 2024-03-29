import { useState } from "react";
import Content from "./component/content";
import SideBar from "./component/sidebar";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  function changeLanguage(lng: any) {
    i18n.changeLanguage(lng);
  }
  const [isToggleSideBar, setIsToggleSideBar] = useState(false);

  return (
    <div className="App" style={{ display: "flex" }}>
      <SideBar
        isToggleSideBar={isToggleSideBar}
        onToggleSideBar={() => setIsToggleSideBar(!isToggleSideBar)}
      />
      <Content isToggleSideBar={isToggleSideBar} />
      <button onClick={() => changeLanguage("en")}>{t("English")}</button>
      <button onClick={() => changeLanguage("vn")}>{t("VietNam")}</button>
    </div>
  );
}

export default App;
