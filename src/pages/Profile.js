import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "state/ducks/profile/actions";
import ProfileDescription from "./components/ProfileDescription";

const Profile = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.profile);

  useEffect(() => {
    console.log(id);
    dispatch(getProfile(id));
  }, [id, dispatch]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{id} - Uniti</title>
      </Helmet>
      <div class="container-fluid">
        <div class="row">
          <div
            class="col col-12 text-center p-1"
            style={{ backgroundColor: "#000000" }}
          >
            <a
              href={`https://${process.env.REACT_APP_URL}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                style={{ height: "60px" }}
                alt=""
              />
            </a>
          </div>
        </div>
        <div class="row justify-content-md-center">
          <div class="col col-md-4">
            {details && <ProfileDescription profile={details} key={details} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
