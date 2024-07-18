import React from 'react'

interface InputImgProps {
  className?: string
  label: string
  required?: boolean
  error?: string
  name: string

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  imageUrl?: string
}

function InputImg({ label, name, required, error, onChange, placeholder, imageUrl }: InputImgProps) {
  return (
    <div className='w-full relative'>
      <label htmlFor={name} className='cursor-pointer hover:opacity-90 flex gap-1 items-center text-light-text-primary dark:text-dark-text-primary w-fit mx-auto'>
        <div className='overflow-hidden flex justify-center !w-fit'>
          {imageUrl
            ? <img
              src={imageUrl}
              alt='Imagen del producto'
              className='w-full h-fit object-cover rounded-md shadow-lg aspect-square max-w-[300px] lg:max-w-full mx-auto'
            />
            : <img
              src='https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg'
              alt='Imagen del producto'
              className='w-full h-fit object-cover rounded-md shadow-lg aspect-square max-w-[300px] lg:max-w-full mx-auto'
            />}
        </div>
      </label>
      <input type="file" accept="image/*" className="hidden h-fit py-2 px-4 w-full text-sm bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-secondary dark:text-dark-text-secondary bg-transparent border border-light-border dark:border-dark-border rounded-md appearance-none dark:focus:border-dark-action focus:outline-none focus:ring-0 focus:border-light-action peer" id={name} name={name} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

export default InputImg
