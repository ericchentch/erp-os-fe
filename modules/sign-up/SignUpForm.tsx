import { apiRoute } from '@/constants/apiRoutes'
import { useApiCall, useTranslation, useTranslationFunction } from '@/hooks'
import { encodeBase64 } from '@/lib'
import { authenticationSelector } from '@/redux/authentication'
import { postMethod } from '@/services'
import { SignUpFailure, SignUpRequest } from '@/types'
import { Button, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SignUpStepSwitch } from './SignStepSwitch'

export const SignUpForm = () => {
  const [step, setStep] = useState<number>(1)

  const { signUpRequest } = useSelector(authenticationSelector)

  const router = useRouter()

  const translate = useTranslationFunction()

  const { error, loading, setLetCall } = useApiCall<String, SignUpFailure>({
    callApi: () =>
      postMethod<SignUpRequest>(apiRoute.auth.signUp, undefined, {
        username: signUpRequest.username,
        password: encodeBase64(signUpRequest.password),
        firstName: signUpRequest.firstName,
        lastName: signUpRequest.lastName,
        phone: signUpRequest.phone,
        email: signUpRequest.email,
        address: signUpRequest.address,
      }),
    handleError(status, message) {
      toast.error(translate(message))
    },
    handleSuccess(message) {
      toast.success(translate(message))
      setStep(4)
    },
  })

  const handleLogin = () => {
    router.push('/login')
  }

  const handleSignUp = () => {
    if (step < 3) {
      setStep(step + 1)
    }
    if (step === 3) {
      setLetCall(true)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const signIn = useTranslation('signIn')
  const next = useTranslation('next')
  const back = useTranslation('back')
  const signUp = useTranslation('signUp')

  const showButton = () => {
    if (step === 1) {
      return (
        <>
          <Button auto onClick={handleLogin}>
            {signIn}
          </Button>
          <Button disabled={loading} auto onClick={handleSignUp}>
            {next}
          </Button>
        </>
      )
    }
    if (step === 3) {
      return (
        <>
          <Button disabled={loading} auto onClick={handleBack}>
            {back}
          </Button>
          <Button disabled={loading} auto onClick={handleSignUp}>
            {loading ? <Loading /> : <>Sign up</>}
          </Button>
        </>
      )
    }

    return (
      <>
        <Button disabled={loading} auto onClick={handleBack}>
          {back}
        </Button>
        <Button disabled={loading} auto onClick={handleSignUp}>
          {next}
        </Button>
      </>
    )
  }

  return (
    <>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {signUp}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <SignUpStepSwitch setStep={setStep} step={step} error={error} />
        <Row />
      </Modal.Body>
      <Modal.Footer>{showButton()}</Modal.Footer>
    </>
  )
}
