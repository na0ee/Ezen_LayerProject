import { useEffect, useRef, useState } from "react";

let kakaoMapsPromise;

function loadKakaoMaps(appKey) {
  if (window.kakao?.maps?.services) {
    return Promise.resolve(window.kakao);
  }

  if (!kakaoMapsPromise) {
    kakaoMapsPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(
        'script[data-kakao-maps-sdk="true"]',
      );

      const initialize = () => {
        if (!window.kakao?.maps) {
          reject(new Error("카카오맵 SDK를 불러오지 못했습니다."));
          return;
        }
        window.kakao.maps.load(() => resolve(window.kakao));
      };

      if (existing) {
        existing.addEventListener("load", initialize, { once: true });
        existing.addEventListener(
          "error",
          () => reject(new Error("카카오맵 SDK 요청에 실패했습니다.")),
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.dataset.kakaoMapsSdk = "true";
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(
        appKey,
      )}&autoload=false&libraries=services`;
      script.addEventListener("load", initialize, { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("카카오맵 SDK 요청에 실패했습니다.")),
        { once: true },
      );
      document.head.appendChild(script);
    });
  }

  return kakaoMapsPromise;
}

function Status({ children }) {
  return (
    <div className="flex size-full items-center justify-center bg-2light-grey px-5 text-center text-caption-regular-12 text-subtext">
      {children}
    </div>
  );
}

export default function KakaoPlaceView({
  address,
  name,
  variant = "map",
}) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const appKey = import.meta.env.VITE_KAKAO_MAP_JAVASCRIPT_KEY;

  useEffect(() => {
    let cancelled = false;
    if (!appKey || !containerRef.current) return undefined;

    loadKakaoMaps(appKey)
      .then((kakao) => {
        if (cancelled || !containerRef.current) return;

        const places = new kakao.maps.services.Places();
        const query = `${name ?? ""} ${address ?? ""}`.trim();

        places.keywordSearch(query, (results, resultStatus) => {
          if (cancelled || !containerRef.current) return;
          if (
            resultStatus !== kakao.maps.services.Status.OK ||
            !results.length
          ) {
            setStatus("not-found");
            return;
          }

          const position = new kakao.maps.LatLng(
            Number(results[0].y),
            Number(results[0].x),
          );

          if (variant === "roadview") {
            const roadview = new kakao.maps.Roadview(containerRef.current);
            const client = new kakao.maps.RoadviewClient();
            client.getNearestPanoId(position, 80, (panoId) => {
              if (cancelled) return;
              if (panoId == null) {
                setStatus("not-found");
                return;
              }
              roadview.setPanoId(panoId, position);
              setStatus("ready");
            });
            return;
          }

          const map = new kakao.maps.Map(containerRef.current, {
            center: position,
            level: 3,
          });
          new kakao.maps.Marker({ map, position });
          map.addControl(
            new kakao.maps.ZoomControl(),
            kakao.maps.ControlPosition.RIGHT,
          );
          setStatus("ready");
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [address, appKey, name, variant]);

  if (!appKey) {
    return (
      <Status>
        카카오맵 JavaScript 키를 설정하면
        <br />
        {variant === "roadview" ? "매장 로드뷰" : "실시간 지도"}가 표시됩니다.
      </Status>
    );
  }

  return (
    <div className="relative size-full">
      <div ref={containerRef} className="size-full" />
      {status !== "ready" && (
        <div className="absolute inset-0">
          <Status>
            {status === "loading" && "카카오맵을 불러오는 중이에요."}
            {status === "not-found" &&
              (variant === "roadview"
                ? "이 매장 주변의 로드뷰가 없어요."
                : "매장 위치를 찾지 못했어요.")}
            {status === "error" && "카카오맵을 불러오지 못했어요."}
          </Status>
        </div>
      )}
    </div>
  );
}
