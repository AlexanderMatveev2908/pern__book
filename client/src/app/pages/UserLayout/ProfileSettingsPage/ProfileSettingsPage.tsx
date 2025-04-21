import { Title } from "@/components/components";
import UserProfile from "@/features/UserLayout/UserProfile/UserProfile";
import { useScroll } from "@/hooks/hooks";
import ProfileCtxProvider from "./ProfileCtx/ProfileCtxProvider";

const ProfileSettingsPage = () => {
  useScroll();

  return (
    <ProfileCtxProvider>
      <div className="parent__page txt__col">
        <Title {...{ title: "my profile" }} />
        <UserProfile />
      </div>
    </ProfileCtxProvider>
  );
};
export default ProfileSettingsPage;
