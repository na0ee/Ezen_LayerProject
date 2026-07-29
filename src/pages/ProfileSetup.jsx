import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BtnBig,
  BtnGo,
  CommunityEnter,
  FeatureGuideCard,
} from "../components/common";
import addPhoto from "../assets/icons/add-photo.svg";
import characterLay from "../assets/images/character-lay.png";
import {
  DEFAULT_USER_PROFILE,
  getUserProfile,
  saveUserProfile,
} from "../data/userProfile";
import CameraCaptureModal from "../components/common/CameraCaptureModal";

function resizeProfileImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const size = 512;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        const cropSize = Math.min(image.width, image.height);
        const cropX = (image.width - cropSize) / 2;
        const cropY = (image.height - cropSize) / 2;
        context.drawImage(
          image,
          cropX,
          cropY,
          cropSize,
          cropSize,
          0,
          0,
          size,
          size,
        );
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

// 피그마: 프로필 만들기 (3312:14955)
export default function ProfileSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.mode === "edit";
  const returnTo = location.state?.returnTo || "/my";
  const [initialProfile] = useState(() =>
    isEditing ? getUserProfile() : { nickname: "", image: "" },
  );
  const [nickname, setNickname] = useState(initialProfile.nickname);
  const [profileImage, setProfileImage] = useState(initialProfile.image);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(
    () => document.documentElement.dataset.guideEnabled !== "false",
  );
  const [guideTop, setGuideTop] = useState(null);
  const photoInputRef = useRef(null);
  const pageRef = useRef(null);
  const nicknameRef = useRef(null);
  const guideRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleGuideChange = (event) => {
      setIsGuideOpen(Boolean(event.detail));
    };

    window.addEventListener("layer:guide-change", handleGuideChange);
    return () =>
      window.removeEventListener("layer:guide-change", handleGuideChange);
  }, []);

  useLayoutEffect(() => {
    if (!isGuideOpen) return undefined;

    const updateGuidePosition = () => {
      const page = pageRef.current;
      const nicknameField = nicknameRef.current;
      const guide = guideRef.current;
      const button = buttonRef.current;

      if (!page || !nicknameField || !guide || !button) return;

      const pageRect = page.getBoundingClientRect();
      const nicknameRect = nicknameField.getBoundingClientRect();
      const guideRect = guide.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const center =
        (nicknameRect.bottom + buttonRect.top) / 2 - pageRect.top;

      setGuideTop(center - guideRect.height / 2);
    };

    updateGuidePosition();
    const observer = new ResizeObserver(updateGuidePosition);
    [pageRef.current, nicknameRef.current, guideRef.current, buttonRef.current]
      .filter(Boolean)
      .forEach((element) => observer.observe(element));
    window.addEventListener("resize", updateGuidePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateGuidePosition);
    };
  }, [isGuideOpen]);

  return (
    <>
      {isGuideOpen && (
        <div className="feature-guide-overlay pointer-events-none fixed inset-0 z-[150] bg-black/55" />
      )}

      <div
        ref={pageRef}
        onPointerDown={() => setIsGuideOpen(false)}
        className="relative mx-auto flex min-h-dvh w-full max-w-107.5 flex-col bg-background px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[calc(12px+env(safe-area-inset-top))]"
      >
      <div className="flex justify-end">
        <BtnGo
          variant="more"
          onClick={() =>
            isEditing ? navigate(returnTo) : navigate("/onboarding/skip")
          }
        >
          {isEditing ? "닫기" : "건너뛰기"}
        </BtnGo>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-8">
        {/* title-box */}
        <div className="flex flex-col items-center gap-2.5">
          <p className="font-en text-en-semibold-24 text-offblack">Find my LAYER</p>
          <p className="text-center text-body-regular-14 text-grey">
            몇 가지 질문으로 당신만의 향 취향을 찾아드릴게요
          </p>
        </div>

        {/* proimg — 120px 원형 + 캐릭터 + 사진추가 버튼 */}
        <div className="relative mt-4.75 size-30 rounded-full bg-2light-grey">
          {profileImage ? (
            <img
              src={profileImage}
              alt="선택한 프로필"
              className="absolute inset-0 size-full rounded-full object-cover"
            />
          ) : (
          <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute left-1/2 top-1/2 h-17.5 w-[47.994px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              <img
                src={characterLay}
                alt=""
                className="absolute left-[-60.7%] top-[-21.26%] h-[147.6%] w-[220.96%] max-w-none"
              />
            </div>
          </div>
          )}
          <button
            type="button"
            aria-label="프로필 사진 등록"
            onClick={() => setIsCameraOpen(true)}
            className="absolute left-20.5 top-23 size-7"
          >
            <img src={addPhoto} alt="" className="size-7" />
          </button>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              try {
                setProfileImage(await resizeProfileImage(file));
              } catch {
                setProfileImage("");
              }
              event.target.value = "";
            }}
          />
        </div>

        <CameraCaptureModal
          open={isCameraOpen}
          onClose={() => setIsCameraOpen(false)}
          onCapture={setProfileImage}
          onChooseFile={() => photoInputRef.current?.click()}
        />

        <div ref={nicknameRef} className="relative z-[160] mt-5 w-full">
        <CommunityEnter
          variant="title"
          label="닉네임"
          required
          maxLength={null}
          placeholder="사용할 닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        </div>
      </div>

      {isGuideOpen && (
        <div
          ref={guideRef}
          className="absolute left-1/2 z-[160] -translate-x-1/2"
          style={{
            top: guideTop == null ? "70%" : `${guideTop}px`,
          }}
        >
          <FeatureGuideCard characterPosition="left" size="compact">
            반가워요! 먼저 프로필을 설정해 주세요.
            <br />
            설정을 마치면 나만의 향 취향을 찾는 테스트가 시작돼요.
            <br />
            테스트는 홈과 MY에서 언제든 다시 할 수 있어요.
          </FeatureGuideCard>
        </div>
      )}

      <div ref={buttonRef} className="relative z-[160]">
      <BtnBig
        onClick={() => {
          saveUserProfile({
            nickname: nickname || DEFAULT_USER_PROFILE.nickname,
            image: profileImage || DEFAULT_USER_PROFILE.image,
          });
          if (isEditing) {
            navigate(returnTo, { replace: true });
            return;
          }
          sessionStorage.removeItem("layer-onboarding-result-path");
          navigate("/onboarding");
        }}
      >
        {isEditing ? "프로필 저장하기" : "내 향수유형 알아보기"}
      </BtnBig>
      </div>
      </div>
    </>
  );
}
