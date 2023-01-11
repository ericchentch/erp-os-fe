import { Button, Loading } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { getListEditAble } from '@/lib'
import { ShareStoreSelector } from '@/redux/share-store'
import { postMethod } from '@/services'
import { PermissionRequest, PermissionRequestFailure } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ModifierPermission, PermissionRequestDefault } from '../inventory'

export const PermissionCreate = () => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const router = useRouter()
  const translate = useTranslationFunction()

  const [permissionState, setPermissionState] =
    useState<PermissionRequest>(PermissionRequestDefault)

  const createResult = useApiCall<PermissionRequest, PermissionRequestFailure>({
    callApi: () => postMethod(apiRoute.permissions.addPermission, cookies.token, permissionState),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
    handleSuccess(message) {
      toast.success(translate(message))
      router.push('/permission/management')
    },
  })

  const handleChangeState = (NewUpdate: Partial<PermissionRequest>) => {
    const newState = { ...permissionState, ...NewUpdate }
    setPermissionState(newState)
  }
  const { breakPoint } = useSelector(ShareStoreSelector)

  const cancelLabel = useTranslation('cancel')

  const saveLabel = useTranslation('save')

  const createPermission = useTranslation('permissionCreatePascal')

  return (
    <div style={{ marginTop: 18, marginBottom: 80 }}>
      <h2 style={{ display: breakPoint === 1 ? 'block' : 'none' }}>{createPermission}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h1 style={{ display: breakPoint === 1 ? 'none' : 'block' }}>{createPermission}</h1>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button
            color="success"
            onClick={() => {
              createResult.setLetCall(true)
            }}
            size="sm"
            disabled={createResult.loading}
          >
            {createResult.loading ? <Loading /> : <>{saveLabel}</>}
          </Button>
          <Button
            color="warning"
            onClick={() => {
              router.push('/permission/management')
            }}
            size="sm"
            disabled={createResult.loading}
          >
            {cancelLabel}
          </Button>
        </div>
      </div>
      <ModifierPermission
        editAble={getListEditAble([
          { key: 'name', label: 'name' },
          { key: 'userId', label: 'userId' },
          { key: 'viewPoints', label: 'viewPoints' },
          { key: 'editable', label: 'editable' },
        ])}
        permissionState={permissionState}
        handleChangeState={handleChangeState}
        errorState={createResult?.error?.result}
      />
    </div>
  )
}
