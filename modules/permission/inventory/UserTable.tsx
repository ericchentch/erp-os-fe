import { CustomTable } from '@/components'
import { apiRoute } from '@/constants/apiRoutes'
import { TOKEN_AUTHENTICATION } from '@/constants/auth'
import { useApiCall, useTranslationFunction } from '@/hooks'
import { getTotalPage } from '@/lib'
import { getMethod } from '@/services'
import { UserListSuccess } from '@/types'
import { Pagination } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { listFunctionParseValue } from './permission.inventory'

interface IUserTablePermission {
  setListUser: Function
  listUser: string[]
  editAble?: boolean
}

export const UserTablePermission = ({ listUser, setListUser, editAble }: IUserTablePermission) => {
  const [cookies] = useCookies([TOKEN_AUTHENTICATION])
  const translate = useTranslationFunction()

  const [page, setPage] = useState<number>(1)

  const userResult = useApiCall<UserListSuccess, String>({
    callApi: () =>
      getMethod(apiRoute.user.getYourListUser, cookies.token, { page: page.toString() }),
    handleError(status, message) {
      if (status) {
        toast.error(translate(message))
      }
    },
  })

  useEffect(() => {
    userResult.setLetCall(true)
  }, [page])

  const listFunctionParseValues = listFunctionParseValue()

  return (
    <div>
      <CustomTable
        header={userResult?.data?.viewPoints ?? []}
        body={userResult?.data?.result?.data ?? []}
        selectionMode={editAble ? 'multiple' : 'none'}
        listFunctionParseValue={listFunctionParseValues}
        handleChangeSelection={setListUser}
        selectedKeys={listUser}
        loading={userResult.loading}
      >
        <>{null}</>
      </CustomTable>
      {!userResult.loading && (
        <Pagination
          shadow
          color="default"
          total={getTotalPage(userResult?.data?.result.totalRows || 0, 10)}
          onChange={(number) => setPage(number)}
          page={page}
          css={{ marginTop: 20 }}
        />
      )}
    </div>
  )
}
