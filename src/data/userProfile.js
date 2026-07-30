import defaultProfileImage from "../assets/images/mypage/profile.avif";

export const USER_PROFILE_STORAGE_KEY = "layer-user-profile";
export const DEFAULT_USER_PROFILE = {
  nickname: "북극곰",
  image: defaultProfileImage,
};

export function getUserProfile() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(USER_PROFILE_STORAGE_KEY) ?? "null",
    );
    return {
      nickname: stored?.nickname?.trim() || DEFAULT_USER_PROFILE.nickname,
      image: stored?.image || DEFAULT_USER_PROFILE.image,
    };
  } catch {
    return DEFAULT_USER_PROFILE;
  }
}

export function saveUserProfile(profile) {
  const nextProfile = {
    nickname: profile.nickname?.trim() || DEFAULT_USER_PROFILE.nickname,
    image: profile.image || DEFAULT_USER_PROFILE.image,
  };
  localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
  return nextProfile;
}
