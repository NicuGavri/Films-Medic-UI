import { SimpleInput, OutlineButton } from "../../index"

const ConfirmPasswordForm = () => {
  return (
    <div className=" flex justify-center items-center h-full">
    <div className="bg-[#0e0d17] border-gray-600 border-[2px] rounded-xl w-[400px] h-[360px] flex items-center justify-center">
      <form className="w-[300px] text-center bg-inherit text-white py-2 space-y-4">
        <h1>Enter new password</h1>
        <SimpleInput
          type="password"
          label="New Password"
          name="newPassword"
          required={true}
        />
        <SimpleInput
          type="password"
          label="Password"
          name="password"
          required={true}
        />
        <OutlineButton>Confirm Password</OutlineButton>
 
      </form>
    </div>
  </div>
  )
}

export default ConfirmPasswordForm
