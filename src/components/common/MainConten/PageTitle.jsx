import React from 'react'
import "./pageTitle.css"

const PageTitle = ({page}) => {
  return (
    <div className="pageTitle d-flex justify-content-between">
        <h1>{page}</h1>
        <nav className="">
            <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                    <a href="/">
                        <i className="bi bi-house-door"></i>
                    </a>
                </li>
                <li className="breadcrumb-item active">{page}</li>
            </ol>
        </nav>

    </div>
  )
}

export default PageTitle