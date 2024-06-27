import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export interface DropZoneProps {
  onDragFile: (file: File) => void
  showMessage: boolean
  size?: "small" | "large"
  id?: string
}

export function DropZone({
  onDragFile,
  showMessage = true,
  size = "large",
  id = "dropzone-file",
}: DropZoneProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [filename, setFileName] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()

      reader.onload = () => {
        setImagePreview(reader.result as string)
      }

      onDragFile(acceptedFiles[0])
      setFileName(acceptedFiles[0].name)

      reader.readAsDataURL(acceptedFiles[0])
    },
    [onDragFile],
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"],
      },
      maxFiles: 1,
      maxSize: 2000000, // 2 MB
    })

  return (
    <>
      <div className="max-w-2xl mx-auto w-full">
        <div
          className="flex items-center justify-center w-full"
          {...getRootProps()}
        >
          <label
            htmlFor={id}
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2">
              {!imagePreview && size === "large" && (
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              )}
              {isDragActive ? (
                <p
                  data-size={size}
                  className="mb-2 data-[size=small]:text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Solte o arquivo aqui ...
                </p>
              ) : (
                <>
                  <p
                    data-size={size}
                    className="mb-2 text-sm data-[size=small]:text-center text-gray-500 dark:text-gray-400"
                  >
                    {imagePreview && size === "small" ? (
                      <Image
                        src={imagePreview}
                        alt="preview file"
                        width={150}
                        height={150}
                        className="rounded-md w-auto h-auto"
                      />
                    ) : (
                      <>
                        {filename ? (
                          <span className="font-semibold">{filename}</span>
                        ) : (
                          <>
                            <span className="font-semibold">
                              Clique para selecionar
                            </span>{" "}
                            ou arraste aqui
                          </>
                        )}
                      </>
                    )}
                  </p>
                  <p
                    data-size={size}
                    className="text-xs data-[size=small]:text-center text-gray-500 dark:text-gray-400"
                  >
                    {!filename &&
                      `WEBP, PNG, JPG, SVG or GIF (MAX. 1000x1000px)`}
                  </p>
                </>
              )}
            </div>
            <input
              id={id}
              name={id}
              type="file"
              className="hidden"
              {...getInputProps()}
            />
          </label>
        </div>
        {showMessage && (
          <p className="mt-5">
            Selecione ou arraste a imagem da página neste campo. A imagem da
            página não é obrigatória.
          </p>
        )}

        {fileRejections &&
          fileRejections.length > 0 &&
          fileRejections.map((f, k) => (
            <span className="text-red-600" key={`rej-${k}`}>
              {f.errors[0].code}
            </span>
          ))}

        {imagePreview && size == "large" && (
          <div className="mt-4 w-32 h-32">
            <p className="">Preview:</p>
            <div className="w-full overflow-hidden h-full flex justify-center items-center">
              <Image
                src={imagePreview}
                alt="Preview"
                width={150}
                height={150}
                className="mt-2 max-w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
