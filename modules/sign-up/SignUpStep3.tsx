import { CommonResponseType, SignUpFailure } from '@/types'

export const SignUpStep3 = ({ error }: { error?: CommonResponseType<SignUpFailure> }) => {
  // const dispatch = useDispatch()
  // const translate = useTranslationFunction()

  // const { signUpRequest } = useSelector(authenticationSelector)

  // const stepLabel = useTranslation('step')
  // const contactInformation = useTranslation('contactInformation')
  // const phone = useTranslation('phone')
  // const email = useTranslation('email')
  // const address = useTranslation('address')

  // return (
  //   <>
  //     <Text size={18}>
  //       {stepLabel} 3:
  //       <Text b css={{ marginLeft: 10 }}>
  //         {contactInformation}
  //       </Text>
  //     </Text>
  //     <Input
  //       value={signUpRequest.phone}
  //       onChange={(e) => dispatch(setSignUpRequest({ phone: e.target.value }))}
  //       {...inputStyles({ error: error?.result?.phone && translate(error.result.phone) })}
  //       labelLeft={phone}
  //     />
  //     <Input
  //       value={signUpRequest.email}
  //       onChange={(e) => dispatch(setSignUpRequest({ email: e.target.value }))}
  //       {...inputStyles({ error: error?.result?.email && translate(error.result.email) })}
  //       labelLeft={email}
  //     />
  //     <Input
  //       value={signUpRequest.address}
  //       onChange={(e) => dispatch(setSignUpRequest({ address: e.target.value }))}
  //       {...inputStyles({ error: error?.result?.address && translate(error.result.address) })}
  //       labelLeft={address}
  //     />
  //   </>
  // )
  return <>{error || null}</>
}
