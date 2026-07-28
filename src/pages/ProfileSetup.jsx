import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnBig, BtnGo, CommunityEnter } from "../components/common";
import addPhoto from "../assets/icons/add-photo.svg";
import characterLay from "../assets/images/character-lay.png";

// 피그마: 프로필 만들기 (3312:14955)
export default function ProfileSetup() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-107.5 flex-col bg-background px-5 pb-20.5 pt-3">
      <div className="flex justify-end">
        <BtnGo variant="more" onClick={() => navigate("/onboarding/skip")}>
          건너뛰기
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
          <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute left-1/2 top-1/2 h-17.5 w-[47.994px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              <img
                src={characterLay}
                alt=""
                className="absolute left-[-60.7%] top-[-21.26%] h-[147.6%] w-[220.96%] max-w-none"
              />
            </div>
          </div>
          <button
            type="button"
            aria-label="프로필 사진 등록"
            className="absolute left-20.5 top-23 size-7"
          >
            <img src={addPhoto} alt="" className="size-7" />
          </button>
        </div>

        <CommunityEnter
          variant="title"
          label="닉네임"
          required
          maxLength={null}
          placeholder="사용할 닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mt-5"
        />
      </div>

      <BtnBig
        onClick={() => {
          sessionStorage.removeItem("layer-onboarding-result-path");
          navigate("/onboarding");
        }}
      >
        내 향수유형 알아보기
      </BtnBig>
    </div>
  );
}
