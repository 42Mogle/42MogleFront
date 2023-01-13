import React from "react";
import apiManager from "../api/apiManager.js";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useStore from "../store.js";
import jwt_decode from "jwt-decode";
const HTTP_STATUS = require("http-status");

const Auth = () => {
  const { setIntraId, _isClickedPasswordReset } = useStore((state) => state);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        if (_isClickedPasswordReset === true) {
          try {
            const response = await apiManager.get(
              `/serverAuth/42oauth/jwt/?code=${token}`
            );
            if (response.status === HTTP_STATUS.OK) {
              const decodedToken = jwt_decode(response.data);
              setIntraId(decodedToken.intraId);
              localStorage.setItem("accessToken", response.data);
              navigate("/reset-password");
            }
          } catch (error) {
            console.log(error.response);
            navigate("/", { state: error.response });
          }
        } else {
          try {
            const response = await apiManager.get(
              `/serverAuth/firstJoin/?code=${token}`
            );
            if (response.status === HTTP_STATUS.OK) {
              setIntraId(response.data.intraId);
              navigate("/signup", { state: response.data });
            }
          } catch (error) {
            console.log(error.response);
            navigate("/", { state: error.response });
          }
        }
      }
    })();
  }, []);

  return (
    <>
      <CircularProgress sx={{ mb: 3 }} />
      <Typography>모닝글로리와 함께 아침을 맞이하는 중입니다!</Typography>
    </>
  );
};

export default Auth;
