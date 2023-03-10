import { UserOnlineResponse } from '@/types'

interface IOneUser {
  user: UserOnlineResponse
  isOnline: boolean
}

export const OneUser = ({ user, isOnline }: IOneUser) => {
  // const { breakPoint } = useSelector(ShareStoreSelector)

  return (
    <>
      <div style={{ position: 'relative' }}>
        {/* <Avatar
          bordered
          as="button"
          color="primary"
          css={{ size: breakPoint === 1 ? 50 : 80 }}
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        /> */}
        {isOnline && (
          <div
            style={{
              position: 'absolute',
              borderRadius: '100%',
              backgroundColor: 'green',
              width: 15,
              height: 15,
              bottom: 5,
              right: 5,
              zIndex: 5,
              border: '2px solid white',
            }}
          />
        )}
      </div>
      <div
        className="line-clamp-2"
        style={{
          width: 100,
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {user.name}
      </div>
    </>
  )
}
