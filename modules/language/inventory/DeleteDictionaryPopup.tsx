import { DEVICE_ID, USER_ID } from '@/constants/auth'
import { useApiCall } from '@/hooks'
import { generateToken } from '@/lib'
import { deleteDictionaryKey } from '@/services'
import { Button, Modal, Text } from '@nextui-org/react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { TiDelete } from 'react-icons/ti'
import { toast } from 'react-toastify'

interface IDeleteDictionaryPopup {
  dictionaryKey: string
  setLetCallList: Function
}

export const DeleteDictionaryPopup = ({
  dictionaryKey,
  setLetCallList,
}: IDeleteDictionaryPopup) => {
  const [cookies] = useCookies([DEVICE_ID, USER_ID])
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const deleteResult = useApiCall({
    callApi: () =>
      deleteDictionaryKey(
        generateToken({ userId: cookies.userId, deviceId: cookies.deviceId }),
        dictionaryKey
      ),
    handleSuccess(message) {
      toast.success(message)
      setOpen(false)
      setLetCallList(true)
    },
    handleError(message) {
      toast.error(message)
    },
  })
  return (
    <>
      <TiDelete
        size={25}
        color="red"
        onClick={() => {
          setOpen(true)
        }}
      />
      {open ? (
        <Modal open={open} onClose={handleClose} blur>
          <Modal.Header>
            <Text h2 id="modal-title">
              Delete {dictionaryKey}
            </Text>
          </Modal.Header>

          <Modal.Body>Bạn sẽ xóa dictionary này tại toàn bộ ngôn ngữ</Modal.Body>

          <Modal.Footer justify="center">
            <Button disabled={deleteResult.loading} auto color="warning" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              disabled={deleteResult.loading}
              auto
              color="success"
              onClick={() => {
                deleteResult.setLetCall(true)
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  )
}