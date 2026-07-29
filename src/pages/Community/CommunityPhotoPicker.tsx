import { useRef } from "react";

interface CommunityPhotoPickerProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const readImage = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export default function CommunityPhotoPicker({
  images,
  onChange,
}: CommunityPhotoPickerProps) {
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const available = Math.max(0, 5 - images.length);
    const selected = Array.from(files).slice(0, available);
    const nextImages = await Promise.all(selected.map(readImage));
    onChange([...images, ...nextImages]);
  };

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-body-semibold-16 text-offblack">사진 추가</h2>
        <span className="text-caption-regular-12 text-grey">
          {images.length}/5
        </span>
      </div>

      <div className="no-scrollbar flex items-center gap-3 overflow-x-auto touch-auto">
        {images.map((image, index) => (
          <div
            key={`${image.slice(0, 32)}-${index}`}
            className="relative h-[192px] w-40 shrink-0 overflow-hidden rounded-xl bg-light-grey"
          >
            <img src={image} alt={`첨부 사진 ${index + 1}`} className="size-full object-cover" />
            <button
              type="button"
              aria-label={`첨부 사진 ${index + 1} 삭제`}
              onClick={() => onChange(images.filter((_, itemIndex) => itemIndex !== index))}
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-offblack/70 text-body-medium-14 text-offwhite"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < 5 && (
          <>
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              className="flex h-[192px] w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-light-grey text-body-medium-14 text-subtext"
            >
              <span className="text-[30px] leading-none">＋</span>
              갤러리
            </button>
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              className="flex h-[192px] w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-light-grey text-body-medium-14 text-subtext"
            >
              <span className="text-[26px] leading-none">◉</span>
              카메라
            </button>
          </>
        )}
      </div>

      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          void addFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => {
          void addFiles(event.target.files);
          event.target.value = "";
        }}
      />
    </section>
  );
}
