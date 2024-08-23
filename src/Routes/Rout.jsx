import { Routes, Route } from "react-router-dom";

import App from "../App.jsx";
import FeedPage from "./FeedPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import UserProfilePage from "./UserProfilePage.jsx";
import FollowingPage from "./FollowingPage.jsx";
import FollowersPage from "./FollowersPage.jsx";
import UserFollowingPage from "./UserFollowingPage.jsx";
import UserFollowersPage from "./UserFollowersPage.jsx";
import ProfileSettingsPage from "./ProfileSettingsPage.jsx";
import PasswordSettingsPage from "./PasswordSettingsPage.jsx";
import EmailSettingsPage from "./EmailSettingsPage.jsx";

const Rout = () => {
  return (
    <Routes>
      <Route index element={<App />}></Route>
      <Route path="/feed" element={<FeedPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/profile/:id" element={<UserProfilePage />}></Route>
      <Route path="/following" element={<FollowingPage />}></Route>
      <Route path="/followers" element={<FollowersPage />}></Route>
      <Route
        path="/profile/:id/following"
        element={<UserFollowingPage />}
      ></Route>
      <Route
        path="/profile/:id/followers"
        element={<UserFollowersPage />}
      ></Route>
      <Route
        path="/settings/profile"
        element={<ProfileSettingsPage />}
      ></Route>
      <Route
        path="/settings/password"
        element={<PasswordSettingsPage />}
      ></Route>
      <Route path="/settings/email" element={<EmailSettingsPage />}></Route>
    </Routes>
  );
};

export default Rout;
