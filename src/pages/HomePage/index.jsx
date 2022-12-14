import React, { useState, useEffect } from "react";
import apiManager from "../../api/apiManager";
import AttendanceTable from "./AttendanceTable";
import AttendanceButton from "./AttendanceButton";
import SetTodayWordButton from "./SetTodayWordButton";
import UserProfile from "./UserProfile";
import TodayDate from "./TodayDate";
import AttendanceSummary from "./AttendanceSummary";
import Link from "@mui/material/Link";
import useStore from "../../store.js";

function Home() {
  const { _intraId, _photoUrl, setPhotoUrl } = useStore((state) => state);
  // TODO Home 컴포넌트가 여러 번 렌더링 되는 문제가 있음
  const [isOperator, setIsOperator] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await apiManager.get("/user/getUserInfo/");
      setPhotoUrl(response.data.photoUrl);
      if (response.data.isOperator) {
        setIsOperator(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <UserProfile intraId={_intraId} photoUrl={_photoUrl} />
      <TodayDate />
      <AttendanceTable>
        <AttendanceSummary />
      </AttendanceTable>
      <AttendanceButton />
      <Link
        href="https://forms.gle/1g3qm5RPLUgS3JDQ8"
        target="_blank"
        sx={{ mt: 3 }}
      >
        구글 출석폼에서도 입력 부탁드려용 ! →
      </Link>
      {isOperator && <SetTodayWordButton />}
    </>
  );
}

export default Home;
