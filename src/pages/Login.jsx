import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BtnBig, LoginInput } from "../components/common";
import appleIcon from "../assets/icons/social-apple.png";
import googleIcon from "../assets/icons/social-google.png";
import kakaoIcon from "../assets/icons/social-kakao.png";
import naverIcon from "../assets/icons/social-naver.png";

// 피그마: 로그인화면 (3312:15251)
const SOCIAL = [
  { key: "google", label: "구글로 로그인", icon: googleIcon },
  { key: "naver", label: "네이버로 로그인", icon: naverIcon },
  { key: "kakao", label: "카카오로 로그인", icon: kakaoIcon },
  { key: "apple", label: "애플로 로그인", icon: appleIcon },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-background">
      {/* 피그마 wrap: 높이 647, 내용은 세로 중앙에서 17.5px 위로 → pb-8.75 */}
      <div className="flex h-161.75 flex-col items-center justify-center gap-15 px-5 pb-8.75">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="font-en text-en-logo-48 text-offblack">LAYER</p>
          <p className="w-38.5 text-center text-subtitle-regular-16 leading-none text-offblack">
            향이 겹쳐, 취향이 되는 곳
          </p>
        </div>

        <div className="flex w-full flex-col gap-12.5">
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
            <LoginInput
              label="이메일"
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInput
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BtnBig type="submit">로그인</BtnBig>
          </form>

          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex items-center justify-center gap-5">
              {SOCIAL.map(({ key, label, icon }) => (
                <button key={key} type="button" aria-label={label} className="size-11 shrink-0">
                  <img src={icon} alt="" className="size-11" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1">
              <Link to="/find-account" className="text-caption-medium-12 text-subtext">
                이메일·비밀번호찾기
              </Link>
              {/* TODO 피그마 ko/Regular/10 스타일 미등록 → 등록되면 토큰으로 교체 */}
              <span aria-hidden className="text-[10px] leading-none text-subtext">
                |
              </span>
              <Link to="/signup" className="text-caption-medium-12 text-subtext">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
