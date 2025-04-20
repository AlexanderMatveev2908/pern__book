import { Title } from "@/components/components";
import UserProfile from "@/features/UserLayout/UserProfile/UserProfile";

const ProfileSettingsPage = () => {
  return (
    <div className="parent__page txt__col">
      <Title {...{ title: "my profile" }} />
      <UserProfile />
    </div>
  );
};
export default ProfileSettingsPage;
