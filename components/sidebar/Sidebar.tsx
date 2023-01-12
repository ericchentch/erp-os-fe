import { themeValue } from '@/lib'
import { GeneralSettingsSelector } from '@/redux/general-settings'
import { useSelector } from 'react-redux'
import { NavBarItems } from './NavBarConstant'
import { RenderItemSideBar } from './RenderItemSideBar'

interface ISideBar {
  isOpenSideBar: boolean
  setOpenSideBar: (v: boolean) => void
  pixel: number
}

export const SideBar = ({ isOpenSideBar, setOpenSideBar, pixel }: ISideBar) => {
  const { darkTheme } = useSelector(GeneralSettingsSelector)
  return (
    <>
      <div
        onClick={() => {
          setOpenSideBar(false)
        }}
        style={{
          position: pixel < 960 && isOpenSideBar ? 'fixed' : 'static',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          opacity: pixel < 960 && isOpenSideBar ? '20%' : 0,
          inset: 0,
          zIndex: pixel >= 960 ? 1 : 9999,
          transition: 'opacity 0.2s linear',
        }}
      />
      <div
        style={{
          width: pixel >= 960 || isOpenSideBar ? 300 : 0,
          position: 'fixed',
          top: 76,
          left: 0,
          bottom: 0,
          backgroundColor: themeValue[darkTheme].colors.backgroundContrast,
          zIndex: pixel >= 960 ? 2 : 10000,
          boxShadow: '0 12px 20px 6px rgb(104 112 118 / 0.08)',
          overflow: 'auto',
          fontWeight: 500,
          transition: 'all 0.2s linear',
        }}
      >
        {NavBarItems().map((item, index) => (
          <RenderItemSideBar
            key={item.path}
            item={item}
            hasDivide={index + 1 < NavBarItems().length}
            level={1}
          />
        ))}
      </div>
    </>
  )
}
