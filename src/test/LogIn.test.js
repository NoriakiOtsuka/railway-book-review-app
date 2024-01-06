import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LogIn } from '../pages/LogIn'

describe('jest test', () => {
  it('ログイン画面', () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    )
    const emailLabel = screen.getByText("メールアドレス")
    expect(emailLabel).toBeInTheDocument()
    const emailInput = screen.getByRole("textbox", {name: /email/i})
    expect(emailInput).toBeInTheDocument()
    const passwordLabel = screen.getByText("パスワード")
    expect(passwordLabel).toBeInTheDocument()
    // const passwordInput = screen.getByRole("textbox", {name: /password/i})
    // expect(screen.getByRole("textbox")).toHaveAttribute("name", "email")

    const buttonElement = screen.getByRole('button', { name: 'サインイン' });
    fireEvent.click(buttonElement)
  })
})
