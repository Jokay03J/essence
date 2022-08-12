import { Button } from "@mui/material";
import React from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import superagent from "superagent";

const GeolocationButton = ({ onClick }) => {
  const Submit = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;

      console.log(`précision : ${crd.accuracy}`);
      superagent
        .get(
          `${process.env.REACT_APP_URL_API}/weather?lat=${crd.latitude}&lon=${crd.longitude}`
        )
        .then((response) => {
          if (!response.body || response.body.length === 0) return;
          onClick(response.body[0]["name"].toLowerCase());
        })
        .catch((error) => {
          console.log(error);
          alert("Service momentanément indisponible");
        });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ m: 1, minHeight: 60 }}
        onClick={() => Submit()}
      >
        <MyLocationIcon />
      </Button>
    </div>
  );
};

export default GeolocationButton;
