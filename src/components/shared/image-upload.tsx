import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImagePlusIcon } from 'lucide-react'
import Loading from './loading'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface ImageUploadProps {
  onUploadComplete?: (image: File | null) => void
  imageUrl?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete, imageUrl }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  )
  const [progress, setProgress] = useState<number>(0)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0]
      setSelectedImage(image)
      void handleImageUpload(image)
    }
  }

  const removeSelectedImage = () => {
    setLoading(false)
    setUploadedImagePath(null)
    setSelectedImage(null)
    setProgress(0)
    console.log(selectedImage?.name)
  }

  const handleImageUpload = async (image: File) => {
    if (!image) return
    setLoading(true)
    console.log(image)
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadstart = () => {
      setProgress(0)
      setLoading(true)
    }
    reader.onloadstart = () => {
      setProgress(0)
      setLoading(true)
    }
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = parseInt((event.loaded / event.total) * 100, 10)
        console.log(event.timeStamp)
        setProgress(percentComplete)
      }
    }
    reader.onloadend = () => {
      setUploadedImagePath(reader.result as string)
      if (onUploadComplete) {
        onUploadComplete(image)
      }
      setLoading(false)
      setProgress(100)
    }
    reader.onerror = () => {
      setLoading(false)
      console.error('Error al cargar la imagen:', reader.error)
    }
    // reader.readAsDataURL(image)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0]
      setSelectedImage(image)
      void handleImageUpload(image)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  useEffect(() => {
    if (imageUrl) {
      setUploadedImagePath(imageUrl)
    }
  }, [imageUrl])

  return (
    <div className="space-y-3 h-full">
      <div {...getRootProps()} className="h-full relative">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center border-2 border-dashed rounded-lg cursor-pointer  dark:hover:bg-dark-border hover:bg-light-border w-full visually-hidden-focusable h-full overflow-hidden"
        >
          {loading && (
            <div className="text-center flex flex-col justify-center items-center p-4 gap-2">
              {/* <RadialProgress progress={progress} /> */}
              <Loading />
              <div
                className="bg-light-action dark:bg-dark-action text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
              <p className="text-sm font-semibold">Subiendo imagen ...</p>
              <p className="text-xs text-gray-400">
                No actualice ni realice ninguna otra acción mientras la imagen esté
                siendo subido
              </p>
            </div>
          )}

          {!loading && !uploadedImagePath && (
            <div className="text-center flex flex-col justify-center items-center p-4 gap-1">
              {/* <div className="border p-2 rounded-md mx-auto"> */}
              <ImagePlusIcon size="4rem" />
              {/* </div> */}

              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Arrastra una imagen</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400">
                Seleccione una imagen o arrástrela aquí para cargarla directamente
              </p>
            </div>
          )}

          {uploadedImagePath && !loading && (
            <div className="text-center h-full">
              <img
                width={1000}
                height={1000}
                src={uploadedImagePath}
                className="w-full h-full opacity-70 object-cover aspect-square"
                alt="uploaded image"
              />
              <div className="absolute inset-0 z-10 bottom-0 flex items-center justify-center p-4">
                {/* <p className="text-sm font-semibold">Imagen cargada</p> */}
                <p className="text-xs text-light-text-primary dark:text-dark-text-primary drop-shadow-xl">
                  Haga clic aquí para subir otra imagen
                </p>
              </div>
            </div>
          )}
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg, image/jpg"
          type="file"
          className="hidden"
          disabled={loading || uploadedImagePath !== null}
          onChange={handleImageChange}
        />
      </div>

      {!!uploadedImagePath && (
        <div className="flex items-center justify-between">
          <Button
            onClick={removeSelectedImage}
            type="button"
            variant="secondary"
          >
            {uploadedImagePath ? 'Remover' : 'Cerrar'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
