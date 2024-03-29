import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section>
      <div className="error-page">
        <div className="center">
          <Link to="/" className='btn primary'>Go Back Home</Link>
          <h2>Page not Found</h2>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
