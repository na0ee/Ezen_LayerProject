import { useEffect, useRef, useState } from "react";

interface CameraCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (image: string) => void;
  onChooseFile?: () => void;
}

const cameraErrorMessage = (error: unknown) => {
  if (error instanceof DOMException && error.name === "NotAllowedError") {
    return "카메라 권한이 필요해요. 브라우저 설정에서 권한을 허용해주세요.";
  }
  if (error instanceof DOMException && error.name === "NotFoundError") {
    return "사용할 수 있는 카메라를 찾지 못했어요.";
  }
  return "카메라를 시작하지 못했어요. 파일에서 사진을 선택해주세요.";
};

export default function CameraCaptureModal({
  open,
  onClose,
  onCapture,
  onChooseFile,
}: CameraCaptureModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    let cancelled = false;
    setErrorMessage("");
    setIsReady(false);

    const stopCamera = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setErrorMessage("이 브라우저에서는 카메라 촬영을 지원하지 않아요.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        if (!cancelled) setErrorMessage(cameraErrorMessage(error));
      }
    };

    void startCamera();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [open]);

  if (!open) return null;

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    const maxSize = 1280;
    const scale = Math.min(1, maxSize / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
    onCapture(canvas.toDataURL("image/jpeg", 0.85));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-offblack/70 px-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="camera-capture-title"
        className="w-full max-w-[390px] overflow-hidden rounded-3xl bg-offwhite p-5"
      >
        <div className="flex items-center justify-between">
          <h2 id="camera-capture-title" className="text-title-semibold-18 text-offblack">
            사진 촬영
          </h2>
          <button
            type="button"
            aria-label="카메라 닫기"
            onClick={onClose}
            className="flex size-8 items-center justify-center text-title-medium-20 text-offblack"
          >
            ×
          </button>
        </div>

        <div className="mt-4 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-offblack">
          {errorMessage ? (
            <p className="max-w-65 px-5 text-center text-body-regular-14 text-offwhite">
              {errorMessage}
            </p>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onCanPlay={() => setIsReady(true)}
              className="size-full object-cover"
            />
          )}
        </div>

        <div className="mt-4 flex gap-2">
          {onChooseFile && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onChooseFile();
              }}
              className="h-12 flex-1 rounded-full border border-light-grey bg-offwhite text-body-semibold-16 text-offblack"
            >
              파일 선택
            </button>
          )}
          <button
            type="button"
            disabled={!isReady || Boolean(errorMessage)}
            onClick={takePhoto}
            className="h-12 flex-1 rounded-full bg-offblack text-body-semibold-16 text-offwhite disabled:bg-light-grey disabled:text-grey"
          >
            촬영하기
          </button>
        </div>
      </section>
    </div>
  );
}
