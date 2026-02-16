export interface SuccessLogin {
  message: string
  user: UserInterface
  token: string
}
export interface FailedLogin {
    statusMsg: string
    message: string 
}

export interface UserInterface {
  name: string
  email: string
  role: string
}
