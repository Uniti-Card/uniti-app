import React from 'react';
import LeadCapture from './LeadCapture';
import ProfileCard from './ProfileCard';

const ProfileDescription = ({ details }) => {
  if (details.direct !== '' && details.direct !== undefined) {
    const platforms = details.personal.platforms.concat(
      details.business.platforms
    );
    const platform = platforms.find(({ id }) => id === details.direct);
    var urlString =
      platform.type === 'url' && !platform.value.startsWith('http')
        ? 'https://' + platform.value
        : platform.webBaseURL + platform.value;
    console.log(urlString);
    window.open(urlString, '_self');
  }
  return (
    <>
      {details.direct !== '' && details.direct !== undefined ? (
        <>Direct On</>
      ) : (
        <div className="">
          <ProfileCard
            profile={details.isPersonal ? details.personal : details.business}
          />
          <LeadCapture details={details} />
        </div>
      )}
    </>
  );
};

export default ProfileDescription;
