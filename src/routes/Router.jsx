import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { LogIn } from '../pages/LogIn'
import { SignUp } from '../pages/SignUp'
import { Profile } from '../pages/Profile'
import { BookList } from '../pages/BookList'
import { BookNew } from '../pages/BookNew'

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route exact path="/" element={<BookList />} />
            <Route exact path="/new" element={<BookNew />} />
            <Route exact path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Home />} />
          </>
        )}
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
