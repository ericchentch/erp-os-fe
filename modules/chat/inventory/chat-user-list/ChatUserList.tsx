import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION, USER_ID } from '@/constants/auth'
import { useApiCall, useEventSource } from '@/hooks'
import { ShareStoreSelector } from '@/redux/share-store'
import { getMethod } from '@/services'
import { ChatRoom, UserOnlineResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { OneUser } from './OneUser'
import { SlideBar } from './SlideBar'

interface IChatUserList {
  userChooseId: string
  setUserChoose: Function
}

export const ChatUserList = ({ userChooseId, setUserChoose }: IChatUserList) => {
  const { breakPoint } = useSelector(ShareStoreSelector)

  const [cookies] = useCookies([TOKEN_AUTHENTICATION, USER_ID])

  const [hoverItem, setHover] = useState('')

  const event = useEventSource<UserOnlineResponse[]>({
    eventUrl: apiRoute.message.onlineUser,
    eventName: 'get-online-users-event',
    token: cookies.token,
  })

  const getChatRooms = useApiCall<ChatRoom[], string>({
    callApi: () =>
      getMethod({
        pathName: apiRoute.message.getChatRooms,
        token: cookies.token,
        params: { page: '1' },
      }),
  })

  const getBackGroundColor = (id: string) => {
    if (userChooseId === id) return 'blue'
    if (id === hoverItem) return 'black'
    return ''
  }

  useEffect(() => {
    getChatRooms.setLetCall(true)
  }, [])

  return (
    <div
      style={{
        width: breakPoint === 1 ? '100% ' : 375,
        minWidth: 375,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {event.evtData && (
        <SlideBar userList={event.evtData.filter((item) => item.id !== cookies.userId)} />
      )}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          height: `calc(100% - ${breakPoint === 1 ? '100px' : '150px'})`,
        }}
      >
        {getChatRooms.loading ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>loading</div>
        ) : (
          getChatRooms.data &&
          getChatRooms.data?.result.map((user) => {
            return (
              <div
                onMouseEnter={() => {
                  setHover(user.receiveId)
                }}
                onMouseLeave={() => {
                  setHover('')
                }}
                onClick={() => {
                  setUserChoose({ id: user.receiveId, name: user.receiverName, avt: '' })
                }}
                key={user.receiveId}
                style={{
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: getBackGroundColor(user.receiveId),
                  padding: '10px 10px',
                  borderRadius: '12px',
                }}
              >
                <OneUser
                  user={{ id: user.receiveId, name: user.receiverName }}
                  isOnline={!!event?.evtData?.find((item) => item.id === user.receiveId)}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
