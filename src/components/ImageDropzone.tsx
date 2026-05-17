import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImage, type Bucket } from "@/lib/upload";
import { toast } from "sonner";

const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  bucket: Bucket;
  label?: string;
  aspect?: string; // tailwind aspect, e.g. "aspect-video"
}

export function ImageDropzone({ value, onChange, bucket, label = "Drop an image or click to upload", aspect = "aspect-video" }: Props) {
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      toast.error("Please upload a JPG, PNG or WEBP image");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image must be smaller than 8MB");
      return;
    }
    setBusy(true);
    try {
      const url = await uploadImage(bucket, file);
      onChange(url);
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
        className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-colors ${drag ? "border-primary bg-primary/5" : "border-border bg-muted/40 hover:bg-muted"} ${aspect}`}
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 shadow-sm hover:bg-background"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="grid h-full w-full place-items-center text-center text-muted-foreground">
            {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : (
              <div className="flex flex-col items-center gap-2 px-4">
                <ImagePlus className="h-7 w-7" />
                <p className="text-sm">{label}</p>
                <p className="text-xs opacity-60">JPG · PNG · WEBP · max 8MB</p>
              </div>
            )}
          </div>
        )}
        {busy && value && (
          <div className="absolute inset-0 grid place-items-center bg-background/60">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
