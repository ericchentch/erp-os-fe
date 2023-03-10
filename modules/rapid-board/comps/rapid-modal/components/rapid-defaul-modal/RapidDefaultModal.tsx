import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'

interface IRapidDefaultModal {
  children: ReactNode
  open: boolean
  setOpen?: (v: boolean) => void
  preventClose?: boolean
  zIndex?: number
  ModalStyle?: CSSProperties
  width?: number | string
  notBlur?: boolean
}

export const RapidDefaultModal = ({
  children,
  open,
  setOpen,
  preventClose,
  zIndex,
  ModalStyle,
  width,
  notBlur,
}: IRapidDefaultModal) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)

  const handleClose = () => {
    if (!preventClose && setOpen) setOpen(false)
  }

  return (
    <div
      onClick={handleClose}
      style={{
        zIndex: zIndex ?? 10,
        position: 'fixed',
        top: 0,
        left: 0,
        right: open ? 0 : undefined,
        bottom: open ? 0 : undefined,
        width: !open ? 0 : undefined,
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          zIndex: (zIndex ?? 10) - 1,
          position: 'fixed',
          top: 0,
          left: 0,
          right: open ? 0 : undefined,
          bottom: open ? 0 : undefined,
          width: !open ? 0 : undefined,
          overflow: 'auto',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: !notBlur ? 'blur(15px)' : undefined,
          WebkitBackdropFilter: !notBlur ? 'blur(15px)' : undefined,
        }}
      />
      <div
        style={{
          zIndex: zIndex ?? 10,
          width: '80%',
          maxWidth: width ?? 400,
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
          boxShadow: themeValue[darkTheme].shadows.lg,
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          ...ModalStyle,
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        {children}
      </div>
    </div>
  )
}
