import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLinks } from "state/ducks/link/actions";
import { getProducts } from "state/ducks/product/actions";
import LeadCapture from "./LeadCapture";
import ProfileCard from "./ProfileCard";

const ProfileDescription = ({ profile }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.directOn) {
      const link = profile.direct;
      var urlString =
        link.platform.type === "url" && !link.value.startsWith("http")
          ? "https://" + link.value
          : link.platform.webBaseURL + link.value;
      window.open(urlString, "_self");
    } else {
      dispatch(getLinks(profile.id));
      dispatch(getProducts(profile.id));
    }
  }, [profile, dispatch]);

  return (
    <>
      {profile.directOn ? (
        <>Direct On</>
      ) : (
        <div className="">
          <ProfileCard profile={profile} />
          <LeadCapture profile={profile} />
        </div>
      )}
    </>
  );
};

export default ProfileDescription;
