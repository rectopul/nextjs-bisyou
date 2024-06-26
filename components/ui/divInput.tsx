"use client"

import { useEffect, useRef, useState } from "react"

interface DivInputProps {
  initial: string
  onBlur: (data: string) => void
}

export function DivInput({ initial, onBlur }: DivInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initial)
  const inputRef = useRef<HTMLInputElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  const handleBlur = async () => {
    setIsEditing(false)
    onBlur(text)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.textContent = text
      if (inputRef.current) {
        inputRef.current.style.width = spanRef.current.offsetWidth + "px"
      }
    }

    if (spanRef.current) {
      spanRef.current.textContent = text
      if (inputRef.current) {
        inputRef.current.style.width = spanRef.current.offsetWidth + "px"
      }
    }

    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [text, isEditing])
  return (
    <div className="self-start flex">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-[max-content] border border-gray-300 rounded py-1 px-2 self-start outline-none"
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="py-1 px-2 self-start border border-transparent rounded-md cursor-pointer hover:border-slate-300 text-sm font-light"
        >
          {text}
        </div>
      )}
      <span ref={spanRef} className="hidden-span invisible absolute px-[9px]">
        {text}
      </span>
    </div>
  )
}
